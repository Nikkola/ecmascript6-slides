define(['backbone', 'models/presentation'], function(Backbone, PresentationModel) {
	var Presentations = Backbone.Collection.extend({
		model: PresentationModel
	});

	return Presentations;
});