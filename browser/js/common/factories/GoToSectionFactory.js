'use strict';

app.factory('GoToSectionFactory', function($state) {
	return {
		goToSection: (val, state) => {
			Promise.resolve()
			.then( () => {
				if (!state) {
					state = 'home';
				}
				if($state.current.name === state) {
					return;
				} else {
					return $state.go(state);
				}
			})
			.then( () => {
				if(val !== 'null') {
					smoothScroll(document.querySelector(val));
				}
			})
			.catch( err => {
				if(typeof trackJs !== 'undefined') {
					trackJs.track(err);
				}
				console.error(err);
			});
		}
	};
});
