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

                // console.log(res1);
            // if (res.data&& res.data.paymentUrl) {
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