define(function(require, exports) {
    var _ = require('underscore'),
        Backbone = require('backbone'),
        $ = require('$'),
        tpl = require('dropdown.tpl');

    /*
        事件：
            expand collapse select change

            click 
            focus blur
            keydown keypress keyup
            load
            mousedown mouseup mousemove mouseout mouseover
            reset resize

     */
    return Backbone.View.extend({
        expand: function(e) {
            this.$list.show();
            // $(this.el).trigger('expand');
        },
        collapse: function(e) {
            this.$list.hide();
            this.$el.trigger('collapse');
        },
        // select change
        select: function(e) {
            var target = e ? $(e.currentTarget) : $('li.dropdown-item-hover', this.$el),
                span = target.find('span');
            target.addClass('dropdown-item-selected')
                .siblings().removeClass('dropdown-item-selected');
            $('.dropdown-text', this.$head)
                .attr('value', span.attr('value'))
                .text(span.text());
            this.collapse();

            var data = {
                text: span.text(),
                value: span.attr('value')
            };

            this.$select.val(data.value);
            this.$el.trigger('select', data)
            this.$el.trigger('change', data)
            this.$el.trigger('collapse')
        },
        events: {
            // 输入框
            'click div.dropdown-head': function(e) {
                this[this.$list.is(':visible') ? 'collapse' : 'expand']();
            },
            'mouseenter div.dropdown-head': function(e) {
                if (this.options.hover) this.expand();
            },
            // 选项
            'mouseenter li.dropdown-item': function(e) {
                $(e.currentTarget).addClass('dropdown-item-hover')
                    .siblings().removeClass('dropdown-item-hover')
            },
            'mouseleave li.dropdown-item': function(e) {
                $(e.currentTarget).removeClass('dropdown-item-hover');
            },
            'click li.dropdown-item': function(e) {
                this.select(e);
            },
            // 容器
            'mouseleave': function(e) {
                if (this.options.hover) this.$list.hide();
            },
            /*
                容器支持键盘操作 TODO

                key-code
                    http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
                KISSY scrollIntoView
                    https://github.com/kissyteam/kissy/blob/master/src/dom/sub-modules/base/src/offset.js
                    http://yiminghe.javaeye.com/blog/390732
                HTML5 element.scrollIntoView( [ top ] ) 
                    http://www.w3.org/TR/2009/WD-html5-20090423/editing.html#scrollIntoView
                Ext scrollIntoView
                    http://docs.sencha.com/ext-js/4-2/#!/api/Ext.dom.Element-method-scrollIntoView
                jQuery scrollIntoView plugin
                    https://github.com/litera/jquery-scrollintoview/blob/master/demo.html
            */
            'keydown': function(e) {
                var self = this,
                    code = e.keyCode,
                    current;
                console.log('[keyCode]', code);
                switch (e.keyCode) {
                    case 9:
                        // tab
                    case 27:
                        // escape
                        self.collapse();
                        break;
                    case 13:
                        // enter
                        this[this.$list.is(':visible') ? 'select' : 'expand']();
                        // self.expand();
                        break;
                    case 38:
                        // up arrow
                        e.preventDefault();
                        if (this.$list.is(':visible')) {
                            current = this.$list.find('li.dropdown-item-hover:first');
                            if (current.prev().length) {
                                current.toggleClass('dropdown-item-hover')
                                    .siblings().removeClass('dropdown-item-hover');
                                current.prev().toggleClass('dropdown-item-hover');
                            } else {
                                current.toggleClass('dropdown-item-hover');
                                current.parent().children().last().toggleClass('dropdown-item-hover');
                            }
                        }
                        break;
                    case 40:
                        // down arrow
                        e.preventDefault();
                        if (!this.$list.is(':visible')) {
                            this.expand();
                            if (!this.$list.find('li.dropdown-item-hover').length) {
                                this.$list.find('li.dropdown-item:first').addClass('dropdown-item-hover');
                            }
                        } else {
                            current = this.$list.find('li.dropdown-item-hover:first');
                            if (current.next().length) {
                                current.toggleClass('dropdown-item-hover');
                                current.next().toggleClass('dropdown-item-hover');
                            } else {
                                current.toggleClass('dropdown-item-hover');
                                current.parent().children().first().toggleClass('dropdown-item-hover');
                            }
                        }
                        break;
                    default:
                        // 0～9 a~z
                        if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90)) {}
                        break;
                }
            }
        },
        initialize: function() {
            seajs.use('dropdown.css', function() {});

            var self = this;

            var $select;
            if (this.$el.is('select')) {
                $select = this.$select = this.$el.hide();
                selectedIndex = $select.prop('selectedIndex');
                // 
                var list = _.map($select.find('option'), function(option, index) {
                    option = $(option);
                    return {
                        text: option.text(),
                        value: option.attr('value'),
                        selected: option.prop('selected')
                    };
                });
                this.model = new Backbone.Model({
                    list: list,
                    selectedIndex: selectedIndex,
                    text: list[selectedIndex].text,
                    value: list[selectedIndex].value
                });
            }

            // el tmpl model
            var html = _.template(tpl, this.model.attributes);
            if (this.$select.prev().is('.dropdown')) this.$select.prev().remove();
            this.$el = $(html).insertBefore(this.$select)
                .css('width', this.$select.width() + 15)

            // .attr('tabindex', 0);
            this.el = this.$el.get(0);
            this.$head = this.$el.find('div.dropdown-head');
            this.$list = this.$el.find('ul.dropdown-list').css('width', this.$select.width() + 15);
            if (this.options.className) this.$el.addClass(this.options.className);

            this.$el.on('expand collapse select change', function(event, data) {
                console.log('%c[event]', 'background: green; color: white;', event.type, data);
            }) // all ?


            this.$select.on('change', function(e) {
                var value = $(this).val();
                self.$list.find('li.dropdown-item:has(span[value="' + value + '"])')
                    .addClass('dropdown-item-hover')
                    .siblings().removeClass('dropdown-item-hover')
                self.select();
            })

            /*
                事件要绑定到 document 上，因为 body 可能太小！
            */
            $(document).on('click.dropdown', function(e) {
                // console.log(self.el, e.target, $.contains(self.el, e.target));
                if (!$(e.target).closest('div.dropdown').length) {
                    self.$list.hide();
                }
            });


        },
        render: function() {

        }
    });
});