window.onload = function(){
	$.get('/champions/by-count?sort=post', function(data) {
		var barChartData = {
			labels : data.name,
			datasets : [
				{
					fillColor : "rgba(220,220,220,0.5)",
					strokeColor : "rgba(220,220,220,0.8)",
					highlightFill: "rgba(220,220,220,0.75)",
					highlightStroke: "rgba(220,220,220,1)",
					data : data.percentPlayedPre
				}, {
					fillColor: "rgba(151,187,205,0.5)",
	        strokeColor: "rgba(151,187,205,0.8)",
	        highlightFill: "rgba(151,187,205,0.75)",
	        highlightStroke: "rgba(151,187,205,1)",
					data : data.percentPlayedPost
				}
			],
		};

		var ctx = document.getElementById("canvas").getContext("2d");

		var info = {};
		info['Number of matches played pre-patch'] = function(data) {
			return data.countPre + ' out of 39873 matches (' + (data.percentPlayedPre * 100).toFixed(2) + '%)';
		};
		info['Number of matches played post-patch'] = function(data) {
			return data.countPost + ' out of 39952 matches (' + (data.percentPlayedPost * 100).toFixed(2)  + '%)';
		};
		info.Difference = function(data) {
			return ((data.percentPlayedPost - data.percentPlayedPre) * 100 ).toFixed(2) + '%)';
		};

		window.myBarChart = new Chart(ctx).Bar(barChartData, {
			responsive: false,
			scaleLabel: "<%= Number(value * 100).toFixed(2) + ' %'%>",
			barShowStroke: false,
			scaleFontFamily: "Roboto Mono",
			scaleFontSize: 10,
			customTooltips: showTooltip(info)
		});
	});
};
