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
    $('section.tweet-container').prepend(tweetArticle);
    tweetInteract();
  })

}

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    createTweetElement(tweet)
  }
}


const tweetForm = () => {
  $(document).ready(function() {
    $('#post-tweet').submit(function (event) {
      event.preventDefault();
      
      const tweetBody = $('#tweet-text').serialize()
      if (tweetBody.length < 6) {
        alert('Tweets must be filled with your glory!')
      } else if (tweetBody.length > 145) {
        
        alert('Too Long Did Not Read!')
      } else {
        const form = $(this)
        const url = form.attr('action')
        $.post(url, tweetBody)
      }
    })
  })
};
tweetForm();

const loadTweets = () => {
  $(document).ready(function() {
    const url = '/tweets'
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: (tweetPosts) => {
        console.log(tweetPosts, 'success')
        renderTweets(tweetPosts)
      },
      error: (err) => {
        console.log("Error: ", err)
      }
  })
});
}
loadTweets();