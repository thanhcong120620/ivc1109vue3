<template>
  <div :class="darkModeClass">
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div class="flex items-center justify-center h-full">
        <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 class="text-3xl font-semibold text-center text-gray-800 dark:text-white">
            Dark Mode Example
          </h1>
          <p class="text-center text-gray-600 dark:text-gray-300 mt-4">
            This is an example of how to toggle dark mode in Vue with Tailwind CSS.
          </p>
          <button
            @click="toggleDarkMode"
            class="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Toggle Dark Mode
          </button>
        </div>
      </div>
    </div>
  </div>

  <div>
    <!--Dark Mode
    - bg-white dark:bg-gray-900: Nền của phần tử sẽ là trắng ở chế độ sáng và xám đen khi chế độ tối được bật.
    - text-gray-800 dark:text-white: Màu chữ sẽ là xám đậm khi ở chế độ sáng và trắng khi ở chế độ tối. 
    -->
    <div class="bg-white dark:bg-gray-900 p-6">
      <h1 class="text-gray-800 dark:text-white">This is a Dark Mode Example</h1>
    </div>
  </div>

  <div>
    <!-- Flexbox:
  - Flexbox là một mô hình bố cục rất mạnh mẽ trong CSS để căn chỉnh các phần tử con trong một container. Với Tailwind CSS, bạn chỉ cần 
  sử dụng các lớp tiện ích để thiết lập các tính năng của Flexbox. 
  - flex: Đặt một container thành flex container (bố cục linh hoạt).
  - flex-row: Đặt chiều ngang là hàng (mặc định).
  - flex-col: Đặt chiều dọc là cột.
  - flex-wrap: Cho phép các phần tử con bọc lại khi không còn không gian.
  - justify-{content}: Điều chỉnh căn chỉnh phần tử con theo chiều ngang (ví dụ: justify-center, justify-between).
  - items-{alignment}: Căn chỉnh phần tử con theo chiều dọc (ví dụ: items-center, items-start).
  - items-center: Căn giữa các phần tử con theo chiều dọc (cross-axis).
  - justify-center: Căn giữa các phần tử con theo chiều ngang (main-axis).
  - gap-{size}: Đặt khoảng cách giữa các phần tử con trong flex container.
  - flex justify-center items-center: Căn giữa các phần tử con cả theo chiều ngang và chiều dọc trong container cha.
  - flex-col: Các phần tử con xếp theo chiều dọc.
  - gap-4: Đặt khoảng cách giữa các phần tử con là 1rem (16px).
