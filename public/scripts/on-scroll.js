$(document).ready(function() {

  const $footer = document.querySelector('#primary-footer');

  // When the user scrolls down 30px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};


  $('#footer-button').on('click', function (event) {
    event.preventDefault();
    topFunction();

  })

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      $footer.style.display = "flex";
      $('#new-tweet-button').slideUp('slow');
    } else {
      $footer.style.display = "none";
      $('#new-tweet-button').slideDown('slow');
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }



});






