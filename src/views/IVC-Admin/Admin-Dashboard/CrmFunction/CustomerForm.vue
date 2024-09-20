<template>
    <div>
      <h2>Add Customer</h2>
      <form @submit.prevent="addCustomer">
        <input v-model="name" placeholder="Name" />
        <button type="submit">Add</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
      };
    },
    methods: {
      addCustomer() {
        if (this.name.trim()) {
          this.$emit('add-customer', { id: Date.now(), name: this.name });
          this.name = '';
        }
      },
    },
  };
  </script>
  