import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Plus, ArrowRight, Heart, ListMusic, Sparkles } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="flex flex-col h-full gap-2 relative z-10">
            {/* Search/Home Navigation Panel - Semi Glass */}
            <nav className="spotify-panel flex flex-col p-4 py-3 shrink-0 bg-[#121212]/70 backdrop-blur-xl border border-white/5">
                <NavLink
                    to="/"
                    className={({ isActive }) => `flex items-center gap-4 px-3 py-3 rounded-md font-black transition-all duration-300 ${isActive ? 'text-white bg-white/5 shadow-inner' : 'text-subdued hover:text-white hover:bg-white/5'}`}
                >
                    {({ isActive }) => (
                        <>
                            <Home size={24} strokeWidth={isActive ? 3 : 2} className={isActive ? 'text-spotify-green' : ''} />
                            <span className="text-[15px]">Home</span>
                        </>
                    )}
                </NavLink>
                <NavLink
                    to="/songs"
                    className={({ isActive }) => `flex items-center gap-4 px-3 py-3 rounded-md font-black transition-all duration-300 ${isActive ? 'text-white bg-white/5 shadow-inner' : 'text-subdued hover:text-white hover:bg-white/5'}`}
                >
                    {({ isActive }) => (
                        <>
                            <Search size={24} strokeWidth={isActive ? 3 : 2} className={isActive ? 'text-spotify-green' : ''} />
                            <span className="text-[15px]">Search</span>
                        </>
                    )}
                </NavLink>
            </nav>

            {/* Library Panel - Premium Glass */}
            <div className="spotify-panel flex-1 flex flex-col min-h-0 bg-[#121212]/70 backdrop-blur-xl border border-white/5">
                <header className="p-4 py-4 flex items-center justify-between">
                    <button className="flex items-center gap-3 text-subdued hover:text-white transition-all font-black group">
                        <Library size={24} className="group-hover:rotate-6 transition-transform" />
                        <span className="text-[16px] tracking-tight">Your Library</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <button className="text-subdued hover:text-white hover:bg-white/10 p-2 rounded-full transition-all active:scale-90">
                            <Plus size={20} />
                        </button>
                        <button className="text-subdued hover:text-white hover:bg-white/10 p-2 rounded-full transition-all active:scale-90">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </header>

                {/* Filters - Visual Chips */}
                <div className="flex gap-2 px-4 pb-3 mb-1 overflow-x-auto no-scrollbar scroll-smooth">
                    <button className="bg-white/10 hover:bg-white/20 text-white text-[12px] font-black px-4 py-1.5 rounded-full transition-all shrink-0 border border-white/5">Playlists</button>
                    <button className="bg-white/5 hover:bg-white/10 text-white/70 text-[12px] font-black px-4 py-1.5 rounded-full transition-all shrink-0 border border-white/5">Artists</button>
                    <button className="bg-white/5 hover:bg-white/10 text-white/70 text-[12px] font-black px-4 py-1.5 rounded-full transition-all shrink-0 border border-white/5">Albums</button>
                </div>

                {/* Library Items Area */}
                <div className="flex-1 overflow-y-auto px-2 pb-2 custom-scrollbar">
                    <div className="flex flex-col gap-1">
                        {/* AI Generated Recommendation - Eye Catching */}
                        <div className="mx-2 p-4 bg-gradient-to-br from-spotify-green/20 to-indigo-900/40 rounded-xl mb-4 border border-white/10 relative overflow-hidden group/ai">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles size={14} className="text-spotify-green animate-pulse" />
                                    <span className="text-[10px] font-black tracking-widest uppercase text-spotify-green">Recommended for you</span>
                                </div>
                                <h4 className="text-[14px] font-black text-white leading-tight mb-2">Create your first AI mix</h4>
                                <button className="bg-white text-black text-[12px] font-black px-4 py-1.5 rounded-full hover:scale-105 transition-all">Enable AI</button>
                            </div>
                            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-spotify-green/20 blur-2xl rounded-full group-hover/ai:scale-150 transition-transform duration-700"></div>
                        </div>

                        {/* Liked Songs */}
                        <NavLink
                            to="/playlists"
                            className={({ isActive }) => `flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 group transition-all duration-300 ${isActive ? 'bg-white/10' : ''}`}
                        >
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-emerald-400 rounded-md flex items-center justify-center text-white shadow-xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500">
                                <Heart fill="white" size={20} />
                            </div>
                            <div className="flex flex-col truncate">
                                <span className="font-black text-[14px] text-white truncate transition-colors group-hover:text-spotify-green tracking-tight">Liked Songs</span>
                                <span className="text-[12px] text-subdued font-bold truncate">Playlist • 12 tracks</span>
                            </div>
                        </NavLink>

                        {/* Daily Mix */}
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 group transition-all cursor-pointer">
                            <div className="w-12 h-12 bg-spotify-grey rounded-md overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-lg">
                                <img src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="flex flex-col truncate">
                                <span className="font-black text-[14px] text-white truncate group-hover:text-spotify-green transition-colors tracking-tight">Your Daily Mix</span>
                                <span className="text-[12px] text-subdued font-bold truncate">Playlist • Made for you</span>
                            </div>
                        </div>

                        {/* Discover Weekly */}
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 group transition-all cursor-pointer">
                            <div className="w-12 h-12 bg-spotify-grey rounded-md overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-lg">
                                <img src="https://images.unsplash.com/photo-1514525253361-bee8718a342b?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="flex flex-col truncate">
                                <span className="font-black text-[14px] text-white truncate group-hover:text-spotify-green transition-colors tracking-tight">Discover Weekly</span>
                                <span className="text-[12px] text-subdued font-bold truncate">Playlist • 40 tracks</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
