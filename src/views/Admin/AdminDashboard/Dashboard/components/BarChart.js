import React from 'react'
import {Bar} from "react-chartjs-2"
import {Chart as ChartJS} from 'chart.js/auto'
import { Box } from '@mui/material'
const BarChart = ({chartData}) => {
  return (
    <div>
    <Bar data={chartData}/>
    </div>
  )
}

export default BarChart
