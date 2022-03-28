$(window).on('load', function() { // makes sure the whole site is loaded 
  $('#status').fadeOut(); // will first fade out the loading animation 
  $('#preloader').delay(500).fadeOut('slow'); // will fade out the white DIV that covers the website. 
  checkTouchScreen();
});

$(document).ready(function() {
  
  $(document).ready(function() {
    $(".pl-list__download").on("click", function() {
      var trackPlaying = $(this).closest(".pl-list");
      console.log(AP.getTrack(trackPlaying.attr("data-track")));
    });
  });
/*
  (function() {
    $('.back_btn').on('click', function() {
      $('.player_playlist').toggleClass('playlist_on');
      $('.glyphicon-menu-left').toggleClass('back_btn_on');
      $('.waves').toggleClass('waves_up');
      $('.album_wrap').toggleClass('album_up');
      $('.song_playing').toggleClass('song_playing_up');
      $('.timeline_wrap').toggleClass('timeline_wrap_up');
      $('.player_btns').toggleClass('player_btns_up');
      $('.line_played').toggleClass('line_played_up');
      $('.full_line').toggleClass('full_line_up');
      $('.time_of_song').toggleClass('time_of_song_up');
      $('.progress-bar-pointer').toggleClass('progress-bar-pointer_up');
      $('.line_preload').toggleClass('line_preload_up');
    })
  })();
  

  (function() {
    $('.hamburger-menu').on('click', function() {
      $('.bar').toggleClass('animate');
      $('.hamburger-menu').toggleClass('slide');
      $('.back_btn').toggleClass('slide');
      $('.nav_menu').toggleClass('open');
      $('.player_fade').toggleClass('player_fade_on');
    })
  })();

  (function() {
    $('.play_btn').on('click', function() {
      $('#play_circle').toggleClass('glyphicon-play').toggleClass('glyphicon-pause');
      //$('#npAction').text(function(i, text) {
        //return text === "PAUSED..." ? "NOW PLAYING" : "PAUSED...";
      //})
    })
  })();

  (function() {
    $('.random_btn').on('click', function() {
      $('.random_btn').toggleClass('random_btn_on');
    })
  })();

  (function() {
    $('.repeat_btn').on('click', function() {
      $('.repeat_btn').toggleClass('repeat_btn_on');

    })
  })();

  // отменить выделение текста
  function preventSelection(element) {
    var preventSelection = false;

    function addHandler(element, event, handler) {
      if (element.attachEvent)
        element.attachEvent('on' + event, handler);
      else
      if (element.addEventListener)
        element.addEventListener(event, handler, false);
    }

    function removeSelection() {
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      } else if (document.selection && document.selection.clear)
        document.selection.clear();
    }

    function killCtrlA(event) {
      var event = event || window.event;
      var sender = event.target || event.srcElement;
      if (sender.tagName.match(/INPUT|TEXTAREA/i))
        return;
      var key = event.keyCode || event.which;
      if (event.ctrlKey && key == 'A'.charCodeAt(0)) // 'A'.charCodeAt(0) можно заменить на 65
      {
        removeSelection();
        if (event.preventDefault)
          event.preventDefault();
        else
          event.returnValue = false;
      }
    }
    // не даем выделять текст мышкой
    addHandler(element, 'mousemove', function() {
      if (preventSelection)
        removeSelection();
    });
    addHandler(element, 'mousedown', function(event) {
      var event = event || window.event;
      var sender = event.target || event.srcElement;
      preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
    });
    // борем dblclick
    // если вешать функцию не на событие dblclick, можно избежать
    // временное выделение текста в некоторых браузерах
    addHandler(element, 'mouseup', function() {
      if (preventSelection)
        removeSelection();
      preventSelection = false;
    });
    // борем ctrl+A
    // скорей всего это и не надо, к тому же есть подозрение
    // что в случае все же такой необходимости функцию нужно 
    // вешать один раз и на document, а не на элемент
    addHandler(element, 'keydown', killCtrlA);
    addHandler(element, 'keyup', killCtrlA);
  }
  preventSelection(document);
  
 */ 
});

function checkTouchScreen() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('body').addClass('touch-screen');
    return true;
  } else {
    $('body').removeClass('touch-screen');
    return false;
  }
}  
//https://codepen.io/MichaelMammoliti/pen/VYEWZg
