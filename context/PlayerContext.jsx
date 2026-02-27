import { createContext, useState, useRef, useEffect } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [queue, setQueue] = useState([]);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        const audio = audioRef.current;

        const updateProgress = () => {
            setProgress((audio.currentTime / audio.duration) * 100 || 0);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            // Optional: Auto-play next in queue
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, []);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    const playSong = (song) => {
        if (currentSong?._id === song._id) {
            togglePlay();
        } else {
            setCurrentSong(song);
            audioRef.current.src = song.songUrl; // Assuming the backend provides songUrl
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const seek = (value) => {
        const time = (value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = time;
        setProgress(value);
    };

    return (
        <PlayerContext.Provider
            value={{
                currentSong,
                isPlaying,
                volume,
                progress,
                duration,
                queue,
                setCurrentSong,
                setVolume,
                playSong,
                togglePlay,
                seek,
                setQueue
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