-->
  </div>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="flex flex-col gap-4 w-1/3 bg-white p-8 rounded-lg shadow-lg">
      <div class="bg-blue-500 text-white text-center p-4">Phần tử 1</div>
      <div class="bg-green-500 text-white text-center p-4">Phần tử 2</div>
      <div class="bg-red-500 text-white text-center p-4">Phần tử 3</div>
    </div>
  </div>

  <div>
    <!-- Grid - Chia cột:
  - grid: Thiết lập một container với bố cục grid.
  - grid-cols-{n}: Đặt số lượng cột trong grid (ví dụ: grid-cols-3 sẽ có 3 cột).
  - grid-rows-{n}: Đặt số lượng hàng trong grid (ví dụ: grid-rows-2 sẽ có 2 hàng).
  - gap-{size}: Đặt khoảng cách giữa các phần tử trong grid.
  - col-span-{n}: Phần tử này chiếm n cột.
  - row-span-{n}: Phần tử này chiếm n hàng. 
  - grid-cols-3: Thiết lập 3 cột cho grid.
  - gap-4: Đặt khoảng cách giữa các phần tử là 1rem (16px).
  - col-span-2: Phần tử thứ 4 chiếm 2 cột trong grid.  
  -->
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-blue-500 text-white p-4">Cột 1</div>
      <div class="bg-green-500 text-white p-4">Cột 2</div>
      <div class="bg-red-500 text-white p-4">Cột 3</div>
      <div class="bg-yellow-500 text-white p-4 col-span-2">Cột 4 (chiếm 2 cột)</div>
    </div>
  </div>

  <!-- Flexbox -->
  <div class="flex justify-center items-center space-x-4">
    <div class="bg-blue-500 p-6 text-white">Phần tử 1</div>
    <div class="bg-green-500 p-6 text-white">Phần tử 2</div>
  </div>

  <!-- Grid -->
  <div class="grid grid-cols-3 gap-4">
    <div class="bg-red-500 p-6 text-white">Cột 1</div>
    <div class="bg-yellow-500 p-6 text-white">Cột 2</div>
    <div class="bg-blue-500 p-6 text-white">Cột 3</div>
  </div>

  <div>
    <!-- Responsive Design
    - Tailwind CSS hỗ trợ thiết kế responsive bằng cách sử dụng các lớp như sm:, md:, lg:, xl:, và 2xl:
    - sm:p-8: Khi màn hình có kích thước small (sm) trở lên, padding sẽ là 8.
    - md:p-10: Khi màn hình có kích thước medium (md) trở lên, padding sẽ là 10.
    - lg:p-12: Khi màn hình có kích thước large (lg) trở lên, padding sẽ là 12.
    - Các lớp text-sm, text-base, text-lg, text-xl thay đổi kích thước chữ tùy vào kích thước màn hình. 
    -->
    <div class="bg-gray-100 p-6 sm:p-8 md:p-10 lg:p-12">
      <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800">
        Responsive Title
      </h1>
      <p class="text-sm sm:text-base md:text-lg lg:text-xl text-center text-gray-600 mt-4">
        This text changes size depending on the screen size.
      </p>
    </div>
  </div>

  <div>
    <!-- Ứng dụng: 
  - w-full: Chiều rộng của phần tử cha sẽ là chiều rộng của toàn bộ không gian có sẵn.
  - max-w-3xl: Chiều rộng tối đa của phần tử cha sẽ là 48rem (768px).
  - min-w-[200px]: Chiều rộng tối thiểu của phần tử cha là 200px.
  - w-1/2: Chiều rộng của phần tử con đầu tiên chiếm một nửa chiều rộng của phần tử cha.
  - w-auto: Chiều rộng của phần tử con thứ hai sẽ tự động điều chỉnh theo nội dung.
    -->
    <div class="w-full max-w-3xl min-w-[200px] bg-gray-200">
      <div class="w-1/2 bg-blue-500">Đây là phần tử có chiều rộng bằng một nửa phần tử cha</div>
      <div class="w-auto bg-green-500">Đây là phần tử có chiều rộng tự động theo nội dung</div>
    </div>
  </div>

  <!-- ----------------------------------------------------------------------------------------------------------------- -->

  <div>
    <!-- Màu Sắc và Background trong Tailwind CSS
  - text-{color}: Màu chữ (text color).
  - border-{color}: Màu viền (border color).
  - hover:bg-{color}: Màu nền khi hover (hover background).
  - focus:bg-{color}: Màu nền khi focus (focus background). 
  - bg-blue-500: Màu nền xanh dương.
  - text-white: Màu chữ trắng.
  - hover:bg-blue-700: Khi hover vào phần tử, màu nền sẽ chuyển thành xanh dương đậm.
  - focus:ring-4 focus:ring-blue-300: Khi phần tử được focus, sẽ có hiệu ứng vòng viền màu xanh nhạt.

  Các Lớp Background:
  - bg-{color}: Đặt màu nền (ví dụ: bg-blue-500, bg-red-200).
  - bg-{image}: Đặt hình nền (ví dụ: bg-cover, bg-center).
  - bg-repeat, bg-no-repeat: Kiểm soát việc lặp lại hình nền.
  - bg-gradient-to-{direction}: Tạo gradient nền (ví dụ: bg-gradient-to-r, bg-gradient-to-t).
  - bg-opacity-{value}: Đặt độ mờ cho nền.
  -->

    <div class="bg-blue-500 text-white p-4 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">
      Đây là một ví dụ về màu sắc trong Tailwind.
    </div>
    <div class="bg-blue-500 p-8">Phần tử này có nền màu xanh dương với padding 2rem (32px).</div>

    <div class="bg-gradient-to-r from-green-400 to-blue-500 p-8 text-white">
      Phần tử này có nền gradient từ xanh lá sang xanh dương.
    </div>

    <div
      class="bg-cover bg-center"
      style="background-image: url('path/to/image.jpg'); height: 200px"
    >
      Nền hình ảnh với hình nền bao phủ và căn giữa.
    </div>
  </div>

  <div>
    <!-- Font chữ và Kích thước trong Tailwind CSS
  - font-{family}: Đặt font chữ cho phần tử (ví dụ: font-sans, font-serif, font-mono).
  - font-{weight}: Đặt độ đậm của chữ (ví dụ: font-bold, font-light).
  - text-{size}: Đặt kích thước chữ (ví dụ: text-lg, text-xl, text-3xl).
  - font-bold: Đặt chữ đậm.
  - text-{color}: Đặt màu sắc cho chữ (đã đề cập ở trên).
  - text-center: Căn giữa chữ theo chiều ngang. 
  - text-center, text-left, text-right: Đặt căn chỉnh chữ (giữa, trái, phải).
  - font-serif: Sử dụng font chữ serif.
  - text-4xl: Đặt kích thước chữ là 2.25rem (36px).
  - text-center: Căn giữa nội dung.
  - text-blue-600: Màu chữ xanh dương đậm
  - uppercase, lowercase, capitalize: Đặt chữ in hoa, in thường hoặc viết hoa chữ cái đầu tiên.
  - leading-{size}: Đặt khoảng cách giữa các dòng (line-height).
  - tracking-{size}: Đặt khoảng cách giữa các chữ (letter-spacing).
  - line-clamp-{n}: Hạn chế số dòng văn bản hiển thị.
  -->
    <div class="font-serif text-4xl text-center text-blue-600">Đây là một tiêu đề đẹp.</div>
    <p class="font-serif text-lg text-gray-700 leading-8">
      Đây là một đoạn văn bản sử dụng font serif, cỡ chữ lớn, màu xám, và khoảng cách dòng rộng.
    </p>

    <h1 class="font-bold text-4xl text-center text-blue-500">
      Tiêu đề lớn với màu xanh và căn giữa
    </h1>

    <div class="text-sm text-gray-500 uppercase tracking-wider">
      Văn bản nhỏ với màu xám, chữ hoa và khoảng cách giữa các chữ rộng hơn.
    </div>
  </div>

  <div>
    <!-- Đổ Bóng và Hiệu Ứng trong Tailwind CSS
  - shadow: Thêm bóng mờ cơ bản.
  - shadow-md: Thêm bóng mờ vừa.
  - shadow-lg: Thêm bóng mờ lớn.
  - shadow-xl: Thêm bóng mờ cực lớn.
  - shadow-2xl: Đổ bóng cực lớn.
  - shadow-inner: Thêm bóng cho phần tử bên trong.
  - shadow-none: Không có bóng.
  -->
    <div class="bg-white p-8 rounded-lg shadow-lg">Đây là một phần tử có đổ bóng lớn.</div>
    <div class="shadow-lg p-6 bg-white">Phần tử này có đổ bóng lớn và nền trắng.</div>
    <div class="shadow-inner p-6 bg-gray-300">Phần tử này có đổ bóng bên trong.</div>
    <div class="shadow-none p-6 bg-gray-100">Phần tử này không có đổ bóng.</div>
  </div>

  <div>
    <!-- Transition và Animation
