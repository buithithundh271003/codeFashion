
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../../organic-1.0.0/images/banner3.jpg";
import banner2 from "../../../organic-1.0.0/images/banner5.webp";
import banner3 from "../../../organic-1.0.0/images/banner4.webp";


const BannerSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: true,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ],
    appendDots: dots => (
      <div style={{ 
        position: "absolute",
        bottom: "20px",
        width: "100%",
        textAlign: "center"
      }}>
        <ul style={{ 
          margin: 0,
          padding: 0,
          display: "flex",
          justifyContent: "center",
          gap: "8px"
        }}>{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: "#ffffff80",
        cursor: "pointer",
        transition: "all 0.3s"
      }} />
    )
  };

  const banners = [
    {
      id: 1,
      image: banner1,
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "#"
    },
    {
      id: 2,
      image: banner2,
      title: " ",
      subtitle: "",
      buttonLink: "#"
    },
    {
      id: 3,
      image: banner3,
      title: "",
      subtitle: "",
    }
  ];

  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <div style={{
              backgroundImage: `url(${banner.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "600px",
              position: "relative",
              display: "flex",
              alignItems: "center"
            }}>
              {/* Nội dung banner */}
              <div style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                padding: "0 40px",
                maxWidth: "1200px",
                margin: "0 auto"
              }}>
                <div style={{
                  maxWidth: "600px",
                  color: "white",
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                }}>
                  <h2 style={{
                    fontSize: "3.5rem",
                    fontWeight: 700,
                    marginBottom: "1rem",
                    lineHeight: 1.2
                  }}>{banner.title}</h2>
                  <p style={{
                    fontSize: "1.5rem",
                    marginBottom: "2rem"
                  }}>{banner.subtitle}</p>
                  <a href={banner.buttonLink} style={{
                    display: "inline-block",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "12px 30px",
                    borderRadius: "30px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.3s",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    border: "none",
                    cursor: "pointer"
                  }}>{banner.buttonText}</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

// Custom arrows
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: "absolute",
      left: "20px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 10,
      background: "rgba(0,0,0,0.3)",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s"
    }}
    aria-label="Previous slide"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: "absolute",
      right: "20px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 10,
      background: "rgba(0,0,0,0.3)",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s"
    }}
    aria-label="Next slide"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

export default BannerSection;