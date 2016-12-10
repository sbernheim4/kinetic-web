'use strict';

app.factory('GoToSectionFactory', function($state) {
	return { goToSection: (val, state) => {
			Promise.resolve()
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
					smoothScroll(document.querySelector(val));
				}
			})
			.catch( err => {
				console.error(err);
			});
		}
	};
});
