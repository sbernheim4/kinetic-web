'use strict';

app.factory('GoToSectionFactory', function($state) {
	return { goToSection: (val, state) => {
		Promise.resolve()
		// .then ( () => {
		// 	// close the nav bar on mobile devices before moving on
		// 	const dropdownOne = document.querySelector('.what-is-kinetic');
		// 	const dropdownTwo = document.querySelector('.get-involved');
		// 	const dropdownThree = document.querySelector('.resources');
		// 	const dropdownFour = document.querySelector('.our-team');
		// 	const menu = document.querySelector('.big-container');
		//
		// 	dropdownOne.classList.remove('display');
		// 	dropdownTwo.classList.remove('display');
		// 	dropdownThree.classList.remove('display');
		// 	dropdownFour.classList.remove('display');
		// 	menu.classList.remove('active');
		// 	menu.classList.remove('big-active');
		// 	console.log('done!');
		// })
		.then( () => {
			if (!state) {
				state = 'home';
			}
			if (!val || val === "null") {
				val = 'main';
			}
			if($state.current.name === state) {
				return;
			} else {
				return $state.go(state);
			}
		})
		.then( () => {
			if(val !== 'null') {
				var el = document.querySelector(val);

				var amt = 0;
				if (window.innerWidth >= 861) {
					// the - 100 is for the height of the nav-bar on desktop view
					var amt = el.getBoundingClientRect().top + window.pageYOffset - 100;
					console.log(amt);
				} else {
					// the - 66 is for the height of the nav-bar on mobile view
					var amt = el.getBoundingClientRect().top + window.pageYOffset;
					console.log("MOBILE ----");
				}
				smoothScroll(amt);
			}
		})
		.catch( err => {
			console.error(err);
		});
	}
};
});
