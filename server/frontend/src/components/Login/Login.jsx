import React, { useState } from "react";
import Header from "../Header/Header";
import "../assets/bootstrap.min.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);

  const login_url = window.location.origin + "/djangoapp/login";

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(login_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
    });

    const json = await res.json();
    if (json.status === "Authenticated") {
      sessionStorage.setItem("username", json.userName);
      setOpen(false);
    } else {
      alert("The user could not be authenticated.");
    }
  };

  if (!open) {
    window.location.href = "/";
  }

  return (
    <div>
      <Header />
      <div
        style={{
          marginTop: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          background: "#f5f8fb",
        }}
      >
        <div
          className="card p-4 shadow-lg"
          style={{
            width: "400px",
            borderRadius: "15px",
            border: "none",
            backgroundColor: "#ffffff",
          }}
        >
          <h3
            className="text-center mb-4 fw-bold"
            style={{ color: "#0077b6" }}
          >
            Login to Dealerships
          </h3>
          <form onSubmit={login}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-2 mt-4">
              <button
                type="submit"
                className="btn fw-bold text-white"
                style={{
                  background: "linear-gradient(90deg, #00b4d8, #0077b6)",
                  border: "none",
                }}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary fw-semibold"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>

          <p className="text-center mt-3">
            <a
              href="/register"
              style={{
                color: "#00b4d8",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              Register Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
