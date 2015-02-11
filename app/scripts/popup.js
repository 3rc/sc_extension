if(window.location.toString() == "https://soundcloud.com/stream") {

  var repostTitles = [];
  var repostsRemoved = false;
  setTimeout(function() {
  console.log("★★★★★★SoundCloud Enhancer loaded!★★★★★★");
    $("header").append("<div class='moreoptions'>★★&nbsp;<button id='remove-reposts'>Remove Reposts</button></div>");
    $(".l-content").append("<div class='stream-reposts'></div>");
    $("#remove-reposts").click(function() {
      removeReposts($(".stream"))
    })
  }, 3000)
  function removeReposts() {
    var repostsRemoved = true;
    $(".stream-reposts").append($(".sound__header:contains('Reposted')").parent().parent().parent());

    repostTitles = [];
    var reposts = $(".stream-reposts").find(".soundTitle__title");

    for( i = 0; i < reposts.length; i++) {
      repostTitles.push(reposts[i].innerText)
    };

    var repostTitles = _.uniq(repostTitles);
    console.log("Now Playing: " + $("a.playbackTitle__link").text());

    setInterval(function() {
        if(repostsRemoved == true) {
          var nowPlaying = $("a.playbackTitle__link").text();
          for( i = 0; i < repostTitles.length; i++ ) {
            if(repostTitles[i].indexOf(nowPlaying) > -1) {
            $(".skipControl__next").trigger("click");
        }
      }
    }
  }, 800)

  };


}