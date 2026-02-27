import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Songs from "./pages/Songs";
import Playlists from "./pages/Playlists";
import ProtectedRoute from "./components/ProtectedRoute";
import PlaylistSongs from "./components/PlaylistSongs";
import SingleSong from "./components/SingleSong";
import Layout from "./components/Layout";

function AppContent() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/" element={
                    <ProtectedRoute>
                        <Layout>
                            <Dashboard />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/songs" element={
                    <ProtectedRoute>
                        <Layout>
                            <Songs />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/playlists" element={
                    <ProtectedRoute>
                        <Layout>
                            <Playlists />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/playlist/:trackId/songs" element={
                    <ProtectedRoute>
                        <Layout>
                            <PlaylistSongs />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/song/:id" element={
                    <ProtectedRoute>
                        <Layout>
                            <SingleSong />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/dashboard" element={<Navigate to="/" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter >
    );
}

function App() {
    return (
        <AuthProvider>
            <PlayerProvider>
                <AppContent />
            </PlayerProvider>
        </AuthProvider>
    );
}

export default App;
