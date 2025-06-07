flatpickr("#user-date", {
  dateFormat: "Y-m-d",
  defaultDate: "2025-12-25",
  inline: true, // na test
});

const addBtn = document.querySelector("#time-button");
const messageDiv = document.querySelector("#message");
const userTextInput = document.querySelector("#user-text");
const userDateInput = document.querySelector("#user-date");

function lz(i) {
  return `${i}`.padStart(2, "0");
}
function handleEnterSubmit(e) {
  if (e.key === "Enter") {
    addBtn.click();
  }
}

userTextInput.addEventListener("keydown", handleEnterSubmit);

function calculateTime({
  year,
  month,
  day,
  hour = 0,
  minutes = 0,
  seconds = 0,
}) {
  const now = new Date();
  const importantDate = new Date(year, month - 1, day, hour, minutes, seconds);
  const msInDay = 24 * 60 * 60 * 1000;

  const timeLeft = importantDate.getTime() - now.getTime();
  const endTime = timeLeft < 0;

  const eDaysToDate = timeLeft / msInDay;
  const daysToDate = Math.floor(eDaysToDate);
  let daysToDateFix = daysToDate < 1 ? 1 : daysToDate;

  const eHoursToDate = (eDaysToDate % daysToDateFix) * 24;
  const hoursToDate = Math.floor(eHoursToDate);

  const eMinutestDate = (eHoursToDate % hoursToDate) * 60;
  const minutesToDate = Math.floor(eMinutestDate);

  const eSecondsToDate = (eMinutestDate % minutesToDate) * 60;
  const secondsToDate = Math.floor(eSecondsToDate);

  return {
    days: daysToDate,
    hours: hoursToDate,
    minutes: minutesToDate,
    seconds: secondsToDate,
    endTime,
  };
}

addBtn.addEventListener("click", () => {
  const userText = userTextInput.value;
  const userDate = userDateInput.value;

  if (!userDate || !userText) {
    alert("Wpisz odpowiednie dane!!");
    return;
  }

  const div = document.createElement("div");
  div.classList.add("message-title");
  messageDiv.classList.add("show");
  messageDiv.appendChild(div);

  const userDateSplit = userDate.split("-").map(Number);
  const [year, month, day] = userDateSplit;

  function showtimer() {
    const { days, hours, minutes, seconds, endTime } = calculateTime({
      year,
      month,
      day,
    });
    if (!endTime) {
      div.innerHTML = `
      <button class="close-btn">X</button>
			<h3>${userText} </h3>
			<span class="div-span-inline">⏳ Do tej daty pozostało:</span>
			<span class="div-span-timer">
			<span class ="div-span-days">${days} dni </span>
			<span class ="div-span-hours">${hours} h  </span>
			<span class ="div-span-minutes"> ${minutes} minut </span>
			 <span class ="div-span-seconds"> ${lz(seconds)} sekund </span>
				 </span>
			`;

      const closeBtn = div.querySelector(".close-btn");
      closeBtn.addEventListener("click", () => {
        closeBtn.parentElement.remove();

        if (messageDiv.children.length === 0) {
          messageDiv.classList.remove("show");
        }
      });

      setTimeout(showtimer, 1000);
    } else {
      h2.innerHTML = ` ${userText} 🟢 Czas już upłynął.`;
    }
  }

  showtimer(userDate);
  userTextInput.value = "";
  userDateInput.value = "";
});
