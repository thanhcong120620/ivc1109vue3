<template>
  <div class="news-container">
    <h1>Tin tức Bất động sản</h1>
    <div v-if="loading" class="loading">Đang tải dữ liệu...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-for="item in newsItems" :key="item.guid" class="news-item">
      <h2>{{ item.title }}</h2>
      <p><strong>Ngày đăng:</strong> {{ formatDate(item.pubDate) }}</p>
      <p>{{ item.description }}</p>
      <img v-if="item.image" :src="item.image" alt="Hình ảnh bài viết" />
      <p><a :href="item.link" target="_blank">Đọc thêm</a></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsItems: [],
      loading: true,
      error: null
    }
  },
  methods: {
    async fetchRSS() {
      try {
        // Sử dụng proxy để tránh lỗi CORS
        const proxyUrl = 'https://api.allorigins.win/raw?url='
        const rssUrl = 'https://dantri.com.vn/rss/bat-dong-san.rss'
        const response = await fetch(proxyUrl + encodeURIComponent(rssUrl))
        const text = await response.text()

        // Chuyển đổi XML thành đối tượng JavaScript
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(text, 'text/xml')
        const items = xmlDoc.querySelectorAll('item')

        this.newsItems = Array.from(items).map((item) => {
          const description = item.querySelector('description').textContent
          // Trích xuất hình ảnh từ thẻ description (CDATA)
          const imageMatch = description.match(/src="([^"]+)"/)
          const cleanDescription = description
            .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
            .replace(/<[^>]+>/g, '')

          return {
            title: item.querySelector('title').textContent,
            link: item.querySelector('link').textContent,
            pubDate: item.querySelector('pubDate').textContent,
            description: cleanDescription,
            image: imageMatch ? imageMatch[1] : null,
            guid: item.querySelector('guid').textContent
          }
        })
      } catch (err) {
        this.error = 'Không thể tải dữ liệu. Vui lòng thử lại sau.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  mounted() {
    this.fetchRSS()
  }
}
</script>

<style scoped>
.news-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.news-item {
  background: white;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.news-item img {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}
.news-item h2 {
  font-size: 1.5em;
  margin: 0 0 10px;
}
.news-item p {
  margin: 5px 0;
}
.news-item a {
  color: #007bff;
  text-decoration: none;
}
.news-item a:hover {
  text-decoration: underline;
}
.loading {
  text-align: center;
  font-size: 1.2em;
  color: #555;
}
.error {
  text-align: center;
  color: red;
}
</style>
