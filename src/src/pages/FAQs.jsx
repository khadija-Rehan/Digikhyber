import React from "react";
import ParticleBackground from "../components/ParticleBackground";
import Accordion from "react-bootstrap/Accordion";
import View from "../assets/top-view-of-young-and-old-architects-sitting-and-w-2023-11-27-05-26-00-utc.jpg";
const FAQs = () => {
  return (
    <>
      <div className="banner">
        <ParticleBackground />
        <div className="banner-content  ">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <h1 className="font-48">FAQs</h1>
                <p className="font-18 light-grey l-h-1 weight-400">
                  Got questions? We’ve got answers! Check out our Frequently
                  Asked Questions to find what you’re looking for.
                </p>
              </div>
              <div className="col-lg-4 col-md-12">
                <img
                  src="/images/FAQ's.jpg"
                  alt="View"
                  className="w-100 banner-image"
                />
                <div className="cube"> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container faq pt-5 pb-5">
        <p className="white font-14 d-p">FAQ</p>
        <h2 className="text-center pb-5">Frequently asked questions</h2>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                What is the Hunarmand Punjab Program?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                Hunarmand Punjab initiative launched by the
                <strong>
                  {" "}
                  Education Minister Rana Sikandar Hayat Government of Punjab
                </strong>{" "}
                that offers free Advanced IT Courses, Laptop Scheme, Solar
                Scheme, Study Abroad Consultancy, Taleem Finance under the{" "}
                <strong>Scholarship Card</strong> to empower the youth of
                Punjab.
                {/* Hunarmand Punjab is a government-supported training initiative
                                under the{" "}
                                <strong>
                                    Government of Punjab Education Minister Rana Sikandar Hayat
                                </strong>{" "}
                                that offers <strong>free Courses</strong> in IT, engineering,
                                digital skills, and other trades to empower the youth of Punjab. */}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                Who can apply for the program?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                Anyone who:
                <ul>
                  <li>Is a resident of Punjab or Pakistani</li>
                  <li>
                    {/* Is aged between <strong>15 to 35 years</strong> */}
                    No Age Limit is Required
                  </li>
                  <li>Has a valid CNIC or B-Form</li>
                  <li>
                    Meets the basic education criteria of the selected course
                  </li>
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                Is there any fee for the courses?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                {/* All training under Hunarmand Punjab is{" "}
                <strong>completely free of cost.</strong> One time processing
                fee is charged per course. After enrollment you will be eligible
                for All Benefit Schemes i.e Scholarship Card, Laptop Scheme,
                Solar Scheme, Taleem Finance & Taleem Abroad. */}
                All the courses under Hunarmand Punjab Scholarship Card are
                completely free of cost. Only processing charges will be paid by
                students & will be reimbursed after the completion of final
                evaluation test according to the policy of Hunarmand Punjab.
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <div className="p-3 fw-medium">How do I apply?</div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                Apply online at:{" "}
                <a
                  href="https://www.hunarmandpunjab.pk"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.hunarmandpunjab.pk
                </a>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                Will I get a certificate after completing the course?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                After successful completion, you'll get an{" "}
                <strong>authorized e-certification</strong> which will be
                verifiable online & also will be authorized and accredited with
                Government Appreciated Institutions. Furthermore, you'll be able
                to join our{" "}
                <b> Internships & other benefits under Hunarmand Punjab </b>{" "}
                Program after completing any course.
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <div className="p-3 fw-medium">What is the Scholarship Card?</div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                The Scholarship Card is a digital or physical card issued to
                eligible trainees enrolled in Hunarmand Punjab training
                programs. It serves as proof of enrollment and may be used to
                access certain benefits.
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="6">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                Who is eligible to receive the Scholarship Card?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                Only those trainees who have successfully completed the
                registration and verification process for Hunarmand Punjab’s
                training programs.
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="7">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                What benefits does the Scholarship Card offer?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                <ul>
                  <li>Proof of active enrollment in the program</li>
                  <li>Eligible for Laptop Scheme</li>
                  <li>Eligible for Solar Scheme</li>
                  <li>Eligible for Taleem Finance</li>
                  <li>Eligible for Taleem Abroad</li>
                  <li>Upcoming Advanced Course’s access</li>
                  <li>Access to learning materials and assessments</li>
                  <li>
                    Eligibility for internship/job placement opportunities
                  </li>
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="8">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                How will I receive my Scholarship Card?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                <ul>
                  <li>Physically from their training center</li>
                  <li>Digitally via the registered email or portal login</li>
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="9">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                Is there any fee for the Scholarship Card?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                {/* No, the Scholarship Card is provided{" "}
                <b>completely free of charge</b>
                to all eligible trainees. One time processing fee is charged per
                course. After enrollment you will be eligible for All Benefit
                Schemes i.e Scholarship Card, Laptop Scheme, Solar Scheme,
                Taleem Finance & Taleem Abroad. */}
                Hunarmand Punjab <strong>Scholarship Card</strong> is completely
                free of cost to eligible trainees. Only processing charges will
                be paid by students & will be reimbursed after the completion of
                final evaluation test according to the policy of{" "}
                <strong>Hunarmand Punjab.</strong>{" "}
                Under <strong>Scholarship card</strong> students can avail
                Laptop Scheme, Solar Scheme, Taleem Finance & Taleem Abroad
                Consultancy opportunities.
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="10">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                What should I do if I lose my Scholarship Card?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                Immediately inform your training center or contact the support
                team to request a re-issuance. ID verification may be required.
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="11">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                What is the Hunarmand Punjab Laptop Scheme?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                The Laptop Scheme is an initiative by <b> Hunarmand Punjab </b>{" "}
                to provide eligible trainees with laptops to support their
                learning in IT and technical courses.
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="12">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                Who is eligible to receive a laptop?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                Trainees who:
                <ul>
                  <li>Are enrolled in specific IT or technical programs</li>
                  <li>
                    Score minimum <b> 85% Marks in Final Evaluation Test</b>
                  </li>
                  <li>
                    Show satisfactory performance in assignments, assessments &
                    Final Project
                  </li>
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="13">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                Is there any cost involved in receiving the laptop?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                Laptops are distributed <b> free of cost</b> to selected,
                eligible students who meet the criteria. One time processing fee
                is charged per course.
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="14">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                How will I know if I’ve been selected?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                Selected candidates will be notified through:
                <ul>
                  <li>SMS or email on their registered contact details</li>
                  <li>
                    Announcement at the training center or official portal
                  </li>
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="15">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                What documents are required to receive the laptop?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                You’ll need to bring:
                <ul>
                  <li>Original CNIC/B-Form</li>
                  <li>Enrollment proof</li>
                  <li>Verification of Processing Fee</li>
                  <li>Any official notification or SMS received</li>
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="16">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                What is the Hunarmand Punjab Solar Scheme?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                The Solar Scheme is a government-supported initiative by
                <b> Hunarmand Punjab </b> aimed at providing solar panels to
                eligible trainees to support their access to continuous,
                affordable electricity for learning and home use.
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="17">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                Who is eligible to receive a solar Panel?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                To qualify, a trainee must:
                <ul>
                  <li>
                    Be enrolled in a current{" "}
                    <b> Hunarmand Punjab training program</b>
                  </li>
                  <li>
                    Score minimum <b> 85% Marks in Final Evaluation Test</b>
                  </li>
                  <li>
                    Show satisfactory performance in assignments, assessments &
                    Final Project
                  </li>
                  <li>Belong to an area with limited electricity access</li>
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="18">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                Is there any cost for the solar panel?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                The solar panel is provided <b> completely free of cost </b>to
                eligible and selected trainees who meet the criteria. One time
                processing fee is charged per course.
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="19">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                How will I know if I’ve been selected for the scheme?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                Selected candidates will be informed through:
                <ul>
                  <li>Official SMS or email</li>
                  <li>Announcement at the training center</li>
                  <li>Notification on the Hunarmand Punjab portal</li>
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="20">
            <Accordion.Header>
              <div className="p-3 fw-medium">What is Taleem Finance?</div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                Taleem Finance is a financial support program by{" "}
                <b> Hunarmand Punjab </b> designed to assist trainees who may
                face financial challenges in accessing quality Higher Education.
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="21">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                Who can apply for Taleem Finance?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                You are eligible if you:
                <ul>
                  <li>Are enrolled in a Hunarmand Punjab course</li>
                  <li>Belong to a low-income household</li>
                  <li>Can provide basic income and residence proof</li>
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="22">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                What type of support is provided?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                Taleem Finance may cover:
                <ul>
                  <li>
                    Higher Education - related expenses (Fee, Laptop etc.)
                  </li>
                  <li>
                    Flexible loan or installment options for certain
                    certifications (if applicable)
                  </li>
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="23">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                Is Taleem Finance a loan or a scholarship?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                In most cases, it is a <b> scholarship or grant</b> . In some
                advanced certification programs,<b> loans</b> may be offered
                with easy repayment options.
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="24">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                How can I apply for Taleem Finance?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                You can apply by:
                <ul>
                  <li>Submit your application under Hunarmand Punjab</li>
                  <li>
                    Filling the <b> Taleem Finance Application Form</b>
                  </li>
                  <li>
                    Submitting required documents (CNIC, income proof, etc.)
                  </li>
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="25">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                How will I know if my application is approved?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                Approved candidates will be notified via:
                <ul>
                  <li>SMS or email</li>
                  <li>Direct call from the center or finance department</li>
                  <li>Verification of Processing Fee</li>
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="26">
            <Accordion.Header>
              <div className="p-3 fw-medium">
                Who can I contact for questions about Hunarmand Punjab?
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3">
                <ul>
                  <li>
                    {" "}
                    <b>Email:</b> info@hunarmandpunjab.pk
                  </li>
                  <li>
                    <b> Website:</b>{" "}
                    <a
                      href="https://www.hunarmandpunjab.pk"
                      target="_blank"
                      rel="noreferrer"
                    >
                      www.hunarmandpunjab.pk
                    </a>
                  </li>
                  <li>
                    <b>Helpline:</b> 03-111-133-053{" "}
                  </li>
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default FAQs;
