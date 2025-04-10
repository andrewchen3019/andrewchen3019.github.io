const join = document.getElementById("join");
const resources = [{
 name: "USACO Guide Bronze",
link: "https://usaco.guide/bronze/"
},
 {
  name: "USACO Guide Silver",
 link: "https://usaco.guide/silver/"
 },
   {
    name: "American Computer Science League",
   link: "https://www.acsl.org/about"
   },
   {
     name: "Hackerrank",
     link: "https://www.hackerrank.com/"
   },
   {
     name: "Codeforces",
     link: "https://codeforces.com/"
   }]
const resourceContainer = document.getElementById("resource-container")

resourceContainer.innerHTML = "";
resources.forEach(resource => {
  resourceContainer.innerHTML += `<div class="resource">
  <a href="${resource.link}">${resource.name}</a>
  </div> `
})
function formatDate(date) {
    // Ensure the date is a valid Date object
    if (!(date instanceof Date) || isNaN(date)) {
        return "Invalid Date";
    }

    // Get the month, day, and year
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    const year = date.getFullYear();

    // Pad single digits with leading zeros (optional)
    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');

    // Construct the formatted date string
    return `${paddedMonth}/${paddedDay}/${year}`;
}
function formatList(list){
  let formattedList = "";
  for (let i = 0; i < list.length; i++) {
    formattedList += `${list[i]} <br>`;
  }
  return formattedList;
}
function isNew(date) {
    // Ensure the input is a valid Date object
    if (!(date instanceof Date) || isNaN(date)) {
        throw new Error("Invalid Date object");
    }

    // Get the current date and time
    const now = new Date();

    // Calculate the difference in milliseconds
    const difference = now - date;

    // Convert the difference to hours
    const differenceInHours = difference / (1000 * 60 * 60);

    // Check if the difference is less than 24 hours
    return differenceInHours <= 48;
}

function annTrim(text){
  if(text.length < 30){
    return text;
  }else return text.substr(0, 200);
}
let annoucements = [
  {
    date: new Date(2024, 8, 19),
    title: "First Competitive Coding Club Meeting – Next Thursday!"
  }
 ]
annoucements.sort(function(a, b) {
  return b.date - a.date;
})
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add the visible class to start the fade-in effect
      console.log("hello");
      entry.target.classList.add("showed")
      // Unobserve the element after it becomes visible
      observer.unobserve(entry.target);
    }
  });
});

// Observe the target element
document.querySelectorAll("fade-in").forEach(element => {
  observer.observe(element);
})



const annCon = document.getElementById("announcement-container");
annCon.innerHTML = "";

for(let i=0; i < annoucements.length; i++){
  ann = annoucements[i];
  annCon.innerHTML += `<div class="announcement" id="ann-${i}">
       <div class="left"><div class="dot ${isNew(ann.date) ? "red" : "hide" }"><i class="fa-solid fa-circle"></i></div>
        <div class="date">${formatDate(ann.date)}</div></div>
        <div class="ann-text">${ann.title}</div>
        
  </div>`
}





// typing title

const typingTitle = document.getElementById("typing-title");
const cursor  = document.getElementById("cursor");
let showCursor = false;
let text = "Welcome to the Competitive Coding Club";
let index = 0;
let flashCount = 0;
const cursorInterval = setInterval(() => {
  cursor.style.opacity = showCursor ? "0":"1";
  showCursor = !showCursor;
  flashCount++;
  if(flashCount > 29) clearInterval(cursorInterval);
}, 200)

const interval = setInterval(() => {
  typingTitle.innerHTML += text[index];
  index++;
  if(index == text.length){
   // join.style.display = "block";
    clearInterval(interval);
  }
  
}, 100)
const navMin = 958;

//const tabs = ["welcome", "about", "announcements", "resources", "contact"];
let isMenu = false;
const navTexts = document.querySelectorAll(".nav-text")
if(window.innerWidth < navMin){
   navTexts.forEach(navText => navText.style.display="none")
}

window.addEventListener("resize", () => {
  if(window.innerWidth < navMin){
    if(!isMenu) {
      console.log("ahhhhh")
      navTexts.forEach(navText => navText.style.display="none")
      isMenu = true;
    }
  }else {
    if(isMenu){
      console.log("wheeww")
       navTexts.forEach(navText => navText.style.display="inline")
      isMenu = false;
    }
  }
})
const topicsContainer = document.getElementById("topics");
const lessons = [
  {title: "Introduction",
    link: "https://docs.google.com/presentation/d/1RJnkUkRRXyd52osEANDW8-LmvCN_1Uit/edit?usp=sharing&ouid=108230909046799498177&rtpof=true&sd=true"
  },
  {
    title: "Time Complexity",
    link: "https://docs.google.com/presentation/d/1OeuL3hZbtcuusuyxaUzfmUotWAEvJcVz/edit?usp=sharing&ouid=108230909046799498177&rtpof=true&sd=true",
  },
  {
    title: "Simulation",
    link: "https://docs.google.com/presentation/d/1KzNapxq3T5bOtgfOmqU2tFAnivzKvhGj/edit?usp=sharing&ouid=108230909046799498177&rtpof=true&sd=true"
  }
]
topicsContainer.innerHTML = "";
lessons.forEach(lesson => {
  topicsContainer.innerHTML += `
    <div class="lesson">
      <h2 id="lecture-title">${lesson.title}</h2>
      ${lesson.link ? `<a href="${lesson.link}" class="lecture-link" target="_blank">Slides</a>`: "" }
    </div>`
})