define([
	'backbone', 
	'views/slide'
	], function(Backbone,  SlideView) {

	var SlidesView = Backbone.View.extend({
		initialize: function() {
			this.presentationIndex = this.options.id;
			this.currentSlideIndex = 1;
			this.transitionSpeed = 400;
			this.numSlides = this.collection.length;

			this.renderAll();

			App.Vent.on('initSlide', this.hideAllButFirst, this);
			App.Vent.on('changeSlide', this.changeSlide, this);
		},

		//метод вызываемый при закрытии вида - отключает все pub/sub
	 	onClose: function(){
			App.Vent.off('initSlide', this.hideAllButFirst, this);
	    	App.Vent.off('changeSlide', this.changeSlide, this);
	  	},

		className: 'slides',

		hideAllButFirst: function() {
			this.$el.children(':nth-child(n+2)').hide();
		},

		changeSlide: function(opts) {
			var newSlide,
				that = this,
				slides = this.$el.children();

			this.setCurrentSlideIndex(opts);	

			newSlide = this.getNextSlide(slides);
			this.animateToNewSlide(slides, newSlide, opts.direction);

			App.router.navigate('presentation/' + this.presentationIndex + '/slides/' + this.currentSlideIndex);
		},

		setCurrentSlideIndex: function(opts) {
			// Если запрашивается особенный слайд, 
			// то ставим полученный индекс
			if ( opts.slideIndex ) {
				return this.currentSlideIndex = ~~opts.slideIndex;
			}
			
			//в другом случае просто пролистай на один вперед или назад
			this.currentSlideIndex += opts.direction === 'next' ? 1 : -1;

			if ( this.currentSlideIndex > this.numSlides ) {
				//назад к первому слайду
				this.currentSlideIndex = 1;
			}

			if ( this.currentSlideIndex <= 0 ) {
				//вперед к последнему слайду
				this.currentSlideIndex = this.numSlides;
			}

		},


		getNextSlide: function(slides) {
			return slides.eq( this.currentSlideIndex - 1 );
		},


		animateToNewSlide: function(slides, newSlide, direction) {
			var that = this;

			slides.filter(':visible')
				.animate({
					top: direction === 'next' ? '100%' : '-100%',
					opacity: 'hide'
				}, this.transitionSpeed, function() {
					$(this).css('top', 0);

					newSlide
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

		render: function(slide) {
			var slideView = new SlideView({ model: slide });
			this.$el.append( slideView.render().el );

			return this;
		}
	});

	return SlidesView;
});