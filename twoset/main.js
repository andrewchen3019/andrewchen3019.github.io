const data = [
    {
        title: "1% skills, 99% Editing",
        id: "99%",
        videos: ["piano-99", "quartet-99", "recorder-99", "violin-99"]
    }
]
const main = document.getElementById("main");
data.forEach(entry => {
    let videoText = "";
    entry.videos.forEach(video => {
        videoText += `
       <div class="video"> <video width="500px" controls> <source src="vids/${video}.mp4" type="video/mp4"> </video> <div class="video-title">${video}</div></div>`
        
    })
    main.innerHTML += `
    <div class="section" id="${entry.id}">
            <h2 class="section-title">${entry.title}</h2>
            <div class="videos">
                ${videoText}
            </div>
        </div>`
})


