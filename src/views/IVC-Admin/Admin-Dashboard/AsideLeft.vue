<template>
  <aside class="left-sidebar" data-sidebarbg="skin6">
    <div class="scroll-sidebar">
      <nav class="sidebar-nav">
        <ul id="sidebarnav">
          <!-- User Profile-->
          <li>
            <div class="user-profile d-flex no-block dropdown m-t-20">
              <div class="user-pic">
                <img :src="userImage" alt="User" class="rounded-circle" width="40" />
              </div>
              <div class="user-content hide-menu m-l-10">
                <a
                  :href="userProfileLink"
                  id="Userdd"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <h5 class="m-b-0 user-name font-medium">
                    {{ userName }} <i class="fa fa-angle-down"></i>
                  </h5>
                  <span class="op-5 user-email">{{ userEmail }}</span>
                </a>
                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="Userdd">
                  <a class="dropdown-item" :href="profileLink">
                    <i class="ti-user m-r-5 m-l-5"></i> My Profile
                  </a>
                  <a class="dropdown-item" :href="balanceLink">
                    <i class="ti-wallet m-r-5 m-l-5"></i> My Balance
                  </a>
                  <a class="dropdown-item" :href="inboxLink">
                    <i class="ti-email m-r-5 m-l-5"></i> Inbox
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" :href="settingsLink">
                    <i class="ti-settings m-r-5 m-l-5"></i> Account Setting
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" :href="logoutLink">
                    <i class="fa fa-power-off m-r-5 m-l-5"></i> Logout
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li class="p-15 m-t-10">
            <a
              href="javascript:void(0)"
              class="btn d-block w-100 create-btn text-white no-block d-flex align-items-center"
            >
              <i class="fa fa-plus-square"></i>
              <span class="hide-menu m-l-5">Create New</span>
            </a>
          </li>
          <!-- Sidebar Items -->
          <li class="sidebar-item" v-for="(item, index) in sidebarItems" :key="index">
            <a
              :href="item.link"
              class="sidebar-link waves-effect waves-dark sidebar-link"
              :class="{ active: item.isActive }"
              @click="handleLinkClick($event)"
            >
              <i :class="item.icon"></i>
              <span class="hide-menu">{{ item.label }}</span>
            </a>
          </li>
          <li class="text-center p-40 upgrade-btn">
            <a :href="upgradeLink" class="btn d-block w-100 btn-danger text-white" target="_blank"
              >Upgrade to Pro</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
import { ref, onMounted } from 'vue'

// Import hình ảnh
import userImageSrc from '../../../assets/images/users/1.jpg'

