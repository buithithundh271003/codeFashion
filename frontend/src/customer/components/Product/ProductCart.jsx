import React from 'react'
import "./Productcard.css"
import {useNavigate} from 'react-router-dom'
const ProductCard = ({product}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/product/${product?._id}`)}className='productCard w-[15rem] m-3 transition-all cursor-pointer'>
       <div key={product.id} style={styles.productCard} onClick={()=>navigate(`/product/${product?._id}`)}>
                            <div style={styles.productImageContainer}>
                                <img 
                                    src={product.images[0]?.response?.urls?.[0]?.url || product.images[0]?.response?.urls?.[0]?.url}
                                    alt={product.name} 
                                    style={styles.productImage}
                                />
                            </div>
                            <div style={styles.productInfo}>
                                <p style={styles.productPrice}>{product.price.toLocaleString('vi-VN')}₫</p>
                                <h3 style={styles.productName}>{product.title}</h3>
                            </div>
                        </div>
      
    </div>
  )
}
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
export default ProductCard
