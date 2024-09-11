  /*Nav - left*/
document.addEventListener("DOMContentLoaded", function () {
    // Tạo một đối tượng XMLHttpRequest để tải nội dung từ file a.html
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Lấy nội dung từ file a.html
        var headerContent = xhr.responseText;

        // Chèn nội dung vào một thẻ div trong trang b.html
        document.getElementById("nav-left").innerHTML = headerContent;
      }
    };
    // Mở file a.html
    xhr.open("GET", "../FU-SendMail/nav-left.html", true);
    // Gửi yêu cầu
    xhr.send();
  });


  /*Nav - top*/
  document.addEventListener("DOMContentLoaded", function () {
    // Tạo một đối tượng XMLHttpRequest để tải nội dung từ file a.html
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Lấy nội dung từ file a.html
        var headerContent = xhr.responseText;

        // Chèn nội dung vào một thẻ div trong trang b.html
        document.getElementById("nav-top").innerHTML = headerContent;
      }
    };
    // Mở file a.html
    xhr.open("GET", "../FU-SendMail/nav-top.html", true);
    // Gửi yêu cầu
    xhr.send();
  });


  /*Nav - right*/ 
  document.addEventListener("DOMContentLoaded", function () {
    // Tạo một đối tượng XMLHttpRequest để tải nội dung từ file a.html
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Lấy nội dung từ file a.html
        var headerContent = xhr.responseText;

        // Chèn nội dung vào một thẻ div trong trang b.html
        document.getElementById("nav-right").innerHTML = headerContent;
      }
    };
    // Mở file a.html
    xhr.open("GET", "../FU-SendMail/nav-right.html", true);
    // Gửi yêu cầu
    xhr.send();
  });


  
  /*mail - content*/ 
  document.addEventListener("DOMContentLoaded", function () {
    // Tạo một đối tượng XMLHttpRequest để tải nội dung từ file a.html
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Lấy nội dung từ file a.html
        var headerContent = xhr.responseText;

        // Chèn nội dung vào một thẻ div trong trang b.html
        document.getElementById("mail-content").innerHTML = headerContent;
      }
    };
    // Mở file a.html
    xhr.open("GET", "../FU-SendMail/mail-content.html", true);
    // Gửi yêu cầu
    xhr.send();
  });

    /*mail - data*/ 
    document.addEventListener("DOMContentLoaded", function () {
      // Tạo một đối tượng XMLHttpRequest để tải nội dung từ file a.html
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Lấy nội dung từ file a.html
          var headerContent = xhr.responseText;
  
          // Chèn nội dung vào một thẻ div trong trang b.html
          document.getElementById("mail-data").innerHTML = headerContent;
        }
      };
      // Mở file a.html
      xhr.open("GET", "../FU-SendMail/mail-data.html", true);
      // Gửi yêu cầu
      xhr.send();
    });