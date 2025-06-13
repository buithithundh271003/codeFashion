
// import React, { useEffect } from 'react';
// import { Container, Grid, TextField, Button, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUSer, login } from '../../State/Auth/Action';
// import Swal from 'sweetalert2';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const jwt = localStorage.getItem('jwt');
//   const { auth } = useSelector((store) => store);

//   useEffect(() => {
//     if (jwt) {
//       dispatch(getUSer(jwt));
//     }
//   }, [jwt, dispatch]);

//   useEffect(() => {
//     if (auth.user) {
//       Swal.fire({
//         icon: 'success',
//         title: 'Đăng nhập thành công',
//         toast: true,
//         position: 'top-end',
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//       });
//       navigate('/');
//     }
//   }, [auth.user, navigate]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = new FormData(e.currentTarget);
//     const userData = {
//       email: data.get('email'),
//       password: data.get('password'),
//     };
//     dispatch(login(userData));
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 8, px: { xs: 2, sm: 4 } }}>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <Typography variant="h5" align="center" gutterBottom>
//               Đăng nhập
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               required
//               autoComplete="email"
//               id="email"
//               name="email"
//               label="Email"
//               fullWidth
//               variant="outlined"
//               size="medium"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               required
//               autoComplete="current-password"
//               id="password"
//               name="password"
//               label="Mật khẩu"
//               fullWidth
//               type="password"
//               variant="outlined"
//               size="medium"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               size="large"
//               fullWidth
//               sx={{
//                 py: 1.2,
//                 bgcolor: '#9155FD',
//                 '&:hover': { bgcolor: '#7c3aed' },
//               }}
//             >
//               Đăng nhập
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//       <div
//         style={{
//           marginTop: '1rem',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'column',
//         }}
//       >
//         <Typography variant="body2" sx={{ mt: 2 }}>
//           Chưa có tài khoản?
//         </Typography>
//         <Button
//           onClick={() => navigate('/register')}
//           size="small"
//           sx={{ mt: 1 }}
//         >
//           Đăng ký ngay
//         </Button>
//       </div>
//     </Container>
//   );
// };

// export default Login;

// import React, { useEffect, useState } from 'react';
// import { 
//   Container, 
//   Grid, 
//   TextField, 
//   Button, 
//   Typography,
//   Box,
//   CircularProgress,
//   InputAdornment,
//   IconButton
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUSer, login } from '../../State/Auth/Action';
// import Swal from 'sweetalert2';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const jwt = localStorage.getItem('jwt');
//   const { auth } = useSelector((store) => store);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({
//     email: '',
//     password: ''
//   });

//   useEffect(() => {
//     if (jwt) {
//       dispatch(getUSer(jwt));
//     }
//   }, [jwt, dispatch]);

//   useEffect(() => {
//     if (auth.user) {
//       Swal.fire({
//         icon: 'success',
//         title: 'Đăng nhập thành công',
//         toast: true,
//         position: 'top-end',
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//       });
//       navigate('/');
//     }
//   }, [auth.user, navigate]);



//   const validateForm = (email, password) => {
//     const newErrors = { email: '', password: '' };
//     let isValid = true;

//     if (!email) {
//       newErrors.email = 'Vui lòng nhập email';
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = 'Email không hợp lệ';
//       isValid = false;
//     }

//     if (!password) {
//       newErrors.password = 'Vui lòng nhập mật khẩu';
//       isValid = false;
//     } else if (password.length < 6) {
//       newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
//       isValid = false;
//     }
//           let errorMessage = 'Đã xảy ra lỗi khi đăng nhập';
    
//     if (error.message === 'User not found') {
//       newErrors.message = 'Email không tồn tại';
//     } else if (error.message === 'Mat Khau sai') {
//       newErrors.message = 'Mật khẩu không chính xác';
//     } else {
     
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const data = new FormData(e.currentTarget);
//     const email = data.get('email');
//     const password = data.get('password');

