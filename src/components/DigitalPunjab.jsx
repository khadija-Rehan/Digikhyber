import React from 'react'

const DigitalPunjab = () => {
    return (
        <>
            <div className='digital-punjab container mt-5'>
                <div className='digital'>
                    <p className='white font-14 d-p'>Hunarmand Punjab</p>
                    <h2 className='white font-32'>Minister of Education, Punjab</h2>
                    <p className='white font-16 d-content'>Rana Sikandar Hayat, Provincial Minister of School Education for Punjab, emphasized the importance of enhancing educational infrastructure and digital literacy across the province. He noted that while Punjab has made significant strides in improving educational outcomes, there remains a pressing need to integrate technology into the curriculum to prepare students for the modern workforce.</p>
                </div>
                <div className='vid-wrapper'>


                    <div className='vid-container'>
                        <iframe
                            src="https://www.youtube.com/embed/vumLjmUN7P8"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DigitalPunjab