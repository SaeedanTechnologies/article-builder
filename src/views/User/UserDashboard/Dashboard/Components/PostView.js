import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Box } from '@mui/material';
const PostView = ({ chartData }) => {
    return (
        <>
            <Box sx={{ height: '75%' }}>
                <Bar data={chartData} options={{ maintainAspectRatio: false }} />
            </Box>
        </>
    );
};

export default PostView;
