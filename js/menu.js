document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".navbar-toggler");
    const dropdown = document.querySelector(".sub-menu");
  
    toggleBtn.addEventListener("click", () => {
      dropdown.classList.toggle("open");
    });
  
    $(document).ready(function () {
      $(window).scroll(function () {
        if ($(window).scrollTop() > $("#header").height()) {
          $("#navbar").addClass("sticky-nav"); // Reemplaza 
        } else {
          $("#navbar").removeClass("sticky-nav"); // Elimina 
         
        }
      });
    });
  });

  