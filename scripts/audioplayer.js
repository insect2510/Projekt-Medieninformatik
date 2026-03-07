// call audioplayer 

audioPlayer();

// --- Audioplayer ---

function audioPlayer() {

    // check if id audioplayer is loaded
    // if so, run function
    if (document.getElementById("audioplayer") != null) {

        let myArr;
        let myObj;
        let myArrLenght;

        // start to load data for audioplayer
        loadData();

        // load json data
        async function loadData() {

            // check if an error occurs while loading

            try {

                // load and parse concert-dates.json

                const response = await fetch("data/music.json");
                const myObj = await response.json();

                // set json data to an array

                myArr = myObj;

            }

            // if an error occured, write error message to html
            catch (error) {
                document.getElementById("audioplayer").innerHTML = "<p>Error loading data. Please try again later.</p>"
                return
            }

            writeHtmlAudioPlayer(myArr)
        }

        // construct html from the loaded date

        function writeHtmlAudioPlayer(myArr) {

            let trackid = 0;
            let y = 0;
            let trackidstart = 0;
            let trackidprevious = trackidstart;
            let htmlAudioPlayer = "";

            // chech if array has no entries
            // if so, write a message into html

            if (myArr.length == 0) {
                htmlAudioPlayer += "<p>audio files yet. Want to upload some?</p>"
            }
            else

                // if arrays has entries, construct html
                // contruct tracklist from array

                htmlAudioPlayer += "<h3>Listen</h3>";
            htmlAudioPlayer += "<ol class='tracklist'>";
            for (y = 0; y < myArr.length; y++) {
                htmlAudioPlayer += "<li><button>" + (y + 1) + ". " + myArr[y].trackname + "</button><p>" + myArr[y].length + "</p></li> ";

            }
            htmlAudioPlayer += "</ol>";

            // construct player controls

            // volume control

            htmlAudioPlayer += "<ul class='play-buttons'>";
            htmlAudioPlayer += "<li class='volume'>";
            htmlAudioPlayer += "<i class='fa-solid fa-volume-low'></i>";
            htmlAudioPlayer += "<input id='volume' class='slider' type='range' name='volume' min='0' max='1' value='0.5' list='gain-vals' step='0.01' data-action='volume' >";
            htmlAudioPlayer += "<datalist id='gain-vals'>";
            htmlAudioPlayer += "<option value='0' label='min'>";
            htmlAudioPlayer += "<option value='1' label='max'>";
            htmlAudioPlayer += "</datalist>";
             htmlAudioPlayer += "<i class='fa-solid fa-volume-high'></i>";
            htmlAudioPlayer += "</li>";

            // player buttons

            htmlAudioPlayer += "<li>";
            htmlAudioPlayer += "<button id='prevButton'>";
            htmlAudioPlayer += "<i class='fa-solid fa-chevron-left'></i>";
            htmlAudioPlayer += "</li>";
            htmlAudioPlayer += "</button>";
            htmlAudioPlayer += "</li>";
            htmlAudioPlayer += "<li>";
            htmlAudioPlayer += "<audio src='assets/audio/" + myArr[trackidstart].filename + "'></audio>";
            htmlAudioPlayer += "<button id='playButton' class='toggle' role='switch' aria-checked='false'>";
            htmlAudioPlayer += "<i class='fa-solid fa-play'></i>";
            htmlAudioPlayer += "</button>";
            htmlAudioPlayer += "</li>";
            htmlAudioPlayer += "<li>";
            htmlAudioPlayer += "<button id='nextButton'>";
            htmlAudioPlayer += "<i class='fa-solid fa-chevron-right'></i>";
            htmlAudioPlayer += "</button>";
            htmlAudioPlayer += "</li>";
            htmlAudioPlayer += "</ul>";

            // write constructed html into DOM

            document.getElementById("audioplayer").innerHTML = htmlAudioPlayer;

            // setup for controls

            const container = document.getElementById("audioplayer");
            const playButton = document.getElementById("playButton");
            const prevButton = document.getElementById("prevButton");
            const nextButton = document.getElementById("nextButton");

            const audio = container.querySelector("audio");
            const tracklistItems = container.querySelectorAll(".tracklist button");
            const volumeControl = document.getElementById("volume");
            const audioCtx = new AudioContext();

            // create audio node

            const track = audioCtx.createMediaElementSource(audio);
            const gainNode = audioCtx.createGain();

            // connetct audio nodes to graph

            track.connect(gainNode);
            gainNode.connect(audioCtx.destination);


            // BEISPIEL CODE Kontrolle mit ChatGPT

            //for (y = 0; y < myArr.length; y++) {
            //    tracklistItems[y].addEventListener("click", () => {
            //        togglePlay(y);
            //    });
            // }


            // add event listener for tracklist items

            tracklistItems.forEach((item, index) => {
                item.addEventListener("click", () => {
                    tracklistItems[trackidprevious].classList.remove("active");
                    tracklistItems[index].classList.add("active");
                    play(myArr[index])
                    trackid = index;
                    trackidprevious = index;
                });
            });

            tracklistItems[trackidstart].classList.add("active");

            // add event listener to Volume

            volumeControl.addEventListener("input", () => {
                console.log(
                    audioCtx.state
                );
                console.log(volumeControl.value);
                gainNode.gain.value = volumeControl.value;
            });

            // add event listener to prev button

            prevButton.addEventListener("click", () => {
                if (trackid > 0) {
                    tracklistItems[trackidprevious].classList.remove("active");
                    trackid--;
                    trackidprevious = trackid;
                    tracklistItems[trackid].classList.add("active");
                    play(myArr[trackid]);
                } else {
                    prevButton.classList.remove("active");
                }
            });

            // add event listener to next button

            nextButton.addEventListener("click", () => {
                if (trackid < (myArr.length - 1)) {
                    tracklistItems[trackidprevious].classList.remove("active");
                    trackid++;
                    trackidprevious = trackid;
                    tracklistItems[trackid].classList.add("active");
                    play(myArr[trackid]);
                } else {
                    nextButton.classList.remove("active");
                }
            });

            // add event listener to play button

            playButton.addEventListener("click", () => {
                if (audio.paused) {
                    play(myArr[trackid]);
                    playButton.setAttribute("aria-checked", "true");
                } else {
                    audio.pause();
                    playButton.innerHTML = "<i class='fa-solid fa-play'></i>";
                }
            });

            // If track ends

            audio.addEventListener(
                "ended",
                () => {
                    playButton.textContent = "play";
                    playButton.setAttribute("aria-checked", "false");
                },
                false
            );

            function play(trackid) {
                document.querySelector("audio").src = "assets/audio/" + trackid.filename;
                playButton.innerHTML = "<i class='fa-solid fa-stop'></i>";

                if (audioCtx.state === "suspended") {
                    audioCtx.resume();
                }

                audio.play();
                playButton.setAttribute("aria-checked", "true");

            }
        }
    };
}
