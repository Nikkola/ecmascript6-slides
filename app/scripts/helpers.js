define(function() {
	var helpers = {};

	helpers.capitalize = function(string) {
		return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
	};

	helpers.template = function(id) {
		return Handlebars.compile( $('#' + id).html() );
	};

	return helpers;
});