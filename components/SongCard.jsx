import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Play, Pause } from "lucide-react";

export default function SongCard({ song }) {
    const { currentSong, isPlaying, playSong, pauseSong } = useContext(PlayerContext);

    const isCurrent = currentSong?._id === song._id;

    const handlePlay = (e) => {
        e.stopPropagation();
        if (isCurrent && isPlaying) {
            pauseSong();
        } else {
            playSong(song);
        }
    };

    return (
        <div
            className="spotify-card group animate-slide-up"
            onClick={() => playSong(song)}
        >
            <div className="relative aspect-square w-full mb-4 shadow-[0_12px_32px_rgba(0,0,0,0.6)] bg-spotify-grey rounded-md overflow-hidden">
                {/* Subtle shine reflection overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none"></div>

                <img
                    src={song.thumbnail || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop'}
                    alt={song.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />

                <div className={`play-btn-overlay ${isCurrent && isPlaying ? 'opacity-100 translate-y-0 scale-100' : 'scale-90 group-hover:scale-100'} !shadow-spotify-green/30`}>
                    <button
                        onClick={handlePlay}
                        className="w-full h-full flex items-center justify-center p-0"
                    >
                        {isCurrent && isPlaying ? <Pause fill="black" size={28} /> : <Play fill="black" size={28} className="ml-1" />}
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-1 pr-1 relative z-20">
                <h3 className={`font-black truncate text-[16px] tracking-tight transition-colors ${isCurrent ? 'text-spotify-green' : 'text-white'}`}>
                    {song.title}
                </h3>
                <p className="text-[13px] text-subdued line-clamp-2 font-bold leading-tight group-hover:text-white/80 transition-colors">
                    {song.description || 'Spotify Exclusive Mastered Audio'}
                </p>
            </div>
        </div>
    );
}
