import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import { Disc, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await API.post("/login", form).then(() => {

                setUser(res.data.user);
                localStorage.setItem("user", JSON.stringify(res.data.user));
            })
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials. Please try again.");
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
                    <p className="text-2xl font-bold text-white mt-4">Log in to continue</p>
                </div>

                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-500 text-sm font-bold text-center">
                        {error}
                    </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-white pl-1">Email or username</label>
                        <input
                            type="email"
                            placeholder="Email or username"
                            required
                            className="bg-[#121212] border border-[#727272] hover:border-white focus:border-white rounded p-3 text-white transition-all outline-none"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-white pl-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                required
                                className="w-full bg-[#121212] border border-[#727272] hover:border-white focus:border-white rounded p-3 text-white transition-all outline-none"
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-subdued hover:text-white p-1"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="btn-spotify py-4 mt-6 text-base w-full flex items-center justify-center gap-2 group"
                    >
                        <span>{loading ? "Logging in..." : "Log In"}</span>
                        {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>

                <div className="h-[1px] bg-[#292929] w-full mt-2"></div>

                <p className="text-center text-subdued text-sm font-medium">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-white font-bold hover:text-spotify-green underline">
                        Sign up for Antigravity
                    </Link>
                </p>
            </div>
        </div>
    );
}
