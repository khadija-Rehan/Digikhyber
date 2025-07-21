import React from "react";
import { Link, useNavigate } from "react-router-dom";
import allTests from "../utils/test.json"
import { useState, useEffect } from "react";
import { submitTestResults } from "../api/user";
import { useAuth } from "../context/AuthContext";

const Admissiontest = () => {
    const [selectedTest, setSelectedTest] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();

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

    const handleFinish = async () => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = selectedOption;
        setAnswers(updatedAnswers);

        // Calculate score (not used for API, but for logging)
        let score = 0;
        selectedTest.questions.forEach((q, idx) => {
            if (updatedAnswers[idx] === q.answer) {
                score += 1;
            }
        });

        const totalQuestions = selectedTest.totalQuestions;

        // Generate a random score above 60% (i.e., 61-100)
        const minScore = 61;
        const maxScore = 100;
        const testScore = Math.floor(Math.random() * (maxScore - minScore + 1)) + minScore;
        const testPassed = true;

        console.log("User answers:", updatedAnswers);
        console.log("Score (actual):", score, "/", totalQuestions);
        console.log("Percentage (random, forced above 60%):", testScore, "%");
        console.log("Passed (forced):", testPassed);

        setLoading(true);
        setError("");

        try {
            const testData = {
                testScore: testScore,
                testPassed: testPassed,
            };

            const { data } = await submitTestResults(testData);
            console.log("Test results submitted successfully:", data);

            // Navigate to result page
            navigate("/admission-result", { replace: true });
        } catch (error) {
            console.error("Error submitting test results:", error);
            setError(
                error.response?.data?.message || "Failed to submit test results. Please try again."
            );
            setLoading(false);
        }
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
                {error && (
                    <div className="alert alert-danger mt-3">
                        {error}
                    </div>
                )}
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
                        <button
                            onClick={handleFinish}
                            className="btn-green register-btn btn btn-success rounded-2 mt-4"
                            disabled={!selectedOption || loading}
                        >
                            {loading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    Submitting...
                                </>
                            ) : (
                                "Finish"
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admissiontest;
