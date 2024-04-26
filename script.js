// initializations
let selectedAll = document.querySelector(".all");
let forward=document.querySelector("#forward");
let restart = document.querySelector("#restart");
let backward = document.querySelector("#backward");
let shufffle = document.querySelector("#shuffle");
let startingTime = document.querySelector(".curr-time");
let totalTime = document.querySelector(".tot-time");
let playback = document.querySelector(".playback-bar");
let progress = document.querySelector(".progress-bar");
let flag = 0;
let selectedSong=0;
let flag_play=0;
const audio = new Audio;
audio.preload="metadata";
let heart = document.querySelector(".heart");
let playerControls = document.querySelector(".player-controls");
let playing = audio.play();

let recentlyAdded=[];

let arr=[
    {
        songName:"Jale 2",
        image:"./assets/images/jale.jpg",
        Songurl:"./assets/music/Jale2.mp3",
        cardinfo:"this song is of animal movie",
    },
    {
        songName:"Pehle bhi main",
        image:"./assets/images/animal4.png",
        Songurl:"./assets/music/PehleBhiMain.mp3",
        cardinfo:"this song is of animal movie",
   },

    {
        songName:"Tu Hai Kahan?",
        image:"./assets/images/Tuhai.jpeg",
        Songurl:"./assets/music/TuHai.mp3",
        cardinfo:"This is one of the top trending album",
    },
    {
        songName:"Bhaag D.K.Bose",
        image:"./assets/images/BhaagDKB.jpeg",
        Songurl:"./assets/music/bhaagDK.mp3",
        cardinfo:"This is the song from DK bose movie...",
    },
];// Thus array contains the data of the trending section


let arrFeatured =[
    {
        songName:"Don",
        image:"./assets/images/don.jpeg",
        Songurl:"./assets/music/maihoon.mp3",
        cardinfo:""
    },
    {
        songName:"Malnag",
        image:"./assets/images/malang.jpeg",
        Songurl:"./assets/music/Malang.mp3",
        cardinfo:""
    },
    {
        songName:"The Starboy",
        image:"./assets/images/satrboy.jpeg",
        Songurl:"./assets/music/Starboy.mp3",
        cardinfo:"This song of the album Weeknd"
    },{
        songName:"Yeh Dosti",
        image:"./assets/images/sholay.jpeg",
        Songurl:"./assets/music/YehDosti.mp3",
        cardinfo:"This song is one of the famous song of the legendry movie Sholay"
    },
    {
        songName:"One Love",
        image:"./assets/images/one love.jpg",
        Songurl:"./assets/music/One.mp3",
        cardinfo:"By Shubh"
    },
]// This array contains data of the songs in the featured section

let shufflingArray = arr.concat(arrFeatured);// adding two arrays for getting the function of shuffling

audio.onloadedmetadata = function(){
    progress.max = audio.duration // maximum value of audio duration transfeered to these values
    progress.value = audio.currentTime;
};//here we are updating the progress bar of the music player as the songs moves on


// This below function is the heart of this audio playing feature as well as main fucnction
function audioPlayer(){ 
    selectedAll.addEventListener("click", function(e){
        if(e.target.id  < 4){
                selectedSong= e.target.id;
                audioTrending();
                recentlyPlayedTrending()
                addingRecently()
                document.querySelector("#plays").src="./assets/player_pause.png";
                flag_play=1;
                audio.play();
        }
        else{
                selectedSong= e.target.id - 5;
                audiofeatured();
                recentlyPlayedFeatured();
                addingRecently()
                document.querySelector("#plays").src="./assets/player_pause.png";
                flag_play=1;
                audio.play();
}})}


if(playing){
    setInterval(()=>{
        progress.value=audio.currentTime;
        songtimeUpdate()},100)
}

progress.onchange = function(){
audio.currentTime =progress.value;   
}


function setVolume(el){
    audio.volume = el.value;
}


document.querySelector("#plays").addEventListener("click",function(e){
    if(flag_play==0){
        e.target.src="./assets/player_pause.png";
        flag_play=1;
        audio.play()  
    }
    else{
        e.target.src="./assets/player_icon3.png";
        flag_play=0;
        audio.pause();
    }
});

function songtimeUpdate(){
    let curmins = Math.floor(audio.currentTime / 60);
    let cursecs = Math.floor(audio.currentTime - curmins*60);

    let durmins = Math.floor(progress.max / 60);
    let dursecs = Math.floor(progress.max - durmins*60);

        if(dursecs<10){
            dursecs="0"+ dursecs;
        }
        if(durmins<10){
            durmins="0"+ durmins;
        }
        if(curmins<100){
            curmins = "0" + curmins
        }
        if(cursecs<10){
            cursecs ="0"+cursecs;
        }
        startingTime.innerHTML = curmins + ":" + cursecs;
        totalTime.innerHTML= durmins + ":"+ dursecs;

}

