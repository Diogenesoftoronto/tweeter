/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
// avoid cross site scripting
const esc = function (str) {
  let para = document.createElement("p");
  para.appendChild(document.createTextNode(str));
  return para.innerHTML;
};

// tweet article is made here
const createTweetElement = (obj) => {
  const tweetArticle =  
  `<article class="tweet">
  <div class='tweet-header'>
  <div class='tweet-header-left'>
  <img class='profile' src=${obj.user.avatars}></img>
  <h3>${obj.user.name}</h3>
  </div>
  <div class='tweet-header-right'>
  <h4>${obj.user.handle}</h4>
  </div>
  </div>
  <div class='tweet-body'>
  <p>${esc(obj.content.text)}</p>
  </div>
  <div class='tweet-footer'>
  <div class='tweet-footer-left'>
  <h4>${timeago.format(obj.created_at)}</h4>
  </div>
  <div class='tweet-footer-right'>
  <div>
  <a class='tweet-icon' href='/'><i class="fas fa-flag"></i></a>
  <a class='tweet-icon' href='/'><i class="fas fa-retweet"></i></a>
  <a class='tweet-icon' href='/'><i class="fas fa-heart"></i></a>
  </div>
  </div>
  </div>
  </article>`;
  return tweetArticle;
}
// if dom has element tweet then dont render tweet
const clearTweets = () => {
  $(document).ready(function() {
    $(".tweet-container").empty();
  }
  )};
  
  const renderTweets = (tweets) => {
    $(document).ready(function() {
    for (const tweet of tweets) {
      $('section.tweet-container').prepend(createTweetElement(tweet));
      tweetInteract();
    }
  })
}


const loadTweets = () => {
  $(document).ready(function() {
    const url = '/tweets'
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: (tweetPosts) => {
        renderTweets(tweetPosts)
      },
      error: (err) => {
        console.log("Error: ", err)
      }
    })
  });
}

const refetchTweets = () => {
  $(document).ready(function() {
      // clear the tweets
      clearTweets();
      loadTweets();
  })
}

const clearTextarea = () => {
  // clear text and reset counter to 140
  $('#tweet-text').val('');
  $('.counter').text(140);
}


// controls the tweet form
const tweetForm = () => {
  $(document).ready(function() {
    $('#post-tweet').submit( function (event) {
      
      event.preventDefault();
      // html element for tweet beeing too short
      const alertShort = 
      `<div class="alert">
      <i class="fas fa-exclamation-circle"></i>
        <span class="alert">Tweets must be filled with your glory!</span>
        </div>`;
        // html element for tweet being too long
        const alertLong = 
        `<div class="alert">
        <i class="fas fa-exclamation-circle"></i>
        <span class="alert">Too Long Did Not Read!</span>
        </div>`;
        const tweetBody = $('#tweet-text').val();
      console.log("tweetbody length", tweetBody.length,"tweetbody", tweetBody);
      const objTweetBody = {
        text: tweetBody
      }
      
      // if tweet is too short alert
      if (tweetBody.length < 1 && $('div.alert').val() === undefined) {
        console.log("tweetbody if length is too short", tweetBody.length);
        $('section.new-tweet>h2').prepend(alertShort).hide().slideDown();
        setTimeout(() => {
          $('div.alert').slideUp();
        }, 5000);
        // give the error message shadows
        shadowInteract();
        // if tweet is too long alert
      } else if (tweetBody.length > 140) {
        $('section.new-tweet>h2').prepend(alertLong).hide().slideDown();
        // slideUp after ten seconds
        setTimeout(() => {
          $('div.alert').slideUp();
        }, 5000)
        console.log("tweetbody if greater than 146", tweetBody.length, tweetBody);
        
        shadowInteract()
        // if tweet is just the right size submit and clear the text box
      } else if (tweetBody.length > 0 && tweetBody.length < 141) {
        if ($("div.alert").val() !== null || $("div.alert").val() !== undefined) {
          // if the warning is visible slideUp and remove the element.
          $("div.alert").slideUp().remove();
          
        }
        const form = $(this)
        const url = form.attr('action')
        $.post(url, objTweetBody);
        // load the tweets again
        refetchTweets();
        // clear the text area
        clearTextarea();
        
      }
    })
  })
};

refetchTweets();
tweetForm();

