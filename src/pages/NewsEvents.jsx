import React from 'react'
import News from "../assets/news.png"
const NewsEvents = () => {
  return (
    <>
      <div className='breadcrums'>
        <h2>News & Events</h2>
      </div>
      <div className='news pt-5 pb-5 text-center'>
        <h2 className='mb-3'>Latest News & Events
        </h2>
        <p>Stay up-to-date with all the latest developments at SSDP. From new course launches to special <br /> events, find out what’s happening and how you can get involved in shaping the future of Sindh <br /> skilled workforce. Keep an eye on this space for exciting announcements and opportunities!

        </p>
        <div className="row justify-content-center pt-5">

          <div className="col-3">
            <div
              className='course p-0'
            >
              <div className='course-card-details'>

                <img className='w-100 mb-4' src={News} alt={News} />
                <div className='text-start d-flex align-items-center gap-2 text-success  px-2 p-1 rounded-2 mb-3' style={{ background: "rgb(25 135 84 / 24%)", width: "fit-content" }}>
                  <div className='fa fa-list-alt text-success'>

                  </div>
                  Announcement
                </div>
                <h6 className=' mb-3 font-18   text-start'> Course Enrollments of SSDP are OPEN (Only 50,000 Seats) - Sindh Skills Development Program (SSDP)</h6>
                <p className='fs-6  text-start'>We are thrilled to announce that admissions for the SSDP (Sindh Skills Development Program) are now open! SSDP offers a wide range of completely free.. <span className='font-12 text-success  px-2 p-1 rounded-2 mb-3' style={{ background: "rgb(25 135 84 / 24%)", width: "fit-content" }}>
                  
                  Read more
                </span></p>
                <hr />
                <button className='btn-green-sq '>View Details <i className='fas fa-arrow-right'></i></button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default NewsEvents