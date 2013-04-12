define(function(require, exports) {
    var _ = require('underscore'),
        Backbone = require('backbone');

    // Our basic **Todo** model has `title`, `order`, and `done` attributes.
    return Backbone.Model.extend({
        // Default attributes for the todo item.
        defaults: function() {
            return {
                title: "empty todo...",
                order: _.uniqueId(),
                done: false
            };
        },
        // Toggle the `done` state of this todo item.
        toggle: function() {
            this.save({
                done: !this.get("done")
            });
        }
    });

});