<template>
    <div class="navigation-left">
      <div class="logo-container">
        <img class="logo" src="../../../../assets/images/logo-text.png" alt="Company Logo" />
      </div>
      <ul class="menu">
        <li v-for="(item, index) in menuItems" :key="index" class="menu-item">
          <router-link :to="item.link" class="menu-link">
            <i :class="item.icon"></i>
            <span class="menu-text">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menuItems: [
          { name: "Home", link: "/", icon: "fas fa-home" },
          { name: "Projects", link: "/projects", icon: "fas fa-building" },
          { name: "News", link: "/news", icon: "fas fa-newspaper" },
          { name: "Settings", link: "/settings", icon: "fas fa-cogs" },
          { name: "Contact", link: "/contact", icon: "fas fa-phone" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .navigation-left {
    width: 250px;
    background: rgba(226, 236, 255, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    padding: 20px 10px;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
    color: rgb(255, 255, 255);
    backdrop-filter: blur(8px);
  }
  
  .logo-container {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .logo {
    width: 80%;
    max-width: 180px;
  }
  
  .menu {
    list-style: none;
    padding: 0;
  }
  
  .menu-item {
    padding: 12px 20px;
    margin: 8px 0;
    transition: background-color 0.3s ease, transform 0.3s ease;
    border-radius: 6px;
  }
  
  .menu-item:hover {
    background-color: #00aaff;
    transform: translateX(10px);
  }
  
  .menu-link {
    color: rgb(4, 1, 17);
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  
  .menu-link i {
    margin-right: 15px;
  }
  
  .menu-text {
    font-size: 1.1rem;
  }
  </style>
  