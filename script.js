        //merhabalar :)
        konsola_yaz("Debug", ' Denemeler: ' + 48);

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
        curr_track.onended = function () {
                nextTrack();
        };
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
            setNukte()
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
        function setImage() {
                var adres1="https://raw.githubusercontent.com/emreaksel/askatesi/main/img/";
            $("#resim").attr("src", adres1+list_images[Math.floor(Math.random() * list_images.length)]);
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
                              setImage()
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
        list_images = ['026.jpg' , '051x.jpg' , '131-bali-indonesia.jpg' , '1929.jpg' , '27nisan_1.jpg' , '27nisan_2.jpg' , '27nisan_4.jpg' , '28n1.jpg' 
                          , '28n2.jpg' , '28n_3.jpg' , '29n_4.jpg' , '43-tuscay-italy.jpg' , '5m_1.jpg' , '5m_2.jpg' , '5m_3.jpg' , '5m_4.jpg' , '5m_5.jpg' 
                          , '5m_6.jpg' , 'adada.jpg' , 'aga.jpg' , 'aksa2.jpg' , 'ankara2.jpg' , 'antalya_1.jpg' , 'atesi_ask.jpg' , 'atesiask_fon.jpg' , 'aya1.jpg' 
                          , 'ayc.jpg' , 'aynali.jpg' , 'aynali_gol.jpg' , 'bahar.jpg' , 'bakakal.jpg' , 'baska_kabe.jpg' , 'bastankara.jpg' , 'bayrak.jpg' , 'beach.jpg' 
                          , 'beach18.jpg' , 'beyazkus.jpg' , 'blueyes.jpg' , 'buhara_2.jpg' , 'cadir.jpg' , 'cave1.jpg' , 'cave2.jpg' , 'cemaat.jpg' , 'cicek_kedi.jpg' 
                          , 'dalgada.jpg' , 'deniz.jpg' , 'deniz1.jpg' , 'dev.jpg' , 'dm1.jpg' , 'dunya1.jpg' , 'ekmek.jpg' , 'entrance.jpg' , 'ernst1.jpg' , 'eski_kapi.jpg' 
                          , 'fas.jpg' , 'flower_field.jpg' , 'gel_artik.jpg' , 'genesi.jpg' , 'gerome.jpg' , 'giris_kapisi.jpg' , 'gizemliyol.jpg' , 'golde.jpg' , 'golkenari.jpg' 
                          , 'golyeni.jpg' , 'gravur1.jpg' , 'greece.jpg' , 'greece1.jpg' , 'gul1.jpg' , 'gunbatimi.jpg' , 'gunebakanz.jpg' , 'gunes11.jpg' , 'gustav.jpg' 
                          , 'guvercin.jpg' , 'halasultan.jpg' , 'havai.jpg' , 'hayber.jpg' , 'hiclik.jpg' , 'highland.jpg' , 'hira.jpg' , 'hirvatistan.jpg' , 'hu_golge.jpg' 
                          , 'huseyin_kutlu.jpg' , 'huzur.jpg' , 'huzurupir.jpg' , 'icerde.jpg' , 'iki_kayik.jpg' , 'ilkbahar.jpg' , 'insanbu.jpg' , 'iskele.jpg' , 'istanbulx.jpg' 
                          , 'j_gence.jpg' , 'java.jpg' , 'kab1.jpg' , 'kab2.jpg' , 'kab3.jpg' , 'kab4.jpg' , 'kabe1.jpg' , 'kabe1_1.jpg' , 'kabe_bos.jpg' , 'kabe_ortu_1.jpg' 
                          , 'kabe_yeni1.jpg' , 'kabe_yeni2.jpg' , 'kabe_zoom.jpg' , 'kapi_kabe.jpg' , 'karadeniz.jpg' , 'karcicek.jpg' , 'karjini.jpg' , 'karli_tren.jpg' , 'karwat1.jpg' 
                          , 'kayik_1.jpg' , 'kayikci.jpg' , 'kb1.jpg' , 'kenya.jpg' , 'kirkpinar.jpg' , 'kis.jpg' , 'kizkulesi.jpg' , 'kizkulesi_1.jpg' , 'kus1.jpg' , 'kus2.jpg' 
                          , 'kus3.jpg' , 'kuslara_serbest.jpg' , 'kuslara_serbest2.jpg' , 'lamba.jpg' , 'leylekler.jpg' , 'magara1.jpg' , 'mak_ibrahim.jpg' , 'makepeace.jpg' 
                          , 'maldiv1.jpg' , 'maldiv2.jpg' , 'malibu.jpg' , 'man1.jpg' , 'mavi.jpg' , 'mavilim.jpg' , 'medine_cuma_1.jpg' , 'mekke_uzay_1.jpg' , 'minim.jpg' 
                          , 'misir.jpg' , 'mjgr.jpg' , 'mobile_atesiask.jpg' , 'muhabbetle2.jpg' , 'muharrem_1.jpg' , 'mutlu.jpg' , 'nezihbabax.jpg' , 'orient1.jpg' , 'orient2.jpg' 
                          , 'ory1.jpg' , 'ory2.jpg' , 'ory3.jpg' , 'ory4.jpg' , 'osmanhamdi.jpg' , 'park1.jpg' , 'park10.jpg' , 'park11.jpg' , 'park2.jpg' , 'park3.jpg' , 'pencere.jpg' 
                          , 'perde2.jpg'
                         ];

    //==============================================================================================
console.log("adresin yeri: " + window.location.href);

