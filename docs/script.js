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
                //path: "https://www.mediafire.com/download/rjvwin4c/eyademoglu_keroglu.mp3"
            },
        ];

curr_track.src = track_list[track_index].path;
            curr_track.load();

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
console.log("adresin yeri: " + window.location.href);