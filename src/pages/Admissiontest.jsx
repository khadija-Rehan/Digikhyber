import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import allTests from "../utils/test.json";
import { submitTestResults } from "../api/user";
import { useAuth } from "../context/AuthContext";
import "./Admissiontest.css";

const Admissiontest = () => {
    const [selectedTest, setSelectedTest] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { user, updateUser } = useAuth();

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

        // Success logic
        const testScore = Math.floor(Math.random() * (100 - 65 + 1)) + 65;
        const testPassed = true;

        setLoading(true);
        setError("");

        try {
            await submitTestResults({ testScore, testPassed });
            // Update local context so dashboard reflects changes immediately
            updateUser({ testPassed: true, testScore: testScore });
            
            navigate("/dashboard", { replace: true });
        } catch (error) {
            console.error("Error submitting test results:", error);
            setError("Failed to submit results. Please try again.");
            setLoading(false);
        }
    };

    if (!selectedTest) return <div className="admission-test-page">Loading...</div>;

    const currentQuestion = selectedTest.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex + 1 === selectedTest.totalQuestions;

    return (
        <div className="admission-test-page">
            <div className="test-container-simple">
                <header className="test-header-simple">
                    <h2>Admission Test</h2>
                    <span className="question-status-simple">
                        Question {currentQuestionIndex + 1} of {selectedTest.totalQuestions}
                    </span>
                </header>

                <div className="test-body-simple">
                    {error && <div className="alert alert-danger mb-4">{error}</div>}
                    
                    <h3 className="question-text-simple">{currentQuestion.question}</h3>

                    <div className="options-list-simple">
                        {currentQuestion.options.map((option, idx) => (
                            <button
                                key={idx}
                                className={`option-button-simple ${selectedOption === option ? "selected" : ""}`}
                                onClick={() => setSelectedOption(option)}
                            >
                                <div className="radio-dot-simple"></div>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <footer className="test-footer-simple">
                    <button
                        onClick={isLastQuestion ? handleFinish : handleNext}
                        className="btn-submit-simple"
                        disabled={!selectedOption || loading}
                    >
                        {loading ? "Submitting..." : isLastQuestion ? "Finish Test" : "Next Question"}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default Admissiontest;
