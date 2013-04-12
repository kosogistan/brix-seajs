define(function(require, exports) {
    var _ = require('underscore'),
        Backbone = require('backbone'),
        $ = require('$');

    return Backbone.View.extend({
        setValue: function(e) {
            var options = this.options,
                width, rangeIndex;
            if (e.pageX) {
                var maxWidth = this.$el.width(),
                    minWidth = 0,
                    diff = maxWidth - minWidth,
                    stepPx = options.step / 100 * diff;

                width = e.pageX - this.$el.offset().left
                rangeIndex = options.range.length && Math.floor(width / stepPx)

                width = options.range.length ? (rangeIndex) * stepPx : width;
                width = Math.min(Math.max(minWidth, width), maxWidth)
                this.$bar.width(width)
                this.$knob.css('left', width)

                options.value = width / diff * (options.end - options.start)
            } else {
                options.value = Math.min(Math.max(options.start, e), options.end)
                width = options.value / (options.end - options.start) * this.$el.width()
                this.$bar.width(width)
                this.$knob.css('left', width)
            }
            this.$el.trigger('change', {
                value: parseInt(options.value, 10),
                name: rangeIndex && options.range[rangeIndex] || ''
            })
        },
        events: {
            'click': function(e) {
                this.setValue(e);
            },
            'mousedown .slider-knob': function(e) {
                e.preventDefault();
                var self = this;
                self.$el.trigger('drag')
                $(document).on('mousemove', function(e) {
                    self.setValue(e);
                });
                $(document).one('mouseup', function() {
                    $(document).off('mousemove')
                    self.$el.trigger('drop')
                })
            }
        },
        initialize: function() {
            seajs.use('slider.css', function() {})

            this.$el.empty()
                .html('<span class="slider-bar"></span><span class="slider-knob"></span>')
                .addClass('slider clearfix"');

            this.$bar = this.$el.find('.slider-bar')
            this.$knob = this.$el.find('.slider-knob')

            var options = this.options = _.extend({
                value: 0,
                step: 1,
                start: 0,
                end: 100,
                range: []
            }, this.options);
            if (options.range.length) options.step = (options.end - options.start) / options.range.length;

            this.setValue(options.value);
            this.$el.on('change drag drop', function(e, data) {
                console.log(e.type, data)
            })
        },
        render: function() {

        }
    })
})