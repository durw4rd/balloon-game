var containerWidth = $('.container').width(); //retrieve current window width
var leftMargin = $('.container').width() * 0.1;

// variables + array for color gradients
var color1 = "radial-gradient(farthest-side at 60% 35%, #FFF9C4, #FFF176, #FFEB3B)";
var color2 = "radial-gradient(farthest-side at 60% 35%, #FFCCBC, #FF8A65, #FF5722)";
var color3 = "radial-gradient(farthest-side at 60% 35%, #B2DFDB, #4DB6AC, #009688)";
var color4 = "radial-gradient(farthest-side at 60% 35%, #ffcdd2, #e57373, #f44336)";
var color5 = "radial-gradient(farthest-side at 60% 35%, #F8BBD0, #F06292, #E91E63)";
var color6 = "radial-gradient(farthest-side at 60% 35%, #E1BEE7, #BA68C8, #9C27B0)";
var colors = [color1, color2, color3, color4, color5, color6];

var balloon = $('.balloon');
var counter = 0;

$('.balloon').hide();
$('.repeat-button').hide();
$('.results').hide();


function start(){
  // whole game sequence wrapped in a function so it can be used repeatedly -> no need to reload the site to play again
  var gameStart = function() {
    // (re)setting initial counter state
    counter = 0;
    $(".counter").html(counter);

    $('.results').hide();
    $('.repeat-button').hide();
    $('.start-button').hide();
    $('.instructions').hide();
    $('.balloon').show();

    // delaying show/hide effect with jQuery
    $('.results').delay(7000).show(0);
    $('.repeat-button').delay(7000).show(0);

    // create balloon copies(15) and adding them to selected element on the page; setting their randomized position
    for(i = 0; i < 15; i++) {
      var balloonCopy = balloon.clone();
      balloonCopy.appendTo("main");

      balloonCopy.css({
        left: Math.random() * containerWidth + leftMargin
      });

      // assign randomized gradient to individual balloons
      var balloonColor
      var inflatable = balloonCopy.find('.inflatable')

      var balloonColor = colors[Math.floor(Math.random() * colors.length)]

      inflatable.css({
        background: balloonColor
      });

      // animation effect for all the balloons
      balloonCopy.animate({
        bottom: "100%",
        left: Math.random() * containerWidth + leftMargin
      },8000);

      // on-click event that: a) triggers the pop sound (+sets the mp3 file back to the beginning if it didn't finish playing yet)
      balloonCopy.click(function(){
        popSound.pause();
        popSound.currentTime = 0;
        popSound.play();
        // b) removes balloon from page
        $(this).remove();

        // update the counter
        counter = counter + 1;
        $(".counter").html(counter);
      });
    };
    // hide the original balloon element
    balloon.hide();
  };

  // clicking the selected buttons will trigger function declared above
  $('.start-button').click(gameStart);
  $('.repeat-button').click(gameStart);
};

// loading the audio file
function loadPopSound(){
  var audio = new Audio('sounds/balloon-pop.mp3');
  audio.preload = "auto";
  $(audio).on("loadeddata",start);
  return audio;
};

// assigning the returned value to a variable
var popSound = loadPopSound();
