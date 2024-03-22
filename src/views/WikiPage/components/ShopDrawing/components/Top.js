import { Box, Divider, Typography } from "@mui/material";
import React, { useRef } from "react";
import './styles.css'
const Top = () => {
    const containerRef = useRef(null);
    let isDragging = false;
    let startPosition = 0;
    let deltaX = 0;
  
    const handleMouseDown = (e) => {
      isDragging = true;
      startPosition = e.clientX - deltaX;
    };
  
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const scrollValue = e.clientX - startPosition;
      containerRef.current.scrollLeft -= scrollValue;
      startPosition = e.clientX;
    };
  
    const handleMouseUp = () => {
      isDragging = false;
    };
  
    const handleMouseLeave = () => {
      isDragging = false;
    };
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "40%",  }} 
        >
            <img src="/assets/images/img3.jpg" alt="img" style={{height:"85%", width:'85%',  border: "2px solid #000",}}/>
        </Box>
        <Box sx={{ width: "60%",}}>
            <Typography
            sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3, 
                WebkitBoxOrient: 'vertical',
            }}
            >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
            </Typography>
            <Divider sx={{borderWidth:1, mt:0.5}} />
            <Box
            className="custom-scroll"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
            sx={{mt:2, maxHeight:'35%', overflowY:'hidden', overflowX:'scroll',
            
        }}
            >
                <Box sx={{display:'flex'}}>
                    <img src="/assets/images/img1.webp" alt="img" style={{width:'100px'}}/>
                    <img src="/assets/images/img2.webp" alt="img" style={{width:'60px'}}/>
                    <img src="/assets/images/img1.webp" alt="img" style={{width:'100px'}}/>
                    <img src="/assets/images/img2.webp" alt="img" style={{width:'60px'}}/>
                    <img src="/assets/images/img1.webp" alt="img" style={{width:'100px'}}/>
                    <img src="/assets/images/img2.webp" alt="img" style={{width:'60px'}}/>
                    <img src="/assets/images/img1.webp" alt="img" style={{width:'100px'}}/>
                    <img src="/assets/images/img2.webp" alt="img" style={{width:'60px'}}/>
            
                </Box>
            </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Top;
