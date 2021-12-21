/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
      <p>${obj.content.text}</p>
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
    $('section.tweet-container').append(tweetArticle);
  })

}
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    createTweetElement(tweet)
  }
}
renderTweets(data);