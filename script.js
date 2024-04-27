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
        SongNo:"1",
    },
    {
        songName:"Pehle bhi main",
        image:"./assets/images/animal4.png",
        Songurl:"./assets/music/PehleBhiMain.mp3",
        cardinfo:"this song is of animal movie",
        SongNo:"2",
   },

    {
        songName:"Tu Hai Kahan?",
        image:"./assets/images/Tuhai.jpeg",
        Songurl:"./assets/music/TuHai.mp3",
        cardinfo:"This is one of the top trending album",
        SongNo:"3",
    },
    {
        songName:"Bhaag D.K.Bose",
        image:"./assets/images/BhaagDKB.jpeg",
        Songurl:"./assets/music/bhaagDK.mp3",
        cardinfo:"This is the song from DK bose movie...",
        SongNo:"4",
    },
];// Thus array contains the data of the trending section


let arrFeatured =[
    {
        songName:"Don",
        image:"./assets/images/don.jpeg",
        Songurl:"./assets/music/maihoon.mp3",
        cardinfo:"Most famous Song of the decade of 2010",
        SongNo:"5",
    },
    {
        songName:"Malang",
        image:"./assets/images/malang.jpeg",
        Songurl:"./assets/music/Malang.mp3",
        cardinfo:"Composed by Ved Sharma",
        SongNo:"6",
    },
    {
        songName:"The Starboy",
        image:"./assets/images/satrboy.jpeg",
        Songurl:"./assets/music/Starboy.mp3",
        cardinfo:"This song of the album Weeknd",
        SongNo:"7",
    },{
        songName:"Yeh Dosti",
        image:"./assets/images/sholay.jpeg",
        Songurl:"./assets/music/YehDosti.mp3",
        cardinfo:"This song is one of the famous song of the legendry movie Sholay",
        SongNo:"8",
    },
    {
        songName:"One Love",
        image:"./assets/images/one love.jpg",
        Songurl:"./assets/music/One.mp3",
        cardinfo:"By Shubh",
        SongNo:"9",
    },
]// This array contains data of the songs in the featured section

let shufflingArray = arr.concat(arrFeatured);// adding two arrays for getting the function of shuffling

audio.onloadedmetadata = function(){
    progress.max = audio.duration 
    // maximum value of audio duration transfeered to these values
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

//Moving progress bar feature changing it every few millisseconds
if(playing){
    setInterval(()=>{
        progress.value=audio.currentTime;
        songtimeUpdate()},100)
}
// function to move scrollbar on my own physically
progress.onchange = function(){
audio.currentTime =progress.value;   
}

// volume minimizing maximazing funtion by own
function setVolume(el){
    audio.volume = el.value;
    //using css properties and onchange adding value to recent volume of the system
}

//playing songon the click of the main pause play button
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

//Updating song time starting as well as ending
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

// here I am changin the main play and pause button
function changePlayPauseButton(){
    if(flag_play==1){
        audio.play();
    }else{
        audio.pause();
    }
}

//Pplaying the trendibng video here
function audioTrending(){
    audio.src = arr[selectedSong].Songurl;
    document.querySelector(".album img").src=`${arr[selectedSong].image}`
    document.querySelector(".album-title").innerHTML=`<a href="#">${arr[selectedSong].songName}</a>
    <p class="song-name">${arr[selectedSong].cardinfo}</p>`; 
}

// Adding trending cards
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
    //selecting the tred=nding card and clling the song for trending videos
    audioTrending();
    
}

//Playing the audio od the featured seection
function audiofeatured(){
    audio.src = arrFeatured[selectedSong].Songurl;
    document.querySelector(".album img").src=`${arrFeatured[selectedSong].image}`
    document.querySelector(".album-title").innerHTML=`<a href="#">${arrFeatured[selectedSong].songName}</a>
    <p class="song-name">${arrFeatured[selectedSong].cardinfo}</p>`;
}

//Adding cards in the recently played section
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

//Shuffling the audio from all the given songs by concating the two arrays we have
function audioShuffled(){
    audio.src = shufflingArray[selectedSong].Songurl;
    document.querySelector(".album img").src=`${shufflingArray[selectedSong].image}`
    document.querySelector(".album-title").innerHTML=`<a href="#">${shufflingArray[selectedSong].songName}</a>
    <p class="song-name">${shufflingArray[selectedSong].cardinfo}</p>`;
}

// adding songs in the featured section
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

// adding liked or unliked feature 
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

// forwading in a way such that trending section have their own forward backward feature
function changingSongForwardorBackward(){
    if(arr[selectedSong].SongNo <=4){
        audioTrending()
        changePlayPauseButton()
        recentlyPlayedTrending()// adding into the array of played
        addingRecently()// showing the card in the recently played tab
    }
    else{
        console.log(arr[selectedSong].SongNo)
        audiofeatured()
        changePlayPauseButton();
        recentlyPlayedFeatured()// adding it in the array of played
        addingRecently()// showing the card in the recently played section
    }    
}

// adding shuffled song into the recently played song
function recentlyPlayedShuffled(){
    if(recentlyAdded.length <4){
        recentlyAdded.unshift(shufflingArray[selectedSong])
    }else{
        recentlyAdded.pop();
            recentlyAdded.unshift(shufflingArray[selectedSong]);
    }
}
// pushing the song into the black array so that it can later on showed as a card for trending songs
function recentlyPlayedTrending(){
    if(recentlyAdded.length<4){
        recentlyAdded.unshift(arr[selectedSong]);

    }
    else{
        recentlyAdded.pop();
        recentlyAdded.unshift(arr[selectedSong]);
    }
}
        
// pushing the song into the black array so that it can later on showed as a card for featured songs
function recentlyPlayedFeatured(){
    if(recentlyAdded.length<4){
        recentlyAdded.unshift(arrFeatured[selectedSong]);
    }
    else{
        recentlyAdded.pop();
        recentlyAdded.unshift(arrFeatured[selectedSong]);
    }
}
        

// adding forward feature
forward.addEventListener("click", function(){
    if(selectedSong< arr.length-1){
        selectedSong++;
        changingSongForwardorBackward()
        backward.style.opacity=0.7;
        forward.addEventListener("mouseover", function(){
            forward.style.opacity=1;
        })
    }
    else{
        document.querySelector("#forward").style.opacity=0.2;
    }
})

// making backward feature work
backward.addEventListener("click",function(){
    if(selectedSong>0 ){
        selectedSong--;
        changingSongForwardorBackward()
    }
    else{
        document.querySelector("#backward").style.opacity=0.2;
    }
})

// Shuffling through both trending and featured songs
shufffle.addEventListener("click",function(){
    selectedSong = Math.floor((Math.random()*shufflingArray.length ));// selecting the shuffled song
    audioShuffled()//  adding the card in the liked section for it 
    recentlyPlayedShuffled()// shifting it into the array
    addingRecently();// printing the arrayhere
    if(flag_play==1){
        audio.play();
    }else{
        audio.pause();
    }
    
})

// restarting song from the scratch
restart.addEventListener("click", function(){
    if(arr[selectedSong].SongNo <= 4){
        audioTrending();
        changePlayPauseButton()
    }
    else{
        audiofeatured();
        changePlayPauseButton();
    }
})


audioPlayer();
addingTrending();
songtimeUpdate();
heartChangeColor();
addingNearYou();
setVolume();
