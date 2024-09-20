<template>
  <div class="page-wrapper">
    <!-- ============================================================== -->
    <!-- Bread crumb and right sidebar toggle -->
    <!-- ============================================================== -->
    <div class="page-breadcrumb">
      <div class="row align-items-center">
        <div class="col-12 col-md-6">
          <h4 class="page-title">Dashboard</h4>
          <div class="d-flex align-items-center">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Library</li>
              </ol>
            </nav>
          </div>
        </div>
        <div class="col-12 col-md-6 text-end">
          <div class="upgrade-btn">
            <a
              href="https://www.wrappixel.com/templates/xtremeadmin/"
              class="btn btn-danger text-white"
              target="_blank"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- ============================================================== -->
    <!-- End Bread crumb and right sidebar toggle -->
    <!-- ============================================================== -->
    <!-- Container fluid  -->
    <!-- ============================================================== -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-8">
          <div class="card">
            <div class="card-body">
              <div class="d-md-flex align-items-center">
                <div>
                  <h4 class="card-title">Sales Summary</h4>
                  <h5 class="card-subtitle">Overview of Latest Month</h5>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <!-- <div class="campaign ct-charts"></div> -->
                   <SaleChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Feeds</h4>
              <div class="feed-widget">
                <ul class="list-style-none feed-body mb-0 pb-20">
                  <li class="feed-item">
                    <div class="feed-icon bg-info"><i class="far fa-bell"></i></div>
                    You have 4 pending tasks.
                    <span class="ms-auto text-muted font-12">Just Now</span>
                  </li>
                  <li class="feed-item">
                    <div class="feed-icon bg-success"><i class="ti-server"></i></div>
                    Server #1 overloaded.<span class="ms-auto text-muted font-12">2 Hours ago</span>
                  </li>
                  <li class="feed-item">
                    <div class="feed-icon bg-warning"><i class="ti-shopping-cart"></i></div>
                    New order received.<span class="ms-auto text-muted font-12">31 May</span>
                  </li>
                  <li class="feed-item">
                    <div class="feed-icon bg-danger"><i class="ti-user"></i></div>
                    New user registered.<span class="ms-auto text-muted font-12">30 May</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ============================================================== -->
      <!-- Sales chart -->
      <!-- ============================================================== -->
      <!-- ============================================================== -->
      <!-- Table -->
      <!-- ============================================================== -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="d-md-flex">
                <div>
                  <h4 class="card-title">Top Selling Products</h4>
                  <h5 class="card-subtitle">Overview of Top Selling Items</h5>
                </div>
                <div class="ms-auto">
                  <div class="dl">
                    <select class="form-select shadow-none">
                      <option value="0" selected>Monthly</option>
                      <option value="1">Daily</option>
                      <option value="2">Weekly</option>
                      <option value="3">Yearly</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table v-middle">
                <thead>
                  <tr class="bg-light">
                    <th>Products</th>
                    <th>License</th>
                    <th>Support Agent</th>
                    <th>Technology</th>
                    <th>Tickets</th>
                    <th>Sales</th>
                    <th>Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="me-3">
                          <a class="btn btn-circle btn-info text-white">EA</a>
                        </div>
                        <div>
                          <h4 class="mb-0">Elite Admin</h4>
                        </div>
                      </div>
                    </td>
                    <td>Single Use</td>
                    <td>John Doe</td>
                    <td>
                      <span class="badge bg-danger">Angular</span>
                    </td>
                    <td>46</td>
                    <td>356</td>
                    <td>
                      <h5 class="mb-0">$2850.06</h5>
                    </td>
                  </tr>
                  <!-- Các hàng khác... -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- ============================================================== -->
      <!-- Recent comment and chats -->
      <!-- ============================================================== -->
      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Recent Comments</h4>
            </div>
            <div class="comment-widgets">
              <!-- Comment Row -->
              <div class="d-flex flex-row comment-row mb-0">
                <div class="p-2">
                  <img
                    src="../../../assets/images/users/1.jpg"
                    alt="user"
                    width="50"
                    class="rounded-circle"
                  />
                </div>
                <div class="comment-text w-100">
                  <h6 class="font-medium">James Anderson</h6>
                  <span class="d-block mb-2">Lorem Ipsum is simply dummy text of the printing and type setting industry.</span>
                  <div class="comment-footer">
                    <span class="text-muted float-end">April 14, 2021</span>
                    <span class="badge bg-primary">Pending</span>
                    <span class="action-icons">
                      <a href="#"><i class="ti-pencil-alt"></i></a>
                      <a href="#"><i class="ti-check"></i></a>
                      <a href="#"><i class="ti-heart"></i></a>
                    </span>
                  </div>
                </div>
              </div>
              <!-- Các comment khác... -->
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Temp Guide</h4>
              <div class="d-flex align-items-center flex-row mt-3">
                <div class="display-5 text-info">
                  <i class="wi wi-day-showers"></i> <span>73<sup>°</sup></span>
                </div>
                <div class="ms-3">
                  <h3 class="mb-0">Saturday</h3>
                  <small>Ahmedabad, India</small>
                </div>
              </div>
              <table class="table no-border mini-table mt-3">
                <tbody>
                  <tr>
                    <td class="text-muted">Wind</td>
                    <td class="font-medium">ESE 17 mph</td>
                  </tr>
                  <tr>
                    <td class="text-muted">Humidity</td>
                    <td class="font-medium">83%</td>
                  </tr>
                  <tr>
                    <td class="text-muted">Pressure</td>
                    <td class="font-medium">28.56 in</td>
                  </tr>
                  <tr>
                    <td class="text-muted">Cloud Cover</td>
                    <td class="font-medium">78%</td>
                  </tr>
                </tbody>
              </table>
              <ul class="row list-style-none text-center mt-3">
                <li class="col-3">
                  <h4 class="text-info"><i class="wi wi-day-sunny"></i></h4>
                  <span class="d-block text-muted">09:30</span>
                  <h3 class="mt-2">70<sup>°</sup></h3>
                </li>
                <li class="col-3">
                  <h4 class="text-info"><i class="wi wi-day-cloudy"></i></h4>
                  <span class="d-block text-muted">11:30</span>
                  <h3 class="mt-2">72<sup>°</sup></h3>
                </li>
                <li class="col-3">
                  <h4 class="text-info"><i class="wi wi-day-hail"></i></h4>
                  <span class="d-block text-muted">13:30</span>
                  <h3 class="mt-2">75<sup>°</sup></h3>
                </li>
                <li class="col-3">
                  <h4 class="text-info"><i class="wi wi-day-sprinkle"></i></h4>
                  <span class="d-block text-muted">15:30</span>
                  <h3 class="mt-2">76<sup>°</sup></h3>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- ============================================================== -->
      <!-- Recent comment and chats -->
      <!-- ============================================================== -->
    </div>
    <!-- ============================================================== -->
    <!-- End Container fluid  -->
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- footer -->
    <!-- ============================================================== -->
    <footer class="footer text-center">
      All Rights Reserved by Xtreme Admin. Designed and Developed by
      <a href="https://www.wrappixel.com">WrapPixel</a>.
    </footer>
    <!-- ============================================================== -->
    <!-- End footer -->
    <!-- ============================================================== -->
  </div>
</template>


<script setup>
// Import các thư viện JavaScript cần thiết cho component
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import SaleChart from '@/views/IVC-Admin/Admin-Dashboard/SaleChart.vue'


</script>

<style scoped>
/* <!-- Favicon icon --> */
/* <link rel="icon" type="image/png" sizes="16x16" href="../../assets/images/favicon.png"> */
/* <!-- Custom CSS --> */
@import '../../../assets/css/css-AdminSystem/SupperAdmin/chartist.min.css';
/* <!-- Custom CSS --> */
@import '../../../assets/css/css-AdminSystem/SupperAdmin/style.min.css';

/* 
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// --> */
/* <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]--> */
</style>
