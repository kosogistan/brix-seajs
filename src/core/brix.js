(function() {
    seajs.config({
        preload: ['/lib/seajs/2.0.0b3/plugin-text'],
        // TODO 自动生成 Brix 组件的 SeaJS 推荐配置
        alias: {
            'spm-gallery': '/lib/spm-gallery.js',

            'widget': '/src/core/widget',
            'pagelet': '/src/core/pagelet',

            'dropdown': '/src/gallery/dropdown/0.1.0/dropdown',
            'dropdown.css': '/src/gallery/dropdown/0.1.0/dropdown.css',
            'dropdown.tpl': '/src/gallery/dropdown/0.1.0/dropdown.tpl',

            'breadcrumb': '/src/gallery/breadcrumb/0.1.0/breadcrumb',
            'breadcrumb.css': '/src/gallery/breadcrumb/0.1.0/breadcrumb.css',
            'breadcrumb.tpl': '/src/gallery/breadcrumb/0.1.0/breadcrumb.tpl',

            'slider': '/src/gallery/slider/0.1.0/slider',
            'slider.css': '/src/gallery/slider/0.1.0/slider.css',
            'slider.tpl': '/src/gallery/slider/0.1.0/slider.tpl',

            'colorpicker': '/src/gallery/colorpicker/0.1.0/colorpicker',
            'colorpicker.css': '/src/gallery/colorpicker/0.1.0/colorpicker.css',
            'colorpicker.tpl': '/src/gallery/colorpicker/0.1.0/colorpicker.tpl',
            'colorpicker-svg-slide.tpl': '/src/gallery/colorpicker/0.1.0/colorpicker-svg-slide.tpl',
            'colorpicker-svg-picker.tpl': '/src/gallery/colorpicker/0.1.0/colorpicker-svg-picker.tpl',
            'colorpicker-vml-slide.tpl': '/src/gallery/colorpicker/0.1.0/colorpicker-vml-slide.tpl',
            'colorpicker-vml-picker.tpl': '/src/gallery/colorpicker/0.1.0/colorpicker-vml-picker.tpl',

            'pure-pagination': '/src/gallery/pagination/0.1.0/pure-pagination',
            'pagination': '/src/gallery/pagination/0.1.0/pagination',
            'pagination.css': '/src/gallery/pagination/0.1.0/pagination.css',
            'pagination.tpl': '/src/gallery/pagination/0.1.0/pagination.tpl',

            'calendar': '/src/gallery/calendar/0.1.0/calendar',
            'calendar.css': '/src/gallery/calendar/0.1.0/calendar.css',
            'calendar.tpl': '/src/gallery/calendar/0.1.0/calendar.tpl',
            'page': '/src/gallery/calendar/0.1.0/page',
            'page.tpl': '/src/gallery/calendar/0.1.0/page.tpl',

            'mhello': '/src/gallery/helloworld/mhello',
            'vhello': '/src/gallery/helloworld/vhello'
        }
    });
    seajs.use('spm-gallery', function() {
        // debug
        seajs.use(['jquery', 'underscore'], function($, _) {
            window.$ = $;
            window._ = _;
        });
    });
    // auto render
    seajs.use('pagelet');
})()