define([
	'backbone',
	'helpers',
    'collections/slides',
    'views/slides'
	], function(Backbone, Helpers, SlidesCollections, SlidesView) {

	var PresentationView = Backbone.View.extend({
		initialize: function() {
		},

		className: 'presentation',

		render: function() {
			this.$el.append('<h1>' + this.model.get('name') + '</h1>');
			this.$el.append('<p class="author"> Автор: ' + this.model.get('author') + '</p>');
			this.$el.append('<img src="'+ this.model.get('image') +'">');
			return this;
		},

		renderSlides: function() {
            var slidesView = new SlidesView({
                id: this.presentationIndex,
                collection: new SlidesCollections( presentation.toJSON().slides )
            }); 

            $('body').prepend( slidesView.el );			
		}
	});

	return PresentationView;
});