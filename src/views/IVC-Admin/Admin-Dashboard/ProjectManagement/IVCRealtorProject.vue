<template>
  <div id="app">
    <NavigationLeft /> <!-- Thanh điều hướng bên trái -->

    <header class="header">
      <h1 class="logo">Real Estate Project Management</h1>
    </header>

    <div class="main-container">
      <section class="projects-section">
        <ProjectList />
        <AddProjectForm />
      </section>

      <!-- Sử dụng NavigationRight cho phần tin tức -->
       <div class="nav-right col-lg-3">
        <NavigationRight />

       </div>
    </div>
  </div>
</template>

<script>
import ProjectList from './ProjectList.vue';
import AddProjectForm from './AddProjectForm.vue';
import NavigationLeft from './NavigationLeft.vue'; // Nhập component NavigationLeft
import NavigationRight from './NavigationRight.vue'; // Nhập component NavigationRight

export default {
  components: {
    ProjectList,
    AddProjectForm,
    NavigationLeft,
    NavigationRight
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background: #f5f5f5;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 100vh;
  padding-left: 200px; /* Dành không gian cho thanh điều hướng bên trái */
  transition: padding-left 0.3s ease-in-out;
}

/* Header */
.header {
  background-color: #00aaff;
  width: calc(100% - 250px); /* Cắt bớt phần rộng của thanh điều hướng */
  padding: 20px 30px;
  text-align: center;
  color: #fff;
  position: fixed;
  top: 0;
  left: 250px;
  z-index: 100;
}

.logo {
  font-size: 2rem;
}

/* Main container */
.main-container {
  display: flex;
  justify-content: space-between;
  padding: 80px 0px 40px 0px; /* Thêm padding-top để tránh bị che khuất bởi header */
  width: 100%;
  max-width: 1200px;
  margin-left: 200px; /* Đảm bảo không bị che khuất bởi thanh điều hướng */
  float: right;
}

.projects-section {
  flex: 3;
  margin-right: 20px;
}

@media (max-width: 1200px) {
  .main-container {
    flex-direction: column;
    padding-left: 20px;
    margin-left: 0;
  }

  .projects-section {
    margin-right: 0;
  }

  .header {
    width: 100%;
    left: 0;
  }

  body {
    padding-left: 0;
  }
}

@media (max-width: 768px) {
  .logo {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .news-cards {
    gap: 10px;
  }

  /* Đảm bảo layout phù hợp với kích thước màn hình nhỏ hơn */
  .main-container {
    flex-direction: column;
    padding: 20px;
  }

  .projects-section {
    margin-bottom: 20px;
  }

  .projects-section, .news-section {
    flex: 1 1 100%;
  }
}

@media (max-width: 480px) {
  .header {
    font-size: 1.3rem;
  }

  .main-container {
    padding: 10px;
  }

  .projects-section, .news-section {
    flex: 1 1 100%;
    margin: 10px 0;
  }

  .logo {
    font-size: 1.2rem;
  }

  /* Ẩn hoặc giảm kích thước của NavigationLeft trên các thiết bị nhỏ */
  body {
    padding-left: 0; /* Ẩn thanh điều hướng bên trái */
  }

  .header {
    font-size: 1rem;
  }
}

/* ---------------------- */





</style>
