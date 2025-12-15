import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminPages.css";

function AdminLogin() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        const res = await fetch(process.env.PUBLIC_URL+'/admin/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                username: "admin",
                password: password
            }),
        });

        if (res.ok) {
            navigate("/admindashboard");
        } else {
            setError("Incorrect password");
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={login}>
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="password-input"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="toggle-password-btn"
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>

                <button type="submit" className="login-btn">
                    Login
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;
