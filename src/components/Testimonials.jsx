import React from 'react'
import ML from "../assets/ML.jpg";
const Testimonials = () => {
    return (
        <>
            <div className='container'>

                <div className='row pt-5 pb-5'>
                    <div className='col-lg-6 col-md-12  mb-3 mb-lg-0 '>
                        <img src={ML} alt="empowering" className='w-100' />
                    </div>
                    <div className='col-lg-6 col-md-12  '>
                        <h2 className='font-32'>Punjab Government Empowering the Digital Economy</h2>
                        <p className='font-15 l-h-1'>Over the past decade, Pakistan's Information Technology (IT) sector has experienced remarkable growth, significantly contributing to the national economy. In the fiscal year 2023, the sector achieved a trade surplus of $1.72 billion, with exports reaching $1.94 billion, accounting for 35.1% of all services exports. The sector's annual growth rate stands at 20%, with local IT market revenues estimated at $1.5 billion. Employment-wise, Pakistan boasts a pool of over 600,000 English-speaking IT and Business Process Outsourcing (BPO) professionals, with more than 20,000 IT graduates entering the workforce each year. Additionally, the establishment of initiatives like the e-Rozgar centers has empowered over 1,300 startups, generating more than 126,000 jobs and attracting investments totaling Rs15.43 billion ($74 million). These developments underscore the government's commitment to fostering a robust IT ecosystem, generating employment, and enhancing Pakistan's position in the global digital economy.</p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonials