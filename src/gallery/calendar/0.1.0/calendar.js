define(function(require, exports) {
    var Widget = require('widget'),
        _ = require('underscore'),
        tpl = require('calendar.tpl'),
        DataUtil = require('./date');

    return Widget.extend({
        events: {
            'click .btn-calendar-confirm': function(event) {
                console.log(this._selected);
            },
            'click .btn-calendar-notlimited': function(event) {}
        },
        initialize: function() {
            seajs.use('calendar.css');

            this.options = _.extend({
                action: 'append'
            }, this.options, {
                tmpl: tpl // 覆盖默认模板
            })

            var self = this;
            var today = new Date(),
                year = today.getFullYear(),
                month = today.getMonth(),
                day = today.getDate();

            var defaults = {
                dayLabels: ['日', '一', '二', '三', '四', '五', '六'],
                pages: 1,

                year: year,
                month: month,
                day: day,

                rangeSelect: false,

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

            var _selected = this._selected = {}
            var range = this._range = {}
            this.$el.on('change select', function(event, data) { // data, view
                console.log(self.options.path, 'el event', event.type, data);
                _selected[data.view.cid] = data.date;

                // if ( !! range.start === !! range.end) {
                if ( !range.start && !range.end || range.start && range.end) {
                    range.start = data.date, range.end = null
                } else {
                    range.end = data.date;
                    if (range.start.getTime() > range.end.getTime()) {
                        var t = range.start;
                        range.start = range.end;
                        range.end = t;
                    }
                }

                console.error('calendar range', range.start && DataUtil.format(range.start, 'isoDate'), range.end && DataUtil.format(range.end, 'isoDate'));
                _.each(self._subViews, function(view, index) {
                    view.model.set({
                        rangeStart: range.start,
                        rangeEnd: range.end
                    });
                })
            })
        },
        render: function() {
            var html = _.template(tpl, this.model.attributes);
            this.$el[this.options.action](html);
        }
    });
});