import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useValues from "../Context/DataContext";
import { GrCertificate , GrCircleQuestion } from 'react-icons/gr'
import { AiOutlineClockCircle } from 'react-icons/ai'

const HomePage = () => {
  const { setPlayerName } = useValues();
  const fname = useRef();
  const lname = useRef();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("was-validated");
    if (fname.current.value.length >= 4) {
      setPlayerName(`${fname.current.value} ${lname.current.value}`);
      navigate("/quiz");
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <div className="border border-4 border-dark rounded-5 p-4">
        <h1 className="my-4 text-decoration-underline">Welcome to Quiz App</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-floating mb-4">
            <input
              ref={fname}
              className="form-control"
              required
              placeholder="Enter"
              minLength={4} 
            />
            <label>First Name</label>
            <div className="invalid-feedback fw-bold ms-1">
              Enter valid name
            </div>
          </div>
          <div className="form-floating mb-4">
            <input
              ref={lname}
              className="form-control"
              placeholder="Enter"
            />
            <label>Last Name ( Optional )</label>
          </div>
          <div className="fw-bold">
            This Quiz includes
          </div>
          <div>
            <GrCertificate /> 50% Passing Percentage
          </div>
          <div>
            <GrCircleQuestion /> Maximum 10 Questions
          </div>
          <div className="mb-4">
            <AiOutlineClockCircle /> 1 Minute Per Question
          </div>
          <button
            className="mx-auto px-5 d-block btn btn-lg btn-danger"
            type="submit"
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
