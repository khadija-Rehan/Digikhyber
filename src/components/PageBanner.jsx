import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import p5 from "p5";
import TOPOLOGY from "vanta/dist/vanta.topology.min";

if (!window.p5) window.p5 = p5;

/**
 * PageBanner Component
 * Globally updated to a centered, typography-focused layout (No image cards)
 * @param {string} title - The heading for the banner
 * @param {string} description - The subtext/description
 * @param {React.ReactNode} children - Extra content like badges or bars (optional)
 */
const PageBanner = ({ title, description, children }) => {
    const vantaRef = useRef(null);
    const vantaEffectRef = useRef(null);

    useEffect(() => {
        AOS.init({
            duration: 350,
            offset: 0,
            once: true,
            easing: 'ease-out',
        });

        const initVanta = () => {
            if (vantaRef.current && !vantaEffectRef.current && window.p5) {
                try {
                    vantaEffectRef.current = TOPOLOGY({
                        el: vantaRef.current,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        scale: 1.00,
                        scaleMobile: 1.00,
                        color: 0xc9a227,
                        backgroundColor: 0x0b5d3b,
                    });
                } catch (err) {
                    console.error("Vanta initialization failed:", err);
                }
            }
        };

        const timer = setTimeout(initVanta, 100);

        return () => {
            clearTimeout(timer);
            if (vantaEffectRef.current) {
                try {
                    vantaEffectRef.current.destroy();
                } catch (e) {
                    console.warn("Vanta destroy error:", e);
                }
                vantaEffectRef.current = null;
            }
        };
    }, []);

    return (
        <div className="simple-page-banner banner-centered-global" ref={vantaRef}>
            <div className="banner-overlay"></div>
            <div className="container position-relative z-1">
                <div className="row justify-content-center">
                    <div className="col-lg-10 text-center banner-reveal">
                        <h1 className="banner-title">{title}</h1>
                        {description && (
                            <p className="banner-desc mx-auto">
                                {description}
                            </p>
                        )}
                        {children}
                    </div>
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
                    min-height: 300px; 
                    display: flex;
                    align-items: center;
                    padding: 60px 0;
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(135deg, #0B5D3B 0%, #063d27 100%);
                }

                .banner-overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(11, 93, 59, 0.4) 0%, rgba(6, 61, 39, 0.9) 100%);
                    z-index: 0;
                    pointer-events: none;
                }

                .banner-title {
                    color: #ffffff !important;
                    font-size: 2.8rem;
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
                    font-size: 1.1rem !important;
                    line-height: 1.7;
                    max-width: 850px;
                    margin-bottom: 0;
                    text-shadow: 0 3px 8px rgba(0,0,0,0.4);
                    position: relative;
                    font-weight: 400;
                    font-family: 'Raleway', sans-serif !important;
                }

                @media (max-width: 991px) {
                    .simple-page-banner {
                        padding: 50px 0;
                        min-height: 250px;
                    }
                    .banner-title {
                        font-size: 2.2rem;
                    }
                    .banner-desc {
                        font-size: 1rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default React.memo(PageBanner);
