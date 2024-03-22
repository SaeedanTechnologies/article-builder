import React from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
import { Box } from '@mui/material';
const ProfileChart = ({ chartData }) => {
    return (
        <>
            <Line data={chartData} />

        </>

    );
};

export default ProfileChart;
