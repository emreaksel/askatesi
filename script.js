        //merhabalar :)
        konsola_yaz("Debug", ' Denemeler: ' + 73);

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
        var track_list = new Array();
        //var track_list = [
        //    {
        //        name: "Ey Ademoğlu",
        //        artist: "K. Eroglu",
        //        image: "http://kardelendergisi.com/atesiask/images/yeni257.jpg",
        //        path: "https://www.mediafire.com/download/rjv71inh44win4c/eyademoglu_keroglu.mp3"
        //        //https://www.mediafire.com/file/wame8e6p9gwuqu6/mededya
        //        //path: "https://www.mediafire.com/download/rjvwin4c/eyademoglu_keroglu.mp3"
        //    },
        //];
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
            //$('#play_circle').toggleClass('change_me glyphicon glyphicon-play');
        }
        //----------------------
        function pauseTrack() {
            curr_track.pause();
            isPlaying = false;
            //$('#play_circle').toggleClass('change_me glyphicon glyphicon-pause');
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
        function setListview() {
                $.each(track_list, function (index) {
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

                                            b1.innerText = track_list[index].name; 
                                            b2.innerText = track_list[index].artist;

                                            // Now add the <a> to the <li>, and add the <li> to the <ul>
                                            li.appendChild(b1);
                                            li.appendChild(b2);
                                            li.style.width = '275px';
                                            myList.appendChild(li);
                                                
                                        $('ul li').click(function () {
                                            loadTrack($(this).index());
                                            //loadTrack(index);
                                            playTrack();
                                            listbutton();
                                        });
                
               })
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
                  
            var bilgi=parselle.split("&"); //catid=9&trackid=650
            var id=bilgi[1].replace("trackid=","");
            var din=bilgi[0].replace("catid=","");
            //var url="https://www.mediafire.com/"+parselle+".mp3";
             
            console.log("dinleme listesi: " + din);
            console.log("parça id: " + id);
            loadTrack(track_list.length-id-1);
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
        //Fotoğraf Listesi
        list_images = ['026.jpg' , '051x.jpg' , '131-bali-indonesia.jpg' , '1929.jpg' , '27nisan_1.jpg' , '27nisan_2.jpg' , '27nisan_4.jpg' , '28n1.jpg' , '28n2.jpg' , '28n_3.jpg' , '29n_4.jpg' , '43-tuscay-italy.jpg' , '5m_1.jpg' , '5m_2.jpg' , '5m_3.jpg' , '5m_4.jpg' , '5m_5.jpg' , '5m_6.jpg' , 'adada.jpg' , 'aga.jpg' , 'aksa2.jpg' , 'ankara2.jpg' , 'antalya_1.jpg' , 'atesi_ask.jpg' , 'atesiask_fon.jpg' , 'aya1.jpg' , 'ayc.jpg' , 'aynali.jpg' , 'aynali_gol.jpg' , 'bahar.jpg' , 'bakakal.jpg' , 'baska_kabe.jpg' , 'bastankara.jpg' , 'bayrak.jpg' , 'beach.jpg' , 'beach18.jpg' , 'beyazkus.jpg' , 'blueyes.jpg' , 'buhara_2.jpg' , 'cadir.jpg' , 'cave1.jpg' , 'cave2.jpg' , 'cemaat.jpg' , 'cicek_kedi.jpg' , 'dalgada.jpg' , 'deniz.jpg' , 'deniz1.jpg' , 'dev.jpg' , 'dm1.jpg' , 'dunya1.jpg' , 'ekmek.jpg' , 'entrance.jpg' , 'ernst1.jpg' , 'eski_kapi.jpg' , 'fas.jpg' , 'flower_field.jpg' , 'gel_artik.jpg' , 'genesi.jpg' , 'gerome.jpg' , 'giris_kapisi.jpg' , 'gizemliyol.jpg' , 'golde.jpg' , 'golkenari.jpg' , 'golyeni.jpg' , 'gravur1.jpg' , 'greece.jpg' , 'greece1.jpg' , 'gul1.jpg' , 'gunbatimi.jpg' , 'gunebakanz.jpg' , 'gunes11.jpg' , 'gustav.jpg' , 'guvercin.jpg' , 'halasultan.jpg' , 'havai.jpg' , 'hayber.jpg' , 'hiclik.jpg' , 'highland.jpg' , 'hira.jpg' , 'hirvatistan.jpg' , 'hu_golge.jpg' , 'huseyin_kutlu.jpg' , 'huzur.jpg' , 'huzurupir.jpg' , 'icerde.jpg' , 'iki_kayik.jpg' , 'ilkbahar.jpg' , 'insanbu.jpg' , 'iskele.jpg' , 'istanbulx.jpg' , 'j_gence.jpg' , 'java.jpg' , 'kab1.jpg' , 'kab2.jpg' , 'kab3.jpg' , 'kab4.jpg' , 'kabe1.jpg' , 'kabe1_1.jpg' , 'kabe_bos.jpg' , 'kabe_ortu_1.jpg' , 'kabe_yeni1.jpg' , 'kabe_yeni2.jpg' , 'kabe_zoom.jpg' , 'kapi_kabe.jpg' , 'karadeniz.jpg' , 'karcicek.jpg' , 'karjini.jpg' , 'karli_tren.jpg' , 'karwat1.jpg' , 'kayik_1.jpg' , 'kayikci.jpg' , 'kb1.jpg' , 'kenya.jpg' , 'kirkpinar.jpg' , 'kis.jpg' , 'kizkulesi.jpg' , 'kizkulesi_1.jpg' , 'kus1.jpg' , 'kus2.jpg' , 'kus3.jpg' , 'kuslara_serbest.jpg' , 'kuslara_serbest2.jpg' , 'lamba.jpg' , 'leylekler.jpg' , 'magara1.jpg' , 'mak_ibrahim.jpg' , 'makepeace.jpg' , 'maldiv1.jpg' , 'maldiv2.jpg' , 'malibu.jpg' , 'man1.jpg' , 'mavi.jpg' , 'mavilim.jpg' , 'medine_cuma_1.jpg' , 'mekke_uzay_1.jpg' , 'minim.jpg' , 'misir.jpg' , 'mjgr.jpg' , 'mobile_atesiask.jpg' , 'muhabbetle2.jpg' , 'muharrem_1.jpg' , 'mutlu.jpg' , 'nezihbabax.jpg' , 'orient1.jpg' , 'orient2.jpg' , 'ory1.jpg' , 'ory2.jpg' , 'ory3.jpg' , 'ory4.jpg' , 'osmanhamdi.jpg' , 'park1.jpg' , 'park10.jpg' , 'park11.jpg' , 'park2.jpg' , 'park3.jpg' , 'pencere.jpg' , 'perde2.jpg' , 'ramadan_1438_1.jpg' , 'ramadan_1438_10.jpg' , 'ramadan_1438_11.jpg' , 'ramadan_1438_12.jpg' , 'ramadan_1438_13.jpg' , 'ramadan_1438_14.jpg' , 'ramadan_1438_15.jpg' , 'ramadan_1438_2.jpg' , 'ramadan_1438_3.jpg' , 'ramadan_1438_4.jpg' , 'ramadan_1438_5.jpg' , 'ramadan_1438_6.jpg' , 'ramadan_1438_7.jpg' , 'ramadan_1438_8.jpg' , 'ramadan_1438_9.jpg' , 'ramazan11.jpg' , 'ramazan28.jpg' , 'ramazan32.jpg' , 'ramazan33.jpg' , 'ramazan_1438_iftar.jpg' , 'ravza1.jpg' , 'reflection.jpg' , 'saklambac2.jpg' , 'sebeke.jpg' , 'selale.jpg' , 'selale3.jpg' , 'semazen1.jpg' , 'sirinkan.jpg' , 'sirinkan2.jpg' , 'sis.jpg' , 'sky1x.jpg' , 'sokakta.jpg' , 'spiral.jpg' , 'sualti_1.jpg' , 'sultanahmet_1.jpg' , 'sunset.jpg' , 'sunsetx.jpg' , 'surit.jpg' , 'tepeden_yelkenli.jpg' , 'timur_semerkand.jpg' , 'topkapi_1.jpg' , 'ulu_cami.jpg' , 'umut.jpg' , 'umut2.jpg' , 'umutrehberi.jpg' , 'uydudan.jpg' , 'uydudan1.jpg' , 'uzay1.jpg' , 'vandernat.jpg' , 'vink.jpg' , 'voyage_8.jpg' , 'wailing.jpg' , 'yelkenli.jpg' , 'yelkenli2.jpg' , 'yeni1.jpg' , 'yeni10.jpg' , 'yeni100.jpg' , 'yeni101.jpg' , 'yeni102.jpg' , 'yeni103.jpg' , 'yeni104.jpg' , 'yeni106.jpg' , 'yeni107.jpg' , 'yeni108.jpg' , 'yeni109.jpg' , 'yeni11.jpg' , 'yeni110.jpg' , 'yeni111.jpg' , 'yeni112.jpg' , 'yeni113.jpg' , 'yeni114.jpg' , 'yeni115.jpg' , 'yeni116.jpg' , 'yeni117.jpg' , 'yeni118.jpg' , 'yeni119.jpg' , 'yeni12.jpg' , 'yeni120.jpg' , 'yeni121.jpg' , 'yeni122.jpg' , 'yeni124.jpg' , 'yeni125.jpg' , 'yeni127.jpg' , 'yeni128.jpg' , 'yeni129.jpg' , 'yeni13.jpg' , 'yeni130.jpg' , 'yeni131.jpg' , 'yeni132.jpg' , 'yeni133.jpg' , 'yeni134.jpg' , 'yeni135.jpg' , 'yeni136.jpg' , 'yeni137.jpg' , 'yeni138.jpg' , 'yeni139.jpg' , 'yeni14.jpg' , 'yeni140.jpg' , 'yeni141.jpg' , 'yeni142.jpg' , 'yeni144.jpg' , 'yeni145.jpg' , 'yeni146.jpg' , 'yeni147.jpg' , 'yeni148.jpg' , 'yeni149.jpg' , 'yeni15.jpg' , 'yeni150.jpg' , 'yeni151.jpg' , 'yeni152.jpg' , 'yeni153.jpg' , 'yeni154.jpg' , 'yeni155.jpg' , 'yeni156.jpg' , 'yeni157.jpg' , 'yeni158.jpg' , 'yeni159.jpg' , 'yeni16.jpg' , 'yeni160.jpg' , 'yeni161.jpg' , 'yeni162.jpg' , 'yeni163.jpg' , 'yeni164.jpg' , 'yeni165.jpg' , 'yeni166.jpg' , 'yeni167.jpg' , 'yeni168.jpg' , 'yeni169.jpg' , 'yeni17.jpg' , 'yeni170.jpg' , 'yeni172.jpg' , 'yeni173.jpg' , 'yeni174.jpg' , 'yeni175.jpg' , 'yeni176.jpg' , 'yeni177.jpg' , 'yeni178.jpg' , 'yeni179.jpg' , 'yeni18.jpg' , 'yeni180.jpg' , 'yeni181.jpg' , 'yeni182.jpg' , 'yeni183.jpg' , 'yeni184.jpg' , 'yeni185.jpg' , 'yeni186.jpg' , 'yeni187.jpg' , 'yeni188.jpg' , 'yeni189.jpg' , 'yeni19.jpg' , 'yeni190.jpg' , 'yeni191.jpg' , 'yeni192.jpg' , 'yeni193.jpg' , 'yeni194.jpg' , 'yeni195.jpg' , 'yeni196.jpg' , 'yeni197.jpg' , 'yeni198.jpg' , 'yeni199.jpg' , 'yeni2.jpg' , 'yeni20.jpg' , 'yeni200.jpg' , 'yeni201.jpg' , 'yeni202.jpg' , 'yeni203.jpg' , 'yeni204.jpg' , 'yeni205.jpg' , 'yeni206.jpg' , 'yeni207.jpg' , 'yeni208.jpg' , 'yeni209.jpg' , 'yeni21.jpg' , 'yeni210.jpg' , 'yeni211.jpg' , 'yeni212.jpg' , 'yeni213.jpg' , 'yeni214.jpg' , 'yeni215.jpg' , 'yeni216.jpg' , 'yeni217.jpg' , 'yeni218.jpg' , 'yeni219.jpg' , 'yeni22.jpg' , 'yeni220.jpg' , 'yeni221.jpg' , 'yeni222.jpg' , 'yeni223.jpg' , 'yeni224.jpg' , 'yeni225.jpg' , 'yeni226.jpg' , 'yeni227.jpg' , 'yeni228.jpg' , 'yeni229.jpg' , 'yeni23.jpg' , 'yeni230.jpg' , 'yeni231.jpg' , 'yeni232.jpg' , 'yeni233.jpg' , 'yeni234.jpg' , 'yeni235.jpg' , 'yeni236.jpg' , 'yeni237.jpg' , 'yeni238.jpg' , 'yeni239.jpg' , 'yeni24.jpg' , 'yeni242.jpg' , 'yeni243.jpg' , 'yeni244.jpg' , 'yeni245.jpg' , 'yeni246.jpg' , 'yeni247.jpg' , 'yeni248.jpg' , 'yeni249.jpg' , 'yeni25.jpg' , 'yeni250.jpg' , 'yeni251.jpg' , 'yeni252.jpg' , 'yeni253.jpg' , 'yeni254.jpg' , 'yeni255.jpg' , 'yeni256.jpg' , 'yeni257.jpg' , 'yeni258.jpg' , 'yeni26.jpg' , 'yeni27.jpg' , 'yeni28.jpg' , 'yeni29.jpg' , 'yeni3.jpg' , 'yeni30.jpg' , 'yeni31.jpg' , 'yeni32.jpg' , 'yeni33.jpg' , 'yeni35.jpg' , 'yeni36.jpg' , 'yeni37.jpg' , 'yeni38.jpg' , 'yeni39.jpg' , 'yeni4.jpg' , 'yeni40.jpg' , 'yeni41.jpg' , 'yeni42.jpg' , 'yeni43.jpg' , 'yeni44.jpg' , 'yeni45.jpg' , 'yeni46.jpg' , 'yeni47.jpg' , 'yeni48.jpg' , 'yeni49.jpg' , 'yeni5.jpg' , 'yeni50.jpg' , 'yeni500.jpg' , 'yeni501.jpg' , 'yeni502.jpg' , 'yeni51.jpg' , 'yeni52.jpg' , 'yeni53.jpg' , 'yeni54.jpg' , 'yeni55.jpg' , 'yeni56.jpg' , 'yeni57.jpg' , 'yeni58.jpg' , 'yeni59.jpg' , 'yeni6.jpg' , 'yeni60.jpg' , 'yeni61.jpg' , 'yeni62.jpg' , 'yeni63.jpg' , 'yeni64.jpg' , 'yeni65.jpg' , 'yeni66.jpg' , 'yeni67.jpg' , 'yeni68.jpg' , 'yeni69.jpg' , 'yeni7.jpg' , 'yeni70.jpg' , 'yeni71.jpg' , 'yeni72.jpg' , 'yeni73.jpg' , 'yeni74.jpg' , 'yeni75.jpg' , 'yeni76.jpg' , 'yeni77.jpg' , 'yeni78.jpg' , 'yeni79.jpg' , 'yeni8.jpg' , 'yeni80.jpg' , 'yeni81.jpg' , 'yeni82.jpg' , 'yeni83.jpg' , 'yeni84.jpg' , 'yeni85.jpg' , 'yeni86.jpg' , 'yeni87.jpg' , 'yeni88.jpg' , 'yeni89.jpg' , 'yeni9.jpg' , 'yeni90.jpg' , 'yeni91.jpg' , 'yeni92.jpg' , 'yeni93.jpg' , 'yeni94.jpg' , 'yeni96.jpg' , 'yeni97.jpg' , 'yeni98.jpg' , 'yeni99.jpg' , 'yeni_k.jpg' , 'yeni_kar.jpg' , 'yeni_manzara.jpg' , 'yeni_tat.jpg' , 'yenibie.jpg' , 'yesil1.jpg' , 'yesil_agac.jpg' , 'yesil_mirac.jpg' , 'yesillik.jpg' , 'yetim.jpg' , 'zorn_atesiask.jpg'

                         ];

    //==============================================================================================
       var birkerecalisti=false;
       var resimler = new Array();
          $.ajax({
              url: "/baska.xml",
              type: "GET",
              dataType: "xml",
              success: function(xml) {
                if (!birkerecalisti) {
                 console.log("liste parselleme başarılı");

                  $(xml).find('ul').find('li').each(function(){
                    
                  track_list.push({ name: $(this).attr("data-title"), artist: $(this).attr("data-duration"), image: "http://kardelendergisi.com/atesiask/images/yeni77.jpg", path: $(this).attr("data-path") });
                
                  })

                  track_list = track_list.reverse();
                  setListview()
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

console.log("adresin yeri: " + window.location.href);
//----------------------
//==============================================================================================
//==============================================================================================
//==============================================================================================



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

  (function() {
    $('.back_btn').on('click', function() {
      listbutton();
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

  function listbutton(){
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
  }
  /*
  
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
