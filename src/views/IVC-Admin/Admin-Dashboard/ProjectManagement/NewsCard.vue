<template>
    <div class="news-card" @click="goToNewsPage">
      <h3>{{ news.title }}</h3>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      news: Object,
    },
    methods: {
      goToNewsPage() {
        window.location.href = this.news.link;
      }
    }
  };
  </script>
  
  <style scoped>
  .news-card {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 15px;
  }
  
  .news-card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .news-card h3 {
    margin: 0;
    font-size: 1.2rem;
  }
  </style>
  