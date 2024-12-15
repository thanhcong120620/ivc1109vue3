<template>
    <div class="project-list">
      <h2 class="title">All Projects</h2>
      <div class="project-grid">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="project-card"
          @mouseover="project.showDetails = true"
          @mouseleave="project.showDetails = false"
        >
          <div class="project-img-container">
            <img :src="project.image" alt="Project Image" class="project-img" />
          </div>
          <div class="project-info">
            <h3 class="project-name">{{ project.name }}</h3>
            <p class="project-description">{{ project.description }}</p>
  
            <!-- Mô tả chi tiết khi rê chuột -->
            <div v-show="project.showDetails" class="project-details">
              <p><strong>Price: </strong>{{ project.price }}</p>
              <p><strong>Legal Status: </strong>{{ project.legalStatus }}</p>
              <p><strong>Location: </strong>{{ project.location }}</p>
              <p><strong>Amenities: </strong>{{ project.amenities }}</p>
              <p><strong>Sales Policy: </strong>{{ project.salesPolicy }}</p>
            </div>
            
            <button class="details-button" @click="toggleDetails(index)">See More</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    setup() {
      const projects = ref([
        {
          name: "Skyline Tower",
          description: "Luxury apartments in the city center.",
          image: "https://via.placeholder.com/600x400",
          price: "From $500,000",
          legalStatus: "Clear title, ready for sale",
          location: "Central District, City Center",
          amenities: "Swimming pool, Gym, Park, Parking",
          salesPolicy: "Flexible payment options, 5% discount for early booking",
          showDetails: false,
        },
        {
          name: "Ocean View Villas",
          description: "Exclusive villas with an ocean view.",
          image: "https://via.placeholder.com/600x400",
          price: "From $1,200,000",
          legalStatus: "Under development, pre-sale available",
          location: "Beachfront, Ocean View",
          amenities: "Private beach, Spa, Gym, Wine cellar",
          salesPolicy: "40% deposit, financing options available",
          showDetails: false,
        },
        {
          name: "Green Park Residences",
          description: "Eco-friendly homes near the park.",
          image: "https://via.placeholder.com/600x400",
          price: "From $350,000",
          legalStatus: "Fully legalized, ready for occupancy",
          location: "Near Green Park, Suburban Area",
          amenities: "Solar panels, Eco-friendly designs, Garden",
          salesPolicy: "Discounts for green property buyers, 10% off",
          showDetails: false,
        },
      ]);
  
      const toggleDetails = (index) => {
        projects.value[index].showDetails = !projects.value[index].showDetails;
      };
  
      return { projects, toggleDetails };
    },
  };
  </script>
  
  <style scoped>
  .project-list {
    margin: 40px auto;
    padding: 0 20px;
    max-width: 1200px;
    text-align: center;
  }
  
  .title {
    font-size: 3rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 30px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
  }
  
  .project-card {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  
  .project-img-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  
  .project-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .project-info {
    padding: 20px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(5px);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  
  .project-name {
    font-size: 1.6rem;
    font-weight: 600;
    color: #333;
    margin: 15px 0;
  }
  
  .project-description {
    color: #666;
    font-size: 1rem;
    margin-bottom: 15px;
  }
  
  .project-details {
    font-size: 0.9rem;
    color: #333;
    margin-top: 10px;
  }
  
  .details-button {
    padding: 12px 20px;
    background-color: #00aaff;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .details-button:hover {
    background-color: #0088cc;
  }
  </style>
  