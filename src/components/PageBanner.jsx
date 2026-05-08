import React, { useEffect, useRef } from "react";

/**
 * PageBanner Component — Vanta Topology animated banner with glassmorphism image card.
 * @param {string} title       - Banner heading
 * @param {string} description - Subtext
 * @param {string} rightImage  - Optional right-side image
 * @param {React.ReactNode} children - Extra content (optional)
 */
const PageBanner = ({ title, description, rightImage, children }) => {
    const vantaRef = useRef(null);

    useEffect(() => {
        let vantaEffect = null;
        let tries = 0;
        let timerId = null;

        const initVanta = () => {
            if (!vantaRef.current) return;
            if (window.VANTA && window.VANTA.TOPOLOGY && window.p5) {
                try {
                    vantaEffect = window.VANTA.TOPOLOGY({
                        el: vantaRef.current,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 280.00,
                        minWidth: 200.00,
                        scale: 1.00,
                        scaleMobile: 1.00,
                        color: 0xc9a227,
                        backgroundColor: 0x0b5d3b,
                    });
                } catch (err) {
                    // Vanta failed silently — banner shows with CSS fallback
                }
            } else if (tries < 25) {
                tries++;
                timerId = setTimeout(initVanta, 200);
            }
        };

        initVanta();

        return () => {
            if (timerId) clearTimeout(timerId);
            try { if (vantaEffect) vantaEffect.destroy(); } catch (e) {}
        };
    }, []);

    return (
        <div className="simple-page-banner" ref={vantaRef}>
            <div className="banner-css-fallback"></div>
            <div className="container position-relative z-1">
                <div className="row align-items-center">
                    <div className={rightImage ? "col-lg-7 banner-reveal" : "col-lg-10 text-center mx-auto banner-reveal"}>
                        <h1 className="banner-title">{title}</h1>
                        {description && (
                            <p className="banner-desc">{description}</p>
                        )}
                        {children}
                    </div>
                    {rightImage && (
                        <div className="col-lg-5 text-center banner-reveal" style={{ animationDelay: '0.25s' }}>
                            <div className="banner-image-wrapper">
                                <img src={rightImage} alt={title} className="banner-right-img" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .simple-page-banner {
                    min-height: 280px;
                    display: flex;
                    align-items: center;
                    padding: 50px 0;
                    position: relative;
                    overflow: hidden;
                    background-color: #0B5D3B;
                }

                /* CSS fallback in case Vanta doesn't load */
                .banner-css-fallback {
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(ellipse at 15% 60%, rgba(201,162,39,0.12) 0%, transparent 55%),
                        linear-gradient(135deg, #052e1c 0%, #0B5D3B 55%, #0d6b45 100%);
                    background-image:
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                    background-size: 40px 40px;
                    z-index: 0;
                    pointer-events: none;
                }

                .banner-reveal {
                    animation: bannerFadeUp 0.5s ease forwards;
                    opacity: 0;
                }
                @keyframes bannerFadeUp {
                    from { opacity: 0; transform: translateY(18px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .banner-title {
                    color: #ffffff !important;
                    font-size: 3rem;
                    font-weight: 800;
                    margin-bottom: 16px;
                    line-height: 1.2;
                    text-shadow: 0 4px 15px rgba(0,0,0,0.5);
                    font-family: 'Raleway', sans-serif !important;
                    letter-spacing: -1px;
                }

                .banner-desc {
                    color: rgba(255,255,255,0.88) !important;
                    font-size: 1.05rem !important;
                    line-height: 1.75;
                    max-width: 820px;
                    margin-bottom: 20px;
                    text-shadow: 0 2px 8px rgba(0,0,0,0.35);
                    font-weight: 400;
                    font-family: 'Raleway', sans-serif !important;
                }

                .banner-image-wrapper {
                    background: rgba(255,255,255,0.14);
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                    padding: 10px;
                    border-radius: 28px;
                    border: 2px solid rgba(255,255,255,0.28);
                    display: inline-block;
                    box-shadow: 0 24px 55px rgba(0,0,0,0.38);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .banner-image-wrapper:hover {
                    transform: scale(1.025);
                    box-shadow: 0 30px 65px rgba(0,0,0,0.45);
                }

                .banner-right-img {
                    max-width: 100%;
                    height: auto;
                    max-height: 240px;
                    border-radius: 20px;
                    object-fit: contain;
                    display: block;
                }

                @media (max-width: 991px) {
                    .simple-page-banner { padding: 45px 0; min-height: auto; }
                    .banner-title { font-size: 2.1rem; text-align: center; }
                    .banner-desc  { font-size: 0.95rem !important; text-align: center; }
                    .banner-image-wrapper { margin-top: 28px; max-width: 280px; }
                }
            `}</style>
        </div>
    );
};

export default PageBanner;
