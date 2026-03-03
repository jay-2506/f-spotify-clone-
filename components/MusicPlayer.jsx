import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import {
    Play, Pause, SkipBack, SkipForward, Volume2,
    Repeat, Shuffle, Maximize2, ListMusic, VolumeX, Heart, Monitor
} from "lucide-react";

export default function MusicPlayer() {
    const {
        currentSong, isPlaying, playSong, pauseSong,
        volume, setVolume, progress, duration, seek,
        playNext, playPrevious, toggleShuffle, toggleRepeat,
        isShuffle, repeatMode
    } = useContext(PlayerContext);

    if (!currentSong) return null;

    const formatTime = (time) => {
        if (!time) return "0:00";
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    };

    return (
        <div className="h-full px-2 md:px-4 py-2 md:py-0 flex items-center justify-between relative overflow-hidden group/player">
            {/* Subtle reactive glow behind the player */}
            <div className="absolute inset-0 bg-gradient-to-r from-spotify-green/5 via-transparent to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity duration-1000"></div>

            {/* Song Info */}
            <div className="flex items-center gap-3 md:gap-4 w-auto md:w-[30%] min-w-0 md:min-w-[180px] relative z-10">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-md overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.5)] shrink-0 transition-transform duration-500 group-hover/player:scale-105">
                    <img
                        src={currentSong.thumbnail || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop'}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col truncate max-w-[120px] md:max-w-none">
                    <span className="font-black text-[12px] md:text-[14px] text-white hover:underline cursor-pointer truncate tracking-tight">
                        {currentSong.title}
                    </span>
                    <span className="text-[10px] md:text-[12px] text-subdued hover:text-white hover:underline cursor-pointer truncate font-bold hidden sm:block">
                        {currentSong.description || 'Spotify Original'}
                    </span>
                </div>
                <button className="text-subdued hover:text-spotify-green transition-all ml-1 md:ml-2 shrink-0 active:scale-90">
                    <Heart size={16} className="md:w-[18px] md:h-[18px]" />
                </button>
            </div>

            {/* Main Player Controls */}
            <div className="flex flex-col items-center gap-1 md:gap-2 flex-1 max-w-[600px] relative z-10 px-2">
                <div className="flex items-center gap-4 md:gap-7">
                    <button
                        onClick={toggleShuffle}
                        className={`${isShuffle ? 'text-spotify-green' : 'text-subdued hover:text-white'} transition-all transform hover:scale-110 active:scale-95 hidden sm:block relative`}
                    >
                        <Shuffle size={16} className="md:w-[18px] md:h-[18px]" />
                        {isShuffle && <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-spotify-green rounded-full"></div>}
                    </button>
                    <button
                        onClick={playPrevious}
                        className="text-white/80 hover:text-white transition-all transform hover:scale-110 active:scale-90"
                    >
                        <SkipBack size={20} fill="currentColor" className="md:w-[24px] md:h-[24px]" />
                    </button>
                    <button
                        onClick={isPlaying ? togglePlay : () => playSong(currentSong)}
                        className="w-9 h-9 md:w-10 md:h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl hover:bg-spotify-green-hover"
                    >
                        {isPlaying ? <Pause fill="black" size={20} className="md:w-[24px] md:h-[24px]" /> : <Play fill="black" size={20} className="ml-0.5 md:w-[24px] md:h-[24px]" />}
                    </button>
                    <button
                        onClick={playNext}
                        className="text-white/80 hover:text-white transition-all transform hover:scale-110 active:scale-90"
                    >
                        <SkipForward size={20} fill="currentColor" className="md:w-[24px] md:h-[24px]" />
                    </button>
                    <button
                        onClick={toggleRepeat}
                        className={`${repeatMode > 0 ? 'text-spotify-green' : 'text-subdued hover:text-white'} transition-all transform hover:scale-110 active:scale-95 hidden sm:block relative`}
                    >
                        <Repeat size={16} className="md:w-[18px] md:h-[18px]" />
                        {repeatMode > 0 && <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-spotify-green rounded-full"></div>}
                        {repeatMode === 2 && <span className="absolute -top-1 -right-1.5 text-[8px] font-bold bg-black text-spotify-green rounded-full w-3 h-3 flex items-center justify-center border border-spotify-green">1</span>}
                    </button>
                </div>

                <div className="flex items-center gap-2 md:gap-3 w-full group/seek">
                    <span className="text-[10px] md:text-[11px] text-subdued font-bold min-w-[30px] md:min-w-[40px] text-right">
                        {formatTime(progress)}
                    </span>

                    <div className="relative flex-1 h-1 flex items-center">
                        <input
                            type="range"
                            min="0"
                            max={duration || 100}
                            value={progress || 0}
                            onChange={(e) => seek(parseFloat(e.target.value))}
                            className="absolute w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-spotify-green z-10 hover:h-1.5 transition-all"
                            style={{
                                background: `linear-gradient(to right, #1DB954 ${(progress / duration) * 100}%, rgba(255,255,255,0.1) ${(progress / duration) * 100}%)`
                            }}
                        />
                    </div>

                    <span className="text-[10px] md:text-[11px] text-subdued font-bold min-w-[30px] md:min-w-[40px]">
                        {formatTime(duration)}
                    </span>
                </div>
            </div>

            {/* Volume & Quality Tools - Hidden on Mobile */}
            <div className="hidden lg:flex items-center justify-end gap-3.5 w-[30%] min-w-[150px] relative z-10">
                <button className="text-subdued hover:text-white transition-all hover:scale-110">
                    <ListMusic size={18} />
                </button>
                <button className="text-subdued hover:text-white transition-all hover:scale-110">
                    <Monitor size={18} />
                </button>
                <div className="flex items-center gap-2 group/vol w-28">
                    <button
                        onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
                        className="text-subdued hover:text-white transition-all hover:scale-110"
                    >
                        {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <div className="relative flex-1 h-1 flex items-center">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white hover:accent-spotify-green transition-all"
                            style={{
                                background: `linear-gradient(to right, #1DB954 ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)`
                            }}
                        />
                    </div>
                </div>
                <button className="text-subdued hover:text-white transition-all hover:scale-110">
                    <Maximize2 size={16} />
                </button>
            </div>
        </div>
    );
}
