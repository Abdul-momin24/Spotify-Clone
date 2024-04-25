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
// initiliation of array data 
let recentlyAdded=[]





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
];


let arrFeatured =[
    {
        songName:"Don",
        image:"./assets/images/don.jpeg",
        url:"./assets/music/maihoon.mp3",
        cardinfo:""
    },
    {
        songName:"Malnag",
        image:"./assets/images/malang.jpeg",
        url:"./assets/music/Malang.mp3",
        cardinfo:""
    },
    {
        songName:"The Starboy",
        image:"./assets/images/satrboy.jpeg",
        url:"./assets/music/Starboy.mp3",
        cardinfo:"This song of the album Weeknd"
    },{
        songName:"Yeh Dosti",
        image:"./assets/images/sholay.jpeg",
        url:"./assets/music/YehDosti.mp3",
        cardinfo:"This song is one of the famous song of the legendry movie Sholay"
    },
    {
        songName:"One Love",
        image:"./assets/images/one love.jpg",
        url:"./assets/music/One.mp3",
        cardinfo:"By Shubh"
    },
]



audio.onloadedmetadata = function(){
    progress.max = audio.duration
    progress.value = audio.currentTime;
};

function audioPlayer(){ 
    selectedAll.addEventListener("click", function(e){
        if(e.target.class  == "upar"){
            document.querySelector(".trending").addEventListener("click",function(e){
                selectedSong= e.target.id;
                addingNearYouTrending();
                document.querySelector("#plays").src="./assets/player_pause.png";
                flag=1;
                audio.play();
        })}
        else{
            document.querySelector(".featuring").addEventListener("click",function(e){
                selectedSong= e.target.id - 5;
                addingNearYou();
                document.querySelector("#plays").src="./assets/player_pause.png";
                flag=1;
                audio.play();
})}})
    }


if(playing){
    setInterval(()=>{
        progress.value=audio.currentTime;
        songtimeUpdate()
    },100)}

progress.onchange = function(){
audio.currentTime =progress.value;   
}



//controlling volume
function setVolume(el){
    audio.volume = el.value;
}

// function playerController(){
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

})


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


function addingTrending(){
    let clutter="";

    arr.forEach(function(details, idx){
        clutter += `<div class="card upar" id ="${idx}">
                <img src="${details.image}" class="card-img">
                <p class="card-title">${details.songName}</p>
                <p class="card-info">${details.cardinfo}</p>
    </div>`;
    })

    document.querySelector(".trending").innerHTML=clutter;     
    
    audio.src = arr[selectedSong].Songurl;
    document.querySelector(".album img").src=`${arr[selectedSong].image}`
    document.querySelector(".album-title").innerHTML=`<a href="#">${arr[selectedSong].songName}</a>
    <p class="song-name">${arr[selectedSong].cardinfo}</p>`;
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


function addingNearYouTrending(){
    let clutter="";
// ye featureing waale gane load krtA Hai pr kaam trending waale sogns pr krta hai
    arr.forEach(function(details, idx){
        clutter += `<div class="card" id=${idx+ 5}>
        <img src="${details.image}" class="card-img">
        <p class="card-title">${details.songName}</p>
        <p class="card-info">${details.cardinfo}</p>
    </div>`;
    })

    document.querySelector(".featuring").innerHTML=clutter;

    audio.src = arr[selectedSong].Songurl;
    
    document.querySelector(".album img").src=`${arr[selectedSong].image}`
    document.querySelector(".album-title").innerHTML=`<a href="#">${arr[selectedSong].songName}</a>
    <p class="song-name">${arr[selectedSong].cardinfo}</p>`;
    addingRecently();   
    recentlyPlayed();
    
    
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

    audio.src = arrFeatured[selectedSong].url;
    
    document.querySelector(".album img").src=`${arrFeatured[selectedSong].image}`
    document.querySelector(".album-title").innerHTML=`<a href="#">${arrFeatured[selectedSong].songName}</a>
    <p class="song-name">${arrFeatured[selectedSong].cardinfo}</p>`;
    addingRecently();   
    recentlyPlayed();
    
    
}


// selectedAll.addEventListener("click", function(details){
//     console.log(details.target)
// })

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
    if(selectedSong< arr.length-1 || selectedSong< arrFeatured.length-1){
        selectedSong++;
        addingNearYou();
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
    selectedSong = Math.floor((Math.random()*arr.length ));
    addingNearYou();
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

function recentlyPlayed(){
    if(recentlyAdded.length<4){
        recentlyAdded.unshift(arrFeatured[selectedSong]);
    }
    else{
        recentlyAdded.pop();
        recentlyAdded.unshift(arrFeatured[selectedSong]);
    }
}


songtimeUpdate();
audioPlayer();
heartChangeColor();
addingNearYou();
addingTrending();
setVolume();
