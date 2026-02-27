import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Music, Plus, Play } from "lucide-react";

export default function Playlists() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const res = await API.get("/playlist");
                if (Array.isArray(res.data)) {
                    setPlaylists(res.data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPlaylists();
    }, []);

    const handleCreatePlaylist = async () => {
        const name = prompt("Enter a name for your new playlist:");
        if (!name) return;
        try {
            const res = await API.post("/playlist/create", { name });
            setPlaylists([...playlists, res.data]);
        } catch (err) {
            console.error(err);
        }
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-6">
                <h2 className="text-xl font-bold">Failed to load playlists</h2>
                <p className="text-subdued">{error}</p>
                <button onClick={() => window.location.reload()} className="btn-spotify">Refresh</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col p-6 pb-24">
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Your Playlists</h1>
                <button
                    onClick={handleCreatePlaylist}
                    className="btn-spotify"
                >
                    Create Playlist
                </button>
            </header>

            <div className="card-grid">
                {loading ? (
                    [...Array(6)].map((_, i) => (
                        <div key={i} className="aspect-[3/4] bg-white/5 rounded-lg animate-pulse"></div>
                    ))
                ) : (
                    playlists?.map((p) => (
                        <div
                            key={p._id}
                            onClick={() => navigate(`/playlist/${p._id}/songs`)}
                            className="spotify-card group"
                        >
                            <div className="relative aspect-square w-full mb-4 shadow-2xl">
                                {p.image || p.coverImage ? (
                                    <img src={p.image || p.coverImage} alt={p.name} className="w-full h-full object-cover rounded-md" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[#282828] rounded-md">
                                        <Music size={60} className="text-subdued" />
                                    </div>
                                )}
                                <div className="play-btn-overlay">
                                    <Play fill="black" size={24} className="ml-1" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 pr-2">
                                <span className="font-bold truncate text-sm text-white">{p.name}</span>
                                <span className="text-sm font-medium text-subdued line-clamp-2">Playlist • {p.tracks?.length || 0} songs</span>
                            </div>
                        </div>
                    ))
                )}

                {/* Empty State */}
                {!loading && playlists?.length === 0 && (
                    <div className="col-span-full py-32 flex flex-col items-center justify-center text-subdued gap-6">
                        <Music size={64} className="opacity-20" />
                        <div className="flex flex-col items-center gap-1">
                            <p className="text-xl font-bold text-white">Create your first playlist</p>
                            <p className="text-sm">It's easy, we'll help you.</p>
                        </div>
                        <button
                            onClick={handleCreatePlaylist}
                            className="bg-white text-black font-bold px-6 py-2.5 rounded-full hover:scale-105 transition-all"
                        >
                            Create playlist
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}