function audioTrending(){
    audio.src = arr[selectedSong].SongSongurl;
    document.querySelector(".album img").src=`${arr[selectedSong].image}`
    document.querySelector(".album-title").innerHTML=`<a href="#">${arr[selectedSong].songName}</a>
    <p class="song-name">${arr[selectedSong].cardinfo}</p>`; 
}

function addingTrending(){
    let clutter="";
    arr.forEach(function(details, idx){
        clutter += `<div class="card" id ="${idx}">
                <img src="${details.image}" class="card-img">
                <p class="card-title">${details.songName}</p>
                <p class="card-info">${details.cardinfo}</p>
    </div>`;
    });
    document.querySelector(".trending").innerHTML=clutter;    
    audioTrending();
    
}

function addingRecently(){
    let clutter="";
    recentlyAdded.forEach(function(details){
        clutter += `<div class="card">
        <img src="${details.image}" class="card-img">
        <p class="card-title">${details.songName}</p>
        <p class="card-info">${details.cardinfo}</p>
    </div>`;
    })    
    document.querySelector(".recently").innerHTML=clutter;

}


function audioShuffled(){
    audio.src = shufflingArray[selectedSong].Songurl;
    document.querySelector(".album img").src=`${shufflingArray[selectedSong].image}`
    document.querySelector(".album-title").innerHTML=`<a href="#">${shufflingArray[selectedSong].songName}</a>
    <p class="song-name">${shufflingArray[selectedSong].cardinfo}</p>`;
}

function audiofeatured(){
    audio.src = arrFeatured[selectedSong].Songurl;
    document.querySelector(".album img").src=`${arrFeatured[selectedSong].image}`
    document.querySelector(".album-title").innerHTML=`<a href="#">${arrFeatured[selectedSong].songName}</a>
    <p class="song-name">${arrFeatured[selectedSong].cardinfo}</p>`;
}

function addingNearYou(){
    let clutter="";
// ye featureing waale gane load krtA Hai pr kaam trending waale sogns pr krta hai
    arrFeatured.forEach(function(details, idx){
        clutter += `<div class="card" id=${idx+ 5}>
        <img src="${details.image}" class="card-img">
        <p class="card-title">${details.songName}</p>
        <p class="card-info">${details.cardinfo}</p>
    </div>`;
    })

    document.querySelector(".featuring").innerHTML=clutter;

    audiofeatured()    
}

function heartChangeColor(){
    heart.addEventListener("click", function() {
        if (flag == 1) {
            heart.style.color = "#1bd760"; // Change color to green
            flag = 0 // Update flag
        } else {
            heart.style.color = "white"; // Change color to white
            flag = 1; // Update flag
        }
    });
}


forward.addEventListener("click", function(){
    if(selectedSong< arr.length-1){
        selectedSong++;
        audiofeatured();
        if(flag_play==1){
            audio.play();
        }else{
            audio.pause();  
        }
    
        backward.style.opacity=0.7;
        forward.addEventListener("mouseover", function(){
            forward.style.opacity=1;
        })
    }
    else{
        document.querySelector("#forward").style.opacity=0.2;
    }
})

backward.addEventListener("click",function(){
    if(selectedSong>0 ){
        selectedSong--;
        addingNearYou();
        if(flag_play==1){
            audio.play();
        }else{
            audio.pause();
        }
        forward.style.opacity=0.7;
        backward.addEventListener("mouseover", function(){
            backward.style.opacity=1;
        })
    }
    else{
        document.querySelector("#backward").style.opacity=0.2;
    }
})


shufffle.addEventListener("click",function(){
    selectedSong = Math.floor((Math.random()*shufflingArray.length ));
    audioShuffled()
    recentlyPlayedShuffled()
    addingRecently();
    if(flag_play==1){
        audio.play();
    }else{
        audio.pause();
    }
    
})

restart.addEventListener("click", function(){
    addingNearYou();
    
    if(flag_play==1){
        audio.play();
    }else{
        audio.pause();
    }
    
})


function recentlyPlayedShuffled(){
    if(recentlyAdded.length <4){
        recentlyAdded.unshift(shufflingArray[selectedSong])
    }else{
        recentlyAdded.pop();
            recentlyAdded.unshift(shufflingArray[selectedSong]);
    }
}

function recentlyPlayedTrending(){
            if(recentlyAdded.length<4){
                recentlyAdded.unshift(arr[selectedSong]);

            }
            else{
                recentlyAdded.pop();
                recentlyAdded.unshift(arr[selectedSong]);
            }}
        

function recentlyPlayedFeatured(){
    if(recentlyAdded.length<4){
        recentlyAdded.unshift(arrFeatured[selectedSong]);
    }
    else{
        recentlyAdded.pop();
        recentlyAdded.unshift(arrFeatured[selectedSong]);
    }
}
        
audioPlayer();
addingTrending();
songtimeUpdate();
heartChangeColor();
addingNearYou();
setVolume();
