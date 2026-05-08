import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * PageBanner Component
 * Globally updated to a centered, typography-focused layout (No image cards)
 * @param {string} title - The heading for the banner
 * @param {string} description - The subtext/description
 * @param {React.ReactNode} children - Extra content like badges or bars (optional)
 */
const PageBanner = ({ title, description, rightImage, children }) => {
    const vantaRef = useRef(null);

    useEffect(() => {
        let vantaEffect = null;
        let tries = 0;
        
        const initVanta = () => {
            if (vantaRef.current && window.VANTA && window.VANTA.TOPOLOGY && window.p5) {
                try {
                    vantaEffect = window.VANTA.TOPOLOGY({
                        el: vantaRef.current,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 350.00,
                        minWidth: 200.00,
                        scale: 1.00,
                        scaleMobile: 1.00,
                        color: 0xc9a227,
                        backgroundColor: 0x0b5d3b,
                    });
                } catch (err) {
                    console.error("Vanta initialization failed:", err);
                }
            } else if (tries < 30) {
                tries++;
                setTimeout(initVanta, 100);
            }
        };

        initVanta();

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    return (
        <div className="simple-page-banner" ref={vantaRef}>
            <div className="banner-overlay"></div>
            <div className="container position-relative z-1">
                <div className="row align-items-center">
                    <div className={rightImage ? "col-lg-7 banner-reveal text-start" : "col-lg-10 text-center mx-auto banner-reveal"}>
                        <h1 className="banner-title">{title}</h1>
                        {description && (
                            <p className="banner-desc">
                                {description}
                            </p>
                        )}
                        {children}
                    </div>
                    {rightImage && (
                        <div className="col-lg-5 text-center banner-reveal" style={{ animationDelay: '0.2s' }}>
                            <div className="banner-image-wrapper">
                                <img src={rightImage} alt={title} className="banner-right-img" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <style>{`
                .banner-reveal {
                    animation: bannerRevealAnim 0.3s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                    opacity: 0;
                }

                @keyframes bannerRevealAnim {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .simple-page-banner {
                    min-height: 280px; 
                    display: flex;
                    align-items: center;
                    padding: 50px 0;
                    position: relative;
                    overflow: hidden;
                    background-color: #0B5D3B; 
                }

                .banner-overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(11, 93, 59, 0.05) 0%, rgba(6, 61, 39, 0.3) 100%);
                    z-index: 0;
                    pointer-events: none;
                }

                .banner-title {
                    color: #ffffff !important;
                    font-size: 3rem;
                    font-weight: 800;
                    margin-bottom: 20px;
                    line-height: 1.2;
                    text-shadow: 0 4px 15px rgba(0,0,0,0.5);
                    position: relative;
                    font-family: 'Raleway', sans-serif !important;
                    letter-spacing: -1px;
                }

                .banner-desc {
                    color: rgba(255, 255, 255, 0.9) !important;
                    font-size: 1.15rem !important;
                    line-height: 1.7;
                    max-width: 850px;
                    margin-bottom: 25px;
                    text-shadow: 0 3px 8px rgba(0,0,0,0.4);
                    position: relative;
                    font-weight: 400;
                    font-family: 'Raleway', sans-serif !important;
                }

                .banner-image-wrapper {
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(15px);
                    padding: 10px;
                    border-radius: 30px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    display: inline-block;
                    box-shadow: 0 25px 60px rgba(0,0,0,0.4);
                    transition: transform 0.3s ease;
                }

                .banner-image-wrapper:hover {
                    transform: scale(1.02);
                }

                .banner-right-img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 22px;
                    object-fit: contain;
                    display: block;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }

                @media (max-width: 991px) {
                    .simple-page-banner {
                        padding: 60px 0;
                        min-height: 280px;
                        text-align: center !important;
                    }
                    .banner-title {
                        font-size: 2.4rem;
                    }
                    .banner-desc {
                        font-size: 1.05rem !important;
                    }
                    .banner-image-wrapper {
                        margin-top: 40px;
                        max-width: 320px;
                    }
                }
            `}</style>
        </div>
    );
};

export default PageBanner;