Tailwind CSS hỗ trợ việc thêm transition và animation để tạo hiệu ứng chuyển động cho các phần tử khi trạng thái của chúng thay đổi.

Các Lớp Transition:
  - transition: Thêm hiệu ứng chuyển tiếp cho tất cả các thuộc tính.
  - transition-all: Chuyển tiếp tất cả các thuộc tính.
  - transition-colors, transition-opacity, transition-transform: Chuyển tiếp một thuộc tính cụ thể.

Các Lớp Animation:
  - animate-spin: Hiệu ứng quay.
  - animate-ping: Hiệu ứng nhấp nháy.
  - animate-pulse: Hiệu ứng nhấp nháy mờ dần.
  - animate-bounce: Hiệu ứng nhún.

Các giá trị của duration:
  - duration-75: 75ms
  - duration-100: 100ms
  - duration-150: 150ms
  - duration-200: 200ms
  - duration-300: 300ms
  - duration-500: 500ms
  - duration-700: 700ms
  - duration-1000: 1000ms (1s)   
  -->
    <!-- Transition -->
    <button class="transition-all duration-300 hover:bg-blue-500 hover:text-white p-4">
      Chuyển tiếp màu nền và màu chữ khi hover
    </button>

    <!-- Animation -->
    <div class="animate-spin p-6 bg-green-500 text-white">Đang quay</div>
    <div class="animate-bounce p-6 bg-green-500 text-black">Đang nhún</div>
    <div class="animate-ping p-6 bg-yellow-500 text-yellow">Đang nhấp nháy</div>
    <div class="animate-pulse p-6 bg-yellow-500 text-red">Đang nhấp nháy mờ dần</div>
    <!-- Animation với thời gian 300ms -->
    <div class="animate-pulse duration-500 p-6 bg-blue-500 text-white">
      Phần tử này có hiệu ứng nhấp nháy với thời gian kéo dài 300ms.
    </div>
    <!-- Animation với thời gian 1000ms -->
    <div class="animate-pulse duration-1000 p-6 bg-green-500 text-white">
      Phần tử này có hiệu ứng nhấp nháy với thời gian kéo dài 1000ms (1s).
    </div>
  </div>

  <div>
    <!-- Hiệu ứng chuyển động (Transition) và Hover:
  - transition: Thêm hiệu ứng chuyển động mặc định.
  - duration-{time}: Đặt thời gian cho chuyển động (ví dụ: duration-300 cho 300ms).
  - ease-in-out: Hiệu ứng chuyển động mượt mà.
  - transition duration-300 ease-in-out: Thêm hiệu ứng chuyển động mượt mà trong 300ms khi hover.
  - hover:bg-blue-700: Khi hover, màu nền sẽ chuyển thành xanh dương đậm. 
    -->
    <button
      class="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-700"
    >
      Nhấn vào đây
    </button>
  </div>

  <div>
    <!-- Hover và Focus Effects
    - Tailwind CSS cung cấp các lớp như hover:, focus:, active: 
    - hover:bg-blue-600: Khi người dùng hover vào nút, màu nền của nó sẽ chuyển thành màu xanh dương 600.
    - focus:outline-none: Khi nút được focus (chọn), đường viền sẽ bị loại bỏ.    
    -->
    <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
      Hover or Focus Me
    </button>
  </div>

  <div>
    <!-- 1. Positioning trong Tailwind CSS:
    - relative: Đặt phần tử ở vị trí tương đối so với vị trí ban đầu của nó (vị trí mặc định).
    - absolute: Đặt phần tử ở vị trí tuyệt đối so với phần tử cha có position: relative hoặc theo phần tử gần nhất có position: relative.
    - fixed: Đặt phần tử cố định với viewport, luôn xuất hiện tại một vị trí cố định trên màn hình, ngay cả khi cuộn trang.
    - sticky: Đặt phần tử có thể "dính" vào vị trí khi cuộn trang đến một vị trí nhất định (giống như thanh menu sticky).
    - static: Là giá trị mặc định, không áp dụng các thuộc tính top, bottom, left, right.
    - Các Lớp Vị Trí (Position) nâng cao:
    - inset-0: Đặt tất cả các giá trị top, right, bottom, và left thành 0.
    - z-{index}: Đặt giá trị z-index để điều chỉnh mức độ chồng lấp của phần tử.  
  -->
    <div class="relative bg-gray-300 h-48">
      <div class="absolute top-4 right-4 bg-blue-500 text-white p-4">
        Phần tử ở vị trí tuyệt đối
      </div>
      <!-- 
  relative: Phần tử cha được đặt ở vị trí tương đối.
  absolute top-4 right-4: Phần tử con được đặt ở vị trí tuyệt đối cách từ trên và từ phải là 1rem (16px). 
  -->
    </div>
  </div>

  <!-- Sticky Menu: sticky top-0 Thanh menu này sẽ "dính" ở trên cùng của màn hình khi bạn cuộn trang.-->
  <div class="sticky top-0 bg-blue-500 text-white p-4">
    Thanh menu dính ở trên cùng khi cuộn trang
  </div>

  <div>
    <!-- 2. Display trong Tailwind CSS:
    - block: Đặt phần tử là display: block, chiếm toàn bộ chiều rộng của phần tử cha và bắt đầu trên một dòng mới.
    - inline: Đặt phần tử là display: inline, phần tử này sẽ không chiếm toàn bộ chiều rộng và nằm trên cùng một dòng với các phần tử khác.
    - inline-block: Phần tử sẽ vừa như inline nhưng có thể nhận các thuộc tính kích thước như width, height.
    - flex: Đặt phần tử thành flex container.
    - grid: Đặt phần tử thành grid container.
    - hidden: Ẩn phần tử.
    - inline-flex: Đặt phần tử thành inline flex container.
    - inline-grid: Đặt phần tử thành inline grid container. 
    -->

    <!-- Block Element (block: Phần tử chiếm toàn bộ chiều rộng của phần tử cha và bắt đầu trên một dòng mới.)  -->
    <div class="block bg-blue-500 text-white p-4">Đây là phần tử block.</div>

    <!-- Inline Element (inline: Phần tử này sẽ hiển thị trên cùng một dòng với các phần tử khác và không chiếm toàn bộ chiều rộng.) -->
    <span class="inline text-red-500"> Đây là phần tử inline. </span>

    <!-- Flex Container (flex: Phần tử cha sẽ trở thành flex container, cho phép bạn sử dụng các tiện ích như justify-center và 
     items-center để căn giữa các phần tử con.) -->
    <div class="flex justify-center items-center bg-gray-300 h-48">
      <div class="bg-blue-500 text-white p-4">Phần tử flex</div>
    </div>

    <!-- Grid Container (grid: Phần tử cha sẽ trở thành grid container với 2 cột (sử dụng grid-cols-2).)  -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-blue-500 text-white p-4">Cột 1</div>
      <div class="bg-green-500 text-white p-4">Cột 2</div>
    </div>

    <!-- Inline-flex Element (inline-flex: Phần tử này sẽ hiển thị như một flex container nhưng vẫn nằm trên cùng một dòng với các phần 
     tử khác.) -->
    <div class="inline-flex space-x-4 bg-gray-100 p-4">
      <div class="bg-blue-500 text-white p-4">Phần tử 1</div>
      <div class="bg-green-500 text-white p-4">Phần tử 2</div>
    </div>

    <!-- Ẩn Phần Tử (hidden) (hidden: Phần tử này sẽ không được hiển thị trên trang.) -->
    <div class="hidden">Đây là phần tử bị ẩn</div>
  </div>

  <div>
    <!-- 3. Kết Hợp Position và Display: Bạn có thể kết hợp positioning và display để tạo ra các hiệu ứng phức tạp hơn, chẳng hạn như 
   tạo một menu với fixed position, hoặc sử dụng absolute để căn chỉnh phần tử trong một flex hoặc grid container. 
  Ví dụ: fixed top-4 right-4: Phần tử "Fixed Box" sẽ được cố định ở phía trên bên phải màn hình, không bị ảnh hưởng bởi cuộn trang.
   -->
    <div class="flex justify-between items-center bg-gray-200 p-4">
      <div class="bg-blue-500 text-white p-4">Logo</div>
      <div class="fixed top-4 right-4 bg-red-500 text-white p-4">Fixed Box</div>
    </div>
  </div>

  <div>
    <!-- Border trong Tailwind CSS
