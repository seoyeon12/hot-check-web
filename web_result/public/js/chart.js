(function($) {

	// Chart Functionality
	$.fn.setChart = function() {
		return this.each(function() {
			// Variables
			var chart = $(this),
				path = $('.chart__foreground path', chart),
				dashoffset = path.get(0).getTotalLength(),
				goal = chart.attr('data-goal'),
                consumed = chart.attr('data-count');
                
                percentage = consumed / goal * 100;
                percentage = parseInt(percentage);
                document.getElementById('percent').innerHTML = percentage;
                document.getElementById('count_consumed').innerHTML = goal - consumed;
                document.getElementById('count_remained').innerHTML = consumed;

			$('.chart__foreground', chart).css({
				'stroke-dashoffset': Math.round(dashoffset - ((dashoffset / goal) * consumed))
			});
		});
	}; // setChart()

	// Count
	$.fn.count = function() {
		return this.each(function() {
			$(this).prop('Counter', 0).animate({
				Counter: $(this).attr('data-count')
			}, {
				duration: 1000,
				easing: 'swing',
				step: function(now) {
					$(this).text(Math.ceil(now));
				}
			});
		});
	}; // count()

	$(window).on('load', function() {
		$('.js-chart').setChart();
		$('.js-count').count();
	});

})(jQuery);