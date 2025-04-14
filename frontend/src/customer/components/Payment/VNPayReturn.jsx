import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config/apiConfig';

const VNPayReturn = () => {
    const [status, setStatus] = useState('processing');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/payment/vnpay_return${location.search}`
                );
                const data = await response.json();

                if (data.code === '00') {
                    setStatus('success');
                    // Cập nhật trạng thái đơn hàng
                    setTimeout(() => {
                        navigate('/orders');
                    }, 3000);
                } else {
                    setStatus('failed');
                }
            } catch (error) {
                console.error('Verification error:', error);
                setStatus('failed');
            }
        };

        verifyPayment();
    }, [location, navigate]);

    const renderContent = () => {
        switch (status) {
            case 'success':
                return (
                    <div className="text-center text-green-600">
                        <h2 className="text-2xl font-bold mb-4">Thanh toán thành công!</h2>
                        <p className="mb-4">Cảm ơn bạn đã mua hàng. Bạn sẽ được chuyển đến trang đơn hàng sau 3 giây.</p>
                    </div>
                );
            case 'failed':
                return (
                    <div className="text-center text-red-600">
                        <h2 className="text-2xl font-bold mb-4">Thanh toán thất bại!</h2>
                        <p className="mb-4">Đã có lỗi xảy ra trong quá trình thanh toán.</p>
                        <button
                            onClick={() => navigate('/cart')}
                            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                        >
                            Thử lại
                        </button>
                    </div>
                );
            default:
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Đang xử lý thanh toán...</h2>
                        <div className="loader"></div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                {renderContent()}
            </div>
        </div>
    );
};

export default VNPayReturn; 