border: Thêm viền mặc định (1px solid).
border-{color}: Đặt màu viền (ví dụ: border-red-500).
border-{width}: Đặt độ dày viền (ví dụ: border-2).
border-{side}: Đặt viền cho một phía của phần tử (border-t, border-b, border-l, border-r).
border-solid, border-dashed, border-dotted: Đặt kiểu viền (đặc, gạch chéo, chấm).  
border-2: Viền dày 2px.
border-blue-500: Màu viền xanh dương.
border-t-4: Viền trên dày 4px.
border-dashed: Kiểu viền là gạch chéo.
border-b-8: Viền dưới dày 8px.
Các Lớp Border Radius:
rounded: Bo góc phần tử với bán kính 0.25rem (4px).
rounded-{size}: Đặt bán kính bo góc (ví dụ: rounded-lg).
rounded-full: Bo tròn hoàn toàn (đối với hình tròn).
rounded-tl-{size}, rounded-br-{size}: Bo góc riêng biệt.
  -->
    <div class="border-2 border-blue-500 p-4">Phần tử này có viền xanh dày 2px.</div>

    <div class="border-t-4 border-dashed border-green-500 p-4">
      Phần tử này có viền trên kiểu dashed và màu xanh.
    </div>

    <div class="border-b-8 border-red-300 p-4">
      Phần tử này có viền dưới dày 8px và màu đỏ nhạt.
    </div>
    <div class="border-4 border-blue-500 rounded-lg p-4">Phần tử này có bo góc lớn.</div>

    <div class="border-4 border-red-500 rounded-full p-4">
      Phần tử này có viền bo tròn hoàn toàn (hình tròn).
    </div>
  </div>

  <div>
    <!-- Margin trong Tailwind CSS
