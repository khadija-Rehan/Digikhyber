import React, { useState } from "react";
import ParticleBackground from "./ParticleBackground";
import "./DigitalPunjab.css";

const DigitalPunjab = () => {
  const [selectedVideo, setSelectedVideo] = useState(0);

  const videos = [
    {
      id: "ZtQAQGyUxkQ",
      title: "Hunarmand Punjab Video 1",
      thumbnail: `https://img.youtube.com/vi/ZtQAQGyUxkQ/mqdefault.jpg`,
    },
    {
      id: "Ss0cuzczCMM",
      title: "Hunarmand Punjab Video 2",
      thumbnail: `https://img.youtube.com/vi/Ss0cuzczCMM/mqdefault.jpg`,
    },
    {
      id: "9dgJMrVYouo",
      title: "Hunarmand Punjab Video 3",
      thumbnail: `https://img.youtube.com/vi/9dgJMrVYouo/mqdefault.jpg`,
    },
    {
      id: "C1PEgg0x2iE",
      title: "Hunarmand Punjab Video 4",
      thumbnail: `https://img.youtube.com/vi/C1PEgg0x2iE/mqdefault.jpg`,
    },
    {
      id: "_3hRDF_FQqQ",
      title: "Hunarmand Punjab Video 5",
      thumbnail: `https://img.youtube.com/vi/_3hRDF_FQqQ/mqdefault.jpg`,
    },
    {
      id: "N5OYV3PkDXo",
      title: "Hunarmand Punjab Video 6",
      thumbnail: `https://img.youtube.com/vi/N5OYV3PkDXo/mqdefault.jpg`,
    },
    {
      id: "eisQK3Nv03g",
      title: "Hunarmand Punjab Video 7",
      thumbnail: `https://img.youtube.com/vi/eisQK3Nv03g/mqdefault.jpg`,
    },
    {
      id: "Prb2SI-2wtQ",
      title: "Hunarmand Punjab Video 8 (Upcoming)",
      thumbnail: `https://img.youtube.com/vi/Prb2SI-2wtQ/mqdefault.jpg`,
    },
    {
      id: "49Xr-WHgGGA",
      title: "Hunarmand Punjab Video 9",
      thumbnail: `https://img.youtube.com/vi/49Xr-WHgGGA/mqdefault.jpg`,
    },
    {
      id: "MwaXTW0_jc8",
      title: "Hunarmand Punjab Video 10",
      thumbnail: `https://img.youtube.com/vi/MwaXTW0_jc8/mqdefault.jpg`,
    },
    // {
    //   id: "Prb2SI-2wtQ",
    //   title: "Hunarmand Punjab Video 11",
    //   thumbnail: `https://img.youtube.com/vi/Prb2SI-2wtQ/mqdefault.jpg`
    // },
    // {
    //   id: "JWXBm9v2QyY",
    //   title: "Hunarmand Punjab Video 12",
    //   thumbnail: `https://img.youtube.com/vi/JWXBm9v2QyY/mqdefault.jpg`
    // },
    // {
    //   id: "DgXT0twJJFI",
    //   title: "Hunarmand Punjab Video 13",
    //   thumbnail: `https://img.youtube.com/vi/DgXT0twJJFI/mqdefault.jpg`
    // }
  ];

  const handleVideoSelect = (index) => {
    setSelectedVideo(index);
  };

  return (
    <>
      <div className="digital-punjab container mt-5">
        <div className="digital breadcrums">
          <ParticleBackground />
          <div className="px-lg-5 px-3">
            <p className="white bg-black font-14 d-p">Hunarmand Punjab</p>
            {/* <h2 className='white font-32'>Minister of Education, Punjab</h2> */}
            {/* <h2 className="white font-32">
              Minister of School & Higher Education, Punjab
            </h2> */}
            <p className="white font-16 d-content">
              <span className="fw-bold">Hunarmand Punjab</span> initiative with
              the appreciation of our Honourable Minister of School & Higher
              Education, Punjab{" "}
              <span className="fw-bold">Rana Sikandar Hayat</span>, aimed at
              providing IT-Skills to youth enrolled in the training program.
              Hunarmand Punjab Scholarship Card enables eligible trainees to
              access free advanced IT Trainings, laptop scheme, solar scheme,
              Taleem finance, study abroad & more in a transparent, secure, and
              efficient manner & ensure that every learner receives skill-based
              training.
            </p>
            {/* <p className='white font-16 d-content'>Rana Sikandar Hayat, Provincial Minister of School Education for Punjab, emphasized the importance of enhancing educational infrastructure and digital literacy across the province. He noted that while Punjab has made significant strides in improving educational outcomes, there remains a pressing need to integrate technology into the curriculum to prepare students for the modern workforce.</p> */}
          </div>
        </div>

        <div className="video-slider-container vid-wrapper">
          <div className="main-video-section">
            <div className="main-video-wrapper vid-container">
              <iframe
                src={`https://www.youtube.com/embed/${videos[selectedVideo].id}?autoplay=1`}
                title={videos[selectedVideo].title}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="video-playlist-section">
            <h4 className="playlist-title mb-3">Video Playlist</h4>
            <div className="video-playlist">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className={`video-thumbnail ${selectedVideo === index ? "active" : ""}`}
                  onClick={() => handleVideoSelect(index)}
                >
                  <div className="thumbnail-image">
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="play-overlay">
                      <div className="play-button">▶</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitalPunjab;
