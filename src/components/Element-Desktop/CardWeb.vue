<template>
  <div class="container">
    <!-- Card Nâng Cấp Gói -->
    <div class="card upgrade-plan col-md-12 col-lg-12">
      <h3>Upgrade Your Plan</h3>
      <p>
        Please make the payment to start enjoying all the features of our premium plan as soon as
        possible.
      </p>
      <div class="plan-details">
        <span>Platinum</span>
        <span class="plan-price">$5,250/Year</span>
      </div>
      <div class="payment-details">
        <h4>Payment Details</h4>
        <div class="payment-card">
          <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" />
          <span>5688 xxxx xxxx 2356</span>
          <input type="text" placeholder="CVV" />
        </div>
        <div class="payment-card">
          <img src="https://img.icons8.com/color/48/000000/amex.png" alt="Amex" />
          <span>8562 xxxx xxxx 4563</span>
          <input type="text" placeholder="CVV" />
        </div>
        <a href="#">Add Payment Method</a>
        <input type="email" placeholder="Email Address" />
      </div>
      <button class="contact-now">Contact Now</button>
    </div>

    <!-- Card Lịch Họp -->
    <div class="card meeting-schedule col-md-12 col-lg-12">
      <h3>Meeting Schedule</h3>
      <ul>
        <li v-for="meeting in meetings" :key="meeting.id">
          <div class="meeting-info">
            <span>{{ meeting.title }}</span>
            <span>{{ meeting.date }} | {{ meeting.time }}</span>
          </div>
          <span class="label" :class="meeting.type">{{ meeting.type }}</span>
        </li>
      </ul>
    </div>

    <!-- Card Thông Tin Sự Kiện -->
    <div class="card event-info col-md-12 col-lg-12">
      <div class="event-date">
        <span>Jan</span>
        <span>24</span>
      </div>
      <div class="event-details">
        <h3>Developer Meetup</h3>
        <p>
          .col- (extra small devices - screen width less than 576px) <br />.col-sm- (small devices -
          screen width equal to or greater than 576px) <br />.col-md- (medium devices - screen width
          equal to or greater than 768px) <br />.col-lg- (large devices - screen width equal to or
          greater than 992px) <br />.col-xl- (xlarge devices - screen width equal to or greater than
          1200px) <br />.col-xxl- (xxlarge devices - screen width equal to or greater than 1400px)
        </p>
        <div class="event-meta">
          <span>Tuesday, 24 January, 10:20 - 12:30</span>
          <span>The Rochard NYC, 1305 Lexington Ave, New York</span>
        </div>
      </div>
      <button class="buy-now">Buy Now</button>
    </div>
  </div>

  <!-- Card Time Line -->
  <div class="activity-timeline-card col-md-10 col-lg-6">
    <h3 class="timeline-title">Activity Timeline</h3>
    <div class="timeline-item" v-for="activity in activities" :key="activity.id">
      <div class="timeline-icon" :class="activity.color"></div>
      <div class="timeline-content">
        <div class="timeline-header">
          <h4 class="activity-title">{{ activity.title }}</h4>
          <span class="activity-time">{{ activity.time }}</span>
        </div>
        <p class="activity-description">{{ activity.description }}</p>
        <a v-if="activity.file" :href="activity.file" class="file-link" target="_blank"
          >invoices.pdf</a
        >
        <div v-if="activity.extraInfo" class="extra-info">{{ activity.extraInfo }}</div>
        <div v-if="activity.avatars" class="avatars">
          <!-- Thêm thuộc tính :key vào thẻ img -->
          <img
            v-for="(avatar, index) in activity.avatars"
            :key="index"
            :src="avatar"
            :alt="'Avatar ' + (index + 1)"
            class="avatar-img"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const meetings = [
  { id: 1, title: 'Call with Woods', date: '21 Jul', time: '08:20 - 10:30', type: 'Business' },
  { id: 2, title: 'Conference call', date: '21 Jul', time: '08:20 - 10:30', type: 'Dinner' },
  { id: 3, title: 'Meeting with Mark', date: '21 Jul', time: '08:20 - 10:30', type: 'Meetup' },
  { id: 4, title: 'Meeting in Oakland', date: '21 Jul', time: '08:20 - 10:30', type: 'Dinner' },
  { id: 5, title: 'Call with Hilda', date: '21 Jul', time: '08:20 - 10:30', type: 'Meditation' }
]

// Card Time Line
const activities = ref([
  {
    id: 1,
    title: '12 Invoices have been paid',
    description: 'Invoices have been paid to the company',
    file: 'path/to/invoices.pdf',
    color: 'purple',
    time: '12 min ago'
  },
  {
    id: 2,
    title: 'Client Meeting',
    description: 'Project meeting with John @10:15am',
    extraInfo: 'Lester McCarthy (Client) - CEO of ThemeSelection',
    color: 'green',
    time: '45 min ago'
  },
  {
    id: 3,
    title: 'Create a new project for client',
    description: '6 team members in a project',
    avatars: [
      'path/to/avatar1.png',
      'path/to/avatar2.png',
      'path/to/avatar3.png',
      'path/to/avatar4.png'
    ],
    color: 'blue',
    time: '2 Days ago'
  }
])
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  padding: 20px;
}

/* Card chung */
.card {
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
}

/* Card Nâng Cấp Gói */
.upgrade-plan h3 {
  margin-bottom: 15px;
}

.plan-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.payment-details h4 {
  margin-top: 20px;
}

.payment-card {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.payment-card img {
  width: 40px;
  margin-right: 10px;
}

.payment-card input {
  margin-left: auto;
  width: 50px;
}

.contact-now {
  background-color: #6c63ff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 15px;
}

/* Card Lịch Họp */
.meeting-schedule h3 {
  margin-bottom: 15px;
}

.meeting-schedule ul {
  list-style-type: none;
  padding: 0;
}

.meeting-schedule li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
}

.meeting-info {
  display: flex;
  flex-direction: column;
}

.label {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  color: white;
  float: left;
}

.Business {
  background-color: #007bff;
}

.Dinner {
  background-color: #ffc107;
  color: black;
}

.Meetup {
  background-color: #6c757d;
}

.Meditation {
  background-color: #28a745;
}

/* Card Thông Tin Sự Kiện */
.event-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-date {
  background-color: #6c63ff;
  color: white;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
}

.event-date span {
  display: block;
}

.event-details {
  margin-left: 20px;
  flex-grow: 1;
}

.event-meta {
  font-size: 0.9rem;
  color: gray;
}

.buy-now {
  background-color: #ff6347;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 20px;
}

/* Card Time line */
.dashboard-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.activity-timeline-card {
  grid-column: span 1;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.timeline-title {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
}

.timeline-item {
  display: flex;
  align-items: start;
  margin-bottom: 20px;
}

.timeline-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 15px;
  margin-top: 8px;
}

.timeline-icon.purple {
  background-color: #a75dff;
}

.timeline-icon.green {
  background-color: #29cc97;
}

.timeline-icon.blue {
  background-color: #0099ff;
}

.timeline-content {
  flex: 1;
  padding: 10px;
  background: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.activity-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.activity-time {
  font-size: 12px;
  color: #999;
}

.activity-description {
  margin: 5px 0;
  font-size: 14px;
  color: #555;
}

.file-link {
  display: inline-block;
  margin-top: 5px;
  font-size: 14px;
  color: #ff6b6b;
  text-decoration: underline;
}

.extra-info {
  margin-top: 5px;
  font-size: 14px;
  color: #777;
}

.avatars {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 8px;
}

.avatar-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
