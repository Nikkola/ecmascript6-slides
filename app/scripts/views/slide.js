define([
	'backbone' , 
	'helpers'
], function(Backbone, Helpers) {
	var SlideView = Backbone.View.extend({
		className: 'slide',

		initialize:function() {
		},

		render: function() {
			var contentType = this.getContentType();

			//вызываем метод путем создания названия строки. 
			//render + тип контента c большой буквы
			this['render' + Helpers.capitalize(contentType)]();

			return this;
		},

		getContentType: function() {
			if ( this.model.get('image') ) {
				return 'image';
			} else if ( this.model.get('snippet') ) {
				return 'snippet';
			} else if ( this.model.get('quote') ) {
				return 'quote';
			} else if ( this.model.get('bullets') ) {
				return 'bullets';
			} else if ( this.model.get('link') ) {
				return 'link';
			} else {
				return 'heading';
			}	
		},

		renderSnippet: function() {
			var that = this,
				snippet = this.model.get('snippet');

			this.$el.addClass('snippet');

			if ( this.model.get('title') ) {
				this.renderHeading();
			}

			//если массив снипетов
			if ( Object.prototype.toString.call( snippet ) === '[object Array]' ) {
				return _.each(snippet, function(item) {
					that.setSnippet(item);
				});
			} else { //если один снипет
				this.setSnippet(snippet);
			}

		},

		setSnippet: function(snippet) {
			var that = this;

			$.ajax({
				type: 'GET',
				url: snippet.url,
				success: function(snippetData) {
					that.model.set('title', snippet.heading);
					that.renderHeading();

					var snippetsHtml = Helpers.template('snippets-tpl');
					that.$el.append( snippetsHtml( {snippet: snippetData } ) );

					prettyPrint();					
				}
			});

		},

		renderLink: function() {
			var that = this,
				link = this.model.get('link');

			this.$el.addClass('link');

			if ( this.model.get('title') ) {
				this.renderHeading();
			}

			//если массив ссылок
			if ( Object.prototype.toString.call( link ) === '[object Array]' ) {
				var linksHtml = Helpers.template('links-tpl');
				this.$el.append( linksHtml( this.model.toJSON() ) );
			} else { //если одна ссылка
				var linkHtml = Helpers.template('link-tpl');
				this.$el.append( linkHtml( this.model.toJSON() ) );
			}

		},	

		renderHeading: function() {
			this.$el.append(
				'<h1 class=' + this.model.get('size') + '>' + this.model.get('title') + '</h1>'
			);				
		},	

		renderQuote: function() {
			this.$el.addClass('quote');

			var linksHtml = Helpers.template('quote-tpl');
			this.$el.append( linksHtml( this.model.toJSON() ) );	
		},

		renderImage: function() {
			var that = this,
				img = this.model.get('image');

			this.$el.addClass('image');

			if ( this.model.get('title') ) {
				this.renderHeading();
			} 

			//если массив img
			if ( Object.prototype.toString.call( img ) === '[object Array]' ) {
				return _.each(img, function(item) { 
					
					if ( item.heading) {
						that.model.set('title', item.heading); 
						that.renderHeading(); 
					} 

					that.$el.append('<img src="' + item.src + '">');
				});
			} else { //если одно изображение 
				this.$el.append('<img src="' + img + '">');
			}

		},

		renderBullets: function() {
			this.$el.addClass('bullets');

			if (this.model.get('title') ) {
				this.renderHeading();
			}

			var linksHtml = Helpers.template('bullets-tpl');
			this.$el.append( linksHtml( this.model.toJSON() ) );
		}
	});

	return SlideView;
});