const periodNames = {
    1: {
        name: "Math 218",
        room: "White Lecture Hall 107"
    },
    2: {
        name: "Math 218 Discussion",
        room: "Physics 154"
    },
    3: {
        name: "CS 201",
        room: "Physics 128"
    },
    4: {
        name: "CS 201 Discussion",
        room: "French Science 2237"
    },
    5: {
        name: "Physics 152",
        room: "Physics 128"
    },
    6: {
        name: "Physics 152 Lab",
        room: "Physics 147"
    },
    7: {
        name: "Physics 152 Discussion",
        room: "Physics 150"
    },
    8: {
        name: "EGR 101",
        room: "Gross Hall 0050"
    },
    9: {
        name: "EGR 101 Lab",
        room: "Gross Hall 0050"
    }
};

const mondaySchedule = [
    {
        period: 1, // MATH 218D-2 LEC
        start: { hours: 8, minutes: 45 },
        end: { hours: 9, minutes: 35 }
    },
    {
        period: 5, // PHYSICS 152L LEC
        start: { hours: 10, minutes: 5 },
        end: { hours: 11, minutes: 20 }
    },
    {
        period: 7, // PHYSICS 152L9D DIS
        start: { hours: 15, minutes: 45 },
        end: { hours: 17, minutes: 45 }
    }
];

const tuesdaySchedule = [
    {
        period: 8, // EGR 101L LEC
        start: { hours: 8, minutes: 30 },
        end: { hours: 11, minutes: 10 }
    },
    {
        period: 3, // COMPSCI 201 LEC
        start: { hours: 11, minutes: 45 },
        end: { hours: 13, minutes: 0 }
    },
    {
        period: 6, // PHYSICS 152L9 LAB
        start: { hours: 13, minutes: 30 },
        end: { hours: 15, minutes: 30 }
    }
];

const wednesdaySchedule = [
    {
        period: 1, // MATH 218D-2 LEC
        start: { hours: 8, minutes: 45 },
        end: { hours: 9, minutes: 35 }
    },
    {
        period: 5, // PHYSICS 152L LEC
        start: { hours: 10, minutes: 5 },
        end: { hours: 11, minutes: 20 }
    }
];

const thursdaySchedule = [
    {
        period: 9, // EGR 101L LAB
        start: { hours: 8, minutes: 30 },
        end: { hours: 11, minutes: 10 }
    },
    {
        period: 3, // COMPSCI 201 LEC
        start: { hours: 11, minutes: 45 },
        end: { hours: 13, minutes: 0 }
    },
    {
        period: 2, // MATH 218D-2 DIS
        start: { hours: 13, minutes: 25 },
        end: { hours: 14, minutes: 40 }
    }
];

const fridaySchedule = [
    {
        period: 1, // MATH 218D-2 LEC
        start: { hours: 8, minutes: 45 },
        end: { hours: 9, minutes: 35 }
    },
    {
        period: 5, // PHYSICS 152L LEC
        start: { hours: 10, minutes: 5 },
        end: { hours: 11, minutes: 20 }
    },
    {
        period: 4, // COMPSCI 201 DIS
        start: { hours: 11, minutes: 45 },
        end: { hours: 13, minutes: 0 }
    }
];
const schedule = [{
        school: false
    },{
        school:true,
        periods: mondaySchedule
    },{
    school:true,
    periods: tuesdaySchedule
    },{
        school: true,
        periods:wednesdaySchedule
    },
    {
    school:true,
    periods: thursdaySchedule
},{
        school:true,
        periods: fridaySchedule
        },
    {
        school: false
    }

] 
function doStuff(){
var today = new Date(); //new Date(2023, 4, 18, 12, 30, 40); 
 

var currentPeriod = {period: null};
var todayWeek = today.getDay();
var update = document.querySelector(".update");
var end = document.querySelector(".ends");
var time = document.getElementById("time");
var monthIcon = document.querySelector(".red-top");
var dayIcon = document.querySelector(".date-num")
var next = document.querySelector(".next");

var tommorowtable = document.getElementById("tommorow");
var todaytable = document.getElementById("today");

if(todaytable == null && schedule[todayWeek%7].school!= false){
    var div = document.createElement("div");
    div.innerHTML =    `
    <h1>Today's Schedule</h1>
    <button id="hide-today" class="hide">˅ Hide</button>
    <table id="today">
    
    </table>`
    div.classList.add("container");
    document.getElementById("tables").appendChild(div);
    var todaytable = document.getElementById("today");
}

function convertTime(time){
    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), time.hours, time.minutes);
}

 
if(today.toLocaleString('default', { month: 'long' }).length > 5){
    monthIcon.textContent = today.toLocaleString('default', { month: 'long' }).slice(0, 3).toUpperCase();
}else{
    monthIcon.textContent = today.toLocaleString('default', { month: 'long' });
}
let TodaySchedule = schedule[todayWeek].periods
TommorowSchedule = schedule[(todayWeek + 1)%7].periods;

dayIcon.textContent = today.getDate();
time.textContent =   moment(today).format("h:mm");

