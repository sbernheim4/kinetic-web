'use strict';

app.factory('GoToSectionFactory', function($state) {
	return { goToSection: (val, state) => {
		Promise.resolve()
		 .then ( () => {
			 // close the nav bar on mobile devices before moving on
			 const dropdownOne = document.querySelector('.what-is-kinetic');
			 const dropdownTwo = document.querySelector('.get-involved');
			 const dropdownThree = document.querySelector('.resources');
			 const dropdownFour = document.querySelector('.our-team');
			 const mobileNav = document.querySelector('.big-container');

			 const menus = [dropdownOne, dropdownTwo, dropdownThree, dropdownFour];

			 menus.map(menu => {
				 menu.classList.remove('display');
			 })

			 mobileNav.classList.remove('active');
			 mobileNav.classList.remove('big-active');
		 })
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
				const el = document.querySelector(val);

				var amt = 0;

				if (window.innerWidth >= 861) {
					const navbar = document.querySelector('.container');
					const navbarHeight = navbar.getBoundingClientRect().height;
					amt = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
				} else {
					const navbar = document.querySelector('.big-container');
					const navbarHeight = navbar.getBoundingClientRect().height;
					amt = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
				}
				smoothScroll(amt);
			}
		})
		.catch( err => {
			console.error(err);
		});
	}}
});
