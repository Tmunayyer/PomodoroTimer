
$(document).ready(function() {

	let date = new Date();
	let seconds = 0;
	let min = 0;
	let totalMin = 0;
	let totalHour = 0;
	let interval = 0;
	const $clock = document.getElementById('clock');
	const $timer = document.getElementById('timer');
	const $total = document.getElementById('total');
	const $interval = document.getElementById('interval');
	const $longbreak = document.getElementById('longbreak');

	const myState = {
		work: true,
		break: false,
		timerLength: 25,
	}

	//Fill in Page on Load
	$clock.innerHTML = 'Time: ' + date.toTimeString().slice(0, 9);
	$timer.innerHTML = '00:00';
	$total.innerHTML = 'Total Time: 00:00:00';
	$interval.innerHTML = 'Elapsed Intervals: 0';

	//Navbar Clock Interval
	setInterval(() => {
		$clock.innerHTML = 'Time: ' + new Date().toTimeString().slice(0, 9);
	}, 1000)

	//Interval Handlers & Interval Pointer
	var myInterval;

	$('button#start').on('click', function() {
		myInterval = setInterval(handleElapsedTime, 1000);
	})
	$('button#stop').on('click', function() {
		clearInterval(myInterval)
	})


	//Timer Functionality
	function handleElapsedTime() {
		let stringSec = seconds.toString().padStart(2, '0');
		let stringMin = min.toString().padStart(2, '0');
		let stringTotalMin = totalMin.toString().padStart(2, '0');
		let stringTotalHour = totalHour.toString().padStart(2, '0');
		
		seconds += 1;

		//Count Minutes
		if(seconds === 60) {
			seconds = 0;
			min += 1;

			totalMin += 1;
			if(totalMin === 60) {
				totalHour += 1;
				totalMin = 0;
			}
		}

		//Handle Timer Length & Indicators
		if(myState.work) {
			myState.timerLength = 25;
			$('p.work').css('font-weight', 'bold');
			$('p.break').css('font-weight', 'normal');
			$('p#longbreak').hide();
		} else if (myState.break) {
			if(interval > 3) {
				myState.timerLength = 20;
				$longbreak.innerHTML = 'Take a 20 Minute Break!'
				interval = 0;
			} else {
				myState.timerLength = 5;
			}
			$('p.break').css('font-weight', 'bold');
			$('p.work').css('font-weight', 'normal');
		}

		//Timer Length Reached, Reset, Do Opposite
		if(min === myState.timerLength) {
			min = 0;
			myState.work = !myState.work;
			myState.break = !myState.break;
			interval += 1
		}

		//Update Timer
		$total.innerHTML = 'Total Time: ' + stringTotalHour + ':' + stringTotalMin + ':' + stringSec;
		$timer.innerHTML = stringMin + ':' + stringSec;
		$interval.innerHTML = 'Elapsed Intervals: ' + interval;

	}

	//===================
	//====PAGE HANDLER===
	//===================
	const $homeButton = $('li#home');
	const $aboutButton = $('li#about');

	const $homePage = $('div.homepage');
	const $aboutPage = $('div.aboutpage');

	$homeButton.on('click', function() {
		$homePage.show();
		$aboutPage.hide();
	})

	$aboutButton.on('click', function() {
		$homePage.hide();
		$aboutPage.show();
	})


})



			