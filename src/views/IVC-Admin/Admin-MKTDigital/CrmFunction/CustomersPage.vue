<template>
    <div>
      <h1>Customers</h1>
      <CustomerForm @add-customer="handleAddCustomer" />
      <CustomerList :customers="customers" :removeCustomer="handleRemoveCustomer" />
    </div>
  </template>
  
  <script>
  import CustomerForm from '../CrmFunction/CustomerForm.vue';
  import CustomerList from '../CrmFunction/CustomerList.vue';
  
  export default {
    components: {
      CustomerForm,
      CustomerList,
    },
    data() {
      return {
        customers: [],
      };
    },
    methods: {
      handleAddCustomer(customer) {
        this.customers.push(customer);
      },
      handleRemoveCustomer(customerId) {
        this.customers = this.customers.filter(customer => customer.id !== customerId);
      },
    },
  };
  </script>
  