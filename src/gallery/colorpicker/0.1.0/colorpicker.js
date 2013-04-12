define(function(require, exports) {
    var _ = require('underscore'),
        Backbone = require('backbone'),
        $ = require('$'),
        tpl = require('colorpicker.tpl'),
        svgSlideTpl = require('colorpicker-svg-slide.tpl'),
        svgPickerTpl = require('colorpicker-svg-picker.tpl'),
        vmlSlideTpl = require('colorpicker-vml-slide.tpl'),
        vmlPickerTpl = require('colorpicker-vml-picker.tpl');

    return Backbone.View.extend({
        show: function() {
            this.$el.show();
        },
        hide: function() {
            this.$el.show();
        },
        toggle: function(e) {
            this.$el.toggle();
        },
        /**
         * Convert HSV representation to RGB HEX string.
         * Credits to http://www.raphaeljs.com
         */
        hsv2rgb: function(h, s, v) {
            var R, G, B, X, C;
            h = (h % 360) / 60;
            C = v * s;
            X = C * (1 - Math.abs(h % 2 - 1));
            R = G = B = v - C;

            h = ~~h;
            R += [C, X, 0, 0, X, C][h];
            G += [X, C, C, X, 0, 0][h];
            B += [0, 0, X, C, C, X][h];

            var r = R * 255,
                g = G * 255,
                b = B * 255;
            return {
                r: r,
                g: g,
                b: b,
                hex: "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1)
            };

        },
        /**
         * Convert RGB representation to HSV.
         * r, g, b can be either in <0,1> range or <0,255> range.
         * Credits to http://www.raphaeljs.com
         */
        rgb2hsv: function(r, g, b) {
            if (r > 1 || g > 1 || b > 1) {
                r /= 255;
                g /= 255;
                b /= 255;
            }
            var H, S, V, C;
            V = Math.max(r, g, b);
            C = V - Math.min(r, g, b);
            H = (C === 0 ? null : V == r ? (g - b) / C + (g < b ? 6 : 0) : V == g ? (b - r) / C + 2 : (r - g) / C + 4);
            H = (H % 6) * 60;
            S = C === 0 ? 0 : C / V;
            return {
                h: H,
                s: S,
                v: V
            };
        },
        /**
         * Sets color of the picker in hsv/rgb/hex format.
         * @param {Object} hsv Object of the form: { h: <hue>, s: <saturation>, v: <value> }.
         * @param {Object} rgb Object of the form: { r: <red>, g: <green>, b: <blue> }.
         * @param {String} hex String of the form: #RRGGBB.
         */
        setColor: function(hsv, rgb, hex) {
            var self = this,
                el = self.$el;
            self.h = hsv.h % 360;
            self.s = hsv.s;
            self.v = hsv.v;
            var c = self.hsv2rgb(self.h, self.s, self.v);

            self.slideDragNode.css({
                top: Math.round(self.h * self.slideNode.height() / 360 - 5)
            });
            var left = Math.round(self.s * self.pickerNode.width() - 5),
                top = Math.round((1 - self.v) * self.pickerNode.height() - 5);
            self.pickerDragNode.css({
                left: left,
                top: top,
                color: top > 98 ? '#fff' : '#000'
            });
            self.pickerNode.css({
                "background-color": self.hsv2rgb(self.h, 1, 1).hex
            });
            el.find('.bg').css({
                "background-color": c.hex
            });
            self.color = c.hex;
            el.find('li').removeClass('selected');

            var input = el.find('input');
            if (input.val() !== c.hex) input.val(c.hex);
        },
        /**
         * 设置颜色
         * @param {Object} hsv hsv对象 { h: <hue>, s: <saturation>, v: <value> }
         */
        setHsv: function(hsv) {
            this.setColor(hsv);
        },
        /**
         * 设置颜色
         * @param {Object} rgb rgb对象 { r: <red>, g: <green>, b: <blue> }
         */
        setRgb: function(rgb) {
            this.setColor(this.rgb2hsv(rgb.r, rgb.g, rgb.b), rgb);
        },
        /**
         * 设置颜色
         * @param {String} hex 颜色值#RRGGBB.
         */
        setHex: function(hex) {
            this.setColor(this.rgb2hsv(parseInt(hex.substr(1, 2), 16), parseInt(hex.substr(3, 2), 16), parseInt(hex.substr(5, 2), 16)), undefined, hex);
        },
        events: {
            'click li': function(event) {
                var color = $(event.target).attr('val');
                this.setHex(color);
                $(event.target).addClass('selected')
            },
            'click .icon-arrow': function(event) {
                var arrow = $(event.target);
                if (arrow.hasClass('icon-arrow-up')) {
                    arrow.html('&#405');
                } else {
                    arrow.html('&#404');
                }
                this.$el.find('.colorpicker-bd').slideToggle(200);
                arrow.toggleClass('icon-arrow-up');
            },
            'click .picker': function(event) {
                var offset = this.pickerNode.offset(),
                    left = event.pageX - offset.left,
                    top = event.pageY - offset.top,
                    width = this.pickerNode.width(),
                    height = this.pickerNode.height();
                this.setHsv({
                    h: this.h,
                    s: left / width,
                    v: (height - top) / height
                });
            },
            'click .slide': function(event) {
                var offset = this.slideNode.offset(),
                    height = this.slideNode.height(),
                    top = ((event.pageY - offset.top >= height) ? height - 1 : event.pageY - offset.top),
                    h = top / height * 360;
                this.setHsv({
                    h: h,
                    s: this.s,
                    v: this.v
                });
            },
            'blur input': function(event) {
                var val = $(event.target).val();
                if (self.color != val) this.setHex(val);
            },
            'keyup input': function(event) {
                var val = $(event.target).val();
                if (val.length === 7 && self.color !== val) this.setHex(val);
            },
            'click .btn-confirm': function(event) {
                var c = this.hsv2rgb(this.h, this.s, this.v);
                this.$el.trigger('selected', {
                    hex: c.hex,
                    hsv: {
                        h: this.h,
                        s: this.s,
                        v: this.v
                    },
                    rgb: {
                        r: c.r,
                        g: c.g,
                        b: c.b
                    }
                });
                this.hide();
            },
            'mousedown .icon-picker-indicator': function(event) {
                var self = this;
                $(document.documentElement).css('cursor', 'pointer');
                event.preventDefault();
                $(document.body).on('mousemove.pickerDragNode', function(event) {
                    event.pageX -= 5;
                    event.pageY -= 5;
                    var offset = self.pickerNode.offset(),
                        width = self.pickerNode.width(),
                        height = self.pickerNode.height(),
                        left = event.pageX - offset.left,
                        top = event.pageY - offset.top;

                    if (left + 5 > width) left = width;
                    else if (left < 0) left = 0;
                    else left += 5;

                    if (top + 5 > height) top = height;
                    else if (top < 0) top = 0;
                    else top += 5;

                    self.setHsv({
                        h: self.h,
                        s: left / width,
                        v: (height - top) / height
                    });
                }).on('mouseup', function(e) {
                    $(document.documentElement).css('cursor', 'auto');
                    $(document.body).off('mousemove.pickerDragNode')
                })
            },
            'mousedown .icon-slide-indicator': function(event) {
                var self = this;
                $(document.documentElement).css('cursor', 'pointer');
                event.preventDefault();
                $(document.body).on('mousemove.slideDragNode', function(event) {
                    event.pageX -= 5;
                    event.pageY -= 5;
                    var offset = self.slideNode.offset();
                    var height = self.slideNode.height(),
                        top = event.pageY - offset.top;

                    if (top + 5 > height) top = height - 1;
                    else if (top < 0) top = 0;
                    else top += 5;

                    self.setHsv({
                        h: top / self.slideNode.height() * 360,
                        s: self.s,
                        v: self.v
                    });
                }).on('mouseup', function(e) {
                    $(document.documentElement).css('cursor', 'auto');
                    $(document.body).off('mousemove.slideDragNode')
                })
            }
        },
        initialize: function() {
            seajs.use('colorpicker.css');

            var self = this;
            self.color = self.options.color || '#ffffff';
            var rendered = _.template(tpl, {
                colors: ['#d81e06', '#f4ea2a', '#1afa29', '#1296db', '#13227a', '#d4237a', '#ffffff', '#e6e6e6', '#dbdbdb', '#cdcdcd', '#bfbfbf', '#8a8a8a', '#707070', '#515151', '#2c2c2c', '#000000', '#ea986c', '#eeb174', '#f3ca7e', '#f9f28b', '#c8db8c', '#aad08f', '#87c38f', '#83c6c2', '#7dc5eb', '#87a7d6', '#8992c8', '#a686ba', '#bd8cbb', '#be8dbd', '#e89abe', '#e8989a', '#e16632', '#e98f36', '#efb336', '#f6ef37', '#afcd51', '#7cba59', '#36ab60', '#1baba8', '#17ace3', '#3f81c1', '#4f68b0', '#594d9c', '#82529d', '#a4579d', '#db649b', '#dd6572', '#d81e06', '#e0620d', '#ea9518', '#f4ea2a', '#8cbb1a', '#2ba515', '#0e932e', '#0c9890', '#1295db', '#0061b2', '#0061b0', '#004198', '#122179', '#88147f', '#d3227b', '#d6204b'],
                min: false,
                color: self.color
            });

            this.$trigger = this.$el.on('click', function(event) {
                self.$el.toggle();
            })
            this.el = this.$el = $(rendered).appendTo('body').css({
                left: this.$el.offset().left,
                top: this.$el.offset().top + this.$el.outerHeight() + 1
            })

            this.pickerDragNode = this.$el.find('.icon-picker-indicator')
            this.slideDragNode = this.$el.find('.icon-slide-indicator')

            var slideNode = this.slideNode = this.$el.find('.slide'),
                pickerNode = this.pickerNode = this.$el.find('.picker'),
                type = (window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");

            switch (type) {
                case 'SVG':
                    slideNode.append(svgSlideTpl)
                    pickerNode.append(svgPickerTpl)
                    break
                default:
                    if (!document.namespaces.v) {
                        document.namespaces.add('v', 'urn:schemas-microsoft-com:vml', '#default#VML')
                    }
                    slideNode.html(vmlSlideTpl)
                    pickerNode.html(vmlPickerTpl)
            }

            self.setHex(self.color)

            this.$el.on('change selected', function(e, data) {
                console.log(e.type, data);
            })
        },
        render: function() {
            // initialize todo
        }
    });
});

/*
// Create SVG element.
function $C(el, attrs, children) {
    console.log('$C', el, attrs);
    el = document.createElementNS('http://www.w3.org/2000/svg', el);
    for (var key in attrs)
    el.setAttribute(key, attrs[key]);
    if (Object.prototype.toString.call(children) != '[object Array]') children = [children];
    var i = 0,
        len = (children[0] && children.length) || 0;
    for (; i < len; i++)
    el.appendChild(children[i]);
    return el;
}
// svgSlideTpl
$C('svg', {
    xmlns: 'http://www.w3.org/2000/svg', version: '1.1', width: '100%', height: '100%'
}, [
    $C('defs', {}, 
        $C('linearGradient', {
            id: 'gradient-hsv', x1: '0%', y1: '100%', x2: '0%', y2: '0%'
        }, [
            $C('stop', { offset: '0%', 'stop-color': '#FF0000', 'stop-opacity': '1' }),
            $C('stop', { offset: '13%', 'stop-color': '#FF00FF', 'stop-opacity': '1' }),
            $C('stop', { offset: '25%', 'stop-color': '#8000FF', 'stop-opacity': '1' }),
            $C('stop', { offset: '38%', 'stop-color': '#0040FF', 'stop-opacity': '1' }),
            $C('stop', { offset: '50%', 'stop-color': '#00FFFF', 'stop-opacity': '1' }),
            $C('stop', { offset: '63%', 'stop-color': '#00FF40', 'stop-opacity': '1' }),
            $C('stop', { offset: '75%', 'stop-color': '#0BED00', 'stop-opacity': '1'}),
            $C('stop', { offset: '88%', 'stop-color': '#FFFF00', 'stop-opacity': '1' }),
            $C('stop', { offset: '100%', 'stop-color': '#FF0000', 'stop-opacity': '1' })
        ])
    ), 
    $C('rect', { x: '0', y: '0', width: '100%', height: '100%', fill: 'url(#gradient-hsv)' })
])
// svgPickerTpl
$C('svg', {
    xmlns: 'http://www.w3.org/2000/svg', version: '1.1', width: '100%', height: '100%'
}, [
    $C('defs', {}, [
        $C('linearGradient', {
            id: 'gradient-black', x1: '0%', y1: '100%', x2: '0%', y2: '0%'
        }, [
            $C('stop', { offset: '0%', 'stop-color': '#000000', 'stop-opacity': '1'}), 
            $C('stop', { offset: '100%', 'stop-color': '#CC9A81', 'stop-opacity': '0'})
        ]), 
        $C('linearGradient', {
            id: 'gradient-white', x1: '0%', y1: '100%', x2: '100%', y2: '100%'
        }, [
            $C('stop', { offset: '0%', 'stop-color': '#FFFFFF', 'stop-opacity': '1'}), 
            $C('stop', { offset: '100%', 'stop-color': '#CC9A81', 'stop-opacity': '0'})
        ])
    ]), 
    $C('rect', { x: '0', y: '0', width: '100%', height: '100%', fill: 'url(#gradient-white)' }), 
    $C('rect', { x: '0', y: '0', width: '100%', height: '100%', fill: 'url(#gradient-black)' })
])
*/