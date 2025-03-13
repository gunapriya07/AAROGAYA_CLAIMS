import React, { useState, useEffect, useRef } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";



import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
  } from "@material-tailwind/react";
// import {Accordi}
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
import Footer from './Footer';
import logo from "../assets/download.webp";
// import title_img from "../assets/download.webp";
// Custom theme to match the design
// import Register from "./Register";




const theme = createTheme({
 palette: {
   primary: {
     main: '#ff6b81',
   },
   secondary: {
     main: '#4fc3f7',
   },
 },
 typography: {
   fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
 },
});


const LANDING = () => {
  const [open, setOpen] = useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    const sliderRef = useRef(null);
    const [position, setPosition] = useState(0);
    const totalItems = 4;
    const itemWidth = 288; // 72*4 = 288px (w-72)
    const gap = 32; // gap-8 = 32px
    const slideWidth = itemWidth + gap;
    const totalWidth = slideWidth * totalItems;

    useEffect(() => {
        const intervalId = setInterval(() => {
          setPosition((prevPosition) => {
            // When we reach the end, reset to beginning
            if (prevPosition <= -(totalWidth - slideWidth)) {
              return 0;
            }
            // Move left by one item width + gap
            return prevPosition - slideWidth;
          });
        }, 3000); // Slide every 3 seconds
    
        return () => clearInterval(intervalId);
      }, []);


 return (

   <ThemeProvider theme={theme}>
    {/* <img src={logo} alt="" /> */}
     <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-400 to-yellow-300">
       {/* Navigation */}
       <nav className="flex justify-between items-center p-4">
       <div className="flex items-center">
       <img src={logo} alt="logo_aarocyaclaim" className="w-12 h-12 mr-2" />
       <Typography variant="h6" className="text-white font-bold">
        AAROCYACLAIM
        </Typography>
        </div>
         <div className="flex items-center space-x-4">
         <Link to="/register">
  <Button
    variant="contained"
    color="inherit"
    className="text-pink-500 font-medium"
    style={{ borderRadius: '20px' }}
  >
    Register
  </Button>
</Link>
         </div>
       </nav>


       {/* Hero Section */}
       <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
         {/* Left Content */}
         <div className="space-y-6">
           <Typography variant="h2" className="text-white font-bold text-4xl md:text-5xl">
           Process 10x more claims.
           </Typography>
           <Typography variant="subtitle1" className="text-white">
           No more paperwork nightmares—
             <br />just quick and easy claims!"
           </Typography>
             <br />
           <Button
             variant="contained"
             color="inherit"
             className="font-medium px-6"
             style={{ borderRadius: '20px' }}
           >
            Get Started
           </Button>
         </div>


         {/* Right Illustration */}
         <div className="flex justify-center">
           <div className="relative w-full max-w-md">
             {/* This would be replaced with actual SVG or image components */}
             <div className="w-64 h-64 bg-white bg-opacity-10 rounded-full absolute top-0 right-0"></div>
             <div className="relative z-10">
               <svg className="w-full h-auto" viewBox="0 0 400 300" fill="none">
                 {/* Computer screens */}
                 <rect x="150" y="100" width="120" height="100" fill="#4fc3f7" rx="5" />
                 <rect x="155" y="105" width="110" height="70" fill="white" rx="2" />
                 <rect x="230" y="120" width="80" height="80" fill="#4fc3f7" rx="5" transform="rotate(-15)" />
                 <rect x="235" y="125" width="70" height="50" fill="white" rx="2" transform="rotate(-15)" />
                
                 {/* People illustrations */}
                 <circle cx="170" cy="160" r="10" fill="#ff6b81" />
                 <rect x="165" y="170" width="10" height="20" fill="#ff6b81" />
                 <rect x="155" y="180" width="10" height="15" fill="#ff6b81" transform="rotate(-30)" />
                 <rect x="175" y="180" width="10" height="15" fill="#ff6b81" transform="rotate(30)" />
                
                 {/* Paper plane */}
                 <path d="M380 120 L350 140 L380 160 Z" fill="white" />
                 <path d="M350 140 L320 130 L340 150 Z" fill="#b3e0ff" />
                
                 {/* Books and accessories */}
                 <rect x="280" y="180" width="40" height="50" fill="#3949ab" rx="2" />
                 <rect x="285" y="185" width="30" height="40" fill="white" />
                 <rect x="275" y="175" width="40" height="10" fill="#1a237e" />
               </svg>
             </div>
           </div>
         </div>
       </div>


       {/* Wave design */}
       <div className="w-full">
         <svg viewBox="0 0 1440 120" fill="white" className="w-full">
           <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
         </svg>
       </div>


       {/* Content Section */}
       <div className="bg-white py-16">
         <div className="container mx-auto px-4">
           <Typography variant="h3" className="text-gray-800 text-center font-bold text-3xl mb-12 relative">
            Zero Hassle
             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-pink-500 mt-2"></div>
           </Typography>


           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
             <div className="space-y-4">
               <Typography variant="h4" className="text-gray-800 font-bold text-2xl">
               "No paperwork, no stress—just submit your claim online."
               </Typography>
             </div>
            
             <div className="bg-gray-100 rounded-lg p-4 shadow-md">
               <div className="bg-gray-200 w-full h-48 rounded flex items-center justify-center">
                 <div className="w-32 h-32 bg-red-400 rounded-lg"></div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>

     {/* Sliding Divs */}
     <div className='bg-white py-16'>
       <div className="container mx-auto px-4">
           <Typography variant="h3" className="text-gray-800 text-center font-bold text-3xl mb-12 relative">
           Get Approved & Paid Faster
             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-pink-500 mt-2"></div>
           </Typography>
       </div>
       <div className="relative w-full overflow-hidden p-20">
           <div
               ref={sliderRef}
               className="flex gap-8 transition-transform duration-1000 ease-in-out"
               style={{ transform: `translateX(${position}px)` }}
           >
               <div className="w-72 h-72 bg-red-400 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xl shadow-lg shadow-pink-500/50 p-2 font-semibold italic text-center">
               "Faster claims, better care—because your health shouldn't wait."
               </div>
               <div className="w-72 h-72 bg-red-400 rounded-full flex-shrink-0 flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-500/50 p-2 font-semibold italic text-center">
               Seamless, secure, and stress-free healthcare claims at your fingertips. </div>
               <div className="w-72 h-72 bg-red-400 rounded-full flex-shrink-0 flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-500/50 p-2 font-semibold italic text-center">
               "More transparency, less friction—your claims, your control."</div>
               <div className="w-72 h-72 bg-red-400 rounded-full flex-shrink-0 flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-500/50 p-2 font-semibold italic text-center">
               "Your health, your records, your peace of mind—simplified claims processing."</div>
               <div className="w-72 h-72 bg-red-400 rounded-full flex-shrink-0 flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-500/50 p-2 font-semibold italic text-center">
               "AI-powered claims processing—faster approvals, zero hassle."</div>
               <div className="w-72 h-72 bg-red-400 rounded-full flex-shrink-0 flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-500/50 p-2 font-semibold italic text-center">
               "Medical claims, made effortless. Focus on your health, we’ll handle the rest."</div>
               <div className="w-72 h-72 bg-red-400 rounded-full flex-shrink-0 flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-500/50 p-2 font-semibold italic text-center">
               "Transforming healthcare claims—instant, accurate, and secure."</div>
               <div className="w-72 h-72 bg-red-400 rounded-full flex-shrink-0 flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-500/50 p-2 font-semibold italic text-center">
               "Because your healthcare journey should be smooth, not stressful."
</div>
           </div>
   </div>


       </div>


       {/* Cards Section */}
       <div className='bg-white'>
           <div className='container mx-auto px-4'>
               <Typography variant='h3' className='text-gray-800 text-center font-bold text-3xl mb-12 relative'>
               Instant Processing
                   <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-pink-500 mt-7'></div>
               </Typography>
           </div>


           <div className='flex justify-center items-center gap-15'>
           <Card className="mt-6 w-65 shadow-lg shadow-pink-500/50">
               <CardHeader color="blue-gray" className="relative h-56">
                   <img
                   src="./src/assets/imgLanding.jpg"
                   alt="card-image"
                   />
               </CardHeader>
               <CardBody>
                   <Typography variant="h5" color="blue-gray" className="mb-2">
                   ✔️ 24/7 Claim Tracking
                   </Typography>
                   <Typography>
                   "Check your claim status anytime, anywhere."
                   </Typography>
               </CardBody>
           </Card>


           <Card className="mt-6 w-65 shadow-lg shadow-pink-500/50">
               <CardHeader color="blue-gray" className="relative h-56">
                   <img
                   src="./src/assets/img2.jpg"
                   alt="card-image"
                   />
               </CardHeader>
               <CardBody>
                   <Typography variant="h5" color="blue-gray" className="mb-2">
                   📑 View My Claims
                   </Typography>
                   <Typography>
                   "Track your claims and check approval status."
                   </Typography>
               </CardBody>
           </Card>


           <Card className="mt-6 w-65 shadow-lg shadow-pink-500/50">
               <CardHeader color="blue-gray" className="relative h-56">
                   <img
                   src="./src/assets/img3.jpg"
                   alt="card-image"
                   />
               </CardHeader>
               <CardBody>
                   <Typography variant="h5" color="blue-gray" className="mb-2">
                   🔒 End-to-End Encryption
                   </Typography>
                   <Typography>
                   "We protect your data with banking-level security."
                   </Typography>
               </CardBody>
           </Card>
           </div>
       </div>
      
       {/* Accordians */}
       <div className='bg-white py-16'>
           <div className='container mx-auto px-4'>
               <Typography variant='h3' className='text-gray-800 text-center font-bold text-3xl mb-12 relative'>
                 24/7 Claim Tracking
                   <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-pink-500 mt-7'></div>
               </Typography>
               <div className='p-20 gap-20'>


                   <div>
                       <Accordion open={open === 1} className="mb-2 rounded-lg border border-pink-500 px-4 cursor-pointer">
                           <AccordionHeader
                           onClick={() => handleOpen(1)}
                           className={`border-b-0 transition-colors ${
                               open === 1 ? "text-pink-500 hover:!text-pink-700" : ""
                           }`}
                           >
                          How do I submit a claim?
                           </AccordionHeader>
                           <AccordionBody className="pt-0 text-base font-normal">
                           You can submit a claim through our platform by providing your name, email, claim amount, and a description of the claim. You can also upload supporting documents like medical bills or prescriptions.
                           </AccordionBody>
                       </Accordion>
                   </div>


                   <div>
                       <Accordion open={open === 2} className="mb-2 rounded-lg border border-pink-500 px-4 cursor-pointer">
                           <AccordionHeader
                           onClick={() => handleOpen(2)}
                           className={`border-b-0 transition-colors ${
                               open === 2 ? "text-pink-500 hover:!text-pink-700" : ""
                           }`}
                           >
                          How can I track the status of my claim?
                           </AccordionHeader>
                           <AccordionBody className="pt-0 text-base font-normal">
                           Once you submit a claim, you can track its status (Pending, Approved, or Rejected) in your dashboard. You will also receive updates via email.
                           </AccordionBody>
                       </Accordion>
                   </div>
              
                   <div>
                       <Accordion open={open === 3} className="rounded-lg border border-pink-500 px-4 ">
                           <AccordionHeader
                           onClick={() => handleOpen(3)}
                           className={`border-b-0 transition-colors ${
                               open === 3 ? "text-pink-500 hover:!text-pink-700" : ""
                           }`}
                           >
                           How do I know how much of my claim will be reimbursed?
                           </AccordionHeader>
                           <AccordionBody className="pt-0 text-base font-normal">
                           The insurer will review your claim and determine the approved amount based on your policy coverage. This will be reflected in your dashboard once reviewed.
                           </AccordionBody>
                       </Accordion>
                   </div>


               </div>


           </div>
       </div>
        {/* <Footer/> */}/
        <Footer/>
      
   </ThemeProvider>


   
 );
};


export default LANDING;

