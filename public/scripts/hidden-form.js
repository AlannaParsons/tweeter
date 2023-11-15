/*
  make responsive tweetform that can be hidden until user reveals w
  new-tweet-button, click also scrolls to tweet form
  only works once, no need to rehide elem
*/

$(() => {

  $('#new-tweet-button').on('click', function (event) {
    event.preventDefault();
    $('#tweet-form').css('display','flex');

    $('html, body').animate({
      scrollTop: $('#tweet-form').offset().top - (CONSTANTS.SCROLL_PADDING)
    }, 1000);
  })

});