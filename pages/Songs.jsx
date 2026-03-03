import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/axios";
import { PlayerContext } from "../context/PlayerContext";
import { Play, Clock, Music, Heart, Share2, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Songs() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log({ songs });

    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");

    const { currentSong, isPlaying, playSong } = useContext(PlayerContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                setLoading(true);

                const res = await API.get(`/song?search=${search || ""}`);
                console.log({ res: res.data });


                // Your backend returns: { success, songs }
                setSongs(res.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, [search]); // 🔥 VERY IMPORTANT


    return (
        <div className="flex flex-col min-h-full animate-fade-in">

            {/* Header */}
            <header
                className="hero-header"
                style={{ background: "linear-gradient(to bottom, #1e3a8a, var(--spotify-dark))" }}
            >
                <div className="w-48 h-48 md:w-60 md:h-60 shadow-[0_8px_40px_rgba(0,0,0,0.5)] rounded shrink-0 bg-[#282828] flex items-center justify-center">
                    <Music size={80} className="text-subdued md:w-[100px] md:h-[100px]" />
                </div>

                <div className="flex flex-col gap-2 mb-2 flex-1 w-full overflow-hidden">
                    <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-wider">
                        {search ? "Search Results" : "Playlist"}
                    </span>

                    <h1 className="text-huge max-w-full truncate leading-tight">
                        {search ? `Results for "${search}"` : "All Tracks"}
                    </h1>

                    <div className="flex items-center justify-center md:justify-start gap-1.5 text-sm font-bold mt-2">
                        <span className="text-white/70 font-medium">
                            {songs.length} songs found
                        </span>
                    </div>
                </div>
            </header>

            {/* Action Bar */}
            <div className="px-4 md:px-8 py-4 md:py-6 flex items-center gap-6 md:gap-8 sticky top-16 z-40 bg-black/20 backdrop-blur-sm -mx-4 md:mx-0">
                <button
                    onClick={() => songs.length > 0 && playSong(songs[0], songs)}
                    className="w-12 h-12 md:w-14 md:h-14 bg-spotify-green text-black rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-2xl"
                >
                    <Play fill="black" size={24} className="ml-1 md:w-[28px] md:h-[28px]" />
                </button>

                <button className="text-subdued hover:text-white transition-all">
                    <Heart size={24} className="md:w-[28px] md:h-[28px]" />
                </button>

                <button className="text-subdued hover:text-white transition-all">
                    <Share2 size={20} className="md:w-[24px] md:h-[24px]" />
                </button>

                <button className="text-subdued hover:text-white transition-all">
                    <MoreHorizontal size={24} className="md:w-[28px] md:h-[28px]" />
                </button>
            </div>

            {/* Song Table */}
            <div className="px-4 md:px-8 pb-32">

                {loading ? (
                    [...Array(6)].map((_, i) => (
                        <div key={i} className="h-14 w-full bg-white/5 rounded-md mb-2 animate-pulse"></div>
                    ))
                ) : songs.length === 0 ? (
                    <div className="text-center text-subdued mt-10 text-lg">
                        No songs found.
                    </div>
                ) : (
                    songs.map((song, i) => {
                        const isCurrent = currentSong?._id === song._id;

                        return (
                            <div
                                key={song._id}
                                onClick={() => { navigate(`/song/${song._id}`); }}
                                className="grid grid-cols-[30px_1fr_80px] md:grid-cols-[40px_4fr_3fr_1fr] gap-2 md:gap-4 px-2 md:px-4 py-2 rounded-md hover:bg-white/10 cursor-pointer group transition-all items-center"
                            >
                                <span
                                    className={`text-xs md:text-sm font-medium ${isCurrent ? "text-spotify-green" : "text-subdued"
                                        }`}
                                >
                                    {i + 1}
                                </span>

                                <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                                    <div className="w-10 h-10 rounded overflow-hidden bg-spotify-grey shrink-0">
                                        <img
                                            src={song.thumbnail || "https://via.placeholder.com/40"}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                    </div>

                                    <span
                                        className={`font-bold truncate text-sm md:text-base ${isCurrent ? "text-spotify-green" : "text-white"
                                            }`}
                                    >
                                        {song.title}
                                    </span>
                                </div>

                                <span className="hidden md:block text-sm text-subdued truncate">
                                    {song.description || "Spotify Exclusive"}
                                </span>

                                <span className="text-xs md:text-sm text-subdued flex justify-end pr-2 md:pr-4">
                                    3:45
                                </span>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}