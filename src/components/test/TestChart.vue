<template>
  <div>
    <!-- Bar Chart -->
    <div ref="barChartContainer" style="width: 100%; height: 400px; margin-bottom: 20px;"></div>
    
    <!-- Line Chart -->
    <div ref="lineChartContainer" style="width: 100%; height: 400px; margin-bottom: 20px;"></div>
    
    <!-- Pie Chart -->
    <div ref="pieChartContainer" style="width: 100%; height: 400px; margin-bottom: 20px;"></div>

    <!-- Stacked Bar Chart -->
    <div ref="stackedBarChartContainer" style="width: 100%; height: 400px; margin-bottom: 20px;"></div>
    
    <!-- Combination Bar and Line Chart -->
    <div ref="combinationChartContainer" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const barChartContainer = ref(null);
const lineChartContainer = ref(null);
const pieChartContainer = ref(null);
const stackedBarChartContainer = ref(null);
const combinationChartContainer = ref(null);

const initBarChart = () => {
  const barChartInstance = echarts.init(barChartContainer.value);

  const barOptions = {
    title: {
      text: 'Bar Chart Example'
    },
    tooltip: {},
    legend: {
      data: ['Sales', 'Expenses']
    },
    xAxis: {
      data: ['January', 'February', 'March', 'April', 'May', 'June']
    },
    yAxis: {},
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: [10, 20, 30, 40, 50, 60]
      },
      {
        name: 'Expenses',
        type: 'bar',
        data: [15, 25, 35, 45, 55, 65]
      }
    ]
  };

  barChartInstance.setOption(barOptions);
};

const initLineChart = () => {
  const lineChartInstance = echarts.init(lineChartContainer.value);

  const lineOptions = {
    title: {
      text: 'Line Chart Example'
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

const initPieChart = () => {
  const pieChartInstance = echarts.init(pieChartContainer.value);

  const pieOptions = {
    title: {
      text: 'Revenue Distribution',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'bottom'
    },
    series: [
      {
        name: 'Revenue',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 335, name: 'Product A' },
          { value: 310, name: 'Product B' },
          { value: 234, name: 'Product C' },
          { value: 135, name: 'Product D' },
          { value: 1548, name: 'Product E' }
        ],
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      }
    ]
  };

  pieChartInstance.setOption(pieOptions);
};

const initStackedBarChart = () => {
  const stackedBarChartInstance = echarts.init(stackedBarChartContainer.value);

  const stackedBarOptions = {
    title: {
      text: 'Stacked Bar Chart'
    },
    tooltip: {},
    legend: {
      data: ['Revenue', 'Cost', 'Profit']
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    yAxis: {},
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        stack: 'total',
        data: [1200, 1500, 1300, 1600, 1700, 1400, 1800]
      },
      {
        name: 'Cost',
        type: 'bar',
        stack: 'total',
        data: [800, 900, 700, 950, 1000, 850, 1100]
      },
      {
        name: 'Profit',
        type: 'bar',
        stack: 'total',
        data: [400, 600, 600, 650, 700, 550, 700]
      }
    ]
  };

  stackedBarChartInstance.setOption(stackedBarOptions);
};

const initCombinationChart = () => {
  const combinationChartInstance = echarts.init(combinationChartContainer.value);

  const combinationOptions = {
    title: {
      text: 'Combination Bar and Line Chart'
    },
    tooltip: {},
    legend: {
      data: ['Revenue', 'Profit']
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    yAxis: [
      {
        type: 'value',
        name: 'Revenue',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Profit',
        position: 'right'
      }
    ],
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        data: [1200, 1500, 1300, 1600, 1700, 1400, 1800]
      },
      {
        name: 'Profit',
        type: 'line',
        yAxisIndex: 1,
        data: [400, 600, 600, 650, 700, 550, 700]
      }
    ]
  };

  combinationChartInstance.setOption(combinationOptions);
};

onMounted(() => {
  initBarChart();
  initLineChart();
  initPieChart();
  initStackedBarChart();
  initCombinationChart();

  // Handle resize events for all charts
  window.addEventListener('resize', () => {
    if (barChartContainer.value) {
      echarts.getInstanceByDom(barChartContainer.value).resize();
    }
    if (lineChartContainer.value) {
      echarts.getInstanceByDom(lineChartContainer.value).resize();
    }
    if (pieChartContainer.value) {
      echarts.getInstanceByDom(pieChartContainer.value).resize();
    }
    if (stackedBarChartContainer.value) {
      echarts.getInstanceByDom(stackedBarChartContainer.value).resize();
    }
    if (combinationChartContainer.value) {
      echarts.getInstanceByDom(combinationChartContainer.value).resize();
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
