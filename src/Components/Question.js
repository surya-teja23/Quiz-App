import React , { useState , useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Parser from "html-react-parser";
import useValues from "../Context/DataContext";

const Question = () => {
  const navigate = useNavigate()
  const { questions , time , setTime } = useValues()
  const { id } = useParams();
  const [choice, setChoice] = useState('')
  let { question, options } = questions.find((question) => question.id === Number(id));

  function handleToggle(e) {
    if (e.target.checked) {
      let questionSelected = questions.find((question) => question.id === Number(id));
      questionSelected.optionSelected = e.target.value;
      setChoice(e.target.value)
    }
    console.log(questions);
  }

  useEffect ( () => {
    setChoice("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [id])

  useEffect(() => {
    if (time) {
      let timer = setInterval(() => setTime(time - 1), 1000);

      return () => clearInterval(timer);
    } else navigate("/score");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <>
      <div
        className="position-relative d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "100vh", minWidth: "100vw" }}
      >
        <div className="border border-dark rounded-3 p-2 fs-5 text-bg-dark position-absolute top-0 end-0 mt-4 me-5">
          {Math.floor(time / 60) < 10
            ? `0${Math.floor(time / 60)}`
            : Math.floor(time / 60)}
          &nbsp; :&nbsp;&nbsp;
          {time - Math.floor(time / 60) * 60 < 10
            ? `0${time - Math.floor(time / 60) * 60}`
            : time - Math.floor(time / 60) * 60}
        </div>
        <div
          style={{ width: "min(80vw,750px)" }}
          className="border border-2 p-4 border-dark rounded-4"
        >
          <div
            style={{ backgroundColor: "rgb(5,27,51)" }}
            className="d-flex mb-4 fs-4 text-white rounded-4 p-2 mt-3"
          >
            <div className="fw-bold">{id} )&nbsp;&nbsp;</div>
            <div style={{ flex: 1, textAlign: "justify" }}>
              {Parser(question)}
            </div>
          </div>
          <div className="container">
            <div className="row">
              {options.map((option) => {
                return (
                  <div className="col-md-6 col-12 my-2">
                    <input
                      type="radio"
                      className="btn-check"
                      name={question}
                      id={option}
                      value={option}
                      onChange={handleToggle}
                      autoComplete="on"
                      checked=""
                    />
                    <label
                      className={`${
                        choice === option ? "active" : ""
                      } w-100 fs-5 fw-bolder rounded-4 ps-4 border border-2 border-dark text-start btn btn-outline-dark`}
                      htmlFor={option}
                    >
                      {Parser(option)}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4">
            {Number(id) === questions.length ? (
              <Link
                to="/score"
                className={`btn btn-danger btn-lg ms-auto me-5 ${
                  choice ? "" : "disabled"
                }`}
              >
                Finish Quiz
              </Link>
            ) : (
              <Link
                to={`/question/${Number(id) + 1}`}
                className={`btn btn-danger btn-lg ms-auto me-5 ${
                  choice ? "" : "disabled"
                }`}
              >
                Next
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
