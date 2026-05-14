import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { generateOnlineChallan, generatePhysicalChallan } from "../api/auth";
import { Link } from "react-router-dom";

const PAYMENT_DEADLINE = "May 31, 2026";
const FEE_AMOUNT = "PKR 3,250";

const AdmissionResult = () => {
    const { user } = useAuth();
    const [onlinePsid, setOnlinePsid] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [activePaymentMethod, setActivePaymentMethod] = useState("psid");
    const [activeSubTab, setActiveSubTab] = useState("banking");
    const [copied, setCopied] = useState(false);

    const userData = user?.user?.data?.user || user?.user || user;
    const testScore = userData?.testScore || 0;
    const totalMcqs = 20;
    const correctAnswers = Math.round((testScore / 100) * totalMcqs);
    const percentage = `${testScore}%`;
    const testId = userData?.rollNumber || `DK-${userData?._id?.substring(0, 6).toUpperCase()}`;
    const testPassed = userData?.testPassed;
    const courses = userData?.courses || [];

    useEffect(() => {
        if (userData?.psid) setOnlinePsid(userData.psid);
    }, [userData]);

    const handleGeneratePayment = async () => {
        setIsGenerating(true);
        try {
            if (activePaymentMethod === "psid") {
                const res = await generateOnlineChallan();
                if (res.data?.psid) setOnlinePsid(res.data.psid);
            } else {
                const res = await generatePhysicalChallan();
                if (res.data?.fileUrl) window.open(res.data.fileUrl, "_blank");
            }
        } catch (error) {
            console.error("Payment generation error:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(onlinePsid);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!testPassed) {
        return (
            <div className="container py-5 text-center">
                <div className="card shadow-sm border-0 p-5" style={{ borderRadius: "24px" }}>
                    <i className="fas fa-hourglass-half fa-4x text-muted opacity-50 mb-4"></i>
                    <h2 className="fw-bold">Evaluation in Progress</h2>
                    <p className="text-muted">Please complete your admission test first to view your results.</p>
                    <div className="mt-4">
                        <Link to="/admission-test" className="btn btn-success px-4 rounded-pill">Start Test Now</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "40px 0", fontFamily: "'Outfit', sans-serif" }}>
            <div className="container" style={{ maxWidth: "900px" }}>

                {/* ── 1. Congratulations Header ── */}
                <div className="text-center mb-4">
                    <img src="https://cdn-icons-png.flaticon.com/512/4704/4704478.png" alt="pass" style={{ width: 80, marginBottom: 16 }} />
                    <h2 className="fw-bold" style={{ fontSize: "1.6rem" }}>
                        Congratulations! You've Successfully Passed the Admission Test
                    </h2>
                </div>

                {/* ── 2. Congratulations Info Box ── */}
                <div style={{ background: "#e8f5ee", border: "1px solid #b2dfcc", borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
                    <p style={{ color: "#1a1a1a", marginBottom: 10, lineHeight: 1.7 }}>
                        <span style={{ color: "#0B5D3B", fontWeight: 700 }}>
                            Congratulations! You've Successfully Passed the Admission Test{" "}
                        </span>
                        We are thrilled to inform you that you have successfully cleared the Digikhyber Admission Test.
                        Now you are eligible for a Scholarship Card. To confirm your seat & proceed with your enrolled course.
                        All the courses under the Digikhyber scholarship card are 100% free, but the application processing
                        fee is necessary to complete your application. Your processing fee will be reimbursed if you achieve
                        above 85% Marks in the final evaluation test under the policy of Digikhyber.
                    </p>
                    <p style={{ color: "#0B5D3B", fontWeight: 600, marginBottom: 16 }}>
                        You're just one step away from receiving your Scholarship Card!
                    </p>

                    <p style={{ fontWeight: 700, marginBottom: 8 }}>
                        <span style={{ marginRight: 6 }}>⚡</span> Benefits of the Scholarship Card:
                    </p>
                    <ul style={{ paddingLeft: 20, marginBottom: 0, color: "#1a1a1a" }}>
                        <li>Access to Advanced IT Courses</li>
                        <li>Laptop Scheme</li>
                        <li>Solar Scheme</li>
                        <li>Access to Taleem Finance</li>
                        <li>Access to Study Abroad Free Consultancy</li>
                        <li>Hands-On Learning with Global Curriculum</li>
                        <li>Career Guidance &amp; Freelancing Support</li>
                    </ul>
                </div>

                {/* ── 3. Student Result Card Table ── */}
                <div style={{ border: "1px solid #ccc", borderRadius: 8, overflow: "hidden", marginBottom: 24 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: "#0B5D3B", color: "white" }}>
                                <th colSpan={2} style={{ padding: "14px 20px", textAlign: "center", fontWeight: 700, fontSize: "1rem" }}>
                                    Student Result Card
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { label: "Field", value: "Details", isHeader: true },
                                { label: "Student Name", value: userData?.fullName || "—" },
                                { label: "Test ID", value: testId },
                                { label: "Total MCQs", value: totalMcqs },
                                { label: "Total Marks", value: totalMcqs },
                                { label: "Marks Obtained", value: correctAnswers },
                                { label: "Percentage", value: percentage },
                            ].map((row, i) => (
                                <tr key={i} style={{ background: i % 2 === 0 ? "#c8e6c9" : "#fff" }}>
                                    <td style={{ padding: "12px 20px", fontWeight: row.isHeader ? 700 : 500, width: "45%", borderBottom: "1px solid #ddd" }}>
                                        {row.label}
                                    </td>
                                    <td style={{ padding: "12px 20px", borderBottom: "1px solid #ddd" }}>
                                        {row.value}
                                    </td>
                                </tr>
                            ))}
                            <tr style={{ background: "#fff" }}>
                                <td style={{ padding: "12px 20px", fontWeight: 500, borderBottom: "1px solid #ddd" }}>Result Status</td>
                                <td style={{ padding: "12px 20px", borderBottom: "1px solid #ddd" }}>
                                    <span style={{ background: "#0B5D3B", color: "white", padding: "4px 16px", borderRadius: 20, fontWeight: 600, fontSize: 13 }}>
                                        Pass
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ── 4. Selected Study Programs ── */}
                <div style={{ marginBottom: 24 }}>
                    <h5 style={{ fontWeight: 700, marginBottom: 8 }}>
                        <span style={{ marginRight: 6 }}>☑</span> Selected Study Programs
                    </h5>
                    <p style={{ color: "#444", fontSize: 14, marginBottom: 10 }}>
                        You can enroll in up to 2 courses at once. All courses are completely free, but a one-time application
                        processing fee of <strong>{FEE_AMOUNT}</strong> is required, regardless of the number of courses you select.
                    </p>
                    <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc", borderRadius: 8 }}>
                        <thead>
                            <tr style={{ background: "#f0f0f0" }}>
                                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700, borderBottom: "1px solid #ccc", width: "30%" }}>Form #</th>
                                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700, borderBottom: "1px solid #ccc" }}>Applied Courses</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ background: "#fff" }}>
                                <td style={{ padding: "12px 16px", borderBottom: "1px solid #eee", verticalAlign: "top" }}>
                                    {Math.floor(Math.random() * 90000) + 10000}
                                </td>
                                <td style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}>
                                    {courses.length > 0 ? (
                                        <ul style={{ margin: 0, paddingLeft: 18 }}>
                                            {courses.map((c, i) => <li key={i}>{c}</li>)}
                                        </ul>
                                    ) : (
                                        <span className="text-muted">No courses selected</span>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ── 5. Fee Deadline Banner ── */}
                <div style={{ background: "#fff8e8", border: "1px solid #f0c040", borderRadius: 8, padding: "14px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700 }}>Last Date to pay Application Processing Fee:</span>
                    <span style={{ fontWeight: 600 }}>{PAYMENT_DEADLINE}</span>
                    <span style={{ background: "#f0c040", color: "#5a3e00", padding: "3px 14px", borderRadius: 20, fontWeight: 600, fontSize: 13 }}>
                        Pending
                    </span>
                </div>

                {/* ── 6. Pay Application Fee Section ── */}
                <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, overflow: "hidden", marginBottom: 24 }}>
                    <div style={{ textAlign: "center", padding: "28px 20px 16px" }}>
                        <h4 style={{ fontWeight: 800, marginBottom: 8 }}>Pay Application Processing Fee!</h4>
                        <p style={{ color: "#555", fontSize: 14 }}>
                            Now, you're just one step away from confirming your Scholarship Card. Please follow the
                            instructions below to submit the processing fee through the given payment methods.
                        </p>
                    </div>

                    {/* Payment Options Header */}
                    <div style={{ background: "#0B5D3B", color: "white", textAlign: "center", padding: "12px", fontWeight: 700, fontSize: 15 }}>
                        Payment Options
                    </div>

                    {/* PSID / Challan Toggle */}
                    <div style={{ display: "flex", gap: 16, padding: "20px", flexWrap: "wrap" }}>
                        <div
                            onClick={() => setActivePaymentMethod("psid")}
                            style={{
                                flex: 1, minWidth: 200, border: `2px solid ${activePaymentMethod === "psid" ? "#0B5D3B" : "#ddd"}`,
                                borderRadius: 10, padding: "16px 20px", cursor: "pointer", background: activePaymentMethod === "psid" ? "#f0fff8" : "#fff",
                                display: "flex", alignItems: "center", gap: 14, transition: "all 0.2s"
                            }}
                        >
                            <div style={{ width: 44, height: 44, background: activePaymentMethod === "psid" ? "#0B5D3B" : "#f1f5f9", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <i className="fas fa-wallet" style={{ color: activePaymentMethod === "psid" ? "#fff" : "#0B5D3B", fontSize: 18 }}></i>
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 14 }}>CONSUMER NUMBER / PSID</div>
                                <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase" }}>Pay using online mobile banking or mobile wallet using 1 Biller</div>
                            </div>
                        </div>

                        <div
                            onClick={() => setActivePaymentMethod("challan")}
                            style={{
                                flex: 1, minWidth: 200, border: `2px solid ${activePaymentMethod === "challan" ? "#0B5D3B" : "#ddd"}`,
                                borderRadius: 10, padding: "16px 20px", cursor: "pointer", background: activePaymentMethod === "challan" ? "#f0fff8" : "#fff",
                                display: "flex", alignItems: "center", gap: 14, transition: "all 0.2s"
                            }}
                        >
                            <div style={{ width: 44, height: 44, background: activePaymentMethod === "challan" ? "#0B5D3B" : "#f1f5f9", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <i className="fas fa-university" style={{ color: activePaymentMethod === "challan" ? "#fff" : "#0B5D3B", fontSize: 18 }}></i>
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 14 }}>CLICK HERE FOR BANK CHALLAN</div>
                                <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase" }}>Pay at any BOP branch using Digikhyber Challan</div>
                            </div>
                        </div>
                    </div>

                    {/* ── 7. Instructions How to Pay ── */}
                    <div style={{ padding: "0 20px 24px" }}>
                        <p style={{ fontWeight: 700, marginBottom: 12 }}>Instructions How to Pay:</p>

                        {/* Sub Tabs */}
                        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                            {[
                                { key: "banking", label: "Banking App", icon: "fas fa-university" },
                                { key: "jazzcash", label: "JazzCash", icon: "fas fa-mobile-alt" },
                                { key: "easypaisa", label: "EasyPaisa", icon: "fas fa-mobile-alt" },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveSubTab(tab.key)}
                                    style={{
                                        padding: "8px 18px", border: `1px solid ${activeSubTab === tab.key ? "#0B5D3B" : "#ccc"}`,
                                        borderRadius: 6, background: activeSubTab === tab.key ? "#0B5D3B" : "#fff",
                                        color: activeSubTab === tab.key ? "#fff" : "#333",
                                        fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6
                                    }}
                                >
                                    <i className={tab.icon}></i> {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Instruction Steps */}
                        <div style={{ background: "#f9f9f9", borderRadius: 8, padding: "16px 20px", marginBottom: 20 }}>
                            <p style={{ fontWeight: 700, marginBottom: 10 }}>
                                <i className="fas fa-university" style={{ marginRight: 8 }}></i>
                                {activeSubTab === "banking" && "Banking App Payment"}
                                {activeSubTab === "jazzcash" && "JazzCash Payment"}
                                {activeSubTab === "easypaisa" && "EasyPaisa Payment"}
                            </p>
                            {activeSubTab === "banking" && (
                                <p style={{ fontSize: 13, color: "#666", marginBottom: 12 }}>(HBL, Meezan, UBL, Bank Alfalah, etc.)</p>
                            )}
                            <ol style={{ paddingLeft: 20, fontSize: 14, lineHeight: 2, margin: 0 }}>
                                {activeSubTab === "banking" && <>
                                    <li>Open your bank's mobile app</li>
                                    <li>Log in with your credentials (MPIN, fingerprint, or face ID)</li>
                                    <li>Go to "Bill Payments" or "Payments"</li>
                                    <li>Select "1Bill" (some banks list it under "Add Biller" or "Pay Bill")</li>
                                    <li>Enter the 1Bill Consumer/Invoice Number (usually 12–15 digits)</li>
                                    <li>The system will fetch and display the bill details</li>
                                    <li>Verify the name, amount, and service</li>
                                    <li>Tap "Pay" or "Confirm"</li>
                                    <li>Enter your PIN/OTP to authorize the transaction</li>
                                    <li>Receive confirmation receipt/SMS</li>
                                </>}
                                {activeSubTab === "jazzcash" && <>
                                    <li>Open the JazzCash mobile app</li>
                                    <li>Log in with your JazzCash account credentials</li>
                                    <li>Tap "Pay Bills" from the home screen</li>
                                    <li>Select "1Bill" from the biller list</li>
                                    <li>Enter your Consumer Number / PSID</li>
                                    <li>Verify the bill details displayed</li>
                                    <li>Enter your MPIN to confirm payment</li>
                                    <li>Receive SMS confirmation of your payment</li>
                                </>}
                                {activeSubTab === "easypaisa" && <>
                                    <li>Open the EasyPaisa mobile app</li>
                                    <li>Log in with your EasyPaisa account</li>
                                    <li>Tap "Bill Payments" from the main menu</li>
                                    <li>Select "1Bill" as the biller</li>
                                    <li>Enter your Consumer Number / PSID</li>
                                    <li>Review the amount and beneficiary details</li>
                                    <li>Confirm payment using your MPIN or OTP</li>
                                    <li>Save or screenshot the confirmation for your records</li>
                                </>}
                            </ol>
                        </div>

                        {/* PSID Display / Generate Button */}
                        {activePaymentMethod === "psid" && (
                            <>
                                {onlinePsid ? (
                                    <div style={{ background: "#e8f5ee", border: "1px solid #0B5D3B", borderRadius: 8, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                                        <span style={{ fontWeight: 700, color: "#0B5D3B", fontSize: 15 }}>
                                            Your PSID: <span style={{ letterSpacing: 1 }}>{onlinePsid}</span>
                                        </span>
                                        <button
                                            onClick={handleCopy}
                                            style={{ background: "transparent", border: "1px solid #0B5D3B", borderRadius: 6, padding: "5px 12px", cursor: "pointer", color: "#0B5D3B", fontWeight: 600, fontSize: 13 }}
                                        >
                                            {copied ? "Copied!" : <><i className="fas fa-copy me-1"></i> Copy</>}
                                        </button>
                                    </div>
                                ) : null}
                                <button
                                    onClick={handleGeneratePayment}
                                    disabled={isGenerating}
                                    style={{
                                        background: "#0B5D3B", color: "white", border: "none", borderRadius: 8,
                                        padding: "12px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer",
                                        display: "flex", alignItems: "center", gap: 8, opacity: isGenerating ? 0.7 : 1
                                    }}
                                >
                                    {isGenerating ? (
                                        <><span className="spinner-border spinner-border-sm"></span> Generating...</>
                                    ) : (
                                        <><i className="fas fa-download"></i> {onlinePsid ? "Re-Generate PSID" : "Generate PSID"}</>
                                    )}
                                </button>
                            </>
                        )}

                        {activePaymentMethod === "challan" && (
                            <button
                                onClick={handleGeneratePayment}
                                disabled={isGenerating}
                                style={{
                                    background: "#0B5D3B", color: "white", border: "none", borderRadius: 8,
                                    padding: "12px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer",
                                    display: "flex", alignItems: "center", gap: 8, opacity: isGenerating ? 0.7 : 1
                                }}
                            >
                                {isGenerating ? (
                                    <><span className="spinner-border spinner-border-sm"></span> Generating...</>
                                ) : (
                                    <><i className="fas fa-file-download"></i> Download Bank Challan</>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {/* Help */}
                <div className="text-center pb-4">
                    <p style={{ color: "#666", fontSize: 14 }}>
                        Need help with payment?{" "}
                        <Link to="/help" style={{ color: "#0B5D3B", fontWeight: 700 }}>Contact Support</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdmissionResult;
