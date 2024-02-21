window.onload = function()
{
    filloutDatalist();
    document.getElementById("classTimerScheduleSelect").addEventListener('change', (event) => {
        let selected = event.target.options[ event.target.selectedIndex ].value;
        window.location.href = "#" + selected;
        statePeriod();
    });
    setInterval(function() {
        // your code goes here...
        statePeriod();
    }, 1000); // 60 * 1000 milsec
    if ($(location).attr('hash') != undefined) {
        $('#classTimerScheduleSelect').val($(location).attr('hash'));
    }
}

function statePeriod()
{
    const s = document.getElementById('s');
    const dataselect = document.getElementById("classTimerScheduleSelect");
    let selected = dataselect.options[ dataselect.selectedIndex ].value;
    //s.innerText += selected;
    schedule = Schedules.schedules[selected];
    filloutSchedule(schedule);
    const rn = getCurrent();
    const tp = getPeriod(rn, schedule);
    if (tp[0] === "P") {
        document.getElementById(`classScheduleRow_${tp}`).classList.add("passing-after");
    } else {
        document.getElementById(`classScheduleRow_${tp}`).classList.add("current-period");
    }
    const time_remains = getTimeRemaining(tp, rn, schedule);
    document.getElementById(`classScheduleTimeRe_${tp}`).innerText = time_remains;
    //s.innerText += tp;
}

function filloutDatalist()
{
    const datalist = document.getElementById('classTimerScheduleSelect');
    for (const key of Object.keys(Schedules.mappings)) {
        let optgroup = document.createElement('optgroup');
        optgroup.label = Schedules.mappings[key][0];
        for (const subkey of Object.keys(Schedules.mappings[key][1])) {
            const val = Schedules.mappings[key][1][subkey];
            let optionDiv = document.createElement('option');
            optionDiv.value = subkey;
            optionDiv.innerText = val;
            optgroup.append(optionDiv);
        }
        datalist.append(document.createElement('hr'))
        datalist.append(optgroup);
    }
}

function filloutSchedule(schedule) 
{
    const listBody = document.getElementById('classTimerList');
    listBody.innerHTML = '';
    let i = 0;
    const headers = ["Period","Start","End","Next"];
    let rowHeader = document.createElement('tr');
    for (const thn of headers)
    {
        let head = document.createElement('th');
        head.innerText = thn;
        rowHeader.append(head);
    }
    listBody.append(rowHeader);
    for (const rowS of schedule)
    {
        let rowD = document.createElement('tr');
        rowD.id = `classScheduleRow_${i}`;

        let name = document.createElement('td');
        name.innerText = rowS[0];
        let start = document.createElement('td');
        let end = document.createElement('td');
        let timeRemaining = document.createElement('td');
        timeRemaining.id = `classScheduleTimeRe_${i}`;
        //classTimerMilitaryFormatCheck
        if (document.getElementById("classTimerMilitaryFormatCheck").checked)
        {
            start.innerText = rowS[1].toString();
            end.innerText = rowS[2].toString();
        }
        else
        {
            start.innerText = reverseMilitaryTimeToStandard(rowS[1].toString());
            end.innerText = reverseMilitaryTimeToStandard(rowS[2].toString());
        }

        rowD.append(name); rowD.append(start); rowD.append(end); rowD.append(timeRemaining);
        listBody.append(rowD);
        i++;
    }
}

function getPeriod(currentTime, scheduleP)
{
    const s = document.getElementById('s');
    const schedule = scheduleP.slice().reverse();
    let i = schedule.length - 1;
    for (const rowS of schedule) {
        //s.innerHTML += `<br>rowS ${rowS}`;
        if (currentTime >= rowS[1]) {
            if (currentTime <= rowS[2]) {
                return i;
            } else {
                return "P" + i;
            }
        }
        i-=1;
    }
    return "idk lol";
}

function getCurrent()
{
    const now = new Date();
    const hours = now.getHours() * 100;
    const minutes = now.getMinutes();
    const formattedTime = hours + minutes;
    return formattedTime;
}

function getTimeRemaining(period, now, schedule)
{
    timedif = militaryTimeDifference(now, schedule[period][2]);
    //const end = schedule[period][2];
    //endMins = (Math.floor(end/100) * 60) + parseInt(end);
    let mins;
    if (timedif.minutes < 10) {
        mins = `0${timedif.minutes}`;
    } else {
        mins = `${timedif.minutes}`;
    }
    let hours;
    if (timedif.hours < 10) {
        hours = `0${timedif.hours}`;
    } else {
        hours = `${timedif.hours}`;
    }

    return `${hours}:${mins}`;
}

function reverseMilitaryTimeToStandard(militaryTime)
{
    // Input validation (improved)
    if ((!militaryTime || militaryTime.length < 2 || !/^\d+$/.test(militaryTime)) && militaryTime !== "0") {
        return "Invalid military time format. Please use at least two digits (e.g., 00, 812, or 1459).";
    }

    // Handle leading zero case for midnight
    if (militaryTime.length === 2 && militaryTime[0] === "0") {
        return `12:${militaryTime[1].toString().padStart(2, "0")} AM`;
    }

    if (militaryTime.length === 1 && militaryTime === "0") {
        return "12:00 AM";
    }
    
    // If input is three digits, add a leading zero
    if (militaryTime.length === 3) {
        militaryTime = "0" + militaryTime;
    }
  
    const hoursString = militaryTime.slice(0, 2);
    const minutes = parseInt(militaryTime.slice(2));
  
    // Handle midnight cases
    if (hoursString === "00") {
      return `12:${minutes.toString().padStart(2, "0")} AM`;
    } else if (hoursString === "12") {
      return `12:${minutes.toString().padStart(2, "0")} PM`;
    }
  
    // Convert to 12-hour format and add AM/PM indicator
    const hours = parseInt(hoursString);
    const period = hours >= 12 ? "PM" : "AM";
    const convertedHours = hours % 12 || 12; // Handle hours 0 and 24
  
    // Add leading zero if needed
    const formattedHours = convertedHours.toString().padStart(2, "0");
  
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

function militaryTimeDifference(time1, time2) {
    // Convert military time integers to hours and minutes
    const hours1 = Math.floor(time1 / 100);
    const minutes1 = time1 % 100;
    
    const hours2 = Math.floor(time2 / 100);
    const minutes2 = time2 % 100;

    // Convert hours and minutes to total minutes
    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;

    // Find the absolute difference in minutes
    const differenceMinutes = Math.abs(totalMinutes2 - totalMinutes1);

    // Convert the difference in minutes back to hours and minutes
    const hoursDifference = Math.floor(differenceMinutes / 60);
    const minutesDifference = differenceMinutes % 60;

    // Return the time difference as an object
    return {
        hours: hoursDifference,
        minutes: minutesDifference
    };
}

// ### FUNCTIONS FOR SEPERATE WINDOW ###
function makeDetach() {
    const newWindow = window.open('classtimer.html', 'NewWindow', 'width=300,height=350');
}