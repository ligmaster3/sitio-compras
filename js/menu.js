$(document).ready(function() {
  $(window).scroll(function() {
      if ($(this).scrollTop() > 0.7 * $(window).height()) { // Verifica si el desplazamiento es mayor a 70vh
          $('#navbar').addClass('nav-color-change'); // Agrega la clase para cambiar el color
      } else {
          $('#navbar').removeClass('nav-color-change'); // Elimina la clase para restaurar el color predeterminado
      }
  });
});
