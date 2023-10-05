/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function

*/
//
//format(tweet.created_at, 'en_US');
//createTweetElement
//const timeago = require('timeago.js');


$(() => {
  //bad prectice?? dont know cant b good
  //$('#error-popup').hide();


  const createTweetSkeleton = (tweet) => {
    const $tweet = $(`
      <article class="tweet-container">
        <header>
          <span id="icon-name">
            <img src = "${tweet.user.avatars}" alt = "<i class="fa-solid fa-user"></i>
            ${tweet.user.name}
          </span>
          <span id="account"> ${tweet.user.handle} </span>
        </header>
        <div class="content">
          ${tweet.content.text}
        </div>
        <footer>
          <span>${timeago.format(tweet.created_at, 'en_US')}</span>
          <span id="icons">
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-repeat"></i>
          </span>
        </footer>
      </article>
    `);

    return $tweet;
  };

  const postTweet = (txtData) => {
    $.ajax ({
      method: 'POST',
      url: '/tweets',
      data: txtData,
      success: () => {
        console.log('post request resolved successfully');
        loadTweets();
        //loadTweets();
      }
    })
  }

    /**
   * renderTweets(data) - sends all tweet objects to the DOM
   *
   * move into load tweets logic????
   * @param {array} data - array of objects
   * @return {undefined}
  * */
     const renderTweets = (data) => {
      const $tweetsContainer = $('#tweets-container')
      $tweetsContainer.empty();
      for (let snglTweet of data){
        const $snglTweet = createTweetSkeleton(snglTweet);


        $tweetsContainer.prepend($snglTweet);
      }
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
        console.log('success get');
      }

    })
  }



  //i am mad
  const $tweetForm = $('#tweet-form');

  $tweetForm.on('submit', (event) => {
    event.preventDefault();
    //reset error popup if needed
    $('#error-popup').hide();

    const safeData = `${escape($tweetForm.serialize())}`;
    let inputtxt = $("#tweet-text").val();

    if (validation(inputtxt).length <= 0){
      //make post tweet modular??
      postTweet(safeData);


    } else {
      console.log ('error occurred in validation')

    }
    $tweetForm.trigger("reset");

  })





  loadTweets();




});

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

//
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
};


const errorHandler = (errMessage) => {
  $('#errorPopup').children('#error-message').html(errMessage)
  $('#errorPopup').slideDown('slow');
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};





// {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }
