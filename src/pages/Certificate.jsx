import React from 'react'

const Certificate = () => {
    return (
        <div className='pt-5 pb-5' style={{ backgroundColor: " #079560 " }}>

            <div className="container">
                <div className='certificate'>
                    <h3 className='text-center mb-5'>Request Your Official SSDP Certificate</h3>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className='mb-3'>
                                <label className='mb-2' htmlFor=""> <i className='fas fa-envelope'></i> Email Address <span className='text-danger'>*</span></label>
                                <input className='form-control p-3' type="text" placeholder='Enter Email Address' />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='mb-3'>
                                <label className='mb-2' htmlFor=""> <i className='fas fa-book'></i>  Course Track<span className='text-danger'>*</span></label>
                                <select className='form-select p-3' name="" id="">
                                    <option value=""> SELECT</option>
                                    <option value=""> AI</option>
                                    <option value=""> WEB DEVELOPMENT</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='mb-3'>
                                <label className='mb-2' htmlFor=""> <i className='fas fa-id-card'></i> CNIC No <span className='text-danger'>*</span></label>
                                <input className='form-control p-3' type="text" placeholder='Enter CNIC No' />
                            </div>
                        </div>
                        <div className="col-lg-6"></div>
                        <div className='text-center'>
                            <button className='btn-green rounded-2'><i className='fas fa-file-alt me-2'></i>Apply For Certificate</button>
                        </div>
                    </div>
                </div>
                <div className='certificate mt-5'>
                    <h3 className='text-center mb-5'>Track Certificate</h3>
                    <p>
                        If you have applied for a hardcopy of your course completion certificate, you can track its delivery status by entering your registered email address below and clicking the 'Track' button. This will provide you with updates on the progress of your hardcopy certificate request.</p>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className='mb-3'>
                                <label className='mb-2' htmlFor=""> <i className='fas fa-envelope'></i> Email Address <span className='text-danger'>*</span></label>
                                <input className='form-control p-3' type="text" placeholder='Enter Email Address' />
                            </div>
                        </div>


                        <div className='text-start'>
                            <button className='btn-green rounded-2'>Track</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Certificate