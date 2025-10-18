import React from "react";
import "../assets/bootstrap.min.css";
import "../assets/style.css";
import { FaCarSide } from "react-icons/fa";

const Header = () => {
  const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin + "/djangoapp/logout";
    const res = await fetch(logout_url, { method: "GET" });
    const json = await res.json();

    if (json) {
      let username = sessionStorage.getItem("username");
      sessionStorage.removeItem("username");
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out " + username + "...");
    } else {
      alert("The user could not be logged out.");
    }
  };

  // Session check
  let curr_user = sessionStorage.getItem("username");

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        background: "linear-gradient(90deg, #00b4d8, #0077b6)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        padding: "0.8rem 2rem",
      }}
    >
      <div className="container-fluid">
        <h2 className="text-white fw-bold">
          <FaCarSide style={{ marginRight: "8px" }} />
          Dealerships
        </h2>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-white fw-semibold" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-semibold" href="/about">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-semibold" href="/contact">
                Contact Us
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {curr_user ? (
              <>
                <span
                  className="text-white me-3 fw-semibold"
                  style={{ fontSize: "1rem" }}
                >
                  {curr_user}
                </span>
                <button
                  onClick={logout}
                  className="btn btn-outline-light btn-sm fw-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="btn btn-light btn-sm fw-semibold text-primary"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
