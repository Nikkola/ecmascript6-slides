define([
    'backbone', 
    'collections/presentations', 
    'collections/slides',
    'text!../../templates/link.html',
    'text!../../templates/links.html',
    'text!../../templates/snippets.html',
    'text!../../templates/quote.html',
    'text!../../templates/bullets.html',
    'views/presentations',
    'views/slides',
    'router'

], function( Backbone, PresentationsCollection, SlidesCollections, linksTpl, linkTpl, snippetTpl, quoteTpl, bulletsTpl, PresentationsView, SlidesView, MainRouter) {

        var AppView = Backbone.View.extend({
            el: 'body',

            initialize: function() {
                //грузим шаблоны
                $('body').append(linksTpl);
                $('body').append(linkTpl);
                $('body').append(snippetTpl);
                $('body').append(quoteTpl);
                $('body').append(bulletsTpl);

                this.collection = new PresentationsCollection( window.presentations );

                this.renderPresentations(this.collection);

                App.Vent.on('renderSlide', this.renderSlides, this);

                App.router = new MainRouter();
                Backbone.history.start();

            },

            //метод вызываемый при закрытии вида - отключает все pub/sub
            onClose: function(){
                App.Vent.off('renderSlide', this.test, this);
            },

            renderPresentations: function(collection) {
                this.presentationsView = new PresentationsView({
                    collection: collection
                });

                $('body').prepend( this.presentationsView.el );           
            },

            renderSlides: function(opts) {
                var that = this; 

                var presentation = this.collection.find( function(model){  
                    return ~~model.get('id') === ~~opts.id;
                }); 

                this.slidesView = new SlidesView({
                    id: opts.id,
                    collection: new SlidesCollections( presentation.toJSON().slides )
                }); 

                $('body').prepend( this.slidesView.el );                
            },

            events: {
                'keyup'                   : 'keyUp',
                'mouseover .hint-trigger' : 'showHint',
                'mouseout .hint-trigger'  : 'hideHint',
            },

            showHint: function() {
                $('.hint').fadeIn();
            },


            hideHint: function() {
                $('.hint').fadeOut();
            },

            keyUp: function(e) {
                var str = window.location.hash;

                if ( str.indexOf('slides') + 1 ) { //если в урле есть слайды, значит запускаем навигация для них
                    if ( e.keyCode === 37  || e.keyCode === 39  ) {
                        App.Vent.trigger('changeSlide', {
                            direction: e.keyCode == 39 ? 'next' : 'prev'
                        });
                    }

                    if ( e.keyCode === 38  || e.keyCode === 40  ) {
                        App.Vent.trigger('changeSlide', {
                            direction: e.keyCode == 38 ? 'next' : 'prev'
                        });
                    }

                    //если нажали ESC во время просмотра слайдов. выходим обратно в выбор презентаций
                    if ( e.keyCode === 27  ) {
                        this.escPress();
                    }

                } else { // навигация презентаций
                    if ( e.keyCode === 37  || e.keyCode === 39  ) {
                        App.Vent.trigger('changePresentation', {
                            direction: e.keyCode == 39 ? 'next' : 'prev'
                        });
                    }

                    if ( e.keyCode === 38  || e.keyCode === 40  ) {
                        App.Vent.trigger('changePresentation', {
                            direction: e.keyCode == 38 ? 'next' : 'prev'
                        });
                    }

                    //если нажали ENTER на одной из презентаций. Подгружаем ее слайды
                    if ( e.keyCode === 13  ) {
                        this.enterPress();
                    }
                }

            },

            enterPress: function() {
                var that = this;

                //закрываем виды для избежания зомби
                if (this.slidesView) {
                    this.slidesView.close();
                }

                if (this.presentationsView) {
                    this.presentationsView.close()
                }

                if ( window.location.hash.length > 1 ) {
                    this.presentationIndex = window.location.hash.split('/')[1];
                } else {
                    this.presentationIndex = 1;
                } 

                this.renderSlides( {id: this.presentationIndex} );

                App.Vent.trigger('initSlide');

                App.router.navigate('presentation/' + this.presentationIndex + '/slides/1');
            },

            escPress: function() {
                this.slidesView.close();

                this.renderPresentations(this.collection);

                App.Vent.trigger('init');

                App.router.navigate('presentation/' + this.presentationIndex);  

                //показать соответсвующую презентацию
                App.Vent.trigger('changePresentation', {
                    presentationIndex: this.presentationIndex,
                    direction: 'next'   
                });

            }
        });

        return AppView;
});