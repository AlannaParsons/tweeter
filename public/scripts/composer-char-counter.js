// By the end of this task you should be console logging the number of
// characters left. And if the textarea has more than 140 characters it
// should be logging negative values.

//use jQuery to traverse up the DOM tree from that node/element
//If users exceed the 140 character limit, the counter should appear red

$(document).ready(function() {
  //console.log('JS READY')

  const $tweetText = document.querySelector('#tweet-text');

  $tweetText.addEventListener('input', function (event) {
    event.preventDefault();

    const $tweetFrm = $(this).parent();
    const $charCounter = $tweetFrm.children(".button-counter").children(".counter");

    //set char counter to current length given by this.value
    $charCounter.val((CONSTANTS.MAX_CHAR_COUNT)-(this.value).length);

    if ($charCounter.val() <= 0){
      $charCounter.css("color", "red");
    } else {
      $charCounter.css("color", "#545149");
    }

  })
});
