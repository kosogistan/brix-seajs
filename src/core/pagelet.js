define(function(require, exports) {
	var _ = require('underscore'),
		$ = require('$'),
		Backbone = require('backbone');

	function init(context) {
		var parent = context && context.cid && context;
		context = context && context.cid && context.$el || context;
		$('[data-bx]', context).each(function(index, el) {
			var $el = $(el),
				path = $el.attr('data-bx'),
				config = $el.attr('data-bx-config') || $el.attr('data-bxconfig');
			/*jshint -W054 */
			config = config ? (new Function("return " + config))() : {}
			console.log('pagelet', path, config);
			_.each(path.split(','), function(value, index) {
				seajs.use(value, function(View) {
					var view = new View(_.extend(config, {
						el: el,
						tmpl: el,
						model: new Backbone.Model({}),
						path: path,
						parent: parent
					}))
					if (parent) {
						parent._subViews = parent._subViews || [];
						parent._subViews.push(view);
					}
					view.render();
					if (view.$el.has('[data-bx]')) init(view);
				})
			})
		});
	}
	$(function() {
		init();
	})
	return {
		init: init
	}
})