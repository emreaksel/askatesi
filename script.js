//merhabalar :)
        konsola_yaz("Debug", ' Denemeler: ' + 38);
        var track_index = 0;
        var isPlaying = false;
        var next_type = 0; //0 karışık, 1 sıra ile, 2 tekrarlı
        var updateTimer;

        // Create new audio element
        var curr_track = document.createElement('audio');
        var playpause_btn = document.querySelector(".playpause-track");

        // resimlerin listesi
        var list_images = new Array();
        //Nukte Listesi
        var list_nukte = new Array();
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
        function nextTrack() {
            if (next_type == 0) { //karışık
                track_index = Math.floor(Math.random() * track_list.length);
            }
            else if (next_type == 1) {
                if (track_index < track_list.length - 1)
                    track_index += 1;
                else track_index = 0;
            }
            else if (next_type == 2) {
                //track index sabit kalır
            }
            konsola_yaz("function nextTrack", ' Track Index: ' + track_index);
            loadTrack(track_index);
            playTrack();
        }
        //----------------------
        //----------------------
        function loadTrack(track_index) {
            curr_track.src = track_list[track_index].path;
            curr_track.load();
                
                $(".track-name").text(track_list[track_index].name);
                $(".track-artist").text(track_list[track_index].artist.replace(':', ''));
                clearInterval(updateTimer);
                updateTimer = setInterval(seekUpdate, 1000);
        }
        //----------------------
        function seekTo() {
            let seek_slider = document.querySelector(".seek_slider");
             //bu satırda jquery kullnınca hata aldık
            curr_track.currentTime =Math.floor(curr_track.duration * (seek_slider.value) / 100);
        }
        //----------------------
        //----------------------
        function setNukte() {
            $(".marquee").text(list_nukte[Math.floor(Math.random() * list_nukte.length)]); //buradaki rastgele son nukteyi de seçebiliyor list_nukte.length-1 gibi davranıyor
        }
        //----------------------
        //----------------------
        function seekUpdate() {
            var seekPosition = 0;
        let curr_time = document.querySelector(".current-time");
        let total_duration = document.querySelector(".total-duration");
        let seek_slider = document.querySelector(".seek_slider");
                
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);

                seek_slider.value = seekPosition;

                var currentMinutes = Math.floor(curr_track.currentTime / 60);
                var currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                var durationMinutes = Math.floor(curr_track.duration / 60);
                var durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
        }
        //----------------------
        function resetValues() {
            curr_time.textContent = "00:00";
            total_duration.textContent = "00:00";
            $(".seek_slider").value = 0;
        }
        //----------------------
        //----------------------
        function ilk_parcayi_ayarlar() {
          //let parselle="https://www.mediafire.com/file/wame8e6p9gwuqu6/mededya.mp3";
          var parselle=window.location.href;//https://www.mediafire.com/file/wame8e6p9gwuqu6/mededya
          if (parselle.includes("?")) {
              console.log("paylaşılan bir parça okundu: " + "true");
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
              track_index = Math.floor(Math.random() * track_list.length);
              loadTrack(track_index);
              //console.log("ilk parça: " + track_list[track_index].name);
          }
            
        }
        //----------------------
        function konsola_yaz(tanım, aciklama="") {
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;
            console.log(" Log " + time + " --> " + tanım + " --> " + aciklama);
        }
        //----------------------
       var birkerecalisti=false;
          $.ajax({
              url: "/baska.xml",
              type: "GET",
              dataType: "xml",
              success: function(xml) {
                      if (!birkerecalisti) {
                               console.log("liste parselleme başarılı");

                                var counter = 0;
                                $(xml).find('ul').find('li').each(function(){
                                  // Only do it for the first 5 elements of .kltat class
                                   if (counter==3000) {
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
                                            li.style.minHeight = '30px';
                                            li.style.background = 'black';

                                            // Now create an <b> element:
                                            let b1 = document.createElement('div');
                                            let b2 = document.createElement('div');

                                            b1.style.color = 'white';
                                            b2.style.color = 'white';

                                            b1.style.fontSize = "10px";b2.style.fontSize = "10px";
                                            
                                        
                                            b1.style.position = 'absolute';
                                            b2.style.position = 'absolute';

                                            b1.style.left = '15px';
                                            b2.style.right = '15px';

                                            b1.innerText = $(this).attr("data-title"); 
                                            b2.innerText = $(this).attr("data-duration");

                                            // Now add the <a> to the <li>, and add the <li> to the <ul>
                                            li.appendChild(b1);
                                            li.appendChild(b2);
                                            li.style.width = '275px';
                                            myList.appendChild(li);
                        
                                track_list.push({ name: $(this).attr("data-title"), artist: $(this).attr("data-duration"), image: "http://kardelendergisi.com/atesiask/images/yeni77.jpg", path: $(this).attr("data-path") });
                        
                                        $('ul li').click(function () {
                                            loadTrack($(this).index()+1);
                                            playTrack();
                                        });
                       
                                 });
                                
                              ilk_parcayi_ayarlar();
                              konsola_yaz("liste uzunluğu", ': ' + track_list.length);
                              birkerecalisti=true;
                              }
              },
              error: function(status) {
               console.log("request error:");
              }
          });
        
 //----------------------
        
//----------------------
        var birkerecalisti_nukte=false;
        $.ajax({
              url: "/nukte.txt",
              type: "GET",
              contentType: "application/x-www-form-urlencoded;charset=UTF-8",
              dataType: "text",
              success: function(text) {
                      if (!birkerecalisti_nukte) {
                               console.log("nukte parselleme başarılı");
                                     //console.log("nukte: "+text);
                                var lines = text.split("\n");
                              
                                for (var i = 0, len = lines.length; i < len; i++) {
                                    //console.log("nukte: "+lines[i]);
                                        list_nukte.push(lines[i]);
                                }
                              konsola_yaz("nukte uzunluğu", ': ' + list_nukte.length);
                              setNukte();
                              birkerecalisti_nukte=true;
                      }
              },
              error: function(status) {
               console.log("request error:");
              }
          });
//----------------------
//==============================================================================================
    //Resimleri Getirir
        var birkerecalisti_resim=false;
        $.ajax({
            url: './images.html',
            type: 'GET',
            dataType: "html",
            success: function (html) {
                console.log("images parselleme başarılı");
                
                   html= html.replaceAll('<html data-kantu="1"><head></head><body>//Display Images From A Folder with PHP', '')
                   html= html.replaceAll('<img src=', '')
                   html= html.replaceAll('>&nbsp;&nbsp;', '')
                   html= html.replaceAll('\n', '')

                    var resimler = html.split('alt="randomimage');
                  
                    for (var i = 0, len = resimler.length; i < len; i++) {
                        console.log("nukte: "+resimler[i].replaceAll('"', ''));
                       list_images.push("http://kardelendergisi.com/atesiask/images/" + resimler[i].replaceAll('"', ''));
                    }
                    //console.log("images: "+html);
                //console.log("images: "+$(html).find('img')[1].attr('src'));
                //console.log("images: "+$(html));

                for (i = 0; i < html.length; i++) {
                    if (data[i].includes("aspx") || data[i].includes("ascx")) {
                        //---
                    } else {
                        list_images.push("http://kardelendergisi.com/atesiask/images/" + data[i]);
                        //konsola_yaz(list_images[i]);
                    }
                }
                //alert(list_images.join("\n"));
                setImage();
                birkerecalisti_resim=true;
                konsola_yaz("Fotoğraflar Hazırlandı", "Fotoğraf adedi:" + list_images.length)
            },
            error: function () {
                konsola_yaz("Hata","Fotoğraflar Gelmedi")
            }
        });
    //==============================================================================================
console.log("adresin yeri: " + window.location.href);

