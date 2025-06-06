// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import {useLocation} from 'react-router-dom';
// import {StepLabel} from '@mui/material';
// import Delivery from './Delivery';
// import OrderSumary from './OrderSumary';
// const steps = ['Dang nhap', 'Chon mua san pham', 'Dat hang','Thanh toan'];

// export default function Checkout() {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const location = useLocation();
//   const querySearch = new URLSearchParams(location.search);
//   const step=querySearch.get("step");
//   console.log(location.search);
//   console.log(step);
     

  

  

  

//   const handleNext = () => {
    
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };



 

  

//   return (
//     <div className='px-10 lg:px-20'>
// <Box sx={{ width: '100%' }}>
//       <Stepper activeStep={step}>
//         {steps.map((label, index) => {
//             const stepProps ={};
//             const labelProps = {};
//             return (
//                 <Step key={label} {...stepProps}>
//                 <StepLabel {...labelProps}>
//               {label}
//             </StepLabel>
//           </Step>
//             )
          
//           })  }
//       </Stepper>
//       <div>
//         {activeStep === steps.length ? (
//           <React.Fragment>
//             <Typography sx={{ mt: 2, mb: 1 }}>
//               All steps completed - you&apos;re finished
//             </Typography>
           
//           </React.Fragment>
//         ) : (
//           <React.Fragment>
           
//             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//               <Button
//                 color="inherit"
//                 disabled={activeStep === 0}
//                 onClick={handleBack}
//                 sx={{ mr: 1 }}
//               >
//                 Back
//               </Button>
               
              
           
//             </Box>
//             <div className='mt-10'>
//                 {step==2?<Delivery/>:<OrderSumary/>}
//             </div>
//           </React.Fragment>
//         )}
//       </div>
//     </Box>
//     </div>
    
//   );
// }
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import Delivery from './Delivery';
import OrderSumary from './OrderSumary';

const steps = ['Đăng nhập', 'Chọn mua sản phẩm', 'Đặt hàng', 'Thanh toán'];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  const step = Number(querySearch.get('step')) || 0;

  React.useEffect(() => {
    setActiveStep(step);
  }, [step]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-10 bg-white rounded shadow-md">
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <span className="font-medium text-sm">{label}</span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="mt-10">
          {activeStep === steps.length ? (
            <Typography className="text-center text-green-600 font-semibold text-lg mt-5">
              🎉 Hoàn thành tất cả các bước!
            </Typography>
          ) : (
            <React.Fragment>
              <Box className="flex justify-between items-center mb-6">
                <Button
                  variant="outlined"
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ textTransform: 'none' }}
                >
                  Quay lại
                </Button>
                <Typography className="text-indigo-600 font-semibold">
                  Bước {activeStep + 1} / {steps.length}
                </Typography>
              </Box>

              <div className="p-4 border rounded-md shadow-sm bg-gray-50">
                {activeStep === 2 ? <Delivery /> : <OrderSumary />}
              </div>
            </React.Fragment>
          )}
        </div>
      </Box>
    </div>
  );
}
