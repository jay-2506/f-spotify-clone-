import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { PlayerContext } from "../context/PlayerContext";
import { Play, Pause, Clock, Hash, Music, Heart, Share2, MoreHorizontal } from "lucide-react";

export default function Songs() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentSong, isPlaying, playSong, pauseSong } = useContext(PlayerContext);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const res = await API.get("/song");
                if (Array.isArray(res.data)) setSongs(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSongs();
    }, []);

    return (
        <div className="flex flex-col min-h-full animate-fade-in">
            {/* Table Header Section */}
            <header className="hero-header" style={{ background: 'linear-gradient(to bottom, #1e3a8a, var(--spotify-dark))' }}>
                <div className="w-60 h-60 shadow-[0_8px_40px_rgba(0,0,0,0.5)] rounded shrink-0 bg-[#282828] flex items-center justify-center">
                    <Music size={100} className="text-subdued" />
                </div>
                <div className="flex flex-col gap-2 mb-2 flex-1">
                    <span className="text-[12px] font-bold uppercase tracking-wider">Playlist</span>
                    <h1 className="text-huge max-w-[900px] truncate leading-tight">All Tracks</h1>
                    <div className="flex items-center gap-1.5 text-sm font-bold mt-2">
                        <span className="hover:underline cursor-pointer">Antigravity Official</span>
                        <span className="text-white/70">•</span>
                        <span className="text-white/70 font-medium">{songs.length} songs</span>
                    </div>
                </div>
            </header>

            {/* Action Bar */}
            <div className="px-8 py-6 flex items-center gap-8 sticky top-16 bg-[#121212]/0 z-40">
                <button
                    onClick={() => songs.length > 0 && playSong(songs[0])}
                    className="w-14 h-14 bg-spotify-green text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-100 transition-all shadow-2xl"
                >
                    <Play fill="black" size={28} className="ml-1" />
                </button>
                <button className="text-subdued hover:text-white transition-all transform hover:scale-110">
                    <Heart size={32} />
                </button>
                <button className="text-subdued hover:text-white transition-all transform hover:scale-110">
                    <Share2 size={24} />
                </button>
                <button className="text-subdued hover:text-white transition-all transform hover:scale-110">
                    <MoreHorizontal size={28} />
                </button>
            </div>

            {/* Song Table */}
            <div className="px-8 pb-32">
                <div className="grid grid-cols-[16px_4fr_3fr_1fr] gap-4 px-4 py-2 border-b border-white/5 text-[11px] font-bold text-subdued uppercase tracking-widest mb-4">
                    <span>#</span>
                    <span>Title</span>
                    <span>Description</span>
                    <span className="flex justify-end pr-4"><Clock size={16} /></span>
                </div>

                {loading ? (
                    [...Array(10)].map((_, i) => (
                        <div key={i} className="h-14 w-full bg-white/5 rounded-md mb-2 animate-pulse"></div>
                    ))
                ) : (
                    <div className="flex flex-col">
                        {songs.map((song, i) => {
                            const isCurrent = currentSong?._id === song._id;
                            return (
                                <div
                                    key={song._id}
                                    onClick={() => playSong(song)}
                                    className="grid grid-cols-[16px_4fr_3fr_1fr] gap-4 px-4 py-2 rounded-md hover:bg-white/10 cursor-pointer group transition-all items-center"
                                >
                                    <div className="flex items-center justify-center w-4 text-center">
                                        {isCurrent && isPlaying ? (
                                            <div className="flex gap-0.5 items-end h-3">
                                                <div className="w-0.5 h-3 bg-spotify-green animate-pulse"></div>
                                                <div className="w-0.5 h-2 bg-spotify-green animate-pulse delay-75"></div>
                                                <div className="w-0.5 h-3 bg-spotify-green animate-pulse delay-150"></div>
                                            </div>
                                        ) : (
                                            <span className={`text-[13px] font-medium ${isCurrent ? 'text-spotify-green' : 'text-subdued group-hover:text-white'}`}>
                                                {i + 1}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-10 h-10 rounded shrink-0 overflow-hidden bg-spotify-grey shadow-lg">
                                            <img src={song.thumbnail || 'https://via.placeholder.com/40'} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <div className="flex flex-col truncate">
                                            <span className={`font-bold text-sm truncate ${isCurrent ? 'text-spotify-green' : 'text-white'}`}>{song.title}</span>
                                            <span className="text-xs text-subdued group-hover:text-white truncate font-medium">Original Mix</span>
                                        </div>
                                    </div>

                                    <span className="text-sm font-medium text-subdued truncate">{song.description || 'Spotify Exclusive'}</span>

                                    <span className="text-sm font-medium text-subdued flex justify-end pr-4">3:45</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}