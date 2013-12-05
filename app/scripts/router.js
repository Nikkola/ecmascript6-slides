define(['backbone'], function(Backbone) {
	var MainRouter = Backbone.Router.extend({
		initialize: function() {
		},

		routes: {
			''                                                         : 'home',
			'presentation(/)'                                          : 'home',
			'presentation/:presentationIndex/slides/:slideIndex(/)'    : 'showSlide' ,
			'presentation/:id(/)'                                      : 'showPresentation'
		},

		home: function() {
			App.Vent.trigger('init');
		},

		showPresentation: function(presentationIndex) {
			App.Vent.trigger('changePresentation', {
				presentationIndex: presentationIndex,
				direction: 'next'	
			});			
		},

		showSlide: function(presentationIndex, slideIndex) {
			var presentationIndex = window.location.hash.split('/')[1];

			App.Vent.trigger('renderSlide', {id: presentationIndex});


			App.Vent.trigger('changeSlide', {
				slideIndex: slideIndex,
				direction: 'next'	
			});		


		}
	});

	return MainRouter;
});