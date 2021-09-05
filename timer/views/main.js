// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};

var TIME_LIMIT = 1200;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
var timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
document.getElementById("base-timer-label").innerHTML = formatTime(
    timeLeft
);
document.getElementById("button2").disabled = true;

function onTimesUp() {
    clearInterval(timerInterval);
}

function startTimer() {
    document.getElementById("time").disabled = true;
    document.getElementById("button1").disabled = true;
    document.getElementById("button2").disabled = false;
    let givenTime = document.getElementById("time").value
    console.log("Given time is " + givenTime)
    if (givenTime != 0) {
        TIME_LIMIT = givenTime * 60
    }
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft
        );
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();
        }
    }, 1000);
    console.log("time interval: " + timerInterval)
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}

function setStopTimer() {
    if (document.querySelector('#button2').textContent == 'Reset') {
        console.log("This is " + document.querySelector('#button2').textContent);
        document.querySelector('#button1').textContent = 'Start';
        document.querySelector('#button2').textContent = 'Stop';
        document.getElementById("button1").disabled = false;
        document.getElementById("button2").disabled = true;
        document.getElementById("time").disabled = false;
        TIME_LIMIT = 1200
        document.getElementById("base-timer-label").innerHTML = formatTime(
            TIME_LIMIT
        );
        return;
    }
    console.log("This is " + document.querySelector('#button2').textContent);
    clearInterval(timerInterval)
    document.getElementById("button1").disabled = false;
    document.querySelector('#button1').textContent = 'Resume';
    document.querySelector('#button2').textContent = 'Reset';
}

function setTimer() {
    document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
    );
}
//${remainingPathColor}