<template>
  <div class="news-container">
    <h1>Tin tức Kinh Doanh - Xml Process</h1>
    <div v-if="loading" class="loading">Đang tải dữ liệu...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div
      v-for="(item, index) in newsItems"
      :key="item.guid"
      class="news-item"
      :style="{ animationDelay: index * 0.1 + 's' }"
      @click="openArticle(item.link)"
    >
      <img v-if="item.image" :src="item.image" alt="Hình ảnh bài viết" class="news-image" />
      <div class="news-content">
        <h2>{{ item.title }}</h2>
        <p class="date"><strong>Ngày đăng:</strong> {{ formatDate(item.pubDate) }}</p>
        <p class="description">{{ item.description }}</p>
      </div>
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
        // Gọi API từ backend Spring Boot
        const response = await fetch('http://localhost:8080/rss-xml-process')
        if (!response.ok) {
          throw new Error(`Lỗi khi lấy dữ liệu RSS: ${response.status} - ${response.statusText}`)
        }

        const text = await response.text()
        if (!text) {
          throw new Error('Dữ liệu RSS rỗng.')
        }

        // Chuyển đổi XML thành đối tượng JavaScript
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(text, 'text/xml')

        // Kiểm tra lỗi phân tích XML
        const parseError = xmlDoc.querySelector('parsererror')
        if (parseError) {
          throw new Error('Lỗi phân tích XML: Dữ liệu RSS không hợp lệ.')
        }

        const items = xmlDoc.querySelectorAll('item')
        if (items.length === 0) {
          throw new Error('Không tìm thấy bài viết nào trong RSS.')
        }

        this.newsItems = Array.from(items).map((item) => {
          const description = item.querySelector('description')?.textContent || ''
          // Trích xuất hình ảnh từ thẻ enclosure (nếu có)
          const enclosure = item.querySelector('enclosure')
          let image = enclosure ? enclosure.getAttribute('url') : null

          // Nếu không có enclosure, thử lấy từ description
          if (!image) {
            const imageMatch = description.match(/src="([^"]+)"/)
            image = imageMatch ? imageMatch[1] : null
          }

          // Loại bỏ HTML tags và CDATA từ description
          const cleanDescription = description
            .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
            .replace(/<[^>]+>/g, '')

          return {
            title: item.querySelector('title')?.textContent || 'Không có tiêu đề',
            link: item.querySelector('link')?.textContent || '#',
            pubDate: item.querySelector('pubDate')?.textContent || 'Không có ngày đăng',
            description: cleanDescription || 'Không có mô tả',
            image: image,
            guid: item.querySelector('guid')?.textContent || Math.random().toString()
          }
        })
      } catch (err) {
        this.error = `Không thể tải dữ liệu: ${err.message}. Vui lòng thử lại sau.`
        console.error('Lỗi chi tiết:', err)
      } finally {
        this.loading = false
      }
    },
    formatDate(dateString) {
      try {
        const date = new Date(dateString)
        return date.toLocaleString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      } catch {
        return 'Ngày không hợp lệ'
      }
    },
    openArticle(link) {
      if (link && link !== '#') {
        window.open(link, '_blank')
      }
    }
  },
  mounted() {
    this.fetchRSS()
  }
}
</script>

<style scoped>
.news-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.news-item {
  display: flex;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 15px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease; /* Hiệu ứng phóng to mượt mà */
  cursor: pointer; /* Con trỏ chuột thành pointer để báo hiệu có thể click */
}

.news-item:hover {
  transform: scale(1.03); /* Phóng to 3% khi hover */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15); /* Tăng bóng khi hover */
}

.news-image {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
}

.news-content {
  flex: 1;
}

.news-content h2 {
  font-size: 1.4em;
  margin: 0 0 10px;
  color: #333;
}

.date {
  font-size: 0.9em;
  color: #777;
  margin-bottom: 10px;
}

.description {
  font-size: 1em;
  color: #555;
  line-height: 1.5;
  margin-bottom: 10px;
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

/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
