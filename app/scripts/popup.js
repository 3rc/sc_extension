if(window.location.toString().indexOf("soundcloud.com") > -1) {


  var streamPlus = false;
  var userPlus = false;
  var searchPlus = false;
  var repostsRemoved = false;
  var logo = chrome.extension.getURL('images/scpluspluswidesmall.png');
  //Check the URL of SC page to determine appropriate function bar
  function checkSCPage() {
    if(window.location.toString().indexOf("/stream") > -1) {
      addStreamPlus()
    }
    else if(window.location.toString().indexOf("/search") > -1) {
      addSearchPlus()
    }
    else if(window.location.toString().indexOf("/explore") > -1) {
      clearMess()
    }
    else if(window.location.toString().indexOf("/upload") > -1) {
      clearMess()
    }
    else if(window.location.toString().indexOf("/you") > -1) {
      clearMess()
    }
    else if(window.location.toString().lastIndexOf("/") == 22) {
      addUserPlus()
    }
  }

  //checks every 3 seconds if the URL has changed
  setInterval(function() {
    checkSCPage()
  }, 3000);

  function clearMess() {
    if(streamPlus == true || userPlus == true || searchPlus == true) {
      $(".moreoptions").remove();
      $(".stream-reposts").remove()
    }
  }

  function addStreamPlus() {
    if(window.streamPlus == false) {
      clearMess();
      console.log("★★★★★★SoundCloud Stream★★★★★★");
      $("header").append("<div class='moreoptions'><img src='" + logo + "' class='sc-plus-plus'>&nbsp;<button id='remove-reposts'>Remove Reposts</button><p>v0.1 - if anything breaks, just refresh!</p></div>");
      $(".l-content").append("<div class='stream-reposts hidden'></div>");
      $("#remove-reposts").click(function() {
        removeReposts($(".stream"))
      });
      window.streamPlus = true;
      window.userPlus = false;
      window.searchPlus = false;
      window.repostsRemoved = false
    }
  }

  function addUserPlus() {
    if(userPlus == false) {
      clearMess();
      console.log("★★★★★★SoundCloud User★★★★★★");
      $("header").append("<div class='moreoptions'><img src='" + logo + "' class='sc-plus-plus'>&nbsp;<button id='remove-reposts'>Remove Reposts</button><p>v0.1 - if anything breaks, just refresh!</p></div>");
      $(".userStream").append("<div class='stream-reposts hidden'></div>");
      $("#remove-reposts").click(function() {
        removeReposts($(".userStream__list"))
      });
      window.userPlus = true;
      window.streamPlus = false;
      window.searchPlus = false;
      window.repostsRemoved = false
    }
  }

  function addSearchPlus() {
    if(searchPlus == false) {
      clearMess();
      console.log("★★★★★★SoundCloud Search★★★★★★");
      $("header").append("<div class='moreoptions'><img src='" + logo + "' class='sc-plus-plus'>&nbsp;Filter Search Results coming soon, srsly.</div>");
      window.searchPlus = true;
      window.streamPlus = false;
      window.userPlus = false;
      window.repostsRemoved = false
    }

  }
  function removeReposts() {
    window.repostsRemoved = true;
    if(window.streamPlus == true) {
      $(".stream-reposts").append($(".sound__header:contains('Reposted')").parent().parent().parent());
    }
    else if(window.userPlus == true) {
      $(".stream-reposts").append($("[aria-label~='reposted']").parent().parent())
    }

    $("#toggleReposts").remove();
    $(".moreoptions").append("<button id='toggleReposts'>Show/Hide Reposts</button>");
    $("#toggleReposts").click(function() {
      showReposts()
    })

    repostTitles = [];
    var reposts = $(".stream-reposts").find(".soundTitle__title");

    for( i = 0; i < reposts.length; i++) {
      repostTitles.push(reposts[i].innerText)
    }

    var repostTitles = _.uniq(repostTitles);

    setInterval(function() {
      if(repostsRemoved == true) {
        var nowPlaying = $("a.playbackTitle__link").text();
        if(nowPlaying != "") {
          for( i = 0; i < repostTitles.length; i++ ) {
            if(repostTitles[i].indexOf(nowPlaying) > -1) {
            $(".skipControl__next").trigger("click");
            }
          }
        }
      }
    }, 800)
  }

  function showReposts() {
    $(".stream-reposts").toggleClass("hidden");
    $(".stream").toggleClass("stream-hide")
  }


}
