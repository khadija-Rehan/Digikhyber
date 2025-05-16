import React from 'react'
import icon3 from "../assets/ico-11.png";
import icon4 from "../assets/ico-14.png";
const ApplicationSteps = () => {
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='steps'>
                        <h2 className='font-32'>How to Get Started with Hunarmand Punjab</h2>
                        <p className='font-15 l-h-1'>It's easy to become a part of Hunarmand Punjab and start learning new skills. Here's what you need to do:</p>
                        <p className='font-14 green'  >Your Steps During The Application Process</p>

                        <div className='steps-cards'>
                            <div className='step-card'  >
                                <p className='num'>01</p>
                                <p className='step-icon'><img src={icon4} alt="" /></p>
                                <p className='font-24 green'>Registration</p>
                                <p>First, you'll need to fill out a registration form.</p>
                            </div>
                            <div className='step-card' >
                                <p className='num'>02</p>
                                <p className='step-icon'><img src={icon4} alt="" /></p>
                                <p className='font-24 green'>Pay the Fee</p>
                                <p>After registration, you'll submit the admission fee.</p>
                            </div>
                            <div className='step-card'  >
                                <p className='num'>03</p>
                                <p className='step-icon'><img src={icon4} alt="" /></p>
                                <p className='font-24 green'>Get Verified</p>
                                <p>We'll then check  your documents</p>
                            </div>
                            <div className='step-card' >
                                <p className='num'>04</p>
                                <p className='step-icon'><img src={icon4} alt="" /></p>
                                <p className='font-24 green'>Ennroll</p>
                                <p>Once verified, you'llbe enrolled  in the program  and learn!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ApplicationSteps