export default {
  name: 'SideBar',
  setup() {
    // Sử dụng import để đảm bảo đường dẫn chính xác
    const userImage = ref(userImageSrc)
    const userProfileLink = ref('#')
    const userName = ref('Steave Jobs')
    const userEmail = ref('varun@gmail.com')
    const profileLink = ref('#')
    const balanceLink = ref('#')
    const inboxLink = ref('#')
    const settingsLink = ref('#')
    const logoutLink = ref('#')
    const upgradeLink = ref('https://www.wrappixel.com/templates/xtremeadmin/')

    const sidebarItems = ref([
      { link: 'index.html', icon: 'mdi mdi-view-dashboard', label: 'Dashboard', isActive: false },
      {
        link: 'pages-profile.html',
        icon: 'mdi mdi-account-network',
        label: 'Profile',
        isActive: false
      },
      { link: 'table-basic.html', icon: 'mdi mdi-border-all', label: 'Table', isActive: false },
      { link: 'icon-material.html', icon: 'mdi mdi-face', label: 'Icon', isActive: false },
      { link: 'starter-kit.html', icon: 'mdi mdi-file', label: 'Blank', isActive: false },
      { link: 'error-404.html', icon: 'mdi mdi-alert-outline', label: '404', isActive: false }
    ])

    const handleLinkClick = (event) => {
      const clickedElement = event.currentTarget
      const parentUl = clickedElement.closest('ul')

      if (!clickedElement.classList.contains('active')) {
        parentUl.querySelectorAll('ul').forEach((ul) => ul.classList.remove('in'))
        parentUl.querySelectorAll('a').forEach((a) => a.classList.remove('active'))
        const nextUl = clickedElement.nextElementSibling
        if (nextUl && nextUl.tagName === 'UL') {
          nextUl.classList.add('in')
        }
        clickedElement.classList.add('active')
      } else {
        clickedElement.classList.remove('active')
        const nextUl = clickedElement.nextElementSibling
        if (nextUl && nextUl.tagName === 'UL') {
          nextUl.classList.remove('in')
        }
      }
    }

    const initSidebar = () => {
      const url = new URL(window.location.href)
      const path = url.pathname.slice(1)
      const activeLink = Array.from(document.querySelectorAll('ul#sidebarnav a')).find(
        (a) => a.href.endsWith(path) || a.href === url.href
      )

      if (activeLink) {
        let element = activeLink
        while (element) {
          if (element.tagName === 'LI') {
            element.classList.add('active')
            const link = element.querySelector('a')
            if (link) link.classList.add('active')
          } else if (element.tagName === 'UL') {
            element.classList.add('in')
          }
          element = element.parentElement
        }
      }

      document.querySelectorAll('#sidebarnav a').forEach((link) => {
        link.addEventListener('click', handleLinkClick)
      })
    }

    onMounted(initSidebar)

    return {
      sidebarItems,
      userImage,
      userProfileLink,
      userName,
      userEmail,
      profileLink,
      balanceLink,
      inboxLink,
      settingsLink,
      logoutLink,
      upgradeLink
    }
  }
}
</script>

<style scoped>
@import '../../../assets/css/css-AdminSystem/SupperAdmin/chartist.min.css';
@import '../../../assets/css/css-AdminSystem/SupperAdmin/style.min.css';
/* @import '../../../assets/css/css-AdminSystem/SupperAdmin/style.css'; */

