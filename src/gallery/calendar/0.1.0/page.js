define(function(require, exports) {
    var Widget = require('widget'),
        _ = require('underscore'),
        tpl = require('page.tpl'),
        DataUtil = require('./date');

    return Widget.extend({
        events: {
            'click .calendar-prev-year': function(event) {
                var date = this.model.get('date')();
                date.setFullYear(this.model.get('year') - 1);
                this.model.set('year', date.getFullYear());
            },
            'click .calendar-next-year': function(event) {
                var date = this.model.get('date')();
                date.setFullYear(this.model.get('year') + 1);
                this.model.set('year', date.getFullYear());
            },
            'click .calendar-prev-month': function(event) {
                var date = this.model.get('date')();
                date.setMonth(this.model.get('month') - 1);
                this.model.set('year', date.getFullYear());
                this.model.set('month', date.getMonth());
            },
            'click .calendar-next-month': function(event) {
                var date = this.model.get('date')();
                date.setMonth(this.model.get('month') + 1);
                this.model.set('year', date.getFullYear());
                this.model.set('month', date.getMonth());
            },

            'click .calendar-item': function(event) {
                var $date = $(event.target);
                if (!$date.hasClass('calendar-disabled') && !$date.hasClass('calendar-selected')) {
                    this.model.set('day', parseInt($date.text(), 10))
                    this.$el.trigger('change', {
                        date: this.model.get('date')(),
                        view: this
                    })
                }
            },
            'mousedown .calendar-item': function(event) {},
            'mouseup .calendar-item': function(event) {},

            'click .calendar-year-month': function(event) {}
        },
        initialize: function() {
            this.options = _.extend({
                action: 'append'
            }, this.options, {
                tmpl: tpl // 覆盖默认模板
            })

            var self = this;
            var today = new Date(),
                year = today.getFullYear(),
                month = today.getMonth(),
                day = today.getDate(),
                defaults = {
                    parent: this.options.parent,

                    dayLabels: ['日', '一', '二', '三', '四', '五', '六'],
                    pages: 1,
                    pageIndex: 0,

                    year: year,
                    month: month,
                    day: day,

                    rangeSelect: false,
                    rangeStart: undefined,
                    rangeEnd: undefined,

                    today: today,
                    date: _.bind(function() {
                        return new Date(this.year, this.month, this.day);
                    }, this.model.attributes),
                    offset: function() {
                        return new Date(this.year, this.month, 1).getDay();
                    },
                    days: function() {
                        return new Date(this.year, this.month + 1, 0).getDate();
                    }
                };

            /*
                日历组件的结构相当复杂，此时子模板自动刷新变得非常必要！
            */
            this.model.set(_.defaults(_.pick(this.options, _.keys(defaults)), defaults));

            this.on('change', function(data) {
                console.log(self.options.path, 'event', 'change', DataUtil.format(data, 'isoDate'));
            });
            this.$el.on('change select', function(event, data) {
                console.log(self.options.path, 'el event', event.type, data);
            })
        },
        render: function() {
            var html = _.template(tpl, this.model.attributes);
            this.$el[this.options.action](html);

            this.$el.trigger('change', {
                date: this.model.get('date')(),
                view: this
            })
        }
    });
});