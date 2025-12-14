import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3001/admin/login", {
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
        <div className="login-container" style={{ maxWidth: "400px", margin: "3rem auto" }}>
            <h2>Admin Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={login}>
                <div style={{ position: "relative" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "10px 40px 10px 10px",
                            fontSize: "1rem",
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "1.2rem",
                        }}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>

                <button
                    type="submit"
                    style={{
                        marginTop: "1rem",
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;
