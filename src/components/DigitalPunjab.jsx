import React, { useState, useEffect, useRef } from "react";
import ParticleBackground from "./ParticleBackground";
import "./DigitalPunjab.css";

const DigitalPunjab = () => {
    const [selectedVideo, setSelectedVideo] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const videos = [
        {
            id: "ZtQAQGyUxkQ",
            title: "Digikhyber Video 1",
            thumbnail: `https://img.youtube.com/vi/ZtQAQGyUxkQ/mqdefault.jpg`,
        },
        {
            id: "As5DtBHLlDY",
            title: "Digikhyber Video 2",
            thumbnail: `https://img.youtube.com/vi/As5DtBHLlDY/mqdefault.jpg`,
        },
        {
            id: "9AnOeOdlG1c",
            title: "Digikhyber Video 3",
            thumbnail: `https://img.youtube.com/vi/9AnOeOdlG1c/mqdefault.jpg`,
        },
        {
            id: "Ss0cuzczCMM",
            title: "Digikhyber Video 4",
            thumbnail: `https://img.youtube.com/vi/Ss0cuzczCMM/mqdefault.jpg`,
        },
        {
            id: "9dgJMrVYouo",
            title: "Digikhyber Video 5",
            thumbnail: `https://img.youtube.com/vi/9dgJMrVYouo/mqdefault.jpg`,
        },
        {
            id: "C1PEgg0x2iE",
            title: "Digikhyber Video 6",
            thumbnail: `https://img.youtube.com/vi/C1PEgg0x2iE/mqdefault.jpg`,
        },
        {
            id: "_3hRDF_FQqQ",
            title: "Digikhyber Video 7",
            thumbnail: `https://img.youtube.com/vi/_3hRDF_FQqQ/mqdefault.jpg`,
        },
        {
            id: "N5OYV3PkDXo",
            title: "Digikhyber Video 8",
            thumbnail: `https://img.youtube.com/vi/N5OYV3PkDXo/mqdefault.jpg`,
        },
        {
            id: "eisQK3Nv03g",
            title: "Digikhyber Video 9",
            thumbnail: `https://img.youtube.com/vi/eisQK3Nv03g/mqdefault.jpg`,
        },
        {
            id: "Prb2SI-2wtQ",
            title: "Digikhyber Video 10 (Upcoming)",
            thumbnail: `https://img.youtube.com/vi/Prb2SI-2wtQ/mqdefault.jpg`,
        },
        {
            id: "49Xr-WHgGGA",
            title: "Digikhyber Video 11",
            thumbnail: `https://img.youtube.com/vi/49Xr-WHgGGA/mqdefault.jpg`,
        },
        {
            id: "MwaXTW0_jc8",
            title: "Digikhyber Video 12",
            thumbnail: `https://img.youtube.com/vi/MwaXTW0_jc8/mqdefault.jpg`,
        },
    ];

    const handleVideoSelect = (index) => {
        setSelectedVideo(index);
    };

    return (
        <section 
            ref={sectionRef}
            className={`digital-punjab-reveal ${isVisible ? 'is-visible' : ''}`}
        >
            <div className="digital-punjab container mt-5">
                <div className="digital breadcrums">
                    <ParticleBackground />
                    <div className="px-lg-5 px-3">
                        <p className="white bg-black font-14 d-p">Digikhyber Initiative</p>
                        <p className="white font-16 d-content">
                            <span className="fw-bold">Digikhyber</span> initiative with
                            the appreciation of our Honourable Minister of School & Higher
                            Education, Punjab{" "}
                            <span className="fw-bold">Faisal Karim Kundi,Governor of Khyber Pakhtunkhwa</span>, aimed at
                            providing IT-Skills to youth enrolled in the training program.
                            Digikhyber Scholarship Card enables eligible trainees to
                            access free advanced IT Trainings, laptop scheme, solar scheme,
                            Taleem finance, study abroad & more in a transparent, secure, and
                            efficient manner & ensure that every learner receives skill-based
                            training.
                        </p>
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

            <style>{`
                .digital-punjab-reveal {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: all 1.2s cubic-bezier(0.19, 1, 0.22, 1);
                    overflow: hidden; /* Prevent horizontal scroll */
                }
                .digital-punjab-reveal.is-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </section>
    );
};

export default DigitalPunjab;
