module('brix')

test('brix', function() {
	expect(1)
	stop()
	seajs.use('/src/core/brix', function() {
		ok(true, 'brix.js √')
		start();
	})
});

test('spm-gallery', function() {
	expect(1)
	stop()
	seajs.use('spm-gallery', function(spmgallery) {
		ok(true, 'spm-gallery √')
		start();
	})
});

test('jquery', function() {
	expect(1)
	stop()
	seajs.use('jquery', function($) {
		ok($, 'jquery √')
		start();
		$.fn.xqueue = function(type, arr) {
			var self = this;
			return this.each(function() {
				$.each(arr, function(i, fn) {
					if ($.isFunction(fn)) {
						self.queue(type, fn);
					} else if ($.isNumeric(fn)) {
						self.delay(fn, type);
					}
				})
			});
		}
	})
});

test('widget', function() {
	expect(1)
	stop()
	seajs.use('widget', function(widget) {
		ok(widget, 'widget √')
		start();
	})
});


module('widget')

test('can access the DOM', function() {
	expect(1);
	var fixture = document.getElementById('qunit-fixture');
	equal(fixture.innerText, 'this had better work.', 'should be able to access the DOM.');
});

module('pagelet')

test('can access the DOM', function() {
	expect(1);
	var fixture = document.getElementById('qunit-fixture');
	equal(fixture.innerText, 'this had better work.', 'should be able to access the DOM.');
});