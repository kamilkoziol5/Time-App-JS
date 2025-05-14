const addBtn = document.querySelector('#time-button');
const messageDiv = document.querySelector('#message');
const userTextInput = document.querySelector('#user-text');
const userDateInput = document.querySelector('#user-date');

function lz(i) {
	return `${i}`.padStart(2, '0');
}
function handleEnterSubmit(e) {
	if (e.key === 'Enter') {
		addBtn.click();
	}
}

userTextInput.addEventListener('keydown', handleEnterSubmit);

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

addBtn.addEventListener('click', () => {
	const userText = userTextInput.value;
	const userDate = userDateInput.value;

	if (!userDate || !userText) {
		alert('Wpisz odpowiednie dane!!');
		return;
	}

	const h2 = document.createElement('h2');
	h2.classList.add('message-title');
	const span = document.createElement('span');
	messageDiv.classList.add('show');
	messageDiv.appendChild(h2);
	h2.appendChild(span);

	// Parsowanie Daty!!
	const userDateSplit = userDate.split('-').map(Number);
	const [year, month, day] = userDateSplit;

	function showtimer() {
		const { days, hours, minutes, seconds, endTime } = calculateTime({
			year,
			month,
			day,
		});
		if (!endTime) {
			h2.innerHTML = `
			${userText} 
			<span class="h2-span-inline">⏳ Do tej daty pozostało:</span>
			<span class="h2-span-timer">
			<span class ="h2-span-days">${days} dni </span>
			<span class ="h2-span-hours">${hours} h  </span>
			<span class ="h2-span-minutes"> ${minutes} minut </span>
			 <span class ="h2-span-seconds"> ${lz(seconds)} sekund </span>
				 </span>
			`;
			setTimeout(showtimer, 1000);
		} else {
			h2.innerHTML = ` ${userText} 🟢 Czas już upłynął.`;
		}
	}

	showtimer(userDate);
	userTextInput.value = '';
	userDateInput.value = '';
});