//     if (validateForm(email, password)) {
//       const userData = { email, password };
//       dispatch(login(userData));
//     } else {
//       setLoading(false);
//     }
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <Container maxWidth="sm" sx={{ 
//       mt: 8, 
//       px: { xs: 2, sm: 4 },
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       minHeight: '70vh'
//     }}>
//       <Box 
//         component="form" 
//         onSubmit={handleSubmit}
//         sx={{
//           width: '100%',
//           backgroundColor: 'background.paper',
//           p: { xs: 2, sm: 4 },
//           borderRadius: 2,
//           boxShadow: 1
//         }}
//       >
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <Typography 
//               variant="h5" 
//               align="center" 
//               gutterBottom
//               sx={{ 
//                 fontWeight: 'bold',
//                 color: 'primary.main'
//               }}
//             >
//               Đăng nhập
//             </Typography>
//           </Grid>
          
//           <Grid item xs={12}>
//             <TextField
//               required
//               autoComplete="email"
//               id="email"
//               name="email"
//               label="Email"
//               fullWidth
//               variant="outlined"
//               size="medium"
//               error={!!errors.email}
//               helperText={errors.email}
//               onChange={() => setErrors({...errors, email: ''})}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   '& fieldset': {
//                       borderColor: errors.email ? 'error.main' : '',
//                   },
//                 },
//               }}
//             />
//           </Grid>
          
//           <Grid item xs={12}>
//             <TextField
//               required
//               autoComplete="current-password"
//               id="password"
//               name="password"
//               label="Mật khẩu"
//               fullWidth
//               type={showPassword ? 'text' : 'password'}
//               variant="outlined"
//               size="medium"
//               error={!!errors.password}
//               helperText={errors.password}
//               onChange={() => setErrors({...errors, password: ''})}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 )
//               }}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   '& fieldset': {
//                       borderColor: errors.password ? 'error.main' : '',
//                   },
//                 },
//               }}
//             />
//           </Grid>
          
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               size="large"
//               fullWidth
//               disabled={loading}
//               sx={{
//                 py: 1.5,
//                 bgcolor: '#9155FD',
//                 '&:hover': { bgcolor: '#7c3aed' },
//                 '&:disabled': {
//                   bgcolor: '#e0e0e0',
//                   color: '#a0a0a0'
//                 }
//               }}
//             >
//               {loading ? (
//                 <CircularProgress size={24} color="inherit" />
//               ) : (
//                 'Đăng nhập'
//               )}
//             </Button>
//           </Grid>
          
//           <Grid item xs={12}>
//             <Typography 
//               variant="body2" 
//               align="center"
//               sx={{ 
//                 mt: 1,
//                 color: 'text.secondary'
//               }}
//             >
             
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
      
//       <Box
//         sx={{
//           mt: 3,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'column',
//           width: '100%'
//         }}
//       >
//         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//           Chưa có tài khoản?
//         </Typography>
//         <Button
//           onClick={() => navigate('/register')}
//           size="small"
//           sx={{ 
//             mt: 1,
//             textTransform: 'none',
//             color: 'primary.main'
//           }}
//         >
//           Đăng ký ngay
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Login;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Container, Grid, TextField, Button, Typography, Box, CircularProgress,
  InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getUSer } from '../../State/Auth/Action';
import { API_BASE_URL } from "../../config/apiConfig";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const { auth } = useSelector((store) => store);

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    if (jwt) {
      dispatch(getUSer(jwt));
    }
  }, [jwt, dispatch]);

  useEffect(() => {
     if (auth.user) {
  
        if (auth.user.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
  }
  }, [auth, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    const { email, password } = form;

    if (!email) newErrors.email = 'Vui lòng nhập email';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email không hợp lệ';

    if (!password) newErrors.password = 'Vui lòng nhập mật khẩu';
    else if (password.length < 6) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validate()) return setLoading(false);

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/signin`, form);
      console.log("Login success:", res.data.message);
      localStorage.setItem("jwt", res.data.jwt); // <-- có thể cần nếu chưa có trong getUser()
      dispatch(getUSer(res.data.jwt));
    } catch (error) {
      setErrors({ general: error.response?.data?.message || "Đăng nhập thất bại" });
      console.error("Đăng nhập lỗi:", error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, minHeight: '70vh' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: { xs: 2, sm: 4 },
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Typography variant="h5" align="center" fontWeight="bold" color="primary.main" gutterBottom>
          Đăng nhập
        </Typography>

        {errors.general && (
          <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
            {errors.general}
          </Typography>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth required name="email" label="Email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth required name="password" label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth variant="contained" type="submit"
              disabled={loading}
              sx={{ py: 1.5, bgcolor: '#9155FD', '&:hover': { bgcolor: '#7c3aed' } }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng nhập'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box mt={3} textAlign="center">
        <Typography variant="body2">Chưa có tài khoản?</Typography>
        <Button onClick={() => navigate('/register')} sx={{ color: 'primary.main', textTransform: 'none' }}>
          Đăng ký ngay
        </Button>
      </Box>
    </Container>
  );
};

export default Login;

