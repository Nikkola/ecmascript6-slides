define(['backbone'], function(Backbone) {

	var Presentation = Backbone.Model.extend({
		defaults: {
			name: 'Имя презентации',
			slides: []
		}
	});

	return Presentation;
});

