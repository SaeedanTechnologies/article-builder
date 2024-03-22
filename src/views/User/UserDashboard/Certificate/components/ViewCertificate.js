import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, styled } from '@mui/material'
import React, {useRef} from 'react'
import { useLocation } from 'react-router'
import Page from '../../../../../components/page'
import { Download } from '@mui/icons-material'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
const StyledRoot = styled(Box)(({theme})=> ({
    padding:theme.spacing(10,5),
    height:'90vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
}))
const ViewCertificate = () => {
    const {state} = useLocation()
    const pdfRef = useRef()
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas (input).then((canvas) => {
    const imgData = canvas. toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4', true);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas. height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX= (pdfWidth - imgWidth * ratio) / 2;
    const imgY= 30; 
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save('invoice.pdf');
});
    };
  return (
    <Page title="Download Certificate">
      <StyledRoot ref={pdfRef}>
      <Card sx={{mt:15}}>
      <CardMedia
        component="img"
        alt="Certificate Image"
        style={{maxHeight:'50vh', width:'100%'}}
        image={state.img}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div" fontWeight="bold">
         {state.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {state.date}
        </Typography>
      </CardContent>
    </Card>
      </StyledRoot>
      <Box sx={{display:'flex', justifyContent:'center'}}>
<Button variant='contained' className='bg-black' 
endIcon={<Download />} onClick={downloadPDF}>Download</Button>
      </Box>
    </Page>
  )
}

export default ViewCertificate
