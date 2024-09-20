<template>
    <div>
      <h1>Properties</h1>
      <PropertyForm @add-property="handleAddProperty" />
      <PropertyList :properties="properties" :removeProperty="handleRemoveProperty" />
    </div>
  </template>
  
  <script>
  import PropertyForm from '../CrmFunction/PropertyForm.vue';
  import PropertyList from '../CrmFunction/PropertyList.vue';
  
  export default {
    components: {
      PropertyForm,
      PropertyList,
    },
    data() {
      return {
        properties: [],
      };
    },
    methods: {
      handleAddProperty(property) {
        this.properties.push(property);
      },
      handleRemoveProperty(propertyId) {
        this.properties = this.properties.filter(property => property.id !== propertyId);
      },
    },
  };
  </script>
  