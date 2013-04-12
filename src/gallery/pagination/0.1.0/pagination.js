define(function(require, exports) {
    var _ = require('underscore'),
        Backbone = require('backbone'),
        $ = require('$'),
        tpl = require('pagination.tpl'),
        PurePagination = require('pure-pagination'),
        pagelet = require('pagelet');

    return Backbone.View.extend({
        events: {
            'keydown input.page-num': function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    var val = $(event.target).val();
                    if (!$.isNumeric(val)) event.target.select();
                    this.pp.moveTo(val);
                    this.$el.empty();
                    this.render(true);
                }
            },
            'click a.btn-jump': function(event) {
                event.preventDefault();
                var input = this.$el.find('input.page-num'),
                    val = input.val();
                if (!$.isNumeric(val)) input.get(0).select();
                this.pp.moveTo(val);
                this.$el.empty();
                this.render(true);
            },
            'click a.page': function(event) {
                this.pp.moveTo($(event.target).text());
                this.$el.empty();
                this.render(true);
            },
            'click a.page-prev': function(event) {
                this.pp.moveToPrev();
                this.$el.empty();
                this.render(true);
            },
            'click a.page-next': function(event) {
                this.pp.moveToNext();
                this.$el.empty();
                this.render(true);
            }
        },
        initialize: function() {
            seajs.use('pagination.css')
            this.options = _.extend({
                statistics: true,
                simplify: false,
                step: 7,
                total: _.random(100, 10000),
                cursor: _.random(1, 10),
                limit: _.random(1, 100)
            }, this.options);
            this.pp = new PurePagination(this.options.total, this.options.cursor, this.options.limit);

            this.$el.on('change.pagination', function(event, data) {
                console.log('%c[event]', 'background: green; color: white;', event.type, data);
                pagelet.init(this);
            })
        },
        render: function(trigger) {
            var barstart;
            var data = _.extend({}, this.options, {
                barstart: barstart = Math.min(this.pp.pages, Math.max(1, this.pp.cursor - parseInt(this.options.step / 2, 10))),
                barend: Math.min(this.pp.pages, barstart + this.options.step - 1)
            }, this.pp),
                html = _.template(tpl, data);
            this.$el.append(html)
            if (trigger) this.$el.trigger('change.pagination', this.pp)
        }
    });
});