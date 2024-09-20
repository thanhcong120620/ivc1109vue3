<template>
    <div>
      <h2>Add Property</h2>
      <form @submit.prevent="addProperty">
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
      addProperty() {
        if (this.name.trim()) {
          this.$emit('add-property', { id: Date.now(), name: this.name });
          this.name = '';
        }
      },
    },
  };
  </script>
  