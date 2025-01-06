<template>
    <section class="news-section">
      <!-- <h2 class="section-title">Market News</h2> -->
      <div class="news-list">
        <div v-for="(news, index) in newsArticles" :key="index" class="news-card">
          <div class="div-img">
            <img :src="news.image" alt="News Image" class="news-img"/>
          </div>

          <div class="news-info">
            <h3 class="news-title">{{ news.title }}</h3>
            <p class="news-description">{{ news.description }}</p>
            <a :href="news.link" class="read-more">Read more</a>
          </div>
        </div>

      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newsArticles: [
          { 
            title: "Real Estate Market Trends 2024", 
            link: "/news/market-trends",
            image: "https://via.placeholder.com/100x100", 
            description: "A deep dive into the trends in real estate for 2024, including market forecasts, challenges, and opportunities."
          },
          { 
            title: "Top 5 Real Estate Investment Strategies", 
            link: "/news/investment-strategies",
            image: "https://via.placeholder.com/100x100", 
            description: "Explore the top investment strategies that can yield high returns in the ever-evolving real estate market."
          },
          { 
            title: "How the Housing Market Will Change Next Year", 
            link: "/news/housing-market",
            image: "https://via.placeholder.com/100x100", 
            description: "An analysis of upcoming shifts in the housing market and how buyers and sellers can navigate these changes."
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .news-section {
    flex: 1;
    padding-left: 20px;
    margin-left: 20px;
  }
  
  .section-title {
    font-size: 1.8rem;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .news-list {
    display: flex;
    flex-direction: column;
    gap: 10px; /* Khoảng cách giữa các bài báo */
  }
  
  .news-card {
    /* display: flex; */
    background: rgba(255, 255, 255, 0.1); /* Glassmorphism effect */
    backdrop-filter: blur(10px); /* Mờ nền phía sau */
    border-radius: 15px;
    padding: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    width:100%;
  }
  
  .news-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
  
  .news-img {
    width: 200px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .news-info {
    margin-left: 0px;
    max-width: 100%; /* Giới hạn chiều rộng của phần mô tả */
  }
  
  .news-title {
    font-size: 1.0rem;
    font-weight: bold;
    margin-bottom: 10px;
    width: 100%;
    text-align: justify;
    margin-top: 5px;
  }
  
  .news-description {
    font-size: 0.8rem;
    margin-bottom: 10px;
    text-align: justify;
  }
  
  .read-more {
    font-size: 1rem;
    color: #00aaff;
    text-decoration: none;
  }
  
  .read-more:hover {
    text-decoration: underline;
  }

/*------------------------Custome------------------------*/ 
.div-img {
  width:100%;
  height: 100px;
}


  </style>
  