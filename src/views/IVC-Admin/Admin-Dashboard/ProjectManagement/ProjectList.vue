<template>
    <div class="project-list">
      <h2>All Projects</h2>
      <div v-for="(project, index) in projects" :key="index" class="project-card">
        <img :src="project.image" alt="Project Image" class="project-img"/>
        <div class="project-info">
          <h3>{{ project.name }}</h3>
          <p>{{ project.description }}</p>
  
          <!-- Mô tả chi tiết khi rê chuột hoặc click -->
          <div class="project-details">
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
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const projects = ref([
        {
          name: "Skyline Tower",
          description: "Luxury apartments in the city center.",
          image: "https://via.placeholder.com/300",
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
          image: "https://via.placeholder.com/300",
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
          image: "https://via.placeholder.com/300",
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
    margin-bottom: 40px;
  }
  
  .project-card {
    display: flex;
    margin-bottom: 20px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 15px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .project-card:hover {
    transform: scale(1.05);
  }
  
  .project-img {
    width: 150px;
    height: 100px;
    border-radius: 10px;
  }
  
  .project-info {
    margin-left: 20px;
  }
  
  .project-info h3 {
    margin: 10px 0;
    font-size: 1.4rem;
  }
  
  .project-info p {
    margin: 8px 0;
  }
  
  .project-details {
    display: none;
    margin-top: 15px;
  }
  
  .project-card:hover .project-details {
    display: block;
  }
  
  .details-button {
    margin-top: 15px;
    padding: 10px;
    background-color: #00aaff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .details-button:hover {
    background-color: #0088cc;
  }
  </style>
  