
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
let competitionResults = [
  {
    date: new Date(2024, 4, 18),
    pic: "2024NationalMathleagueChampionship.jpeg",
    name: "2024 National Mathleague Championship",
    loc: "Washington University, St. Louis",
    overallResults: ["1st Place school overall with a total of 286.5 points"],
    individualResults: ["Aiden Zhang ’27 — 5th place, 9th grade individual","Edward Li ’26 — 2nd place, 10th grade individual and 7th place overall ", "Catherine Xu ’26 — 4th place, 10th grade individual and 10th place overall "],
    teamResults: ["1st place, Team Test: Aiden Zhang, Edward Li, Catherine Xu, Kyros Wu, Kai Merrill, Andrew Chen", "2nd place, Relay Round: Edward Li, Kyros Wu, Aiden Zhang"]
  }
]
let annoucements = [
  {
    date: new Date(2024, 5, 1),
    message: "ARML Contest today"
  },
  {
      date: new Date(2024, 4, 22),
      message: "Math club banquet today"
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
        <div class="ann-text">${ann.message}</div>
  </div>`
}

const resultCon = document.getElementById("result-container");

 resultCon.innerHTML = "";
 for(let  i=0; i < competitionResults.length; i++){
 let result = competitionResults[i];
   resultCon.innerHTML += `<div class="result" id="result-${i}">           <div class="left">
   <div class="big-dot"><i class="fa-solid fa-caret-down"></i></div>
       <div class="date">${formatDate(result.date)}</div></div>
             <div class="ann-text">${result.name}</div>
       </div>

        <div class="result-dropdown grid-section one-picture-layout none" id="dropdown-${i}">
        <img class="section-pic" src="competition/${result.pic}" height="500px" />
        <div class="result-text">
          <h1 class="result-title">${result.name}</h1>
          <p class="result-paragraph">${formatDate(result.date)}</p>
          <p class="result-paragraph">${result.loc}</p>
          
          <h2 class="result-subheading"> Overall Results </h2>
          <p class="result-paragraph">${formatList(result.overallResults)}</p>
          <h2 class="result-subheading"> Team Results</h2>
          <p class="result-paragraph">${formatList(result.teamResults)}</p>
          <h2 class="result-subheading"> Individual Results </h2>
          <p class="result-paragraph">${formatList(result.individualResults)}</p>
        </div>
      </div>`

  let resultButton = document.getElementById(`result-${i}`);
   resultButton.addEventListener("click", () => {
     if(document.getElementById(`dropdown-${i}`).classList.contains("none")){
       resultButton.querySelector(".big-dot").innerHTML = `<i class="fa-solid fa-caret-up"></i>`
         document.getElementById(`dropdown-${i}`).classList.remove("none");
       
     }else {
       resultButton.querySelector(".big-dot").innerHTML = `<i class="fa-solid fa-caret-down"></i>`;
       document.getElementById(`dropdown-${i}`).classList.add("none");
     }
   })
}




