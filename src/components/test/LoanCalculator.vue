<template>
    <div class="loan-calculator">
      <h2 class="title">Công cụ tính số tiền trả góp</h2>
      <div class="content">
        <div class="input-section">
          <div class="input-group">
            <label>Giá trị nhà đất (tỷ VND):</label>
            <input type="range" v-model="propertyValue" min="1" max="100" step="0.1" />
            <span>{{ propertyValue }} tỷ</span>
          </div>
          <div class="input-group">
            <label>Tỷ lệ vay (%):</label>
            <input type="range" v-model="loanRate" min="10" max="80" step="1" />
            <span>{{ loanRate }} %</span>
          </div>
          <div class="input-group">
            <label>Thời hạn vay (tháng):</label>
            <input type="range" v-model="loanDuration" min="12" max="240" step="1" />
            <span>{{ loanDuration }} tháng</span>
          </div>
          <div class="input-group">
            <label>Lãi suất (%/năm):</label>
            <input type="range" v-model="interestRate" min="0.1" max="25" step="0.1" />
            <span>{{ interestRate }} %</span>
          </div>
        </div>
        <div class="result-section">
          <div ref="pieChart" class="chart-container"></div>
          <div class="result-item">
            <label>Trả trước (VND):</label>
            <span>{{ formattedDownPayment }}</span>
          </div>
          <div class="result-item">
            <label>Gốc cần trả (VND):</label>
            <span>{{ formattedPrincipal }}</span>
          </div>
          <div class="result-item">
            <label>Lãi cần trả (VND):</label>
            <span>{{ formattedTotalInterest }}</span>
          </div>
          <div class="result-item highlight">
            <label>Trả tháng đầu (VND):</label>
            <span>{{ formattedFirstMonthPayment }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
//   import { defineComponent, ref, onMounted, watch } from 'vue';
  import { defineComponent } from 'vue';
  import * as echarts from 'echarts';
  
  export default defineComponent({
    data() {
      return {
        propertyValue: 5, // Giá trị nhà đất tính bằng tỷ
        loanRate: 40, // Tỷ lệ vay (%)
        loanDuration: 120, // Thời hạn vay (tháng)
        interestRate: 7.5, // Lãi suất (%/năm)
      };
    },
    computed: {
      loanAmount() {
        return (this.propertyValue * this.loanRate) / 100 * 1e9; // Chuyển tỷ sang VND
      },
      downPayment() {
        return this.propertyValue * 1e9 - this.loanAmount; // Số tiền trả trước
      },
      monthlyInterestRate() {
        return this.interestRate / 100 / 12; // Lãi suất hàng tháng
      },
      totalInterest() {
        return this.loanAmount * this.monthlyInterestRate * this.loanDuration;
      },
      firstMonthPayment() {
        return this.loanAmount * this.monthlyInterestRate;
      },
      formattedDownPayment() {
        return this.formatCurrency(this.downPayment);
      },
      formattedPrincipal() {
        return this.formatCurrency(this.loanAmount);
      },
      formattedTotalInterest() {
        return this.formatCurrency(this.totalInterest);
      },
      formattedFirstMonthPayment() {
        return this.formatCurrency(this.firstMonthPayment);
      },
    },
    methods: {
      formatCurrency(value) {
        return value.toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        });
      },
      initChart() {
        const chartDom = this.$refs.pieChart;
        const myChart = echarts.init(chartDom);
        const option = {
          title: {
            text: '',
            left: 'center',
            padding: [10, 0, 0, 0], // [top, right, bottom, left]
            top: -10,
            textStyle: {
              color: '#333',
              fontSize: 16,
              
            },
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: {
              color: '#666',
            },
          },
          series: [
            {
              name: 'Chi tiết',
              type: 'pie',
              radius: '50%',
              center: ['50%', '60%'],
              data: [
                { value: this.downPayment, name: 'Trả trước' },
                { value: this.loanAmount, name: 'Gốc cần trả' },
                { value: this.totalInterest, name: 'Lãi cần trả' },
              ],
              itemStyle: {
                borderRadius: 8,
                borderColor: '#fff',
                borderWidth: 2,
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
              label: {
                formatter: '{b}: {d}%',
                color: '#333',
                fontSize: 12,
              },
              color: ['#6c5ce7', '#00b894', '#fdcb6e'], // Sang trọng, hiện đại
            },
          ],
        };
        myChart.setOption(option);
      },
    },
    mounted() {
      this.initChart();
    },
    watch: {
      propertyValue() {
        this.initChart();
      },
      loanRate() {
        this.initChart();
      },
      loanDuration() {
        this.initChart();
      },
      interestRate() {
        this.initChart();
      },
    },
  });
  </script>
  
  <style scoped>
  .loan-calculator {
    max-width: 900px;
    margin: 20px auto;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    font-family: 'Roboto', sans-serif;
  }
  
  .title {
    text-align: center;
    color: #333;
    font-size: 1.8rem;
    margin-bottom: 20px;
    font-weight: bold;
  }
  
  .content {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .input-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
  }
  
  .input-group label {
    font-size: 1rem;
    margin-bottom: 5px;
    color: #555;
  }
  
  .input-group input[type='range'] {
    width: 100%;
  }
  
  .input-group span {
    margin-top: 5px;
    font-weight: bold;
    color: #007bff;
  }
  
  .result-section {
    flex: 1;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .result-item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 8px;
    transition: background-color 0.3s;
  }
  
  .result-item label {
    color: #333;
    font-weight: 500;
  }
  
  .result-item span {
    font-weight: bold;
    color: #007bff;
  }
  
  .result-item:hover {
    background-color: #e9ecef;
  }
  
  .result-item.highlight {
    background-color: #e9f7fe;
    border-left: 4px solid #007bff;
  }
  
  .chart-container {
    width: 100%;
    height: 300px;
    margin-top: 20px;
  }
  </style>
  