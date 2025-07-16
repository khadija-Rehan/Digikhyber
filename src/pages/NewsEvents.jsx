import React, { useState } from "react";
import News from "../assets/news.png";
import ParticleBackground from "../components/ParticleBackground";
import NewsModal from "../components/NewsModal";

const NewsEvents = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const newsData = [
    {
      id: 1,
      title: "🎉 Inauguration of Hunarmand Punjab",
      videoUrl: "https://www.youtube.com/embed/NC4ExcWTkOE",
      shortDescription:
        "Hunarmand Punjab was officially inaugurated by Rana Sikandar Hayat, Minister for School & Higher Education, marking a major milestone in Pakistan's digital transformation.",
      fullDescription: `Hunarmand Punjab was officially inaugurated by Rana Sikandar Hayat, Minister for School & Higher Education, marking a major milestone in Pakistan’s digital transformation.
          The program aims to equip 500,000 students with free, government-backed IT courses and skill-based training.
          Students will also benefit from the Scholarship Card, Laptop Scheme, and other support initiatives.
          This visionary step opens doors to modern careers and empowers youth across Punjab.
          💻 Join the movement and become part of Pakistan’s digital future!`,
    },
    {
      id: 2,
      title:
        "Inauguration of Hunarmand Punjab by Minister of School & Higher Education Rana Sikanadar Hayat",
      videoUrl: "https://www.youtube.com/embed/Ss0cuzczCMM",
      shortDescription:
        "We proudly announce the official launch of Hunarmand Punjab, inaugurated by Rana Sikandar Hayat, Minister for School & Higher Education, Punjab.",
      fullDescription: `🎉 Inauguration of Hunarmand Punjab
We proudly announce the official launch of Hunarmand Punjab, inaugurated by Rana Sikandar Hayat, Minister for School & Higher Education, Punjab.
This historic initiative aims to empower 500,000+ youth with free IT courses, modern skills, and digital tools for a brighter future.
From Cyber Security, Artificial Intelligence to Web Development, the program is designed to meet the needs of Pakistan's growing tech industry.
Students will also benefit from Scholarship Cards, Laptop & Solar Schemes, and Taleem Finance.
💡 A new era of digital learning and youth empowerment begins now!
Be a part of the largest skill development movement in Pakistan.`,
    },
    {
      id: 3,
      title: "1st Time in Pakistan Launching Laptop Scheme",
      videoUrl: "https://www.youtube.com/embed/49Xr-WHgGGA",
      shortDescription:
        "In a groundbreaking move, we're providing free laptops to talented students through the Hunarmand Punjab Scholarship Card.",
      fullDescription: `💻 1st Time in Pakistan – Launching the Laptop Scheme under Hunarmand Punjab!
In a groundbreaking move, we're providing free laptops to talented students through the Hunarmand Punjab Scholarship Card.
Empowering youth with digital tools to support online learning, freelancing, and IT skill development.
🎓 Enroll in eligible IT courses and get a chance to receive a laptop – absolutely free!
Limited slots available – apply today and step into your digital future.
📢 Pakistan's digital transformation begins with you!`,
    },
    {
      id: 4,
      title: "Launching Scholarship Card (Only 50,000 Available)",
      videoUrl: "https://www.youtube.com/embed/MwaXTW0_jc8",
      shortDescription:
        "We're excited to announce the official launch of the Scholarship Card. Only 50,000 cards available for the first phase.",
      fullDescription: `🎉 Launching the Hunarmand Punjab Scholarship Card! 💳
We're excited to announce the official launch of the Scholarship Card.
Only 50,000 cards available for the first phase – apply now before seats run out!
Unlock access to premium benefits: Free IT courses, Laptop & Solar Schemes, Taleem Finance, and more.
This is a limited-time opportunity to learn high-demand digital skills with zero cost.
Eligible for up to 2 professional IT courses, fully funded under the Ministry of School & Higher Education.
Apply today and take the first step toward a brighter, skill-powered future!`,
    },
    {
      id: 5,
      title:
        "500,000 Free IT Courses under the Ministry of School & Higher Education Rana Sikanadar Hayat",
      videoUrl: "https://www.youtube.com/embed/Prb2SI-2wtQ",
      shortDescription:
        "Offered under the visionary leadership of Rana Sikandar Hayat, Minister for School & Higher Education, Punjab.",
      fullDescription: `🎓 500,000 Free IT Courses
Offered under the visionary leadership of Rana Sikandar Hayat, Minister for School & Higher Education, Punjab — the Hunarmand Punjab Scholarship Card initiative is transforming futures through technology. Gain access to cutting-edge IT training in fields like Artificial Intelligence, Web Development, Cybersecurity, and more.
Hunarmand Punjab aims to empower youth with in-demand digital skills — completely free of cost.
✔ No tuition fee
✔ No material charges
✔ 100% Scholarship-Based Learning
Don't miss your chance to be part of Pakistan's largest IT skills revolution.`,
    },
//     {
//       id: 6,
//       title:
//         "Hunarmand Punjab Scholarship Cards Are Now OPEN! (Only 50,000 Available)",
//       videoUrl: "",
//       shortDescription:
//         "We are thrilled to announce that the distribution of Hunarmand Punjab Scholarship Cards has officially begun!",
//       fullDescription: `🎉 Hunarmand Punjab Scholarship Cards Are Now OPEN!
// We are thrilled to announce that the distribution of Hunarmand Punjab Scholarship Cards has officially begun! A total of 50,000 Scholarship Cards will be awarded to selected applicants across Pakistan. 25,000 Scholarship Cards are exclusively reserved for students from Punjab. The remaining 25,000 Cards will be distributed among students from other provinces. These cards grant access to completely free, advanced IT and digital skills training under the Hunarmand Punjab initiative. Don't miss your chance — Apply Now and be part of the digital transformation!`,
//     },
  ];

  const handleReadMore = (news) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
    setPlayingVideoId(null); // Stops any playing video
  };

  return (
    <>
      <div className="breadcrums position-relative ">
        <ParticleBackground />
        <h2>News & Events</h2>
      </div>
      <div className="news pt-5 pb-5 text-center">
        <h2 className="mb-3">Latest News & Events</h2>
        <p>
          Stay up-to-date with all the latest developments at Hunarmand. From
          new course launches to special <br /> events, find out what's
          happening and how you can get involved in shaping the future of
          Hunarmand Punjab
          <br /> skilled workforce. Keep an eye on this space for exciting
          announcements and opportunities!
        </p>
        <div className="container">
          <div className="row justify-content-center px-4 pt-5">
            {newsData.map((news) => (
              <div key={news.id} className="col-lg-4 col-md-6 mb-4">
                <div className="course h-100 p-0">
                  <div className="course-card-details h-100 d-flex flex-column justify-content-between align-items-start">
                    {/* Title First */}
                    <h6 className="mb-2 font-18 text-start">{news.title}</h6>

                    <div className="vid-wrapper p-0 m-0 w-100">
                      <div className="vid-container">
                        <iframe
                          src={news.videoUrl}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>

                    {/* Category Badge */}
                    {/* <div
                      className="text-start d-flex align-items-center gap-2 text-success px-2 p-1 rounded-2 mb-3"
                      style={{
                        background: "rgb(25 135 84 / 24%)",
                        width: "fit-content",
                      }}
                    >
                      <div className="fa fa-list-alt text-success"></div>
                      {news.videoUrl ? "Video" : "Announcement"}
                    </div> */}

                    {/* <hr /> */}

                    {/* Read More Button */}
                    <button
                      className="btn-green-sq"
                      onClick={() => handleReadMore(news)}
                    >
                      Read More <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NewsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={selectedNews}
      />
    </>
  );
};

export default NewsEvents;
