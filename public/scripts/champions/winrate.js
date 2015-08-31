window.onload = function(){
	$.get('/champions/by-winrate?sort=post', function(data) {
		var barChartData = {
			labels : data.name,
			datasets : [
				{
					fillColor : "rgba(220,220,220,0.5)",
					strokeColor : "rgba(220,220,220,0.8)",
					highlightFill: "rgba(220,220,220,0.75)",
					highlightStroke: "rgba(220,220,220,1)",
					data : data.winRatePre
				}, {
					fillColor: "rgba(151,187,205,0.5)",
	        strokeColor: "rgba(151,187,205,0.8)",
	        highlightFill: "rgba(151,187,205,0.75)",
	        highlightStroke: "rgba(151,187,205,1)",
					data : data.winRatePost
				}
			],
		};

		var ctx = document.getElementById("canvas").getContext("2d");

		var info = {};
		info['Win rate pre-patch'] = function(data) {
			return (data.winRatePre * 100).toFixed(2) + '%';
		};
		info['Win rate post-patch'] = function(data) {
			return (data.winRatePost * 100).toFixed(2)  + '%';
		};
		info.Difference = function(data) {
			return ((data.winRatePost - data.winRatePre) * 100).toFixed(2) + '%';
		};

		window.myBarChart = new Chart(ctx).Bar(barChartData, {
			responsive: false,
			scaleLabel: "<%= Number(value * 100).toFixed(2) + ' %'%>",
			barShowStroke: false,
			customTooltips: showTooltip(info)
		});
	});
};
