
const musicContainer = document.querySelector('.music-container')


const playButton = document.querySelector('#play')
const prevButton = document.querySelector('#prev')
const nextButton = document.querySelector('#next')

const audio= document.querySelector('#audio')

const progressBar = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')


const musicInfo = document.querySelector('#title')

const cover = document.querySelector('#cover')
const root = document.documentElement;

// song titles 

const songs = ['discover', 'dullscythe','bangarang']

//keep track of the songs 

let songIndex = 2

//initially load song into DOM

loadSong(songs[songIndex])

//UPDATE song details

function loadSong(song){
    musicInfo.innerText = song
    if (song === 'dullscythe'){
        audio.src= 'music/'+song+'.wav'

    }
    else{
        audio.src= 'music/'+song+'.mp3'
    }
    cover.src = 'images/'+song+'.jpeg'
}

function pauseSong() {
    musicContainer.className = 'music-container'
    playButton.innerHTML = '<i class="fas fa-play"></i>'

    audio.pause() 


}

function prevSong(){
    songIndex =songIndex-1

    if (songIndex<0){
        songIndex=songs.length-1
    }
    loadSong(songs[songIndex])

    audio.play()
}

function nextSong(){
    songIndex =songIndex+1
    if (songIndex>songs.length-1){
        songIndex=0
    }
    loadSong(songs[songIndex])

    audio.play()


}


function playSong(){
    musicContainer.className = 'music-container play blink'
    playButton.innerHTML = '<i class="fas fa-pause"></i>'

    audio.play()


    


}

function jumpAudio(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    
    const duration = audio.duration

    audio.currentTime = ((clickX/width)) *duration

    
}


function updateProgress(e){

    const {duration, currentTime} = e.srcElement

    const progressPercent = (currentTime / duration) * 100

    progressBar.style.width = progressPercent+"%"

}

function updateColors(e){


    const {duration, currentTime} = e.srcElement

    console.log(duration)
    console.log(parseInt(currentTime))
    const remainder = currentTime - parseInt(currentTime)
    // const progressPercent = (currentTime / duration) * 100
    if( parseInt(currentTime) %2 ==0){
        root.style.setProperty('--rgba-background', "rgba(149, 172, 255, 0.92)")
} 
    else if (parseInt(currentTime) %3 ==0){  
        root.style.setProperty('--rgba-background', "rgba(203, 214, 255, 0.92)")

    }
    else {
        root.style.setProperty('--rgba-background', "rgba(230, 200, 255, 0.92)")

    }
    

  
}

// when play button is clicked
playButton.addEventListener('click',playAction);


function playAction (e){

    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying){
        pauseSong()



    }
    else{
        playSong()

   

    }

}

//change song events 

prevButton.addEventListener('click', prevSong)
nextButton.addEventListener('click', nextSong)


audio.addEventListener('timeupdate',updateProgress)



//change colors to beat
audio.addEventListener('timeupdate',updateColors)


progressContainer.addEventListener('click',jumpAudio)