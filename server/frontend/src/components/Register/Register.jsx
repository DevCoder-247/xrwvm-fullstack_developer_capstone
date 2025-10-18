import React, { useState } from "react";
import Header from "../Header/Header";
import "../assets/bootstrap.min.css";

const Register = () => {
  // State variables
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Redirect to home
  const gohome = () => {
    window.location.href = window.location.origin;
  };

  // Register user
  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin + "/djangoapp/register";

    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
        firstName,
        lastName,
        email,
      }),
    });

    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem("username", json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with the same username is already registered");
      window.location.href = window.location.origin;
    }
  };

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
            width: "450px",
            borderRadius: "15px",
            border: "none",
            backgroundColor: "#ffffff",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 className="fw-bold" style={{ color: "#0077b6" }}>
              Create an Account
            </h3>
            <button
              onClick={gohome}
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <hr />

          <form onSubmit={register}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
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
                Register
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary fw-semibold"
                onClick={gohome}
              >
                Cancel
              </button>
            </div>
          </form>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#00b4d8",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              Login Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