m-{size}: Đặt margin cho tất cả các phía (trên, dưới, trái, phải).
mt-{size}: Đặt margin phía trên.
mb-{size}: Đặt margin phía dưới.
ml-{size}: Đặt margin phía trái.
mr-{size}: Đặt margin phía phải.
mx-{size}: Đặt margin cho trái và phải.
my-{size}: Đặt margin cho trên và dưới.
m-4: Margin 1rem (16px) cho tất cả các phía.
mt-6 mb-4: Margin trên 1.5rem (24px), margin dưới 1rem (16px).
mx-auto: Margin trái và phải tự động, thường dùng để căn giữa phần tử ngang.  
  -->
    <div class="m-4 bg-gray-200">Phần tử này có margin 1rem (16px) ở tất cả các phía.</div>

    <div class="mt-6 mb-4 bg-yellow-200">
      Phần tử này có margin trên 1.5rem (24px) và dưới 1rem (16px).
    </div>

    <div class="mx-auto w-1/2 bg-green-200">
      Phần tử này có margin trái phải tự động (centering) và chiều rộng 50%.
    </div>
  </div>

  <div>
    <!-- Padding trong Tailwind CSS 
p-{size}: Đặt padding cho tất cả các phía.
pt-{size}: Đặt padding phía trên.
pb-{size}: Đặt padding phía dưới.
pl-{size}: Đặt padding phía trái.
pr-{size}: Đặt padding phía phải.
px-{size}: Đặt padding cho trái và phải.
py-{size}: Đặt padding cho trên và dưới.
p-6: Padding 1.5rem (24px) cho tất cả các phía.
pt-8 pb-4: Padding trên 2rem (32px), dưới 1rem (16px).
px-10 py-4: Padding trái phải 2.5rem (40px), trên dưới 1rem (16px). 
  -->
    <div class="p-6 bg-gray-300">Phần tử này có padding 1.5rem (24px) ở tất cả các phía.</div>

    <div class="pt-8 pb-4 bg-blue-200">
      Phần tử này có padding trên 2rem (32px) và dưới 1rem (16px).
    </div>

    <div class="px-10 py-4 bg-red-200">
      Phần tử này có padding trái phải 2.5rem (40px) và trên dưới 1rem (16px).
    </div>
  </div>

  <div>
    <!-- Overflow trong Tailwind CSS: Thuộc tính overflow quyết định cách thức xử lý nội dung khi nó vượt quá không gian của phần tử cha
