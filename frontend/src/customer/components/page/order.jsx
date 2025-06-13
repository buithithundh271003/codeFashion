// import React, { useState } from 'react';
// import axios from 'axios';

// function PaymentForm() {
//     const [bankCode, setBankCode] = useState('');
//     const [language, setLanguage] = useState('vn');
//      const searchParams = new URLSearchParams(location.search);
//      const orderId = searchParams.get("order_id")
//      const amount=searchParams.get("order_id")
//      console.log(orderId,amount)
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:4000/orderpay/create_payment_url', {
//                 amount,
//                 bankCode,
//                 language,
//                 orderId
//             });

//                 // console.log(res1);
//             // if (res.data&& res.data.paymentUrl) {
//             //     window.location.href = res.data.paymentUrl;
//             // }
//             if (res.data && res.data.paymentUrl) {
//               window.location.href = res.data.paymentUrl;
//           }
//         } catch (err) {
//             console.error("Payment Error:", err);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Số tiền:</label>
//                 {/* <input value={amount} onChange={e => setAmount(e.target.value)} />
//                  */}
//                  <input
//   type="number"
//   value={amount}
// />

//             </div>
//             <div>
//                 <label>Phương thức thanh toán:</label>
//                 <label><input type="radio" name="bankCode" value="" onChange={e => setBankCode(e.target.value)} defaultChecked /> VNPAYQR</label>
//                 <label><input type="radio" name="bankCode" value="VNPAYQR" onChange={e => setBankCode(e.target.value)} /> Ứng dụng VNPAYQR</label>
//                 <label><input type="radio" name="bankCode" value="VNBANK" onChange={e => setBankCode(e.target.value)} /> ATM</label>
//                 <label><input type="radio" name="bankCode" value="INTCARD" onChange={e => setBankCode(e.target.value)} /> Thẻ quốc tế</label>
//             </div>
//             <div>
//                 <label>Ngôn ngữ:</label>
//                 <label><input type="radio" name="language" value="vn" onChange={e => setLanguage(e.target.value)} defaultChecked /> Tiếng Việt</label>
//                 <label><input type="radio" name="language" value="en" onChange={e => setLanguage(e.target.value)} /> English</label>
//             </div>
//             <button type="submit">Thanh toán</button>
//         </form>
//     );
// }

// export default PaymentForm;
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Radio, Button, Typography, Card, message } from 'antd';
import { API_BASE_URL } from "../../../config/apiConfig"

const { Title } = Typography;

const PaymentForm = () => {
  const [bankCode, setBankCode] = useState('');
  const [language, setLanguage] = useState('vn');

  const searchParams = new URLSearchParams(window.location.search);
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("totalAmount");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/orderpay/create_payment_url`, {
        amount,
        bankCode,
        language,
        orderId
      });
      console.log(res)

      if (res.data && res.data.url) {
        window.location.href = res.data.url;
      } else {
        message.error("Không tạo được URL thanh toán!");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      message.error("Có lỗi xảy ra khi thanh toán.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <Card
        title={<Title level={3} style={{ margin: 0 }}>Thanh toán đơn hàng</Title>}
        bordered
        style={{ width: 400 }}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Số tiền:">
            <div style={{ background: '#f0f2f5', padding: '8px 12px', borderRadius: 4 }}>
              {amount} VND
            </div>
          </Form.Item>

          <Form.Item label="Phương thức thanh toán:">
            <Radio.Group onChange={e => setBankCode(e.target.value)} defaultValue="">
              <Radio value="">VNPAYQR</Radio>
              <Radio value="VNPAYQR">Ứng dụng VNPAYQR</Radio>
              <Radio value="VNBANK">ATM</Radio>
              <Radio value="INTCARD">Thẻ quốc tế</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Ngôn ngữ:">
            <Radio.Group onChange={e => setLanguage(e.target.value)} defaultValue="vn">
              <Radio value="vn">Tiếng Việt</Radio>
              <Radio value="en">English</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Thanh toán
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PaymentForm;
