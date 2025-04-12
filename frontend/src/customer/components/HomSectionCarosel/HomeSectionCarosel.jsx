import React, { useState } from 'react'
// import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
// import AliceCarousel from 'react-alice-carousel';
// import { Button } from '@mui/material'
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import img from "../../../organic-1.0.0/images/product-thumb-1.png"

// import { useNavigate } from 'react-router-dom';
// const responsive = {
//     0: { items: 1 },
//     720: { items: 3 },
//     1024: { items: 4.5 },
// };


        

    
        

        

import { useNavigate } from 'react-router-dom';
const HomeSectionCarosel = ({ data, sectionName, danhmuc }) => {
    const navigate = useNavigate()
    const [activeIndex, setActivIndex] = useState(0);
    
    return (
        <>
            <div className="bg-white-900 py-16">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-black mb-8">{sectionName}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {data.filter((item, index) => (index < 4)).map((item, index) => {
                            return (
                                <div className="product-item bg-white p-4" style={{
                                    borderRadius: "8px",
                                    backgroundColor: "#fff",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                }}>
                                    {/* Product Image */}
                                    <div style={{
                                        marginBottom: "16px",
                                        textAlign: "center",
                                    }}>
                                        <img 
                                            src={img}
                                            alt={item.title} 
                                            style={{
                                                width: "100%",
                                                height: "160px",
                                                objectFit: "contain"
                                            }}
                                        />
                                    </div>

                                    {/* Product Title */}
                                    <h3 style={{
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        textAlign: "center",
                                        marginBottom: "8px",
                                        color: "#1a1a1a"
                                    }}>{item.title || "Sharp Cheddar Cheese Block"}</h3>

                                    {/* Ratings */}
                                    <div style={{
                                        textAlign: "center",
                                        color: "#666",
                                        marginBottom: "8px"
                                    }}>
                                        (32)
                                    </div>

                                    {/* Price Section */}
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                        marginBottom: "16px"
                                    }}>
                                        <del style={{
                                            color: "#999",
                                            fontSize: "14px"
                                        }}>$14.00</del>
                                        <span style={{
                                            fontSize: "18px",
                                            fontWeight: "600",
                                            color: "#1a1a1a"
                                        }}>$12.00</span>
                                        <span style={{
                                            fontSize: "12px",
                                            padding: "2px 8px",
                                            backgroundColor: "#f5f5f5",
                                            border: "1px solid #ddd",
                                            borderRadius: "4px",
                                            color: "#666"
                                        }}>10% OFF</span>
                                    </div>

                                    {/* Add to Cart Section */}
                                    <div style={{
                                        display: "flex",
                                        gap: "8px",
                                        alignItems: "center"
                                    }}>
                                        <div style={{
                                            width: "10px",
                                            position: "relative"
                                        }}>
                                            
                                        
                                        </div>
                                        <button onClick={() => navigate(`/product/${item?._id}`)} style={{
                                            flex: 1,
                                            padding: "8px 16px",
                                            backgroundColor: "#4CAF50",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            fontSize: "14px",
                                            fontWeight: "500"
                                        }}>
                                            Xem ngay
                                        </button>
                                        <button style={{
                                            padding: "8px",
                                            border: "1px solid #ddd",
                                            borderRadius: "4px",
                                            backgroundColor: "white",
                                            cursor: "pointer",
                                            width: "40px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            ♡
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className='my-5px'>
                        <button onClick={() => navigate(`/${danhmuc}`)} type="button" className="my-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                            Khám phá thêm
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default HomeSectionCarosel
