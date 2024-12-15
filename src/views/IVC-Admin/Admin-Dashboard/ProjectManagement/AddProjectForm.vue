<template>
    <div class="add-project-form">
      <h2>Add New Project</h2>
      <input v-model="newProject.name" type="text" placeholder="Project Name" class="form-input" />
      <textarea v-model="newProject.description" placeholder="Project Description" class="form-input"></textarea>
      <input v-model="newProject.image" type="url" placeholder="Image URL" class="form-input" />
      <button @click="addProject" class="form-submit">Add Project</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newProject: {
          name: '',
          description: '',
          image: '',
        },
      };
    },
    methods: {
      addProject() {
        this.$emit('add-project', { ...this.newProject });
        this.newProject.name = '';
        this.newProject.description = '';
        this.newProject.image = '';
      },
    },
  };
  </script>
  
  <style scoped>
  .add-project-form {
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin-top: 30px;
  }
  
  .form-input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .form-submit {
    width: 100%;
    padding: 12px;
    background-color: #00aaff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .form-submit:hover {
    background-color: #0088cc;
  }
  </style>
  