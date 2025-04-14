// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { findProducts } from "../../../State/Product/Action";
// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';

// const HomeSectionCarosel = ({ sectionName }) => {
//     const dispatch = useDispatch();
//     const { product } = useSelector(store => store);

//     useEffect(() => {
//         dispatch(findProducts());
//     }, [dispatch]);

//     const responsive = {
//         0: { items: 1 },
//         568: { items: 2 },
//         768: { items: 3 },
//         1024: { items: 4 },
//     };

//     const items = product?.products?.map((product) => (
//         <div key={product.id} style={styles.productCard}>
//             <div style={styles.productImageContainer}>
//                 <img 
//                     src={product.images[0]?.thumbUrl || product.images[0]?.response?.thumbUrl}
//                     alt={product.name} 
//                     style={styles.productImage}
//                 />
//             </div>
//             <div style={styles.productInfo}>
//                 <p style={styles.productPrice}>{product.price.toLocaleString('vi-VN')}₫</p>
//                 <h3 style={styles.productName}>{product.title}</h3>
//             </div>
//         </div>
//     ));

//     return (
//         <div style={styles.sectionContainer}>
//             <div style={styles.container}>
//                 <h2 style={styles.sectionTitle}>{sectionName}</h2>
//                 <AliceCarousel
//                     mouseTracking
//                     items={items}
//                     responsive={responsive}
//                     disableDotsControls
//                     disableButtonsControls
//                     infinite
//                 />
//             </div>
//         </div>
//     );
// };

// const styles = {
//     sectionContainer: {
//         backgroundColor: '#fff',
//         padding: '40px 0',
//         fontFamily: "'Helvetica Neue', Arial, sans-serif",
//     },
//     container: {
//         maxWidth: '1200px',
//         margin: '0 auto',
//         padding: '0 15px',
//     },
//     sectionTitle: {
//         fontSize: '24px',
//         fontWeight: '400',
//         marginBottom: '30px',
//         textAlign: 'center',
//         color: '#000',
//         textTransform: 'uppercase',
//         letterSpacing: '5px',
//     },
//     productCard: {
//         margin: '0 15px',
//         textAlign: 'center',
//     },
//     productImageContainer: {
//         marginBottom: '15px',
//         overflow: 'hidden',
//     },
//     productImage: {
//         width: '100%',
//         height: 'auto',
//         display: 'block',
//     },
//     productInfo: {
//         padding: '0 10px',
//     },
//     productName: {
//         fontSize: '14px',
//         fontWeight: '400',
//         margin: '5px 0',
//         color: '#000',
//         lineHeight: '1.4',
//         textTransform: 'uppercase',
//     },
//     productPrice: {
//         fontSize: '14px',
//         fontWeight: '700',
//         color: '#000',
//         margin: '0',
//     },
// };

// export default HomeSectionCarosel;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from "../../../State/Product/Action";
import {useNavigate,useLocation, useSearchParams} from "react-router-dom"

const HomeSectionCarosel = ({ sectionName }) => {
    const dispatch = useDispatch();
    const { product } = useSelector(store => store);
const navigate = useNavigate();
    useEffect(() => {
        dispatch(findProducts());
    }, [dispatch]);

    return (
        <div style={styles.sectionContainer}>
            <div style={styles.container}>
                <h2 style={styles.sectionTitle}>{sectionName}</h2>
                <div style={styles.productGrid}>
                    {product?.products?.map((product) => (
                        <div key={product.id} style={styles.productCard} onClick={()=>navigate(`/product/${product?._id}`)}>
                            <div style={styles.productImageContainer}>
                                <img 
                                    src={product.images[0]?.thumbUrl || product.images[0]?.response?.thumbUrl}
                                    alt={product.name} 
                                    style={styles.productImage}
                                />
                            </div>
                            <div style={styles.productInfo}>
                                <p style={styles.productPrice}>{product.price.toLocaleString('vi-VN')}₫</p>
                                <h3 style={styles.productName}>{product.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    sectionContainer: {
        backgroundColor: '#fff',
        padding: '40px 0',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 15px',
    },
    sectionTitle: {
        fontSize: '24px',
        fontWeight: '400',
        marginBottom: '30px',
        textAlign: 'center',
        color: '#000',
        textTransform: 'uppercase',
        letterSpacing: '5px',
    },
    productGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '30px',
        justifyContent: 'center',
    },
    productCard: {
        width: '220px',
        textAlign: 'center',
        border: '1px solid #eee',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    productImageContainer: {
        marginBottom: '15px',
        overflow: 'hidden',
        height: '200px',
    },
    productImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    productInfo: {
        padding: '0 10px',
    },
    productName: {
        fontSize: '14px',
        fontWeight: '400',
        margin: '5px 0',
        color: '#000',
        lineHeight: '1.4',
        textTransform: 'uppercase',
    },
    productPrice: {
        fontSize: '14px',
        fontWeight: '700',
        color: '#000',
        margin: '0',
    },
};

export default HomeSectionCarosel;
