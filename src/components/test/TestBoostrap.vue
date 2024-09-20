<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h1>Responsive Column</h1>
        <p>This column will be half-width on medium screens and larger.</p>
      </div>
      <div class="col-md-6">
        <button class="btn btn-primary">Primary Button</button>
      </div>
    </div>



<!-- Loan Calculator -->
<div>
<LoanCalculator />
</div>


    <!-- EChart -->
    <div>
    <EChart />
  </div>

  </div>

</template>

<script setup>
import EChart from '@/components/test/TestChart.vue'
import LoanCalculator from '@/components/test/LoanCalculator.vue'

</script>

<style scoped>
/* Các kiểu CSS tùy chỉnh của bạn có thể được thêm ở đây */
</style>
