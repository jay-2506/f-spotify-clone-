import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { PlayerContext } from "../context/PlayerContext";
import { Play, Pause, Clock, Hash, Music, Heart, MoreHorizontal, Share2 } from "lucide-react";

export default function PlaylistSongs() {
  const { trackId } = useParams();
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentSong, isPlaying, playSong, pauseSong } = useContext(PlayerContext);

  // Derived dominant color placeholder for gradient
  // In a real app, this would be extracted from the image
  const dominantColor = playlist?.color || '#535353';

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const res = await API.get(`/playlist/${trackId}/songs`);
        if (Array.isArray(res.data)) {
          setSongs(res.data);
        }
        const playlistRes = await API.get(`/playlist/${trackId}`);
        setPlaylist(playlistRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylistData();
  }, [trackId]);

  const handlePlayAll = () => {
    if (songs.length > 0) {
      playSong(songs[0]);
    }
  };

  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Hero Header with Dynamic Gradient */}
      <header
        className="hero-header"
        style={{ background: `linear-gradient(to bottom, ${dominantColor}, rgba(18, 18, 18, 0.9))` }}
      >
        <div className="w-60 h-60 shadow-[0_8px_40px_rgba(0,0,0,0.5)] rounded overflow-hidden flex items-center justify-center bg-[#282828] shrink-0">
          {playlist?.coverImage || playlist?.image ? (
            <img src={playlist.coverImage || playlist.image} className="w-full h-full object-cover" alt="" />
          ) : (
            <Music size={100} className="text-subdued" />
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2 flex-1">
          <span className="text-[12px] font-bold uppercase tracking-wider">Playlist</span>
          <h1 className="text-huge max-w-[900px] truncate">
            {playlist?.name || 'Loading...'}
          </h1>
          <p className="text-sm font-medium text-white/70 max-w-[600px] mb-4 line-clamp-2">
            {playlist?.description || 'Your daily dose of fresh music, curated by Antigravity AI.'}
          </p>
          <div className="flex items-center gap-1.5 text-sm font-bold">
            <span className="hover:underline cursor-pointer">Antigravity</span>
            <span className="text-white/70">•</span>
            <span>{songs.length} songs, </span>
            <span className="text-white/70 font-medium">about 45 min</span>
          </div>
        </div>
      </header>

      {/* Action Bar */}
      <div className="px-8 py-6 flex items-center gap-8 sticky top-16 bg-[#121212]/0 z-40">
        <button
          onClick={handlePlayAll}
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
          [...Array(5)].map((_, i) => (
            <div key={i} className="h-14 w-full bg-white/5 rounded-md mb-2 animate-pulse"></div>
          ))
        ) : (
          <div className="flex flex-col">
            {songs.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-subdued gap-2 bg-white/5 rounded-xl border border-dashed border-white/10 m-4">
                <Music size={48} className="opacity-10" />
                <p className="font-bold">This playlist is empty</p>
              </div>
            ) : (
              songs.map((song, i) => {
                const isCurrent = currentSong?._id === song._id;
                return (
                  <div
                    key={song._id}
                    onClick={() => playSong(song)}
                    className="grid grid-cols-[16px_4fr_3fr_1fr] gap-4 px-4 py-2 rounded-md hover:bg-white/10 cursor-pointer group transition-all items-center"
                  >
                    <div className="flex items-center justify-center w-4">
                      {isCurrent && isPlaying ? (
                        <div className="flex gap-0.5 items-end h-3">
                          <div className="w-0.5 h-3 bg-spotify-green animate-pulse"></div>
                          <div className="w-0.5 h-2 bg-spotify-green animate-pulse delay-75"></div>
                          <div className="w-0.5 h-3 bg-spotify-green animate-pulse delay-150"></div>
                        </div>
                      ) : (
                        <span className={`text-[13px] font-medium ${isCurrent ? 'text-spotify-green' : 'text-subdued group-hover:text-white'}`}>{i + 1}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded overflow-hidden bg-spotify-grey shrink-0 shadow-lg">
                        <img src={song.thumbnail || 'https://via.placeholder.com/40'} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex flex-col truncate">
                        <span className={`font-bold text-sm truncate ${isCurrent ? 'text-spotify-green' : 'text-white'}`}>{song.title}</span>
                        <span className="text-xs text-subdued group-hover:text-white truncate font-medium">Spotify Artist</span>
                      </div>
                    </div>

                    <span className="text-sm font-medium text-subdued truncate">{song.description || 'Exclusive track'}</span>

                    <span className="text-sm font-medium text-subdued flex justify-end pr-4">3:58</span>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}