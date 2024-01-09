let shiftDetails = [
    {
        shiftName: "A",
        shiftIntime: "06:00",
        shiftOuttime: "14:00"
    },
    {
        shiftName: "B",
        shiftIntime: "14:00",
        shiftOuttime: "22:00"
    },
    {
        shiftName: "C",
        shiftIntime: "22:00",
        shiftOuttime: "06:00"
    }
];

function getCurrentShiftInfo(currentTime) {
    const [currentHours, currentMinutes] = currentTime.split(":").map(Number);

    for (const shift of shiftDetails) {
        const shiftIntime = shift.shiftIntime.split(":").map(Number);
        const shiftOuttime = shift.shiftOuttime.split(":").map(Number);

        if (
            (currentHours > shiftIntime[0] || (currentHours === shiftIntime[0] && currentMinutes >= shiftIntime[1])) &&
            (currentHours < shiftOuttime[0] || (currentHours === shiftOuttime[0] && currentMinutes < shiftOuttime[1]))
        ) {
            const remainingMinutes = (shiftOuttime[0] * 60 + shiftOuttime[1]) - (currentHours * 60 + currentMinutes);
            const shiftStartTime = `${shiftIntime[0]}:${shiftIntime[1]}`;
            
            return {
                currentShift: shift.shiftName,
                timeRemaining: remainingMinutes,
                shiftStartTime: shiftStartTime
            };
        }
    }

    return {
        currentShift: "No shift found",
        timeRemaining: 0,
        shiftStartTime: "N/A"
    };
}

const currentTime = new Date();
const currentHours = currentTime.getHours();
const currentMinutes = currentTime.getMinutes();
const currentSeconds = currentTime.getSeconds();
const formattedCurrentTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;

console.log(`Current Time: ${formattedCurrentTime}`);

const shiftInfo = getCurrentShiftInfo(formattedCurrentTime);
console.log(`Current Shift: ${shiftInfo.currentShift}`);
console.log(`Time Remaining for Next Shift: ${shiftInfo.timeRemaining} minutes`);

// Calculate time elapsed since the shift started
if (shiftInfo.currentShift !== "No shift found") {
    const elapsedMinutes = getTimeSinceShiftStarted(shiftInfo.shiftStartTime, formattedCurrentTime);
    console.log(`Time Elapsed Since Shift Started: ${elapsedMinutes} minutes`);
} else {
    console.log("No shift found. Unable to calculate elapsed time.");
}

function getTimeSinceShiftStarted(shiftStartTime, currentTime) {
    const [startHours, startMinutes] = shiftStartTime.split(":").map(Number);
    const [currentHours, currentMinutes] = currentTime.split(":").map(Number);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    const elapsedMinutes = currentTotalMinutes - startTotalMinutes;
    return elapsedMinutes;
}


// let shiftDetails = [
//     {
//         shiftName: "A",
//         shiftIntime: "06:00",
//         shiftOuttime: "14:00"
//     },
//     {
//         shiftName: "B",
//         shiftIntime: "14:00",
//         shiftOuttime: "22:00"
//     },
//     {
//         shiftName: "C",
//         shiftIntime: "22:00",
//         shiftOuttime: "06:00"
//     }
// ];

// function getCurrentShiftInfo(currentTime) {
    
//     const [currentHours, currentMinutes] = currentTime.split(":").map(Number);

    
//     for (const shift of shiftDetails) {
//         const shiftIntime = shift.shiftIntime.split(":").map(Number);
//         const shiftOuttime = shift.shiftOuttime.split(":").map(Number);

        
//         if (
//             (currentHours > shiftIntime[0] || (currentHours === shiftIntime[0] && currentMinutes >= shiftIntime[1])) &&
//             (currentHours < shiftOuttime[0] || (currentHours === shiftOuttime[0] && currentMinutes < shiftOuttime[1]))
//         ) {
            
//             const remainingMinutes = (shiftOuttime[0] * 60 + shiftOuttime[1]) - (currentHours * 60 + currentMinutes);

//             return {
//                 currentShift: shift.shiftName,
//                 timeRemaining: remainingMinutes
//             };
//         }
//     }

//     return {
//         currentShift: "No shift found",
//         timeRemaining: 0
//     };
// }


// const currentTime = new Date();


// const currentHours = currentTime.getHours();
// const currentMinutes = currentTime.getMinutes();
// const currentSeconds = currentTime.getSeconds();


// const formattedCurrentTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;

// console.log(`Current Time: ${formattedCurrentTime}`);

// const shiftInfo = getCurrentShiftInfo(formattedCurrentTime);

// console.log(`Current Shift: ${shiftInfo.currentShift}`);
// console.log(`Time Remaining for Next Shift: ${shiftInfo.timeRemaining} minutes`);



// function getCurrentShiftStartTime(currentTime, shiftDuration) {
//     const [currentHours, currentMinutes] = currentTime.split(":").map(Number);
//     const totalCurrentMinutes = currentHours * 60 + currentMinutes;
//     // Calculate the start time in minutes
//     const startMinutes = totalCurrentMinutes - shiftDuration;
//     // Convert the start time back to hours and minutes
//     const startHours = Math.floor(startMinutes / 60);
//     const startMinutesPart = startMinutes % 60;
//     // Format the result
//     const startTime = `${String(startHours).padStart(2, '0')}:${String(startMinutesPart).padStart(2, '0')}`;
//     return startTime;
// }
// function getTimeSinceShiftStarted(shiftStartTime, currentTime) {
//     const [startHours, startMinutes] = shiftStartTime.split(":").map(Number);
//     const [currentHours, currentMinutes] = currentTime.split(":").map(Number);
//     const startTotalMinutes = startHours * 60 + startMinutes;
//     const currentTotalMinutes = currentHours * 60 + currentMinutes;
//     const elapsedMinutes = currentTotalMinutes - startTotalMinutes;
//     // Convert the elapsed time back to hours and minutes
//     const elapsedHours = Math.floor(elapsedMinutes / 60);
//     const elapsedMinutesPart = elapsedMinutes % 60;
//     // Format the result
//     const elapsedTime = `${String(elapsedHours).padStart(2, '0')}:${String(elapsedMinutesPart).padStart(2, '0')}`;
//     return elapsedTime;
// }
// if (shiftInfo.currentShift !== "No shift found") {
//     // Obtain the start time using getCurrentShiftStartTime
//     const startTime = getCurrentShiftStartTime(formattedCurrentTime, shiftInfo.timeRemaining);
//     console.log(`Current Shift Started at: ${startTime}`);
//     // Calculate the total time since the shift started
//     const totalTimeSinceShiftStarted = getTimeSinceShiftStarted(startTime, formattedCurrentTime);
//     console.log(`Total Time Since Shift Started: ${totalTimeSinceShiftStarted}`);
// } else {
//     console.log("No shift found. Unable to calculate total time since the shift started.");
// }
// const startTime = getCurrentShiftStartTime(formattedCurrentTime, shiftInfo.timeRemaining);
// console.log(`Current Shift Started at: ${startTime}`);
// // Calculate the elapsed time since the shift started
// const elapsedTime = getTimeSinceShiftStarted(startTime, formattedCurrentTime);
// console.log(`Time Since Shift Started: ${elapsedTime}`);