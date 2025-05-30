const player= document.querySelector('.player')
const video= player.querySelector('.viewer')
const progress= document.querySelector('.progress')
const toggle= document.querySelector('.toggle')
const progressBar= document.querySelector('.progress__filled')
const skipButtons= document.querySelectorAll('.player__slider')
const ranges= document.querySelectorAll('.player__button')


function togglePlay(){
    const method= video.paused ? 'play':'pause'
    video[method]();
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent =icon;
}

function skip(){
    video.currentTime+= parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name]=this.value;
}

function handleProgress(){
    const percent=(video.currentTime/video.duration)*100
    progressBar.style.flexBasis=`${percent}%`
}

function scrub(e){
    const scrubTime= (e.offsetX/progress.offsetWidth)*video.currentTime;
    video.currentTime=scrubTime;
}

video.addEventListener('click',togglePlay)
toggle.addEventListener('click',togglePlay)

video.addEventListener('play',updateButton)
video.addEventListener('pause',updateButton)

video.addEventListener('timeupdate',handleProgress)

skipButtons.forEach(button=>button.addEventListener('click',skip))

ranges.forEach(range=>range.addEventListener('mousemove',handleRangeUpdate))
ranges.forEach(range=>range.addEventListener('change',handleRangeUpdate))

let mousedown=false
progress.addEventListener('click',scrub)
progress.addEventListener('mousemove',()=> mousedown && scrub(e))
progress.addEventListener('mousedown',()=>mousedown=true)
progress.addEventListener('mouseup',()=>mousedown=false)
