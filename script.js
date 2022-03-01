//merhabalar :)

        var track_index = 0;
        var isPlaying = false;
        var next_type = 1; //0 karışık, 1 sıra ile, 2 tekrarlı
        var updateTimer;

        // Create new audio element
        var curr_track = document.createElement('audio');
        var playpause_btn = document.querySelector(".playpause-track");

        // parça listesi
        var track_list = [
            {
                name: "Ey Ademoğlu",
                artist: "K. Eroglu",
                image: "http://kardelendergisi.com/atesiask/images/yeni257.jpg",
                path: "https://www.mediafire.com/download/rjv71inh44win4c/eyademoglu_keroglu.mp3"
                //https://www.mediafire.com/file/wame8e6p9gwuqu6/mededya
                //path: "https://www.mediafire.com/download/rjvwin4c/eyademoglu_keroglu.mp3"
            },
        ];

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
          var parselle=window.location.href;//https://www.mediafire.com/file/wame8e6p9gwuqu6/mededya
          if (parselle.includes("?")) {
              console.log("persel: " + "true");
            parselle=parselle.replace('https://atesiask.netlify.app/?', '');
            var url="https://www.mediafire.com/"+parselle+".mp3";
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

       var birkerecalisti=false;
          $.ajax({
              url: "/hepsi.xml",
              type: "GET",
              dataType: "xml",
              success: function(xml) {
                      if (!birkerecalisti) {
                               console.log("ajaxx, başarılı");

                                var counter = 1;
                                $(xml).find('ul').find('li').each(function(){
                                  // Only do it for the first 5 elements of .kltat class
                                   if (counter==5) {
                                     return false;
                                   } else {
                                     counter++;
                                   }
                        
                                                // The <ul> that we will add <li> elements to:
                                            let myList = document.querySelector('ul#parca-listesi');

                                            // Create an <li> element:
                                            let li = document.createElement('li');

                                            // Give it the desired classes & attributes:
                                            li.classList.add('list-group-item');
                                            li.style.background = 'black';
                                            //li.style.cssText = 'display: flex;flex - direction: column;'
                                            //li.setAttribute('role', 'menuitem');

                                            // Now create an <b> element:
                                            let b1 = document.createElement('label');
                                            let b2 = document.createElement('label');
                                            let b3 = document.createElement('b');

                                            // Give it the desired classes & attributes:
                                            //a.classList.add('ui-all');
                                            //a.tabIndex = -1;
                                            //b1.style.color = 'white';
                                            //b2.style.color = 'white';
                                            //b1.style.backgroundColor = 'black';
                                            //b2.style.backgroundColor = 'black';

                                            b1.innerText = $(this).attr("data-title"); 
                                            b2.innerText = $(this).attr("data-duration");
                                            //a.href = "#"

                                            // Now add the <a> to the <li>, and add the <li> to the <ul>
                                            li.appendChild(b1);
                                            li.appendChild(b2);
                                            myList.appendChild(li);
                        
                                track_list.push({ name: $(this).attr("data-title"), artist: $(this).attr("data-duration"), image: "http://kardelendergisi.com/atesiask/images/yeni77.jpg", path: $(this).attr("data-path") });
                        
                       
                                 });
                                curr_track.src = track_list[track_list.length-1].path; 
                                curr_track.load();

                                      var today = new Date();
                                      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                      console.log("Log: "+time+" --> "+"liste uzunluğu: "+track_list.length);
                              birkerecalisti=true;
                              }
              },
              error: function(status) {
               console.log("request error:");
              }
          });
        
//----------------------
console.log("adresin yeri: " + window.location.href);
ilk_parcayi_ayarlar();
