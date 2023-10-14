$(function () { 


    $("#navbarToggle").blur(function (event) {
      var screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        $("#collapsable-nav").collapse('hide');
      }
    });
  });

  var playlist = document.getElementById('playlist');
  var audioPlayer = document.getElementById('audio-player');
  
  var currentSongIndex = 0;
  
  playlist.addEventListener('click', function(event) {
    var target = event.target.closest('li');
    
    if (target) {
      var songUrl = target.getAttribute('data-src');
      audioPlayer.src = songUrl;
      audioPlayer.play();
      currentSongIndex = Array.from(playlist.querySelectorAll('li')).indexOf(target);
    }
  });
  
  audioPlayer.addEventListener('ended', function() {
    currentSongIndex++;
    if (currentSongIndex >= playlist.querySelectorAll('li').length) {
      currentSongIndex = 0;
    }
    var nextSong = playlist.querySelectorAll('li')[currentSongIndex];
    var nextSongUrl = nextSong.getAttribute('data-src');
    audioPlayer.src = nextSongUrl;
    audioPlayer.play();
  });