overflow-auto: Thêm thanh cuộn khi nội dung tràn ra ngoài.
overflow-hidden: Ẩn nội dung tràn ra ngoài.
overflow-visible: Để nội dung tràn ra ngoài và không bị cắt.
overflow-scroll: Thêm thanh cuộn luôn luôn hiển thị (cả chiều ngang và chiều dọc).  
overflow-auto: Thanh cuộn sẽ xuất hiện khi nội dung vượt quá không gian của phần tử.
overflow-hidden: Nội dung bị ẩn khi vượt quá không gian của phần tử.
overflow-scroll: Thanh cuộn luôn luôn hiển thị.
  -->
    <div class="overflow-auto bg-gray-200 h-48">
      <div class="h-72 bg-yellow-500">
        Nội dung này sẽ tạo thanh cuộn khi chiều cao vượt quá phần tử cha.
      </div>
    </div>

    <div class="overflow-hidden bg-blue-200 h-48">
      <div class="h-72 bg-green-500">
        Nội dung này sẽ bị ẩn khi vượt qua chiều cao của phần tử cha.
      </div>
    </div>

    <div class="overflow-scroll bg-red-200 h-48">
      <div class="h-72 bg-purple-500">
        Thanh cuộn luôn hiển thị, nội dung sẽ có thể cuộn khi vượt quá phần tử cha.
      </div>
    </div>
  </div>

  <div>
    <!-- CHIỀU RỘNG - CHIỀU CAO 

      Chiều cao:
    - min-h-screen: Đặt chiều cao tối thiểu của phần tử bằng chiều cao của màn hình, giúp cho phần tử chiếm toàn bộ màn hình.
    - Bạn có thể sử dụng các lớp như h-10, h-20, h-32, v.v., để đặt chiều cao cố định cho phần tử.
    - Chiều Cao Dựa Trên Tỉ Lệ (h-full, h-screen).
    - Sử Dụng min-h-* và max-h-*
      + min-h-*: Đặt chiều cao tối thiểu của phần tử. Ví dụ, min-h-20 sẽ đặt chiều cao tối thiểu là 5rem (80px).
      + max-h-*: Đặt chiều cao tối đa của phần tử. Ví dụ, max-h-64 sẽ giới hạn chiều cao tối đa là 16rem (256px).
    - Bạn có thể sử dụng h-[percentage] để thiết lập chiều cao theo tỷ lệ phần trăm.
    - Sử Dụng h-auto Để Tự Động Điều Chỉnh Chiều Cao.
    - Bạn có thể kết hợp nhiều lớp để đạt được hiệu ứng mong muốn, chẳng hạn như sử dụng min-h-*, max-h-* kết hợp với overflow-* để 
    đảm bảo rằng nếu nội dung vượt quá chiều cao, sẽ xuất hiện thanh cuộn.
      
      Chiều rộng:
    - Bạn có thể sử dụng các lớp như w-10, w-20, w-32, v.v., để đặt chiều rộng cố định cho phần tử.
    - w-full: Đặt chiều rộng của phần tử bằng với chiều rộng của phần tử cha.
    - w-screen: Đặt chiều rộng của phần tử bằng với chiều rộng của màn hình (viewport width, tương đương 100vw trong CSS).
    - max-w-*: Đặt chiều rộng tối đa của phần tử. Ví dụ, max-w-xs sẽ giới hạn chiều rộng tối đa là 20rem (320px).
    - min-w-*: Đặt chiều rộng tối thiểu của phần tử. Ví dụ, min-w-[200px] sẽ đặt chiều rộng tối thiểu là 200px.
    - Bạn có thể sử dụng w-[percentage] để thiết lập chiều rộng theo tỷ lệ phần trăm.
    - Nếu bạn muốn phần tử tự động thay đổi chiều rộng theo nội dung bên trong, bạn có thể sử dụng w-auto. Điều này sẽ làm cho phần tử 
    có chiều rộng linh hoạt tùy vào nội dung.
    - Tailwind CSS cũng hỗ trợ các lớp để thiết lập tỷ lệ khung hình (aspect ratio), điều này có thể giúp bạn duy trì tỷ lệ chiều rộng 
    và chiều cao trong một phần tử, như hình ảnh hoặc video:
        Ví dụ: aspect-w-16 aspect-h-9 sẽ thiết lập tỷ lệ khung hình là 16:9 cho phần tử, giúp duy trì sự cân đối giữa chiều rộng và 
        chiều cao.
        <div class="w-full aspect-w-16 aspect-h-9 bg-gray-400">
            Nội dung ở đây với tỷ lệ 16:9
        </div>

    - bg-gray-100: Thiết lập nền của phần tử là màu xám sáng.
    - flex: Áp dụng Flexbox cho phần tử, giúp căn chỉnh các phần tử con.
    - flex-1 giúp phần tử chiếm tất cả không gian còn lại sau khi phần tử có chiều rộng cố định w-32 đã chiếm không gian.
    - items-center: Căn giữa các phần tử con theo chiều dọc.
    - justify-center: Căn giữa các phần tử con theo chiều ngang.
    - p-6: Đặt padding (khoảng cách bên trong) cho phần tử là 6 (tương đương với 1.5rem).
    - rounded-lg: Bo góc phần tử với bán kính lớn.
    - shadow-lg: Thêm hiệu ứng bóng đổ lớn cho phần tử.
    - max-w-md: Thiết lập chiều rộng tối đa của phần tử là md (medium size).
    - text-3xl: Đặt kích thước font chữ là 3xl.
    - font-semibold: Áp dụng font chữ có độ đậm bán.
    - text-center: Căn giữa văn bản.
    - bg-blue-500: Thiết lập nền của nút là màu xanh dương.
    - text-white: Thiết lập màu chữ của nút là trắng.
    - hover:bg-blue-600: Khi người dùng di chuột vào nút, nền của nó sẽ chuyển sang màu xanh dương 600.
    - focus:outline-none: Loại bỏ đường viền khi nút được focus. 
    -->

    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h1 class="text-3xl font-semibold text-center text-gray-800">Hello, Tailwind CSS!</h1>
        <p class="text-center text-gray-600 mt-4">
          This is a simple example of using Tailwind CSS in Vue 3.
        </p>
        <button
          @click="handleClick"
          class="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Click Me
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// Khai báo trạng thái chế độ tối
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')

// Tính toán class cho chế độ tối
const darkModeClass = computed(() => (isDarkMode.value ? 'app-dark' : ''))

// Hàm chuyển đổi trạng thái chế độ tối
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value)
}

// Hàm xử lý sự kiện click
const handleClick = () => {
  alert('Button clicked!')
}

// Kiểm tra chế độ tối khi component được mount
onMounted(() => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('app-dark')
  }
})

// Theo dõi sự thay đổi của isDarkMode và cập nhật lớp
watch(isDarkMode, (newVal) => {
  if (newVal) {
    document.documentElement.classList.add('app-dark')
  } else {
    document.documentElement.classList.remove('app-dark')
  }
})
</script>

<style scoped>
/* Các style tùy chỉnh khác có thể được thêm vào đây */
</style>
