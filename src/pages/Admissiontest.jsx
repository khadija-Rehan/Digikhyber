import React from "react";
import { Link } from "react-router-dom";

const Admissiontest = () => {
    return (
        <div>
            <div className="breadcrums">
                <h2>Admission Test</h2>
                <div className="container">
                    <div style={{ border: "1px solid #fff" }} className="p-3 mt-4">
                        <p className="white mb-0">
                            Select the correct option and click "Check" to see if your answer
                            is Correct or Incorrect.
                        </p>
                    </div>
                    <div className="test mt-5">
                        <span> 10 / 15</span>
                        <h6 className="d-flex flex-wrap flex-md-nowrap align-items-center justify-content-center gap-1 fs-4 mt-4 mb-4">
                            Question 10 :{" "}
                            <h4 className="mb-0"> Choose the correct spelling:</h4>
                        </h6>
                        <center>
                            <div className="anwsers text-">YES</div>
                        </center>
                        <center>
                            <div className="anwsers">NO</div>
                        </center>{" "}
                        <center>
                            <div className="anwsers text-">YES</div>
                        </center>
                        <center>
                            <div className="anwsers">NO</div>
                        </center>
                        <Link to={"/admission-result"}>
                            <button className="btn-green register-btn  btn btn-success rounded-2">
                                Continue
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admissiontest;
