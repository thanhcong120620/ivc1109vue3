<template>
    <div>
      
      
      <!-- Line Chart -->
      <div ref="lineChartContainer" style="width: 100%; height: 400px; margin-bottom: 20px;"></div>
      
      
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import * as echarts from 'echarts';
  
  
  const lineChartContainer = ref(null);
  
  
  
  const initLineChart = () => {
    const lineChartInstance = echarts.init(lineChartContainer.value);
  
    const lineOptions = {
      title: {
        text: ''
      },
      tooltip: {},
      legend: {
        data: ['Revenue', 'Profit']
      },
      xAxis: {
        type: 'category',
        data: ['Q1', 'Q2', 'Q3', 'Q4']
      },
      yAxis: {},
      series: [
        {
          name: 'Revenue',
          type: 'line',
          data: [1200, 1500, 1700, 2000]
        },
        {
          name: 'Profit',
          type: 'line',
          data: [400, 600, 700, 800]
        }
      ]
    };
  
    lineChartInstance.setOption(lineOptions);
  };
  
  
  
  onMounted(() => {
    initLineChart();
  
    // Handle resize events for all charts
    window.addEventListener('resize', () => {
 
      if (lineChartContainer.value) {
        echarts.getInstanceByDom(lineChartContainer.value).resize();
      }
    });
  });
  </script>
  
  <style scoped>
  /* Ensure the container has a width and height */
  div {
    width: 100%;
    height: 400px;
  }
  </style>
  