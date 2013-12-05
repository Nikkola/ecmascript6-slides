require.config({
  shim: {
    'backbone' : {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
    }
  },

  paths: {
    jquery: 'vendor/jquery.min',
    underscore : 'vendor/underscore-min',
    backbone: 'vendor/backbone-min',
    text: 'vendor/text',
    handlebars: 'vendor/handlebars',
    prettify: 'vendor/prettify'
  }
});
 

require(['views/app', 'handlebars', 'prettify'], function(AppView) {

    //zombie kill !!!
    Backbone.View.prototype.close = function() {
        this.remove();
        this.unbind();
        this.off();
        this.undelegateEvents();

        if ( this.onClose ){
            this.onClose();
        }

        if ( !this.model === undefined ) {
            this.model.off( null, null, this );
        }
    };


    window.App = {
        Vent: _.extend({}, Backbone.Events)
    };

    new AppView();
});