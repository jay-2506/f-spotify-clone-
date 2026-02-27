import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { Disc, ArrowRight } from "lucide-react";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await API.post("/auth/register", form);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black bg-gradient-to-b from-[#1a1a1a] to-black p-6">
            <div className="w-full max-w-[450px] bg-black rounded-lg p-10 flex flex-col gap-8 shadow-2xl">
                <div className="flex flex-col items-center gap-2">
                    <Disc size={48} className="text-spotify-green mb-2" />
                    <h1 className="text-3xl font-black text-white italic">ANTIGRAVITY</h1>
                    <p className="text-2xl font-bold text-white mt-4 text-center">Sign up to start listening</p>
                </div>

                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-500 text-sm font-bold text-center">
                        {error}
                    </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-white pl-1">What's your name?</label>
                        <input
                            type="text"
                            placeholder="Enter a profile name"
                            required
                            className="bg-[#121212] border border-[#727272] hover:border-white focus:border-white rounded p-3 text-white transition-all outline-none"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <p className="text-[10px] text-subdued pl-1">This appears on your profile.</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-white pl-1">What's your email?</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="bg-[#121212] border border-[#727272] hover:border-white focus:border-white rounded p-3 text-white transition-all outline-none"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-white pl-1">Create a password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            required
                            className="bg-[#121212] border border-[#727272] hover:border-white focus:border-white rounded p-3 text-white transition-all outline-none"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="btn-spotify py-4 mt-6 text-base w-full flex items-center justify-center gap-2 group"
                    >
                        <span>{loading ? "Creating account..." : "Sign Up"}</span>
                        {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>

                <div className="h-[1px] bg-[#292929] w-full mt-2"></div>

                <p className="text-center text-subdued text-sm font-medium">
                    Already have an account?{" "}
                    <Link to="/login" className="text-white font-bold hover:text-spotify-green underline">
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    );
}
