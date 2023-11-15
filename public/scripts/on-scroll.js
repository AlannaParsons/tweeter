/*
  When user scrolls, new tweet button disappears (to spec. functional??)
  May also use button to tranverse instantly to top of page
*/

$(() => {

  // When the user scrolls down 30px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};

  $('#footer-button').on('click', function (event) {
    event.preventDefault();
    topFunction();
  })

  function scrollFunction() {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
      $('#footer-button').slideDown('slow');
      $('#new-tweet-button').slideUp('slow');
    } else {
      $('#footer-button').slideUp('slow');
      $('#new-tweet-button').slideDown('slow');
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
});






