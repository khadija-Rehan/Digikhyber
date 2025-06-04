import React from "react";
import ParticleBackground from "../components/ParticleBackground";
import Accordion from "react-bootstrap/Accordion";
import View from "../assets/top-view-of-young-and-old-architects-sitting-and-w-2023-11-27-05-26-00-utc.jpg";
const FAQs = () => {
    return (
        <>
            <div className="banner">
                <ParticleBackground />
                <div className="banner-content  ">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12">
                                <h1 className="font-48">FAQs</h1>
                                <p className="font-18 light-grey l-h-1 weight-400">
                                    Got questions? We’ve got answers! Check out our Frequently
                                    Asked Questions to find what you’re looking for.
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <img src={View} alt="View" className="w-100 banner-image" />
                                <div className="cube"> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" container  faq pt-5 pb-5">
                <p class="white font-14 d-p">FAQ</p>
                <h2 className="text-center pb-5">Frequently asked questions</h2>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <div className="p-3 fw-medium">
                                How do I access the courses after purchasing them?
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="p-3">
                                Irure voluptate voluptate nostrud cillum ut non deserunt velit
                                commodo ad irure. Id elit et consequat aliquip aute elit aute
                                ipsum et proident exercitation deserunt eu incididunt non duis
                                adipisicing sunt. Deserunt ex culpa laborum proident aute
                                pariatur eiusmod amet in id exercitation deserunt non esse dolor
                                nostrud do aliquip non. Sint cillum et aute veniam mollit ipsum
                                aliquip excepteur commodo occaecat.Ullamco proident excepteur ad
                                ullamco nisi reprehenderit amet occaecat veniam in esse
                                voluptate laborum.
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            <div className="p-3 fw-medium">
                                Are there any prerequisites for enrolling in the courses?
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="p-3">
                                Aute ullamco adipisicing excepteur amet ullamco duis et enim
                                proident irure nulla. Id nostrud consectetur ad pariatur ex
                                occaecat.Eu cillum do est ipsum id sit veniam duis duis
                                exercitation est commodo. Officia ut officia ullamco qui
                                consequat mollit anim quis voluptate labore qui esse tempor.
                                Incididunt sint non dolore non reprehenderit officia et est
                                proident aliquip anim qui consectetur et. Cillum tempor eu do
                                tempor tempor quis irure tempor cupidatat voluptate nisi
                                consectetur consectetur cupidatat.
                            </div>
                        </Accordion.Body>
                    </Accordion.Item> 
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            <div className="p-3 fw-medium">
                                Can I preview a sample lesson or module before making a
                                purchase?
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="p-3">
                                Aute ullamco adipisicing excepteur amet ullamco duis et enim
                                proident irure nulla. Id nostrud consectetur ad pariatur ex
                                occaecat.Eu cillum do est ipsum id sit veniam duis duis
                                exercitation est commodo. Officia ut officia ullamco qui
                                consequat mollit anim quis voluptate labore qui esse tempor.
                                Incididunt sint non dolore non reprehenderit officia et est
                                proident aliquip anim qui consectetur et. Cillum tempor eu do
                                tempor tempor quis irure tempor cupidatat voluptate nisi
                                consectetur consectetur cupidatat.
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    );
};

export default FAQs;
