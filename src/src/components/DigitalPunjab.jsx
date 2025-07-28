import React, { useState } from "react";
import ParticleBackground from "./ParticleBackground";

const videoList = [
  { id: "NC4ExcWTkOE", title: "Video 1" },
  { id: "Ss0cuzczCMM", title: "Video 2" },
  { id: "9dgJMrVYouo", title: "Video 3" },
  { id: "_3hRDF_FQqQ", title: "Video 4" },
  { id: "N5OYV3PkDXo", title: "Video 5" },
  { id: "eisQK3Nv03g", title: "Video 6" },
  { id: "Prb2SI-2wtQ", title: "Video 7 (Upcoming)" },
  { id: "49Xr-WHgGGA", title: "Video 8" },
  { id: "MwaXTW0_jc8", title: "Video 9" },
  { id: "Prb2SI-2wtQ", title: "Video 10" },
  { id: "JWXBm9v2QyY", title: "Video 11" },
  { id: "DgXT0twJJFI", title: "Video 12" },
];
const DigitalPunjab = () => {
  const [selectedVideo, setSelectedVideo] = useState(videoList[0].id);

  return (
    <>
      <div className="digital-punjab container mt-5">
        <div className="digital breadcrums">
          <ParticleBackground />
          <p className="white bg-black font-14 d-p">Hunarmand Punjab</p>
          {/* <h2 className='white font-32'>Minister of Education, Punjab</h2> */}
          <h2 className="white font-32">
            Minister of School & Higher Education, Punjab
          </h2>
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
        </div>
        <div className="playlist-holder">
          <div className="row w-100 g-0">
            {/* Main Video Section */}
            <div className="col-lg-10 col-md-9 col-12">
              <div className="vid-wrapper-new mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo}`}
                  title="Selected Video"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="w-100"
                ></iframe>
              </div>
            </div>

            {/* Video List Section */}
            <div className="col-lg-2 col-md-3 col-12">
              <div
                  className="playlist-scroll"
                >
                {videoList.map((video, index) => (
                  <div
                    key={index}
                    className="cursor-pointer thumbnail"
                    style={{
                      border: selectedVideo === video.id ? "2px solid #079561" : "2px solid #ccc",
                    }}
                    onClick={() => setSelectedVideo(video.id)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      className="img-fluid w-100 object-fit-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitalPunjab;
