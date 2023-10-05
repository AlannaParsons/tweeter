$(document).ready(function() {

  const $newTweetAccess = document.querySelector('#new-tweet-button');

  $newTweetAccess.addEventListener('click', function (event) {
    event.preventDefault();
    const $tweetForm = document.querySelector('#tweet-form');

    $tweetForm.style.display = $tweetForm.style.display === 'flex' ? 'none' : 'flex';

  })
});