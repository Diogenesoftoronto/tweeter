/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
const esc = function (str) {
  let para = document.createElement("p");
  para.appendChild(document.createTextNode(str));
  return para.innerHTML;
};

const createTweetElement = (obj) => { 
  $(document).ready(function() {
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
    $('section.tweet-container').prepend(tweetArticle);
    tweetInteract();
  })
  
}

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    createTweetElement(tweet)
  }
}

const loadTweets = () => {
  $(document).ready(function() {
    const url = '/tweets'
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: (tweetPosts) => {
        console.log(tweetPosts, 'success')
        setTimeout(() => {
            renderTweets(tweetPosts)
          }, 600)
      },
      error: (err) => {
        console.log("Error: ", err)
      }
  })
});
}

const refetchTweets = () => {
  $(document).ready(function() {
    $('#post-tweet').submit(function (event) {
        loadTweets();
      })
  })
}

const tweetForm = () => {
  $(document).ready(function() {
    $('#post-tweet').submit(function (event) {

      event.preventDefault();

      const alertShort = 
      `<div class="alert">
        <i class="fas fa-exclamation-circle"></i>
        <span class="alert">Tweets must be filled with your glory!</span>
      </div>`;
      const alertLong = 
      `<div class="alert">
        <i class="fas fa-exclamation-circle"></i>
        <span class="alert">Too Long Did Not Read!</span>
      </div>`;
      console.log($('div.alert').val(), 'failure')
      const tweetBody = $('#tweet-text').serialize();
      if (tweetBody.length < 6 && $('div.alert').val() === undefined) {
        $('section.new-tweet>h2').prepend(alertShort).hide().slideDown();
        setTimeout(() => {
          ('div.alert').slideUp();
        }, 10000)
        shadowInteract()
      } else if (tweetBody.length > 145 && $('div.alert').val() !== undefined) {
        $('section.new-tweet>h2').prepend(alertLong).hide().slideDown();;
        // slideUp after ten seconds
        setTimeout(() => {
          ('div.alert').slideUp();
        }, 10000)
        shadowInteract()
      } else if (tweetBody.length > 6 && tweetBody.length < 145){
        if ($("div.alert").val() !== null || $("div.alert").val() !== undefined) {
          // if the warning is visible slideUp and remove the element.
          $("div.alert").slideUp().remove();

        }
        const form = $(this)
        const url = form.attr('action')
        $.post(url, tweetBody)
        refetchTweets()
      }
    })
  })
};
tweetForm();

