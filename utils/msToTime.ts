const formatZero = (time: number) => (time < 10 ? `0${time}` : `${time}`);

const formatTime = (time: number) => {
	let calculateTime = time;
	const ms = calculateTime % 1000;
	calculateTime = (calculateTime - ms) / 1000;
	const sec = calculateTime % 60;
	calculateTime = (calculateTime - sec) / 60;
	const minute = calculateTime % 60;
	return `${formatZero(minute)}:${formatZero(sec)}`;
};

export default formatTime;