if(schedule[todayWeek%7].school== false){
    if(todaytable.classList.contains("no-school") == false){
        var todayparent = todaytable.parentElement;
        todayparent.removeChild(todaytable);
        var h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode("No School Today"))
        todayparent.appendChild(h2)
        todaytable = h2;
        update.innerHTML = "No School Today";
        end.style.display = "none";
        next.innerHTML = "";
        h2.id = "today";
        h2.classList.add("no-school")
    }


}else{

if(today.getTime() > convertTime(TodaySchedule[TodaySchedule.length - 1].end).getTime()){
    update.innerHTML = "School is over "
    end.innerHTML = "";
    next.innerHTML = "";
    if(todaytable != null){
        todaytable.parentElement.parentElement.removeChild(todaytable.parentElement);
    }
}else if(today.getTime() < convertTime(TodaySchedule[0].start).getTime()){
    update.innerHTML = `School has not started yet. First class is ${periodNames[TodaySchedule[0].period].name} at ${periodNames[TodaySchedule[0].period].room}.`
    if(Math.round((convertTime(TodaySchedule[0].start).getTime() - today.getTime()) < 1)){
        end.innerHTML = `Starts in <span style='color: red;'>${Math.round((convertTime(TodaySchedule[0].start).getTime() - today.getTime())/1000)}</span> seconds  at ${moment(convertTime(TodaySchedule[0].start)).format("h:mm")}`
    }else if(Math.round((convertTime(TodaySchedule[0].start).getTime() - today.getTime())) == 1){
        end.innerHTML = `Starts in <span style='color: red;'>1</span> minute  at ${moment(convertTime(TodaySchedule[0].start).getTime()).format("h:mm")}`
    }else{
        end.innerHTML = `Starts in ${(Math.round((convertTime(TodaySchedule[0].start).getTime() - today.getTime())/60000))} minutes  at ${moment(convertTime(TodaySchedule[0].start)).format("h:mm")}`
    }
    next.innerHTML = "";
}else{
    for (let index = 0; index < TodaySchedule.length; index++) {
        const period = TodaySchedule[index];
        if((convertTime(period.start).getTime() < today.getTime()) && (today.getTime()< convertTime(period.end).getTime())){
            currentPeriod = {
                period: period.period,
                passing: false
            }
            update.innerHTML = `You should be at ${periodNames[period.period].room}, ${periodNames[period.period].name}`;
            if(((convertTime(period.end).getTime() - today.getTime())/60000) < 1){
                end.innerHTML = `Ends in <span style='color: red;'>${Math.round((convertTime(period.end).getTime() - today.getTime())/1000)}</span> seconds at ${moment(convertTime(period.end)).format("h:mm")}`;
            }else if(((convertTime(period.end).getTime() - today.getTime())/60000)== 1){
                end.innerHTML = `Ends in <span style='color: red;'>1</span> minute at ${moment(convertTime(period.end)).format("h:mm")}`;
            }else{
                end.innerHTML = `Ends in ${Math.round((convertTime(period.end).getTime() - today.getTime())/60000)} minutes at ${moment(convertTime(period.end)).format("h:mm")}`
            }
            
            if(index+1 == TodaySchedule.length){
                next.innerHTML = "Last Class!"
            }else{
                next.innerHTML = "Next Class: " + periodNames[TodaySchedule[index+1].period].name + " at " + periodNames[TodaySchedule[index+1].period].room ;
            }
            break;
        }else{

            if(today.getTime() <= convertTime(period.start).getTime()){
                currentPeriod = {
                    period: period.period,
                    passing: true
                }
                update.innerHTML = `Passing Time. Go to ${periodNames[period.period].name} at ${periodNames[period.period].room}. `;
                if((convertTime(period.start).getTime() - today.getTime())/60000 < 1){
                    end.innerHTML = `Ends in <span style='color: red;'>${Math.round((convertTime(period.start).getTime() - today.getTime())/1000)}</span> seconds at ${moment(convertTime(period.start)).format("h:mm")}`;
                }else{
                    end.innerHTML = `Ends in ${Math.round((convertTime(period.start).getTime() - today.getTime())/60000)} minutes at ${moment(convertTime(period.start)).format("h:mm")}`
                }
                next.innerHTML = "";
                break;
            
        }
    }
}
    
       


}
if(today.getTime() < convertTime(TodaySchedule[TodaySchedule.length - 1].end).getTime()){
    todaytable.innerHTML = `
    <tr id="table-header"> 
    <th>Class</th>
    <th>Time</th>
    <th>Room</th>
    </tr>
    `;
    TodaySchedule.forEach(period => {
        var mytimestart = period.start;
        var mytimeend = period.end;
        todaytable.innerHTML += `                <tr style="${period.period == currentPeriod.period? (currentPeriod.passing == true? "border-top: 2px solid yellow;":"background-color: yellow;"):""}">
        <td class="name">${periodNames[period.period].name}</td>
        <td class="time">${moment(mytimestart).format("h:mm") + "-" + moment(mytimeend).format("h:mm")}</td>
        <td class="toom">${periodNames[period.period].room}</td>
    </tr>`
    })
}
}
if(schedule[(todayWeek + 1)%7].school == false){
    var tommorow = document.getElementById("tommorow");
    var tommorowparent = tommorow.parentElement;
    tommorowparent.removeChild(tommorow);
    var h2 = document.createElement("h2");
    h2.classList.add("no-school")
    h2.appendChild(document.createTextNode("No School Tommorow"))
    h2.id = "tommorow";
    tommorowtable = h2;
    tommorowparent.appendChild(h2)
    
}else{
    tommorowtable.innerHTML = `
    <tr id="table-header"> 
    <th>Class</th>
    <th>Time</th>
    <th>Room</th>
    </tr>
    `;
    TommorowSchedule.forEach(period => {
        var mytimestart = period.start;
        var mytimeend = period.end;
        tommorowtable.innerHTML += `
        <tr>
        <td class="name">${periodNames[period.period].name}</td>
        <td class="time">${moment(mytimestart).format("h:mm") + "-" + moment(mytimeend).format("h:mm")}</td>
        <td class="toom">${periodNames[period.period].room}</td>
    </tr>`
    })
}
}
doStuff();
setInterval(doStuff,1000)