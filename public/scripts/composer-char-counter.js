const charCounter = () => {
  $(document).ready(function() {
  // counts the characters in the textarea
  $('textarea').keyup(function() {
    let text = $(this).val();
    console.log(this);
    let textLength = text.length;
    let textRemaining = 140 - textLength;
    $('.counter').text(textRemaining);
    if (textRemaining < 0){
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
  });
});
}
const tweetInteract = () => {
 $(document).ready(function() {
  //  the style change when the mouse hovers over tweet icons and box shadow emerges when the mouse hovers over the tweet box
  $('.tweet').hover(function() {
    $(this).css('box-shadow', '0.2em 0.2em 5px black');
 
  }, function() {
    $(this).css('box-shadow', 'none');

  });
  $('.tweet-icon').hover(function() {   
  $(this).css('opacity', '0.5');
  }, function() {
    $(this).css('opacity', '1');
  }
);
}
);
}

// const createTweetElement = () => {
//   $('submit').click( () => {
//   const text = $('<textarea>').val();
//   $('p.tweet-body').append( text );
//   });
// };

// tweetPost();
const shadowInteract = function() {
  $(document).ready(function() {
    $('.alert').hover(function() {
      $(this).css('box-shadow', '0.2em 0.2em 5px');
   
    }, function() {
      $(this).css('box-shadow', 'none');
  
    });
  })
}

shadowInteract()
charCounter();
tweetInteract();

// export the jquery object to the global namespace
module.exports = charCounter;



