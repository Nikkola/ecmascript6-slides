define([
	'backbone', 
	'views/presentation'
	], function(Backbone,  PresentationView) {

	var PresentationsView = Backbone.View.extend({
		initialize: function() {
			this.currentPresentationIndex = 1;
			this.transitionSpeed = 400;
			this.numPresentations = this.collection.length;

			this.renderAll();

			App.Vent.on('init', this.hideAllButFirst, this);
			App.Vent.on('changePresentation', this.changePresentation, this);

		},

		//метод вызываемый при закрытии вида - отключает все pub/sub
	 	onClose: function(){
			App.Vent.off('init', this.hideAllButFirst, this);
			App.Vent.off('changePresentation', this.changePresentation, this);
	  	},

		className: 'presentations',

		hideAllButFirst: function() {
			this.$el.children(':nth-child(n+2)').hide();
		},

		changePresentation: function(opts) {
			var newPresentation,
				that = this,
				presentations = this.$el.children();

			this.setCurrentPresentationIndex(opts);	

			newPresentation = this.getNextPresentation(presentations);

			this.animateToNewPresentation(presentations, newPresentation, opts.direction);


			if ( opts.slideIndex ) {
				App.router.navigate('/presentation/' + this.currentPresentationIndex + '/slides/' + ~~opts.slideIndex);
			} else {
				App.router.navigate('/presentation/' + this.currentPresentationIndex);
			}

		},


		setCurrentPresentationIndex: function(opts) {
			// Если запрашивается особенная презентация, 
			// то ставим полученный индекс
			if ( opts.presentationIndex ) {
				return this.currentPresentationIndex = ~~opts.presentationIndex;
			}
			
			//в другом случае просто пролистай на один вперед или назад
			this.currentPresentationIndex += opts.direction === 'next' ? 1 : -1;

			if ( this.currentPresentationIndex > this.numPresentations ) {
				//назад к первому слайду
				this.currentPresentationIndex = 1;
			}

			if ( this.currentPresentationIndex <= 0 ) {
				//вперед к последнему слайду
				this.currentPresentationIndex = this.numPresentations;
			}

		},

		getNextPresentation: function(presentations) {
			return presentations.eq( this.currentPresentationIndex - 1 );
		},

		animateToNewPresentation: function(presentations, newPresentation, direction) {
			var that = this;

			presentations.filter(':visible')
				.animate({
					top: direction === 'next' ? '100%' : '-100%',
					opacity: 'hide'
				}, this.transitionSpeed, function() {
					$(this).css('top', 0);

					newPresentation
						.css('top', direction === 'next' ? '-100%' : '100%')
						.animate({
							top: 0,
							opacity: 'show',
						}, that.thansitionSpeed);
				});
		},

		renderAll: function() {
			this.$el.empty();
			this.collection.each(this.render, this);
		},

		render: function(presentation) {
			var presentationView = new PresentationView({ model: presentation });
			this.$el.append( presentationView.render().el );

			return this;
		}
	});

	return PresentationsView;
});