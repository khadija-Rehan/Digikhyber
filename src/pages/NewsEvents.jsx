import React, { useState, useEffect } from "react";
import PageBanner from "../components/PageBanner";
import NewsModal from "../components/NewsModal";
import "./NewsEvents.css";

const NewsEvents = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [inlineVideoId, setInlineVideoId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const newsData = [
    {
      id: 1,
      title:
        "Honorable Guest Adnan Afzal Chattha, Chairperson of the CM Task Force for Skills Development, addressing in the inauguration of Hunarmand Punjab.",
      videoUrl: "https://www.youtube.com/embed/NC4ExcWTkOE",
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
      fullDescription: `🎓 500,000 Free IT Courses
Offered under the visionary leadership of Rana Sikandar Hayat, Minister for School & Higher Education, Punjab — the Hunarmand Punjab Scholarship Card initiative is transforming futures through technology. Gain access to cutting-edge IT training in fields like Artificial Intelligence, Web Development, Cybersecurity, and more.
Hunarmand Punjab aims to empower youth with in-demand digital skills — completely free of cost.
✔ No tuition fee
✔ No material charges
✔ 100% Scholarship-Based Learning
Don't miss your chance to be part of Pakistan's largest IT skills revolution.`,
    },
    {
      id: 6,
      title:
        "Interview with Honorable Guest Prof. Dr. Yasir Ayaz | NCAI Pakistan | Inauguration Hunarmand Punjab",
      videoUrl: "https://www.youtube.com/embed/9dgJMrVYouo?si=EDkwLoZ5ictyxJnl",
      fullDescription: `Interview with Prof. Dr. Yasir Ayaz – Inauguration of Hunarmand Punjab
We had the honor of welcoming Prof. Dr. Yasir Ayaz, Chairman of National Center of Artificial Intelligence - NCAI Pakistan, at the inauguration of the Hunarmand Punjab.
Prof. Dr. Yasir Ayaz praised this visionary initiative for empowering youth with advanced IT skills and digital opportunities.
He highlighted the importance of such programs in shaping Pakistan’s future workforce for the global tech industry.
His appreciation motivates us to continue building a skilled and technologically empowered Pakistan.
`,
    },
    {
      id: 7,
      title:
        "Interview with Honorable Guest Dr. Wajahat Qazi | Comsats University | Inauguration Hunarmand Punjab",
      videoUrl: "https://www.youtube.com/embed/_3hRDF_FQqQ?si=0-0000000000000000",
      fullDescription: `Interview with Dr. Wajahat Qazi – Inauguration of Hunarmand Punjab
We were honored to host Dr. Wajahat Qazi from COMSATS University during the inauguration of Hunarmand Punjab.
Dr. Wajahat Qazi praised this groundbreaking initiative for providing youth with modern IT skills and career opportunities.
He emphasized how such programs are vital for building a digitally empowered Pakistan and strengthening the tech ecosystem.
His words of encouragement inspire us to continue our mission of youth empowerment through modern IT skills.`,
    },
    {
      id: 8,
      title:
        "Interview with Honorable Guest Dr. Yasir Niaz Khan | CTO PSCA | Inauguration Hunarmand Punjab",
      videoUrl: "https://www.youtube.com/embed/N5OYV3PkDXo?si=0-0000000000000000",
      fullDescription: `Interview with Dr. Yasir Niaz Khan – Inauguration of Hunarmand Punjab
We had the privilege of hosting Dr. Yasir Niaz Khan, Chief Technology Officer at Punjab Safe City Authority - PSCA, during the inauguration of the Hunarmand Punjab.
Dr. Yasir Niaz highly appreciated this initiative for creating opportunities in IT education, innovation, and digital transformation.
He emphasized the importance of such programs in preparing a skilled workforce for Pakistan’s future tech landscape.
His valuable insights and encouragement strengthen our commitment to building a digitally empowered youth.`,
    },
    {
      id: 9,
      title:
        "Interview with Honorable Guest Dr. Yasir Niaz Khan | CTO PSCA | Inauguration Hunarmand Punjab",
      videoUrl: "https://www.youtube.com/embed/N5OYV3PkDXo?si=0-0000000000000000",
      fullDescription: `Interview with Mubashir Hussain Chand – Hunarmand Punjab
We were honored to welcome Mubashir Hussain Chand, CEO of Hum Mashal E Rah Foundation, during the inauguration of Hunarmand Punjab initiative.
He praised this visionary program for empowering youth through free IT education, scholarships, and digital skill development.
Mubashir Hussain Chand highlighted the importance of Hunarmand Punjab Vision in creating a strong, skilled workforce for Pakistan’s future.
His appreciation motivates us to continue building opportunities for thousands of students across Punjab.
`,
    },
    {
      id: 10,
      title:
        "Laptop Winner Highlights | Minhal Raza From Sargodha | Inauguration Hunarmand Punjab",
      videoUrl: "https://www.youtube.com/embed/JWXBm9v2QyY?si=0-0000000000000000",
      fullDescription: `Laptop Winner Highlights – Minhal Raza from Sargodha
We proudly celebrate the success of Minhal Raza, a dedicated student from Sargodha, who received a laptop under the Hunarmand Punjab Scholarship Card Program.
Minhal Raza expressed heartfelt appreciation for this initiative, which is empowering students with digital tools for learning, freelancing, and IT skill development.
He highlighted how the Laptop Scheme is helping students achieve their academic and professional goals.
His success story inspires thousands of youth to join this mission and transform their future.
`,
    },
    {
      id: 11,
      title:
        "Laptop Winner Highlights | Abdul Rehman from Lahore | Inauguration Hunarmand Punjab",
      videoUrl: "https://www.youtube.com/embed/DgXT0twJJFI?si=0-0000000000000000",
      fullDescription: `Laptop Winner Student Review – Abdul Rehman from Lahore
We are proud to share the success story of Abdul Rehman from Lahore, who received a laptop under the Hunarmand Punjab Scholarship Card Program.
Abdul Rehman expressed deep gratitude for this remarkable initiative that provides students with digital resources and free IT education.
He acknowledged how the Laptop Scheme is bridging the digital gap and helping youth explore new opportunities in learning and freelancing.
His appreciation motivates us to continue empowering students across Punjab with technology and skills.
`,
    },
    //     {
    //       id: 6,
    //       title:
    //         "Digikhyber Scholarship Cards Are Now OPEN! (Only 50,000 Available)",
    //       videoUrl: "",
    //       shortDescription:
    //         "We are thrilled to announce that the distribution of Digikhyber Scholarship Cards has officially begun!",
    //       fullDescription: `🎉 Digikhyber Scholarship Cards Are Now OPEN!
    // We are thrilled to announce that the distribution of Digikhyber Scholarship Cards has officially begun! A total of 50,000 Scholarship Cards will be awarded to selected applicants across Pakistan. 25,000 Scholarship Cards are exclusively reserved for students from Punjab. The remaining 25,000 Cards will be distributed among students from other provinces. These cards grant access to completely free, advanced IT and digital skills training under the Digikhyber initiative. Don't miss your chance — Apply Now and be part of the digital transformation!`,
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

  const getYoutubeThumbnail = (url) => {
    if (!url) return '';
    const videoIdMatch = url.match(/embed\/([^?]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`;
    }
    return '';
  };

  return (
    <div className="news-hub-page">
      <PageBanner 
          title="News & Events"
          description="Stay up-to-date with all the latest developments at Digikhyber. From new course launches to special events, find out what's happening and how you can get involved in shaping the future of a skilled workforce. Keep an eye on this space for exciting announcements and opportunities!"
      />

      <div className="news-section">
        <div className="container">
          <div className="row justify-content-center">
            {newsData.map((news, index) => (
              <div key={news.id} className="col-lg-4 col-md-6 mb-5">
                <div 
                    className="news-elite-card news-reveal" 
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="news-video-wrapper">
                      {inlineVideoId === news.id ? (
                        <iframe
                          src={`${news.videoUrl}?autoplay=1`}
                          title={news.title}
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div 
                          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setInlineVideoId(news.id);
                          }}
                        >
                          {getYoutubeThumbnail(news.videoUrl) ? (
                            <>
                              <img 
                                src={getYoutubeThumbnail(news.videoUrl)} 
                                alt={news.title} 
                                className="news-thumbnail-img"
                              />
                              <div className="news-play-overlay">
                                <div className="news-play-btn">
                                  <i className="fas fa-play"></i>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="news-placeholder">
                              <i className="fas fa-newspaper"></i>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="news-card-body" onClick={() => handleReadMore(news)} style={{ cursor: 'pointer' }}>
                      <h3 className="news-card-title">{news.title}</h3>
                      <div className="news-read-link">
                        Watch Full Video <i className="fas fa-arrow-right"></i>
                      </div>
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
    </div>
  );
};

export default NewsEvents;
