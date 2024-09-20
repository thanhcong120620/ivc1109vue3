<template>
    <div>
      <h2>Customer List</h2>
      <ul>
        <li v-for="customer in customers" :key="customer.id">
          {{ customer.name }}
          <button @click="removeCustomer(customer.id)">Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['customers', 'removeCustomer'],
  };
  </script>
  