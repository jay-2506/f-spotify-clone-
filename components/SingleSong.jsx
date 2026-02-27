import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Play, Pause, ChevronLeft, Calendar, Music, Disc } from "lucide-react";
import { PlayerContext } from "../context/PlayerContext";

const SingleSong = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentSong, isPlaying, playSong, togglePlay } = useContext(PlayerContext);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const res = await API.get(`/song/${id}`);
        setSong(res.data.song);
      } catch (err) {
        console.error("Failed to fetch song details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSong();
  }, [id]);

  const isCurrent = currentSong?._id === song?._id;
  const isActuallyPlaying = isCurrent && isPlaying;

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-full animate-pulse gap-6">
      <div className="w-64 h-64 bg-bg-elevated rounded-lg"></div>
      <div className="h-8 bg-bg-elevated w-48 rounded"></div>
      <div className="h-4 bg-bg-elevated w-32 rounded"></div>
    </div>
  );

  if (!song) return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-text-muted">
      <Music size={64} className="opacity-20" />
      <p>Song not found</p>
      <button onClick={() => navigate(-1)} className="text-white hover:underline">Go back</button>
    </div>
  );

  return (
    <div className="flex flex-col gap-10 fade-in py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-muted hover:text-white transition-all w-fit group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold text-sm">Back to browse</span>
      </button>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-end">
        <div className="w-80 h-80 shadow-2xl rounded-lg overflow-hidden relative group">
          <img
            src={song.thumbnail || 'https://via.placeholder.com/400'}
            alt={song.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={() => playSong(song)}
              className="w-20 h-20 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-2xl"
            >
              {isActuallyPlaying ? <Pause fill="black" size={40} /> : <Play fill="black" size={40} className="ml-2" />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-center md:text-left flex-1">
          <div className="flex items-center gap-2 text-primary font-bold text-sm justify-center md:justify-start">
            <Disc size={18} />
            <span>SONG DETAIL</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-white">{song.title}</h1>
          <div className="flex flex-col gap-2">
            <p className="text-xl text-text-muted italic">{song.description || 'No description available for this track.'}</p>
            <div className="flex items-center gap-6 text-sm text-text-muted mt-2 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Released {new Date(song.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Music size={16} />
                <span>High Quality Audio</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4 justify-center md:justify-start">
            <button
              onClick={() => playSong(song)}
              className="bg-primary text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center gap-3"
            >
              {isActuallyPlaying ? <Pause fill="black" size={24} /> : <Play fill="black" size={24} />}
              <span>{isActuallyPlaying ? 'PAUSE' : 'PLAY SONG'}</span>
            </button>
            <button className="w-14 h-14 rounded-full border border-white/10 hover:border-white/40 flex items-center justify-center text-white transition-all">
              <Plus size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Waveform Visualization Placeholder or similar could go here */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-full mt-10"></div>
    </div>
  );
};

export default SingleSong;