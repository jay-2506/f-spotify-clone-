import React from 'react';
import Sidebar from './Sidebar';
import MusicPlayer from './MusicPlayer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="h-screen flex flex-col bg-black text-white overflow-hidden p-[var(--panel-gap)] relative">
            {/* Eye-Catching Professional Aura Background */}
            <div className="bg-aura">
                <div className="bg-aura-blob"></div>
                <div className="bg-aura-blob-2"></div>
                <div className="bg-aura-blob-3"></div>
            </div>

            <div className="flex flex-1 gap-[var(--panel-gap)] overflow-hidden min-h-0 relative z-10">
                {/* Sidebar Panel */}
                <aside className="w-[var(--sidebar-width)] flex flex-col gap-[var(--panel-gap)] shrink-0">
                    <Sidebar />
                </aside>

                {/* Main Content Panel */}
                <main className="flex-1 spotify-panel flex flex-col relative min-w-0 bg-[#121212]/80 backdrop-blur-md">
                    <Navbar />
                    <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
                        {children}
                    </div>
                </main>
            </div>

            {/* Music Player Area - Glassmorphism */}
            <footer className="h-[calc(var(--player-height)-var(--panel-gap))] mt-[var(--panel-gap)] shrink-0 relative z-20 premium-glass rounded-[var(--panel-radius)] overflow-hidden">
                <MusicPlayer />
            </footer>
        </div>
    );
};

export default Layout;
