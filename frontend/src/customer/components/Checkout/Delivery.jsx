// import React from 'react';
// import { Grid, Box, Button, TextField, Typography, Paper } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { createOrder } from '../../../State/Order/Action';
// import { store } from '../../../State/Store';

// const Delivery = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { order } = useSelector(store => store);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = new FormData(e.currentTarget);
//     const address = {
//       firstName: data.get("firstName"),
//       lastName: data.get("lastName"),
//       address: data.get("address"),
//       sodienthoai: data.get("sodienthoai")
//     };
//     const orderData = { address, navigate };
//     dispatch(createOrder(orderData));
//     console.log(order);
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 } }}>
//       <Grid container spacing={3}>
//         {/* Sidebar / Address */}
//         <Grid item xs={12} lg={5}>
//           <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: { xs: 'auto', lg: '32rem' }, overflowY: 'auto' }}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
//               Địa chỉ của bạn
//             </Typography>
//             {/* Có thể render AddressCard ở đây */}
//             <Button
//               fullWidth
//               sx={{
//                 mt: 2,
//                 bgcolor: '#7E5FBE',
//                 color: 'white',
//                 fontWeight: 600,
//                 '&:hover': { bgcolor: '#6844aa' },
//                 borderRadius: 2,
//               }}
//               size="large"
//               variant="contained"
//             >
//               Địa Chỉ Mới
//             </Button>
//           </Paper>
//         </Grid>

//         {/* Form nhập địa chỉ */}
//         <Grid item xs={12} lg={7}>
//           <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
//               Nhập địa chỉ giao hàng
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     required
//                     id="firstName"
//                     name="firstName"
//                     label="First Name"
//                     fullWidth
//                     autoComplete="given-name"
//                     variant="outlined"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     required
//                     id="lastName"
//                     name="lastName"
//                     label="Last Name"
//                     fullWidth
//                     autoComplete="family-name"
//                     variant="outlined"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     id="address"
//                     name="address"
//                     label="Địa chỉ"
//                     fullWidth
//                     multiline
//                     rows={3}
//                     autoComplete="street-address"
//                     variant="outlined"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     id="sodienthoai"
//                     name="sodienthoai"
//                     label="Số điện thoại"
//                     fullWidth
//                     autoComplete="tel"
//                     variant="outlined"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button
//                     type="submit"
//                     fullWidth
//                     size="large"
//                     variant="contained"
//                     sx={{
//                       mt: 1,
//                       bgcolor: '#7E5FBE',
//                       color: 'white',
//                       fontWeight: 600,
//                       '&:hover': { bgcolor: '#6844aa' },
//                       borderRadius: 2,
//                     }}
//                   >
//                     XÁC NHẬN ĐỊA CHỈ
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Delivery;
import React, { useState } from 'react';
import { Grid, Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../../State/Order/Action';
import { store } from '../../../State/Store';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '10px',
  marginTop: '10px'
};

const center = {
  lat: 21.028511, // Ví dụ: Hà Nội
  lng: 105.804817
};

const Delivery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order } = useSelector(store => store);
  const [location, setLocation] = useState(null);

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setLocation({ lat, lng });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      address: data.get("address"),
      sodienthoai: data.get("sodienthoai"),
      location: location, // thêm vị trí (lat, lng) vào đơn hàng
    };
    const orderStatus="PROCESSING"
    const orderData = { address,orderStatus, navigate };
    dispatch(createOrder(orderData));
    console.log(orderData);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Grid container spacing={3}>
        {/* Sidebar / Address */}
        <Grid item xs={12} lg={5}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: { xs: 'auto', lg: '32rem' }, overflowY: 'auto' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Địa chỉ của bạn
            </Typography>
            {/* Có thể render AddressCard ở đây */}
            <Button
              fullWidth
              sx={{
                mt: 2,
                bgcolor: '#7E5FBE',
                color: 'white',
                fontWeight: 600,
                '&:hover': { bgcolor: '#6844aa' },
                borderRadius: 2,
              }}
              size="large"
              variant="contained"
            >
              Địa Chỉ Mới
            </Button>
          </Paper>
        </Grid>

        {/* Form nhập địa chỉ */}
        <Grid item xs={12} lg={7}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Nhập địa chỉ giao hàng
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="family-name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Địa chỉ"
                    fullWidth
                    multiline
                    rows={3}
                    autoComplete="street-address"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="sodienthoai"
                    name="sodienthoai"
                    label="Số điện thoại"
                    fullWidth
                    autoComplete="tel"
                    variant="outlined"
                  />
                </Grid>

                {/* Google Map */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Chọn vị trí trên bản đồ (bấm vào bản đồ để chọn)
                  </Typography>
                  <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={location || center}
                      zoom={14}
                      onClick={handleMapClick}
                    >
                      {location && <Marker position={location} />}
                    </GoogleMap>
                  </LoadScript>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{
                      mt: 1,
                      bgcolor: '#7E5FBE',
                      color: 'white',
                      fontWeight: 600,
                      '&:hover': { bgcolor: '#6844aa' },
                      borderRadius: 2,
                    }}
                  >
                    XÁC NHẬN ĐỊA CHỈ
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Delivery;

