<template>
    <div>
      <h2>Property List</h2>
      <ul>
        <li v-for="property in properties" :key="property.id">
          {{ property.name }}
          <button @click="removeProperty(property.id)">Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['properties', 'removeProperty'],
  };
  </script>
  