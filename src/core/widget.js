define(function(require, exports) {
    var _ = require('underscore'),
        Backbone = require('backbone'),
        $ = require('$');

    function Widget(options) {
        Backbone.View.call(this, options);
        this._initialize();
    }
    /*
        Widget 基于 Backbone.View 扩展了：
        1. _initialize，自动解析、存储、更新子模板。
        2. render，默认的渲染方法。

        为了在应用中避免：
        1. 避免子类覆盖（什么？）
        2. 避免子类使用 super 或 superclass 等外来关键字
        这里采用拷贝属性的方式模拟继承，缩短原型链。


    */
    _.extend(Widget, Backbone.View, {
        log: function(gallery, type, args) {
            args = [].slice.call(arguments, 2);
            var label = '%c[' + gallery + ']' + '%c[' + type + ']',
                style1 = 'background: green; color: white;',
                style2 = 'background: orange; color: white;';
            if (window.console) console.log.apply(console, [label, style1, style2].concat(args));
        }
    });
    _.extend(Widget.prototype, Backbone.View.prototype, {
        _initialize: function() {
            var self = this;

            // el tmpl model
            var options = self.options,
                tmpl = options.tmpl,
                uniqueId,
                subTmplMap,
                subTmpls;


            /*
                解析模板
                容器元素 el 和模型 model 在 pagelet.js 中就可以确定，只要 tmpl 需要额外判断。
                指定 tmpl 有两种方式：
                1. 在属性 data-bx-config 中指定
                2. 在子 View 的方法 initialize 中指定
            */
            // HTML 字符串
            if (_.isString(tmpl) && /^<(.|\n)+>$/.test(tmpl)) { // <tag>
                options.tmpl = _.unescape($.trim(tmpl));
                options.$tmpl = $(tmpl);
            } else { // jQuery, Element, selector
                options.$tmpl = tmpl.jquery && tmpl || _.isElement(tmpl) && $(tmpl) || $($.trim(tmpl));
                options.tmpl = _.unescape(options.$tmpl.html());
            }
            options.$tmpl.attr('data-bxid', uniqueId = _.uniqueId());

            // 解析子模板
            subTmplMap = options.subTmplMap = {};
            subTmpls = options.subTmpls = options.$tmpl.find('[data-bxkey]').each(function(index, subEl) {
                var $subEl = $(subEl).attr('data-bxid', _.uniqueId(uniqueId + '-')),
                    key = $subEl.attr('data-bxkey');
                subTmplMap[key] = subTmplMap[key] || [];
                subTmplMap[key].push($subEl);
            });

            // 刷新子模板
            self.model.on('change', function(model, options) {
                console.log('widget ' + self.options.path, 'model change', model.changed, options);
                // 如果没有子模板，则完整刷新
                if (!subTmpls.length) return self.render();

                var changed = model.changed; // 改变的属性和值
                var keyTmpls, keyTmplEls, keyHTML;
                // 遍历查找属性对应的子模板数组，替换属性对应的子模板元素。
                for (var key in changed) {
                    for (var multikey in subTmplMap) {
                        if (~_.indexOf(multikey.split(/\s*,\s*/), key)) {
                            console.log(self.$el.attr('data-bx'), 'bxkey', key, '→', multikey)
                            keyTmpls = subTmplMap[multikey]; // 子模板数组
                            keyTmplEls = self.$el.find('[data-bxkey="' + multikey + '"]'); // 渲染后的子模板元素数组
                            for (var index = 0; index < keyTmpls.length; index++) {
                                keyHTML = _.unescape(keyTmpls[index].prop('outerHTML'));
                                keyHTML = _.template(keyHTML, model.attributes);
                                keyTmplEls.eq(index).replaceWith(keyHTML);
                            }
                        }
                    }
                }
            });
            // self.render();
        },
        /*
            更新网页的一部分需要 3 个输入因素：
                模板 tmpl
                数据 data
                目标元素 el
            其中，模板和目标元素由视图维护，数据由模板维护。
        */
        render: function() {
            this.$el.html(_.template(this.options.tmpl, this.model.attributes));
        }
    });
    return Widget;
});