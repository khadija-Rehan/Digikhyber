import React from "react";
import Slider from "react-slick"; // Import the Slider component
import "slick-carousel/slick/slick.css"; // Import slick styles
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles

const OurPartners = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8, // Show 3 logos at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200, // New breakpoint for slightly smaller desktops
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992, // Tablets
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Smaller tablets / larger phones
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576, // Phones
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const partners = [
    {
      name: "Bank of Punjab",
      logo: "https://youthparliament.pk/wp-content/uploads/2022/07/bop111.png",
    },
    {
      name: "Lenovo",
      logo: "https://crystalpng.com/wp-content/uploads/2025/05/lenovo-logo.png",
    },
    { name: "Electric Bike", logo: "/images/Icon-1.png" },
    {
      name: "Ministry of School & Higher Education",
      // name: "Gov. of Punjab",
      logo: "https://seeklogo.com/images/G/government-of-punjab-logo-DD4D1CC9C4-seeklogo.com.png",
    },
    {
      name: "Taleem Finance",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL0TQwO2v6lvKYL3d7qvmHD6yKA8gUn14-Uw&s",
    },
    {
      //   name: "Taleeb Abroad",
      name: "Taleem Abroad",
      logo: "https://www.shutterstock.com/image-vector/study-abroad-vector-logo-design-600nw-1711891945.jpg",
    },
    {
      name: "EC-Council",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNdTeSH02aH9-eUut6MYCnwtGlI6kCnNDarQ&s",
    },
    {
      name: "Udemy",
      logo: "https://logowik.com/content/uploads/images/udemy-new-20212512.jpg",
    },
    {
      name: "Coursera",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo3pl_zOXCdfxx2ksowu1H39fbyBpFMdo7Dw&s",
    },
    {
      name: "Meta",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMtdzKPDmF4BYfI0WCuTY416jnhZiJeAK-rg&s",
    },
    {
      name: "Fiverr",
      logo: "https://logowik.com/content/uploads/images/fiverr-new3326.jpg",
    },
    {
      name: "Microsoft",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0LnDYBaUFCBj2hvQqKZkCwjCZZFXalvd3OA&s",
    },
    // { name: "Microsoft", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0LnDYBaUFCBj2hvQqKZkCwjCZZFXalvd3OA&s" }
  ];

  return (
    <div className="container  ">
      <div style={{ padding: "50px 0px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Our Supporting Partners
        </h2>
        <Slider {...settings}>
          {partners.map((partner, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                padding: "10px",
                display: "flex", // Use flexbox for centering
                flexDirection: "column", // Stack image and text vertically
                alignItems: "center", // Center horizontally
                justifyContent: "center", // Center vertically
                height: "150px", // Fixed height for each slide container
              }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                style={{
                  maxWidth: "100%", // Ensure image doesn't overflow
                  maxHeight: "80px", // Set maximum height for consistency
                  width: "auto", // Allow width to adjust based on aspect ratio
                  objectFit: "contain", // Crucial: Fits image within bounds, maintains aspect ratio
                  margin: "0 auto", // Center the image horizontally
                }}
              />
              {/* Optional: Add partner name below the logo */}
              <p
                className="text-center fw-medium"
                style={{ fontSize: "0.9rem", marginTop: "10px", color: "#666" }}
              >
                {partner.name}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default OurPartners;
