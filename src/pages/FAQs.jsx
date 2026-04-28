import React, { useState, useEffect } from "react";
import PageBanner from "../components/PageBanner";
import Accordion from "react-bootstrap/Accordion";
import "./FAQs.css";

const FAQs = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const faqCategories = [
        "All",
        "General",
        "Admission",
        "Scholarship Card",
        "Laptop Scheme",
        "Solar Scheme",
        "Taleem Finance",
        "Support"
    ];

    const faqData = [
        {
            category: "General",
            question: "What is the Digikhyber Program?",
            answer: "Digikhyber initiative Supported by the Minister of School & Higher Education Rana Sikandar Hayat that offers free Advanced IT Courses, Laptop Scheme, Solar Scheme, Study Abroad Consultancy, Taleem Finance under the Scholarship Card to empower the youth of Punjab under the policy of Digikhyber."
        },
        {
            category: "General",
            question: "Who can apply for the program?",
            answer: "Anyone who: is a resident of Punjab or Pakistani, has a valid CNIC or B-Form, and meets the basic education criteria of the selected course. There is no age limit required."
        },
        {
            category: "Admission",
            question: "Is there any fee for the courses?",
            answer: "All the courses under Digikhyber are completely free of cost. Only processing charges will be paid by students & will be reimbursed after the completion of final evaluation test according to the policy of Digikhyber."
        },
        {
            category: "Admission",
            question: "How do I apply?",
            answer: "You can apply online at the official portal: www.digikhyber.org.pk"
        },
        {
            category: "Support",
            question: "Will I get a certificate after completing the course?",
            answer: "After successful completion, you'll get an authorized e-certification by Digikhyber which will be verifiable online on our website. Furthermore, you'll be able to join our Internships based on your performance & other benefits."
        },
        {
            category: "Scholarship Card",
            question: "What is the Scholarship Card?",
            answer: "Digikhyber is introducing a merit-based Scholarship Card to encourage and reward outstanding students. Students who achieve a minimum of 85% marks will be eligible for the card, opening doors to high-value rewards like laptops, solar panels, and e-bikes."
        },
        {
            category: "Scholarship Card",
            question: "Who is eligible to receive the Scholarship Card?",
            answer: "Students who successfully complete their enrolled IT training courses under the Digikhyber program and achieve at least 85% marks will be eligible to receive the merit-based Scholarship Card."
        },
        {
            category: "Scholarship Card",
            question: "What benefits does the Scholarship Card offer?",
            answer: "Benefits include: Eligibility for Laptop Scheme, Solar Scheme, Taleem Finance, Taleem Abroad, access to upcoming advanced courses, and internship/job placement opportunities."
        },
        {
            category: "Laptop Scheme",
            question: "What is the Digikhyber Laptop Scheme?",
            answer: "A merit-based reward program designed to empower talented students. Students scoring 85% or above in their IT training become eligible for a Scholarship Card, which qualifies them for high-value rewards like laptops."
        },
        {
            category: "Laptop Scheme",
            question: "Who is eligible to receive a laptop?",
            answer: "Trainees enrolled in specific IT/technical programs who score a minimum of 85% Marks in the Final Evaluation Test and show satisfactory performance in assignments and projects."
        },
        {
            category: "Laptop Scheme",
            question: "How will I know if I’ve been selected?",
            answer: "Selected candidates will be notified through SMS or email on their registered contact details, and announcements will be made at the training centers or official portal."
        },
        {
            category: "Laptop Scheme",
            question: "What documents are required to receive the laptop?",
            answer: "You will need: Original CNIC/B-Form, Enrollment proof, Verification of Processing Fee, and any official notification or SMS received."
        },
        {
            category: "Solar Scheme",
            question: "What is the Digikhyber Solar Scheme?",
            answer: "Part of our merit-based reward initiative for high-performing students (85%+ marks). Eligible students receive a Scholarship Card, giving them a chance to win solar panels, recognizing academic excellence and promoting clean energy."
        },
        {
            category: "Solar Scheme",
            question: "Who is eligible to receive a solar Panel?",
            answer: "Trainees must score 85% or above in the Final Evaluation Test, show satisfactory performance in projects, and ideally belong to an area with limited electricity access."
        },
        {
            category: "Solar Scheme",
            question: "How will I know if I’ve been selected for the solar scheme?",
            answer: "Selected candidates will be informed through official SMS, email, or notifications on the Digikhyber portal."
        },
        {
            category: "Taleem Finance",
            question: "What is Taleem Finance?",
            answer: "Taleem Finance is a financial support program by Digikhyber designed to assist trainees who may face financial challenges in accessing quality Higher Education."
        },
        {
            category: "Taleem Finance",
            question: "Who can apply for Taleem Finance?",
            answer: "You are eligible if you are enrolled in a Digikhyber course, belong to a low-income household, and can provide basic income and residence proof."
        },
        {
            category: "Taleem Finance",
            question: "What type of support is provided?",
            answer: "It may cover Higher Education-related expenses (Fees, Laptop, etc.) and potentially flexible loan or installment options for certain certifications."
        },
        {
            category: "Taleem Finance",
            question: "How can I apply for Taleem Finance?",
            answer: "Submit your application under Digikhyber by filling out the Taleem Finance Application Form and providing required documents (CNIC, income proof, etc.)."
        },
        {
            category: "Taleem Finance",
            question: "How will I know if my application is approved?",
            answer: "Approved candidates will be notified via SMS, email, or a direct call from the center or finance department after verification."
        },
        {
            category: "Support",
            question: "How can I contact for questions about Digikhyber?",
            answer: "Email: info@digikhyber.org.pk | Website: www.digikhyber.org.pk | Helpline: 03-111-133-053"
        }
    ];

    const filteredFAQs = faqData.filter(item => {
        const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             item.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "All" || item.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="faq-page">
            <PageBanner 
                title="FAQ Hub"
                description="Find answers to common questions about our courses, scholarship card, laptop schemes, and financial support."
            />

            <div className="container">
                {/* Category Filters */}
                <div className="faq-categories faq-reveal" style={{ animationDelay: '0.1s' }}>
                    {faqCategories.map(cat => (
                        <button 
                            key={cat}
                            className={`faq-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* FAQ Accordion */}
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        {filteredFAQs.length > 0 ? (
                            <Accordion className="faq-accordion faq-reveal" style={{ animationDelay: '0.2s' }}>
                                {filteredFAQs.map((faq, index) => (
                                    <Accordion.Item key={index} eventKey={index.toString()}>
                                        <Accordion.Header>
                                            {faq.question}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {faq.answer}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        ) : (
                            <div className="text-center py-5 faq-reveal">
                                <i className="fas fa-search-minus fa-3x mb-3 text-muted"></i>
                                <h4 className="text-muted">No questions found matching your search.</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQs;
