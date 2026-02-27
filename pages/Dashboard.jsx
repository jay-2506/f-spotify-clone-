import { useEffect, useState } from "react";
import API from "../api/axios";
import SongCard from "../components/SongCard";
import { Play } from "lucide-react";

export default function Dashboard() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const res = await API.get("/song");
                if (Array.isArray(res.data)) {
                    setSongs(res.data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSongs();
    }, []);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-6 animate-slide-up">
                <h2 className="text-xl font-bold">Something went wrong</h2>
                <p className="text-subdued">{error}</p>
                <button onClick={() => window.location.reload()} className="btn-spotify">Try Again</button>
            </div>
        );
    }

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    }

    return (
        <div className="flex flex-col gap-12 p-8 pb-32 animate-slide-up relative z-10">
            {/* Dynamic Welcome Hero Section */}
            <section>
                <h1 className="text-[40px] font-black mb-8 tracking-tighter leading-none">{greeting()}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="h-20 bg-white/5 rounded-lg skeleton"></div>
                        ))
                    ) : (
                        songs.slice(0, 6).map((song) => (
                            <div
                                key={song._id}
                                className="bg-white/5 hover:bg-white/15 transition-all duration-300 rounded-lg flex items-center gap-4 overflow-hidden group cursor-pointer border border-white/5 hover:border-white/10 shadow-lg active:scale-95"
                            >
                                <div className="w-20 h-20 shadow-2xl shrink-0">
                                    <img src={song.thumbnail || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200&auto=format&fit=crop'} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <span className="font-black text-[16px] truncate pr-2 tracking-tight">{song.title}</span>
                                <div className="ml-auto mr-4 w-12 h-12 bg-spotify-green rounded-full shadow-[0_8px_16px_rgba(29,185,84,0.3)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 text-black hover:scale-110">
                                    <Play size={24} fill="black" className="ml-1" />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Recommendations Section */}
            <section className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-[28px] font-black tracking-tighter hover:underline cursor-pointer">Recommendations for you</h2>
                        <p className="text-[14px] font-bold text-subdued mt-1">Based on your recent listening activity</p>
                    </div>
                    <span className="text-[14px] font-black text-subdued hover:text-white transition-all uppercase tracking-widest cursor-pointer pb-1">Show all</span>
                </div>
                <div className="card-grid">
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] rounded-xl skeleton"></div>
                        ))
                    ) : (
                        songs.map((song) => (
                            <SongCard key={song._id} song={song} />
                        ))
                    )}
                </div>
            </section>

            {/* Recent Favorites Section */}
            <section className="animate-slide-up" style={{ animationDelay: '400ms' }}>
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-[28px] font-black tracking-tighter hover:underline cursor-pointer">Your recent favorites</h2>
                        <p className="text-[14px] font-bold text-subdued mt-1">Tracks you've been playing lately</p>
                    </div>
                    <span className="text-[14px] font-black text-subdued hover:text-white transition-all uppercase tracking-widest cursor-pointer pb-1">Show all</span>
                </div>
                <div className="card-grid">
                    {[...songs].reverse().slice(0, 6).map((song) => (
                        <SongCard key={song._id} song={song} />
                    ))}
                </div>
            </section>
        </div>
    );
}
