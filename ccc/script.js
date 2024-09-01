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
  // {
  //   date: new Date(2024, 7, 28),
  //   message: "First meeting is today"
  // },
  
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




