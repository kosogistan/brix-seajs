define(function(require, exports) {
    var _ = require('underscore'),
        Widget = require('widget');
    return Widget.extend({
        events: {
            'click #target': function(e) {}
        },
        initialize: function() {
            // test
            var view = this;
            setInterval(function() {
                view.model.set('foo', Math.random());
                view.model.set('baz', {
                    a: Math.random(),
                    b: Math.random()
                });
            }, 1000);
        },
        render: function() {
            this.$el.html(_.template(this.options.tmpl, this.model.attributes));
        }
    });
});