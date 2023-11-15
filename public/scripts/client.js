/*
  Client handles bulk of application:
    creating, validating and loading new tweets (break up?)
    when tweet is posted, tweet added to data, tweets reloaded w added data

  to do:
    replace console logs with proper standard response code? not to spec?
*/

$(() => {

  const createTweetSkeleton = (tweet) => {
    const $tweet = $(`
      <article class="tweet-container">
        <header>
          <span class="icon-name">
            <img src = "${tweet.user.avatars}" alt = "<i class="fa-solid fa-user"></i>
            &nbsp
            ${tweet.user.name}
          </span>
          <span class="account"> ${tweet.user.handle} </span>
        </header>
        <div class="content">
          ${tweet.content.text}
        </div>
        <footer>
          <span>${timeago.format(tweet.created_at, 'en_US')}</span>
          <ul class="icons">
            <li><i class="fa-solid fa-heart"></i></li>
            <li><i class="fa-solid fa-flag"></i></li>
            <li><i class="fa-solid fa-repeat"></i></li>
          </ul>
        </footer>
      </article>
    `);

    return $tweet;
  }

  const postTweet = (txtData) => {
    $.ajax ({
      method: 'POST',
      url: '/tweets',
      data: txtData,
      success: () => {
        loadTweets();
      },
      error: function(request,status,errorThrown) {
        alert("An error occurred: " & request, status, errorThrown);
      }
    })
  }

  /**
   * loadTweets() - use ajax to dynamicly load all tweets
   *
   * @return {undefined}
   * */
   const loadTweets = () => {
    $.ajax ({
      method: 'GET',
      url: '/tweets',
      success: (getdata) => {
        renderTweets(getdata);
      },
      error: function(request,status,errorThrown) {
        alert("An error occurred: " & request, status, errorThrown);
      }
    })
  }

    /**
   * renderTweets(data) - sends all tweet objects to the DOM
   *
   * beyond scope - data would be connected to database
   * @param {array} data - array of objects
   * @return {undefined}
  * */
  const renderTweets = (data) => {
    $('#tweets-container').empty();
    for (let snglTweet of data){
      const $snglTweet = createTweetSkeleton(snglTweet);

      $('#tweets-container').prepend($snglTweet);

      //add interactive icons to tweets
      addOnClick();
    }
  }

 /**
   * tweetForm.on('submit' - if input is valid, post tweet.
   * reset form only on successful submit
   *
   * @return {undefined}
   * */
  $('#tweet-form').on('submit', (event) => {
    event.preventDefault();

    //reset error popup if needed
    $('#error-popup').hide();

    const safeData = `${escape($('#tweet-form').serialize())}`;
    let inputtxt = $("#tweet-text").val();

    if (validation(inputtxt).length <= 0){
      postTweet(safeData);
      $('#tweet-form').trigger('reset');
      $('html, body').animate({
        scrollTop: $('#tweets-container').offset().top - (CONSTANTS.SCROLL_PADDING)
      }, 1000);
    } else {
      console.log ('error occurred in validation')
    }
  })

  // ALL THE MAGIC HAPPENS HERE
  loadTweets();
})

// *******************  HELPERS  ********************

/**
   * validation(input) - Implement validation before sending the
   * form data to the server. If any criterion of your validation
   * is not met, then you should notify the user by rendering a
   * message on the page.
   *
   * // The user should be given an error that their tweet content is too long or that it is not present (ideally separate messages for each scenario)
   * // The form should not be cleared
   * // The form should not submit
   *
   * @param {string} input - input from user for validation
   * @return {string} - empty or string containing error msg
   *      - .length to check for error
   * */
const validation = (input) => {
  let errMessage = '';
  if (!input) {
    errMessage = 'no valid tex† input given';
    errorHandler(errMessage);
  }
  else if (input.length > CONSTANTS.MAX_CHAR_COUNT){
    errMessage = 'text too long';
    errorHandler(errMessage);
  }
  return errMessage;
}

/**
 * errorHandler - provide pop up error message for user based on validation()
 *
 * @return {undefined} -
 * */
const errorHandler = (errMessage) => {
  $('#error-popup').children('#error-message').html(errMessage);
  $("#error-popup").css("display","flex");

  $('html, body').animate({
    scrollTop: $("#error-popup").offset().top - (CONSTANTS.SCROLL_PADDING)
  }, 1000);
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/**
 * addOnClick - add event listeners for dynamic elements
 *
 * specific to work with icons present on tweets (refactor?)
 * event listener currently changes icon color, may add additional functionality
 *
 * @return {undefined} -
 * */
const addOnClick = function () {
  $('.icons li').each(function(){
    $(this).on('click', () => {
      $(this).toggleClass('clicked');
    });
  });
}
