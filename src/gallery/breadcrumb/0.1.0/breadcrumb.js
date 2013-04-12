define(function(require, exports) {
    var Backbone = require('backbone'),
        $ = require('$');

    return Backbone.View.extend({
        events: {},
        initialize: function() {
            seajs.use('breadcrumb.css', function() {});
            var split = $('<li class="item split"><i class="iconfont">&#402</i></li>');
            this.$el.addClass('breadcrumb')
                .find('>li:first').addClass('first').end()
                .find('>li:last').addClass('last').end()
                .find('>li:not(:last)').after(split).end()
                .find('>li').addClass('item')

            this.$el.on('change', function(e, data) {
                console.log(e.type, data);
            })
        },
        render: function() {

        }
    });
});