import React from "react";
import { Link } from "react-router-dom";
import allTests from "../utils/test.json"
import { useState, useEffect } from "react";

const Admissiontest = () => {
    const [selectedTest, setSelectedTest] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        const randomTest = allTests[Math.floor(Math.random() * allTests.length)];
        setSelectedTest(randomTest);
    }, []);

    const handleNext = () => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = selectedOption;
        setAnswers(updatedAnswers);
        setSelectedOption("");
        setCurrentQuestionIndex((prev) => prev + 1);
    };

    const handleFinish = () => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = selectedOption;
        setAnswers(updatedAnswers);
    
        // Calculate score
        let score = 0;
        selectedTest.questions.forEach((q, idx) => {
            if (updatedAnswers[idx] === q.answer) {
                score += 1;
            }
        });
    
        console.log("User answers:", updatedAnswers);
        console.log("Score:", score, "/ 20");
    
        setSelectedTest(null); // Optional: Clear test if needed
    };
    

    if (!selectedTest) return <div>Loading test...</div>;

    const currentQuestion = selectedTest.questions[currentQuestionIndex];

    return (
        <div className="breadcrums">
            <h2>Admission Test</h2>
            <div className="container">
                <div style={{ border: "1px solid #fff" }} className="p-3 mt-4">
                    <p className="white mb-0">
                        Select the correct option and click "Next" to proceed.
                    </p>
                </div>
                <div className="test mt-5">
                    <span>
                        {currentQuestionIndex + 1} / {selectedTest.totalQuestions}
                    </span>
                    <h6 className="d-flex flex-wrap flex-md-nowrap align-items-center justify-content-center gap-1 fs-4 mt-4 mb-4">
                        Question {currentQuestionIndex + 1}: <h4 className="mb-0">{currentQuestion.question}</h4>
                    </h6>
                    {currentQuestion.options.map((option, idx) => (
                        <center key={idx}>
                            <div
                                className={`anwsers ${selectedOption === option ? "selected" : ""}`}
                                onClick={() => setSelectedOption(option)}
                                style={{
                                    cursor: "pointer",
                                    backgroundColor:
                                        selectedOption === option ? "#cce5ff" : "#fff",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    margin: "5px",
                                    width: "60%",
                                }}
                            >
                                {option}
                            </div>
                        </center>
                    ))}

                    {currentQuestionIndex + 1 < selectedTest.totalQuestions ? (
                        <button
                            onClick={handleNext}
                            className="btn btn-success mt-4"
                            disabled={!selectedOption}
                        >
                            Next
                        </button>
                    ) : (
                        <Link to="/admission-result">
                            <button
                                onClick={handleFinish}
                                className="btn-green register-btn btn btn-success rounded-2 mt-4"
                                disabled={!selectedOption}
                            >
                                Finish
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admissiontest;
