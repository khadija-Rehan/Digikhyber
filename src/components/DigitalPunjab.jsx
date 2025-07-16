import React from "react";
import ParticleBackground from "./ParticleBackground";

const DigitalPunjab = () => {
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
          {/* <p className='white font-16 d-content'>Rana Sikandar Hayat, Provincial Minister of School Education for Punjab, emphasized the importance of enhancing educational infrastructure and digital literacy across the province. He noted that while Punjab has made significant strides in improving educational outcomes, there remains a pressing need to integrate technology into the curriculum to prepare students for the modern workforce.</p> */}
        </div>
        <div className="vid-wrapper">
          <div className="vid-container">
            <iframe
              //   src="https://www.youtube.com/embed/vumLjmUN7P8"
              src="https://www.youtube.com/embed/Ss0cuzczCMM"
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitalPunjab;