.left-sidebar {
  position: absolute;
  width: 250px;
  height: 100%;
  top: 0;
  z-index: 10;
  padding-top: 64px;
  background: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.scroll-sidebar {
  height: calc(100% - 20px);
  position: relative;
}

.sidebar-nav ul {
  margin: 0;
  padding: 0;
}

.sidebar-nav li {
  list-style: none;
}

.sidebar-link {
  color: #fff;
  padding: 14px 15px;
  display: flex;
  align-items: center;
  line-height: 25px;
  opacity: 0.6;
}

.sidebar-link i {
  font-style: normal;
  width: 35px;
  font-size: 23px;
  color: #aaa;
  display: inline-block;
  text-align: center;
}

.sidebar-link.active,
.sidebar-link:hover {
  opacity: 1;
}

.sidebar-item.selected > .sidebar-link {
  opacity: 1;
}

.create-btn {
  height: 40px;
  background: #000;
}

.user-profile {
  padding: 15px;
}

.user-profile .user-content,
.user-profile .user-name,
.user-profile .user-email {
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-small-cap {
  font-size: 12px;
  padding: 14px 15px;
  color: #aaa;
  opacity: 0.3;
  text-transform: uppercase;
}

.nav-small-cap i {
  margin: 0 5px;
}

.collapse.in {
  display: block;
}

.sidebar-nav .has-arrow {
  position: relative;
}

.sidebar-nav .has-arrow::after {
  content: '';
  width: 7px;
  height: 7px;
  border-width: 1px 0 0 1px;
  border-style: solid;
  border-color: #fff;
  margin-left: 10px;
  transform: rotate(135deg) translate(0, -50%);
  position: absolute;
  top: 26px;
  right: 15px;
  transition: all 0.3s ease-out;
}

.sidebar-nav li.active > .has-arrow::after,
.sidebar-nav li > .has-arrow.active::after,
.sidebar-nav .has-arrow[aria-expanded='true']::after {
  transform: rotate(-135deg) translate(0, -50%);
}

/*******************
Main sidebar
******************/
.left-sidebar {
  position: absolute;
  width: 250px;
  height: 100%;
  top: 0px;
  z-index: 10;
  padding-top: 64px;
  background: #fff;
  -webkit-box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
  box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
}

/*******************
sidebar navigation
******************/
.scroll-sidebar {
  height: calc(100% - 20px);
  position: relative;
}

.sidebar-nav ul {
  /*******************
         Small cap
         ******************/
}
.sidebar-nav ul .sidebar-item {
  width: 250px;
  /*******************
           First level
           ******************/
}
.sidebar-nav ul .sidebar-item .sidebar-link {
  color: #fff;
  padding: 14px 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  white-space: nowrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  line-height: 25px;
  opacity: 0.6;
}
.sidebar-nav ul .sidebar-item .sidebar-link i {
  font-style: normal;
  width: 35px;
  line-height: 25px;
  font-size: 23px;
  color: #fff;
  display: inline-block;
  text-align: center;
}
.sidebar-nav ul .sidebar-item .sidebar-link.active,
.sidebar-nav ul .sidebar-item .sidebar-link:hover {
  opacity: 1;
}
.sidebar-nav ul .sidebar-item.selected > .sidebar-link {
  /*background: rgba(0, 0, 0, 0.04);*/
  opacity: 1;
}
.sidebar-nav ul .sidebar-item .first-level {
  padding: 0 0 10px 0;
}
.sidebar-nav ul .sidebar-item .first-level .sidebar-item.active .sidebar-link {
  opacity: 1;
}
.sidebar-nav ul .sidebar-item .first-level .sidebar-item .sidebar-link {
  padding: 10px 15px;
}
.sidebar-nav ul .sidebar-item .first-level .sidebar-item .sidebar-link i {
  font-size: 14px;
}
.sidebar-nav ul .nav-small-cap {
  font-size: 12px;
  padding: 14px 15px;
  white-space: nowrap;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  line-height: 30px;
  margin-top: 10px;
  color: #fff;
  opacity: 0.3;
  text-transform: uppercase;
}
.sidebar-nav ul .nav-small-cap i {
  line-height: 30px;
  margin: 0 5px;
}

.sidebar-nav > #sidebarnav > .sidebar-item > .sidebar-link:hover {
  /*background: rgba(0, 0, 0, 0.04);*/
}

/*******************
 common m-p removed
******************/
.sidebar-nav ul {
  margin: 0px;
  padding: 0px;
}
.sidebar-nav ul li {
  list-style: none;
}

.collapse.in {
  display: block;
}

/*******************
Down arrow
******************/
.sidebar-nav .has-arrow {
  position: relative;
}
.sidebar-nav .has-arrow::after {
  position: absolute;
  content: '';
  width: 7px;
  height: 7px;
  border-width: 1px 0 0 1px;
  border-style: solid;
  border-color: #fff;
  margin-left: 10px;
  -webkit-transform: rotate(135deg) translate(0, -50%);
  -ms-transform: rotate(135deg) translate(0, -50%);
  -o-transform: rotate(135deg) translate(0, -50%);
  transform: rotate(135deg) translate(0, -50%);
  -webkit-transform-origin: top;
  -ms-transform-origin: top;
  -o-transform-origin: top;
  transform-origin: top;
  top: 26px;
  right: 15px;
  -webkit-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}

/*.sidebar-nav .active > .has-arrow::after,*/
/*.sidebar-nav li.selected > .has-arrow::after,*/
.sidebar-nav li.active > .has-arrow::after,
.sidebar-nav li > .has-arrow.active::after,
.sidebar-nav .has-arrow[aria-expanded='true']::after {
  -webkit-transform: rotate(-135deg) translate(0, -50%);
  -ms-transform: rotate(-135deg) translate(0, -50%);
  -o-transform: rotate(-135deg) translate(0, -50%);
  transform: rotate(-135deg) translate(0, -50%);
}
</style>
