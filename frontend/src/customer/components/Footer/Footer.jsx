// // import React from "react";
// import { Button, Grid, Typography, Box } from "@mui/material";

// const Footer = () => {
//   const sections = [
//     {
//       title: "Fashion",
//       links: ["About us", "Blog", "Jobs", "Contact"],
//     },
//     {
//       title: "Fashion",
//       links: ["About us", "Blog", "Jobs", "Contact"],
//     },
//     {
//       title: "Explore",
//       links: ["About us", "Blog", "Jobs", "Contact"],
//     },
//     {
//       title: "Help",
//       links: ["About us", "Blog", "Jobs", "Contact"],
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         bgcolor: "black",
//         color: "white",
//         py: 5,
//         px: 2,
//         mt: 10,
//         textAlign: "center",
//       }}
//     >
//       <Grid container spacing={4}>
//         {sections.map((section, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <Typography variant="h6" gutterBottom sx={{ pb: 2 }}>
//               {section.title}
//             </Typography>
//             {section.links.map((link, idx) => (
//               <Button
//                 key={idx}
//                 sx={{
//                   color: "white",
//                   textTransform: "none",
//                   display: "block",
//                   mb: 1,
//                 }}
//               >
//                 {link}
//               </Button>
//             ))}
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Footer;
import React from 'react'
import {Button, Grid, Typography } from '@mui/material'
const Footer = () => {
  return (
    <div id='about'>
      <Grid className='z-index-0 bottom-0 bg-black text-white text-center mt-10'
        container
        sx={{bgcolor:"black",color:"white", py:3}}
      >
        <Grid item xs={12} sm={6} md={3}>
        <Typography className='pb-5' variant='h6'>
        fashion store
        </Typography>
        <div>
        <Button className='pb-5' variant='h6' gutterBottom>
        About us
        </Button>
        </div>
        <div>
        <Button className='pb-5' variant='h6' gutterBottom>
        Blog
        </Button>
        </div>
        <div>
        <Button className='pb-5' variant='h6' gutterBottom>
        Jobs
        </Button>
        </div>
        <div>
        <Button className='pb-5' variant='h6' gutterBottom>
        Contact
        </Button>
        </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <Typography className='pb-5' variant='h6'>
        fashion store
        </Typography>
        <div>
        <Button className='pb-5' variant='h6' gutterBottom>
        About us
        </Button>
        </div>
        <div>
        <Button className='pb-5' variant='h6' gutterBottom>
        Blog
        </Button>
        </div>
        <div>
        <Button className='pb-5' variant='h6' gutterBottom>
        Jobs
        </Button>
        </div>
        <div>
        <Button className='pb-5' variant='h6' gutterBottom>
        Contact
        </Button>
        </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <Typography className='pb-5' variant='h6'>
        fashion store
        </Typography>
        <div>
        <Button className='pb-5' variant='h6' gutterBottom>
        About us
        </Button>
        </div>
        <div>
        <Button className='pb-5' variant='h6' gutterBottom>
        Blog
        </Button>
        </div>
        <div>
        <Button className='pb-5' variant='h6' gutterBottom>
        Jobs
        </Button>
        </div>
        <div>
        <Button className='pb-5' variant='h6' gutterBottom>
        Contact
        </Button>
        </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <Typography className='pb-5' variant='h6'>
        fashion store
        </Typography>
        <div>
        <Button className='pb-5' variant='h6' gutterBottom>
        About us
        </Button>
        </div>
        <div>
        <Button className='pb-5' variant='h6' gutterBottom>
        Blog
        </Button>
        </div>
        <div>
        <Button className='pb-5' variant='h6' gutterBottom>
        Jobs
        </Button>
        </div>
        <div>
        <Button className='pb-5' variant='h6' gutterBottom>
        Contact
        </Button>
        </div>
        </Grid>
        </Grid>
    </div>
  )
}

export default Footer