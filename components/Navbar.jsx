import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    ChevronLeft, ChevronRight, User,
    LogOut, Settings, ExternalLink, Bell, Crown
} from "lucide-react";

export default function Navbar() {
    const { user, setUser } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const navigate = useNavigate();

    // Handle background opacity and blur on scroll
    useEffect(() => {
        const container = document.querySelector('main > div');
        if (!container) return;

        const handleScroll = () => {
            const scroll = container.scrollTop;
            const newOpacity = Math.min(scroll / 200, 1);
            setOpacity(newOpacity);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav
            className="sticky top-0 right-0 left-0 h-16 flex items-center justify-between px-6 z-40 transition-all duration-500 shrink-0"
            style={{
                backgroundColor: `rgba(18, 18, 18, ${opacity * 0.8})`,
                backdropFilter: `blur(${opacity * 20}px)`,
                borderBottom: `1px solid rgba(255, 255, 255, ${opacity * 0.05})`
            }}
        >
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black transition-all shadow-lg"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={() => navigate(1)}
                    className="w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black transition-all shadow-lg"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            <div className="flex items-center gap-4">
                <button className="bg-white text-black text-[13px] font-black px-5 py-2 rounded-full hover:scale-105 active:scale-95 transition-all hidden md:flex items-center gap-2 shadow-xl shadow-white/5">
                    <Crown size={16} fill="black" />
                    <span>Upgrade to Premium</span>
                </button>

                <button className="bg-black/60 text-white p-2.5 rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg relative group">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-spotify-green rounded-full border-2 border-black"></span>
                </button>

                <div className="relative ml-1">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-2 bg-black/60 hover:bg-[#282828] p-1 pr-3 rounded-full transition-all group active:scale-95 shadow-lg border border-white/5"
                    >
                        <div className="w-7 h-7 bg-gradient-to-tr from-[#535353] to-[#888888] rounded-full flex items-center justify-center overflow-hidden">
                            <User size={16} className="text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-white hidden sm:block truncate max-w-[100px] group-hover:text-spotify-green transition-colors">
                            {user?.name || 'User'}
                        </span>
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 mt-3 w-56 bg-[#282828] rounded-lg shadow-[0_16px_40px_rgba(0,0,0,0.6)] py-1.5 z-50 border border-white/10 premium-glass animate-slide-up">
                            <button className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-bold text-white hover:bg-white/10 transition-all">
                                <span>Account details</span>
                                <ExternalLink size={16} className="text-subdued" />
                            </button>
                            <button className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-bold text-white hover:bg-white/10 transition-all">
                                <span>Profile</span>
                            </button>
                            <button className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-bold text-white hover:bg-white/10 transition-all">
                                <span>Settings</span>
                                <Settings size={16} className="text-subdued" />
                            </button>
                            <div className="h-[1px] bg-white/10 my-1.5 mx-1"></div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center text-left px-3.5 py-2.5 text-sm font-bold text-white hover:bg-white/10 transition-all"
                            >
                                Log out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
