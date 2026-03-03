import { createContext, useState, useRef, useEffect, useCallback } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [queue, setQueue] = useState([]);

    // New Advanced States
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0); // 0 = Off, 1 = All, 2 = One

    const audioRef = useRef(new Audio());

    // Use refs so that event listeners can access the latest state without closure stale issues
    const queueRef = useRef([]);
    const currentSongRef = useRef(null);
    const isShuffleRef = useRef(false);
    const repeatModeRef = useRef(0);

    // Keep refs in sync with state
    useEffect(() => {
        queueRef.current = queue;
        currentSongRef.current = currentSong;
        isShuffleRef.current = isShuffle;
        repeatModeRef.current = repeatMode;
    }, [queue, currentSong, isShuffle, repeatMode]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };

    const playSong = (song, newQueue = null) => {
        // If a new queue is provided (e.g., clicking on an album), update the queue
        if (newQueue) {
            setQueue(newQueue);
        }

        if (currentSongRef.current?._id === song._id) {
            togglePlay(); // Clicking the same song just toggles it
        } else {
            setCurrentSong(song);
            audioRef.current.src = song.audioUrl;
            audioRef.current.play();
        }
    };

    const playNext = useCallback(() => {
        const currentQueue = queueRef.current;
        const currentSongData = currentSongRef.current;
        const shuffle = isShuffleRef.current;
        const repeat = repeatModeRef.current;

        if (!currentQueue || currentQueue.length === 0) return;

        if (shuffle) {
            const randomIndex = Math.floor(Math.random() * currentQueue.length);
            playSong(currentQueue[randomIndex]);
            return;
        }

        const currentIndex = currentQueue.findIndex(s => s._id === currentSongData?._id);

        if (currentIndex !== -1) {
            if (currentIndex < currentQueue.length - 1) {
                // Next track
                playSong(currentQueue[currentIndex + 1]);
            } else if (repeat === 1) {
                // End of queue but repeat all is active
                playSong(currentQueue[0]);
            } else {
                // End of queue
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
    }, []);

    const playPrevious = useCallback(() => {
        const currentQueue = queueRef.current;
        const currentSongData = currentSongRef.current;

        if (!currentQueue || currentQueue.length === 0) return;

        // Standard behavior: if past 3 seconds, restart current track
        if (audioRef.current.currentTime > 3) {
            audioRef.current.currentTime = 0;
            return;
        }

        const currentIndex = currentQueue.findIndex(s => s._id === currentSongData?._id);

        if (currentIndex > 0) {
            playSong(currentQueue[currentIndex - 1]);
        } else {
            // First track
            if (repeatModeRef.current === 1) {
                playSong(currentQueue[currentQueue.length - 1]); // loop to end
            } else {
                audioRef.current.currentTime = 0;
            }
        }
    }, []);

    useEffect(() => {
        const audio = audioRef.current;

        const updateProgress = () => {
            setProgress((audio.currentTime / audio.duration) * 100 || 0);
        };

        const handleEnded = () => {
            if (repeatModeRef.current === 2) {
                // Repeat exact same song
                audio.currentTime = 0;
                audio.play();
            } else {
                // Auto-advance
                playNext();
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);

        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
        };
    }, [playNext]);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    const seek = (value) => {
        const time = (value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = time;
        setProgress(value);
    };

    const toggleShuffle = () => setIsShuffle(!isShuffle);
    const toggleRepeat = () => setRepeatMode((prev) => (prev + 1) % 3);

    return (
        <PlayerContext.Provider
            value={{
                currentSong,
                isPlaying,
                volume,
                progress,
                duration,
                queue,
                isShuffle,
                repeatMode,
                setCurrentSong,
                setVolume,
                playSong,
                togglePlay,
                seek,
                setQueue,
                playNext,
                playPrevious,
                toggleShuffle,
                toggleRepeat
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
