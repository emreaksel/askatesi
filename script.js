 let track_index = 0;
        let isPlaying = false;
        var next_type = 1; //0 karışık, 1 sıra ile, 2 tekrarlı
        let updateTimer;

        // Create new audio element
        let curr_track = document.createElement('audio');
        let playpause_btn = document.querySelector(".playpause-track");

        // parça listesi
        let track_list = [
            {
                name: "Ey Ademoğlu",
                artist: "K. Eroglu",
                image: "http://kardelendergisi.com/atesiask/images/yeni257.jpg",
                path: "https://www.mediafire.com/download/rjv71inh44win4c/eyademoglu_keroglu.mp3"
                //https://www.mediafire.com/file/wame8e6p9gwuqu6/mededya
                //path: "https://www.mediafire.com/download/rjvwin4c/eyademoglu_keroglu.mp3"
            },
        ];

//curr_track.src = track_list[track_index].path;
            //curr_track.load();

//----------------------
        function playpauseTrack() {
            if (!isPlaying) playTrack();
            else pauseTrack();
        }
        //----------------------
        function playTrack() {
            curr_track.play();
            isPlaying = true;
            playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
        }
        //----------------------
        function pauseTrack() {
            curr_track.pause();
            isPlaying = false;
            playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
        }
        //----------------------
        //----------------------
        function ilk_parcayi_ayarlar() {
          //let parselle="https://www.mediafire.com/file/wame8e6p9gwuqu6/mededya.mp3";
          let parselle=window.location.href;//https://www.mediafire.com/file/wame8e6p9gwuqu6/mededya
          if (parselle.includes("?")) {
              console.log("persel: " + "true");
            parselle=parselle.replace('https://atesiask.netlify.app/?', '');
            let url="https://www.mediafire.com/"+parselle+".mp3";
              console.log("parselli url: " + url);
              track_list.push({ name: "Meded", 
                               artist: "Gavs", 
                               image: "http://kardelendergisi.com/atesiask/images/yeni77.jpg", 
                               path: url });
              curr_track.src = track_list[track_list.length-1].path; 
              curr_track.load();
          } else {
              console.log("persel: " + "false");
              curr_track.src = track_list[track_list.length-1].path; 
              curr_track.load();
              console.log("parselli url: " + track_list[track_list.length-1].path);
          }
            
        }
        //----------------------

        $(document).ready(function() {
          $.ajax({
              url: "/hepsi.xml",
              type: "GET",
              dataType: "xml",
              success: function(xml) {
               console.log("ajax, başarılı");
                
                var counter = 1;
                $(xml).find('ul').find('li').each(function(){
                  // Only do it for the first 5 elements of .kltat class
                   if (counter==5) {
                     return false;
                   } else {
                     counter++;
                   }
                        const url = $(this).attr("data-path");
                        const ad = $(this).attr("data-title");
                        const ses = $(this).attr("data-duration");
                        track_list.push({ name: ad, artist: ses, image: "http://kardelendergisi.com/atesiask/images/yeni77.jpg", path: url });
                        console.log("url: "+url+" ad: "+ad+" ses: "+ses);
                        
                 });
                
              },
              error: function(status) {
               console.log("request error:");
              }
          });
        });
//----------------------
console.log("adresin yeri: " + window.location.href);
ilk_parcayi_ayarlar();
