/*
logging the number of characters left available for user.
And if the textarea has more than 140 characters it
should be logging negative values =
If users exceed the 140 character limit, the counter should appear red

to do:
  replace console logs with proper standard response code
  tranverse elements, do not pull select seperatly (spec)
*/

$(() => {

  const $tweetText = document.querySelector('#tweet-text');
  $('#tweet-text').on('input', function (event) {
  //$tweetText.addEventListener('input', function (event) {
    event.preventDefault();

    const $tweetFrm = $(this).parent();
    const $charCounter = $tweetFrm.children(".button-counter").children(".counter");

    //set char counter to current length given by this.value
    $charCounter.val((CONSTANTS.MAX_CHAR_COUNT)-(this.value).length);

    if ($charCounter.val() < 0){
      $charCounter.css("color", "red");
    } else {
      $charCounter.css("color", "#545149");
    }

  })
});
