define(['backbone'], function(Backbone) {

	var Slide = Backbone.Model.extend({
		defaults: {
			type: 'note',
			title: ''
		},

		initialize: function() {
			this.setFontSize();
		},
		
		setFontSize: function() {
			var length = this.get('title').length;

			if ( length >= 100 ) {
				size = 'x-large';
			} else if ( length >= 50 ) {
				size = 'large';
			} else {
				size = 'normal';
			}

			this.set('size', size);
		}
	});

	return Slide;
});

