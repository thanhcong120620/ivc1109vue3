<template>
    <div>
      <PieChart :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { Pie } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
  
  // Register Chart.js components
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
  
  export default defineComponent({
    name: 'PieChart',
    components: {
      PieChart: Pie,
    },
    props: {
      downPayment: Number,
      principal: Number,
      interest: Number,
    },
    setup(props) {
      const chartData = ref({
        labels: ['Trả trước', 'Gốc cần trả', 'Lãi cần trả'],
        datasets: [
          {
            data: [props.downPayment, props.principal, props.interest],
            backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
            hoverBackgroundColor: ['#66bb6a', '#ffb74d', '#e57373'],
          },
        ],
      });
  
      const chartOptions = ref({
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
        },
      });
  
      return {
        chartData,
        chartOptions,
      };
    },
  });
  </script>
  
  <style scoped>
  .chart-container {
    max-width: 300px;
    margin: 0 auto;
  }
  </style>
  