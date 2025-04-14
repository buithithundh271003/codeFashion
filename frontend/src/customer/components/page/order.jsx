// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const OrderPage = () => {
//   const [amount, setAmount] = useState(10000);
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/orderpay/create_payment_url', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount, bankCode: paymentMethod }),
//       });
//       const data = await response.json();
//       if (data.url) {
//         window.location.href = data.url;
//       }
//     } catch (error) {
//       console.error('Payment error:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="header clearfix">
//         <ul className="nav nav-pills pull-right">
//           <li role="presentation" className="active">
//             <a href="/orderpay/create_payment_url">Tạo mới đơn thanh toán</a>
//           </li>
//           <li role="presentation" className="active">
//             <a href="/order/querydr">API truy vấn kết quả thanh toán</a>
//           </li>
//           <li role="presentation" className="active">
//             <a href="/order/refund">API hoàn tiền giao dịch</a>
//           </li>
//         </ul>
//         <h3 className="text-muted">VNPAY DEMO</h3>
//       </div>

//       <div className="table-responsive">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Số tiền</label>
//             <input
//               type="number"
//               className="form-control"
//               id="amount"
//               name="amount"
//               placeholder="Số tiền"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />
//           </div>

//           <div className="form-group">
//             <label>Chọn Phương thức thanh toán:</label>
//             <div className="controls">
//               <label className="radio-inline">
//                 <input
//                   type="radio"
//                   name="bankCode"
//                   value=""
//                   checked={paymentMethod === ''}
//                   onChange={() => setPaymentMethod('')}
//                 />
//                 Mặc định
//               </label>
//               <label className="radio-inline">
//                 <input
//                   type="radio"
//                   name="bankCode"
//                   value="VNPAYQR"
//                   checked={paymentMethod === 'VNPAYQR'}
//                   onChange={() => setPaymentMethod('VNPAYQR')}
//                 />
//                 Thanh toán QR
//               </label>
//               <label className="radio-inline">
//                 <input
//                   type="radio"
//                   name="bankCode"
//                   value="VNBANK"
//                   checked={paymentMethod === 'VNBANK'}
//                   onChange={() => setPaymentMethod('VNBANK')}
//                 />
//                 Thanh toán qua ngân hàng
//               </label>
//             </div>
//           </div>

//           <button type="submit" className="btn btn-default">
//             Thanh toán
//           </button>
//         </form>
//       </div>

//       <footer className="footer">
//         <p>&copy; VNPAY {new Date().getFullYear()}</p>
//       </footer>
//     </div>
//   );
// };

// export default OrderPage;
// frontend/src/components/PaymentForm.js

import React, { useState } from 'react';
import axios from 'axios';

function PaymentForm() {
    const [amount, setAmount] = useState('');
    const [bankCode, setBankCode] = useState('');
    const [language, setLanguage] = useState('vn');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/orderpay/create_payment_url', {
                amount,
                bankCode,
                language,
            });

            // if (res.data && res.data.paymentUrl) {
            //     window.location.href = res.data.paymentUrl;
            // }
            if (res.data && res.data.paymentUrl) {
              window.location.href = res.data.paymentUrl;
          }
        } catch (err) {
            console.error("Payment Error:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Số tiền:</label>
                {/* <input value={amount} onChange={e => setAmount(e.target.value)} />
                 */}
                 <input
  type="number"
  value={amount}
  onChange={e => setAmount(Number(e.target.value))}
/>

            </div>
            <div>
                <label>Phương thức thanh toán:</label>
                <label><input type="radio" name="bankCode" value="" onChange={e => setBankCode(e.target.value)} defaultChecked /> VNPAYQR</label>
                <label><input type="radio" name="bankCode" value="VNPAYQR" onChange={e => setBankCode(e.target.value)} /> Ứng dụng VNPAYQR</label>
                <label><input type="radio" name="bankCode" value="VNBANK" onChange={e => setBankCode(e.target.value)} /> ATM</label>
                <label><input type="radio" name="bankCode" value="INTCARD" onChange={e => setBankCode(e.target.value)} /> Thẻ quốc tế</label>
            </div>
            <div>
                <label>Ngôn ngữ:</label>
                <label><input type="radio" name="language" value="vn" onChange={e => setLanguage(e.target.value)} defaultChecked /> Tiếng Việt</label>
                <label><input type="radio" name="language" value="en" onChange={e => setLanguage(e.target.value)} /> English</label>
            </div>
            <button type="submit">Thanh toán</button>
        </form>
    );
}

export default PaymentForm;
