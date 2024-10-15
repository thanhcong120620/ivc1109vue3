<template>
  <div class="button-shelf">
    <!-- Các nút hình chữ nhật nổi -->
    <h2>Rectangular Buttons (Raised)</h2>
    <div class="button-with-description">
      <button class="btn neumorphic-btn btn-xs">XS</button>
      <span>XS Raised Button (60x30)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-btn btn-sm">SM</button>
      <span>SM Raised Button (80x40)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-btn btn-md">MD</button>
      <span>MD Raised Button (100x50)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-btn btn-lg">LG</button>
      <span>LG Raised Button (120x60)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-btn btn-xl">XL</button>
      <span>XL Raised Button (140x70)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-btn btn-xxl">XXL</button>
      <span>XXL Raised Button (160x80)</span>
    </div>

    <!-- Các nút hình chữ nhật chìm -->
    <h2>Rectangular Buttons (Inset)</h2>
    <div class="button-with-description">
      <button class="btn neumorphic-btn btn-xs inset">XS Inset</button>
      <span>XS Inset Button (60x30)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-btn btn-sm inset">SM Inset</button>
      <span>SM Inset Button (80x40)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-btn btn-md inset">MD Inset</button>
      <span>MD Inset Button (100x50)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-btn btn-lg inset">LG Inset</button>
      <span>LG Inset Button (120x60)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-btn btn-xl inset">XL Inset</button>
      <span>XL Inset Button (140x70)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-btn btn-xxl inset">XXL Inset</button>
      <span>XXL Inset Button (160x80)</span>
    </div>

    <!-- Các nút tròn nổi -->
    <h2>Circle Buttons (Raised)</h2>
    <div class="button-with-description">
      <button class="btn neumorphic-circle btn-xs">O</button>
      <span>XS Raised Circle (30x30)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-circle btn-sm">O</button>
      <span>SM Raised Circle (40x40)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-circle btn-md">O</button>
      <span>MD Raised Circle (50x50)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-circle btn-lg">O</button>
      <span>LG Raised Circle (60x60)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-circle btn-xl">O</button>
      <span>XL Raised Circle (70x70)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-circle btn-xxl">O</button>
      <span>XXL Raised Circle (80x80)</span>
    </div>

    <!-- Các nút tròn chìm -->
    <h2>Circle Buttons (Inset)</h2>
    <div class="button-with-description">
      <button class="btn neumorphic-circle btn-xs inset">O</button>
      <span>XS Inset Circle (30x30)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-circle btn-sm inset">O</button>
      <span>SM Inset Circle (40x40)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-circle btn-md inset">O</button>
      <span>MD Inset Circle (50x50)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-circle btn-lg inset">O</button>
      <span>LG Inset Circle (60x60)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-circle btn-xl inset">O</button>
      <span>XL Inset Circle (70x70)</span>
    </div>
    <div class="button-with-description">
      <button class="btn neumorphic-circle btn-xxl inset">O</button>
      <span>XXL Inset Circle (80x80)</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NeumorphicButton'
}
</script>

<style scoped>
.button-shelf {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #e0e0e0;
  padding: 20px;
}

.button-with-description {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-with-description span {
  margin-top: 8px;
  font-size: 14px;
  color: #555;
}

/* Nút với hiệu ứng Neumorphism nổi */
.neumorphic-btn,
.neumorphic-circle {
  background-color: #e0e0e0;
  border-radius: 12px;
  box-shadow:
    6px 6px 12px #bebebe,
    -6px -6px 12px #ffffff;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Nút chìm (Inset) */
.neumorphic-btn.inset,
.neumorphic-circle.inset {
  box-shadow:
    inset 6px 6px 12px #bebebe,
    inset -6px -6px 12px #ffffff;
}

/* Kích thước cho các nút chữ nhật */
.btn-xs {
  width: 60px;
  height: 30px;
  border-radius: 8px;
  font-size: 10px;
}

.btn-sm {
  width: 80px;
  height: 40px;
}

.btn-md {
  width: 100px;
  height: 50px;
}

.btn-lg {
  width: 120px;
  height: 60px;
}

.btn-xl {
  width: 140px;
  height: 70px;
}

.btn-xxl {
  width: 160px;
  height: 80px;
}

/* Kích thước cho các nút tròn */
.neumorphic-circle.btn-xs {
  width: 30px;
  height: 30px;
}

.neumorphic-circle.btn-sm {
  width: 40px;
  height: 40px;
}

.neumorphic-circle.btn-md {
  width: 50px;
  height: 50px;
}

.neumorphic-circle.btn-lg {
  width: 60px;
  height: 60px;
}

.neumorphic-circle.btn-xl {
  width: 70px;
  height: 70px;
}

.neumorphic-circle.btn-xxl {
  width: 80px;
  height: 80px;
}

.button-with-description:hover .neumorphic-btn,
.button-with-description:hover .neumorphic-circle {
  box-shadow:
    4px 4px 8px #bebebe,
    -4px -4px 8px #ffffff;
}

.button-with-description:active .neumorphic-btn,
.button-with-description:active .neumorphic-circle {
  box-shadow:
    inset 6px 6px 12px #bebebe,
    inset -6px -6px 12px #ffffff;
}
</style>
