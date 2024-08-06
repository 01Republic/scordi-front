import React from 'react';
import {Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement} from 'chart.js';
import {Chart} from 'react-chartjs-2';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, LineElement);

const labels = ['3/10', '3/11', '3/12', '3/13', '3/14', '3/15', '3/16'];
const PRICE_DATA = [650, 590, 800, 810, 560, 550, 400];

const data = {
    labels,
    datasets: [
        {
            type: 'bar' as const,
            backgroundColor: '#4593FC',
            data: PRICE_DATA,
            barThickness: 20, // width of bar
            datalabels: {display: false},
            options: {},
            borderRadius: 3,
        },
    ],
};

const options = {
    maintainAspectRatio: false,
    scales: {
        y: {
            display: false, // hide yAxis
            grid: {
                display: false, // hide yAxis lines
                drawBorder: false,
                drawOnChartArea: false,
                drawTicks: false,
            },
        },
        x: {grid: {display: false, drawTicks: false, drawBorder: true}},
    },
};

export const BarChart = () => (
    <div className="">
        <Chart type="bar" data={data} options={options} />
    </div>
);
