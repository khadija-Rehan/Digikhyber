import React from "react";
import { Accordion } from "react-bootstrap";
import Bank1 from "../assets/bank1.webp";
import Bank2 from "../assets/bank2.webp";
import GIF from "../assets/approved.gif";
const AdmissionResult = () => {
    return (
        <>
            <div className="container">
                <center className="pt-5">

                <img style={{width:"100px"}} src={GIF} alt={GIF} />
                </center>
                <div className="row  pb-5">
                    <h2 className="text-center">
                        Congratulations, You Passed the Admission Test!
                    </h2>
                    <div
                        class="alert alert-success mt-4"
                        style={{ color: "green", fontFamily: "Poppins" }}
                        role="alert"
                    >
                        <strong>
                            <i class="fas fa-check-circle" style={{ color: "green" }}></i>{" "}
                            Congratulations on passing the admission test!
                        </strong>{" "}
                        To confirm your seat and proceed with your course enrollment, please
                        pay the minor application processing fee. Once the application
                        processing fee is paid, your application will automatically be
                        submitted for review. Please note: All courses are 100% free, but
                        the application processing fee is necessary to complete your
                        application. If your admission is not approved, your application
                        processing fee will be refunded. نوٹ: چونکہ یہ ایک حکومت کی طرف سے
                        سپورٹ کیا گیا پروگرام ہے، یہ کورسز بالکل مفت ہیں، چاہے آپ ایک کورس
                        میں داخلہ لیں یا زیادہ سے زیادہ 3 کورسز میں۔ لیکن اپنی درخواست کو
                        پروسیس کروانے کے لیے، ایک معمولی
                        <strong>
                            application processing charges ادا کرنا ضروری ہے، جو 4500
                        </strong>{" "}
                        PKR ہیں۔
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shadow-box d-flex align-items-center justify-content-between gap-2 flex-wrap flex-md-nowrap mb-3  p-3">
                            <div>
                                <h3>Final Step: Video Guide</h3>
                                <p className="mb-0">
                                    Watch this video for detailed instructions on completing the
                                    final <br />
                                    step of your enrollment after passing the admission test.
                                </p>
                            </div>
                            <button className="btn-green btn btn-success rounded-1">
                                {" "}
                                <i className="fas fa-video"></i> Watch Video
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        boxShadow: "0 0 20px 0 rgb(62 28 131 / 10%)",
                        border: "1px solid #e9ecef",
                        borderRadius: "4px",
                    }}
                >
                    <table className="table rwd-table">
                        <thead
                            className="thead-light"
                            style={{ backgroundColor: "#004613", color: "#fff" }}
                        >
                            <tr>
                                <th
                                    className="p-3"
                                    colSpan="2"
                                    style={{
                                        textAlign: "center",
                                        color: "white",
                                        backgroundColor: "#004613",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Student Result Card
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="first-td">
                                <td data-th="Field">Field</td>
                                <td data-th="Details">Details</td>
                            </tr>
                            <tr>
                                <td data-th="Field">Student Name</td>
                                <td data-th="Details">Majid Rajpoot</td>
                            </tr>
                            <tr>
                                <td data-th="Field">Admission Test ID</td>
                                <td data-th="Details">48079</td>
                            </tr>
                            <tr>
                                <td data-th="Field">Total MCQs</td>
                                <td data-th="Details">25</td>
                            </tr>
                            <tr>
                                <td data-th="Field">Correct Answers</td>
                                <td data-th="Details">18</td>
                            </tr>
                            <tr>
                                <td data-th="Field">Incorrect Answers</td>
                                <td data-th="Details">7</td>
                            </tr>
                            <tr>
                                <td data-th="Field">Total Marks</td>
                                <td data-th="Details">25</td>
                            </tr>
                            <tr>
                                <td data-th="Field">Marks Obtained</td>
                                <td data-th="Details">18</td>
                            </tr>
                            <tr>
                                <td data-th="Field">Percentage</td>
                                <td data-th="Details">72%</td>
                            </tr>
                            <tr>
                                <td data-th="Field">Pass/Fail Status</td>
                                <td data-th="Details">
                                    <span
                                        className="btn-green p-1 px-2"
                                        style={{ fontSize: "12px" }}
                                    >
                                        Pass
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row pt-4">
                    <div className="d-flex align-items-center text-black gap-2 mb-2 ">
                        <i className="fas fa-check-square"></i>
                        <h5 className="fw-bold mb-0">Selected Study Programs</h5>
                    </div>
                    <p>
                        To edit your courses, click 'Edit.' To skip a course, select 'None'
                        in the optional courses. To add a course, choose from the available
                        options. You can enroll in up to 3 courses at once. All courses are
                        completely free, but a one-time application processing fee of PKR
                        4500 is required, regardless of the number of courses you select.
                    </p>
                    <div class="table-responsive">
                        <table class="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: "#dee2e6" }} scope="col">
                                        Form #
                                    </th>
                                    <th style={{ backgroundColor: "#dee2e6" }} scope="col">
                                        Applied Courses
                                    </th>
                                    <th style={{ backgroundColor: "#dee2e6" }} scope="col">
                                        Edit Courses
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>48079</td>
                                    <td>
                                        <ul>
                                            <li>Cross-Platform Apps with Flutter</li>
                                        </ul>
                                    </td>
                                    <td>
                                        <a
                                            href="#"
                                            data-toggle="modal"
                                            data-target="#editcourse"
                                            class="btn btn-success btn-green rounded-2 "
                                        >
                                            <i class="fas fa-edit"></i> Edit
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="d-flex align-items-center gap-1 alert alert-warning text-black">
                    <h4 className="fw-bold mb-0">
                        Last Date to pay Application Processing Fee:
                    </h4>
                    <p className="mb-0">May 23, 2025</p>
                </div>
            </div>
            <div style={{ backgroundColor: "#DDA30B", padding: "50px 0 80px" }}>
                <div className="container">
                    <div className="payment white">
                        <h2 className="text-center">Pay Application Processing Fee!</h2>
                        <p className=" white">
                            Now, you're just one step away from confirming your admission
                            seat. Please follow the instructions below to submit the
                            application fee through the given payment methods.
                        </p>
                    </div>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0" className="mb-3">
                            <Accordion.Header className="fw-bold">
                                Easily Pay Your Application Processing Fee Through Any Bank,
                                Anytime & Anywhere
                            </Accordion.Header>
                            <Accordion.Body>
                                <p>
                                    <b> Sindh Skills Development Program</b> is a Government
                                    supported program & is <b> interlinked with all banks</b>{" "}
                                    across Pakistan, enabling you to pay your Hunarmand voucher
                                    conveniently through
                                    <b> mobile applications , internet banking , or ATMs </b>.
                                    Each bank follows a slightly different process for paying the
                                    Hunarmand application processing fee using the generated
                                    PSID/Consumer Number provided below. Follow these simple steps
                                    to ensure your payment is processed smoothly:
                                </p>
                                <ul>
                                    <li>
                                        <b> Generate Your PSID/Consumer Number:</b> First, generate
                                        your PSID/Consumer Number. Once generated, it will appear
                                        below.
                                    </li>
                                    <li>
                                        <b> Copy Your Consumer Number:</b> Locate the PSID/Consumer
                                        Number displayed below and copy it.
                                    </li>
                                    <li>
                                        <b> Select Your Bank:</b> Choose your bank from the list
                                        below. A video tutorial will pop up showing step-by-step
                                        instructions on how to pay via that specific bank.
                                    </li>
                                    <li>
                                        <b> Watch the Video and Follow Instructions:</b> Carefully
                                        watch the tutorial and follow the guidelines provided.
                                    </li>
                                    <li>
                                        <b> Enter Your PSID/Consumer Number:</b> Open your banking
                                        app and navigate to the "1 Bill Invoice/Voucher" section.
                                        Paste the PSID/Consumer Number.
                                    </li>
                                    <li>
                                        <b> Confirm and Pay:</b> Your Hunarmand voucher details will be
                                        automatically fetched. Confirm the details and proceed to
                                        pay the fee.
                                    </li>
                                    <li>
                                        <b> Application Submission:</b> Once your payment is
                                        processed, your application will be sent to our team for
                                        review. You will receive an instant notification from the
                                        Hunarmand system.
                                    </li>
                                    <ul>
                                        <li>
                                            <b> If Approved:</b> You will receive your Learning Portal
                                            credentials and can start your journey with Hunarmand.
                                        </li>
                                        <li>
                                            <b> If Not Approved:</b> Your admission charges will be
                                            refunded to your account within 7 working days.
                                        </li>
                                    </ul>
                                </ul>
                                <p>
                                    <b>Important Note:</b>
                                </p>
                                <p>
                                    The application processing fee is 4500 PKR, which is a
                                    one-time charge regardless of whether you enroll in 1 course
                                    or up to 3 courses. This fee is required to process your
                                    application to the next step.
                                </p>
                                <p>
                                    All courses offered under the Hunarmand program are entirely free,
                                    with no additional charges for course materials or enrollment.
                                </p>
                                <button className="btn-green btn-success btn rounded-2">
                                    Generate PSID/Consumer Number
                                </button>
                                <div className="d-flex align-items-center banks">
                                    <div className="shadow-box">
                                        <img src={Bank1} alt={Bank1} />
                                    </div>{" "}
                                    <div className="shadow-box">
                                        <img src={Bank2} alt={Bank1} />
                                    </div>{" "}
                                    <div className="shadow-box">
                                        <img src={Bank1} alt={Bank1} />
                                    </div>{" "}
                                    <div className="shadow-box">
                                        <img src={Bank2} alt={Bank1} />
                                    </div>{" "}
                                    <div className="shadow-box">
                                        <img src={Bank1} alt={Bank1} />
                                    </div>{" "}
                                    <div className="shadow-box">
                                        <img src={Bank2} alt={Bank1} />
                                    </div>{" "}
                                    <div className="shadow-box">
                                        <img src={Bank1} alt={Bank1} />
                                    </div>{" "}
                                    <div className="shadow-box">
                                        <img src={Bank2} alt={Bank1} />
                                    </div>{" "}
                                </div>
                                <div className="alert alert-success mt-4 border">
                                    <b> Note: </b>After paying your Hunarmand application processing
                                    fee, no further action is required. Please allow up to 30
                                    minutes for processing. Within this period, you should receive
                                    a confirmation email. If you do not receive the confirmation
                                    within 30 minutes , click on the below Check Status button to
                                    resolve the issue. If the confirmation is still not available,
                                    contact our support team at admissions@Hunarmand.pk for any kind of
                                    assistance.
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                                <p className="fw-bold">Instructions:</p>
                                <p>
                                    Hunarmand also provides the option to deposit your application
                                    processing fee conveniently via Bank Challan. This method is
                                    simple and accessible for all applicants across Pakistan.
                                    Follow the steps below to deposit your application processing
                                    fee using a Bank Challan:
                                </p>
                                <ul>
                                    <li>
                                        <strong>Download & Print the Challan Form:</strong> Download
                                        the challan form provided below and take a printed copy with
                                        you.
                                    </li>
                                    <li>
                                        <strong>Visit Any Branch from the Listed Banks:</strong>{" "}
                                        Take the printed challan to any branch of the following
                                        banks:
                                        <ul>
                                            <li>Meezan Bank</li>
                                            <li>Askari Bank</li>
                                            <li>MCB</li>
                                            <li>Bank Alfalah</li>
                                            <li>Standard Chartered</li>
                                            <li>Silk Bank</li>
                                            <li>UBL</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>Deposit the Challan:</strong> Submit the challan at
                                        the bank counter and deposit your application processing
                                        fee.
                                    </li>
                                    <li>
                                        <strong>Notification of Payment:</strong> Once your
                                        application processing fee is deposited, you will receive an
                                        instant notification confirming the application processing
                                        fee from Hunarmand Initiative.
                                    </li>
                                    <li>
                                        <strong>Application Status:</strong>
                                        <ul>
                                            <li>
                                                <strong>Within 24 Hours:</strong> Your Learning Portal
                                                credentials and class details will be shared with you if
                                                your application is approved.
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <button className="btn-green btn-success btn rounded-2">
                                    <i className="fas fa-download"></i> Download Bank Challan
                                </button>

                                <div className="alert alert-success mt-4 border">
                                    <b> Note: </b>After paying your Hunarmand application processing
                                    fee, you don’t need to do anything further. Please allow up to
                                    30 minutes for processing. Within this period, you should
                                    receive a confirmation email. If you do not receive the
                                    confirmation within 30 minutes , click on the below Check
                                    Status button to resolve the issue. If the confirmation is
                                    still not available, contact our support team at
                                    admissions@Hunarmand.pk for any kind of assistance.
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </>
    );
};

export default AdmissionResult;
