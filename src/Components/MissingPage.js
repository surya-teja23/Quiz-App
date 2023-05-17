import React from "react";
import { Link } from "react-router-dom";

const MissingPage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <div className="text-center border border-dark border-4 rounded rounded-5 p-4">
        <p className="fw-bold" style={{ fontSize: "60px", margin: "0" }}>
          404
        </p>
        <h1>
          <span className="text-danger fw-bold">Oops! </span> Page not found.
        </h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link className="btn btn-danger btn-lg px-3" to="/">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default MissingPage;
