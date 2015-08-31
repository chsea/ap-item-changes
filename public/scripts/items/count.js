window.onload = function(){
	$.get('/items/by-count?sort=post', function(data) {
		var barChartData = {
			labels : data.name,
			datasets : [
				{
					fillColor : "rgba(220,220,220,0.5)",
					strokeColor : "rgba(220,220,220,0.8)",
					highlightFill: "rgba(220,220,220,0.75)",
					highlightStroke: "rgba(220,220,220,1)",
					data : data.percentUsedPre
				}, {
					fillColor: "rgba(151,187,205,0.5)",
	        strokeColor: "rgba(151,187,205,0.8)",
	        highlightFill: "rgba(151,187,205,0.75)",
	        highlightStroke: "rgba(151,187,205,1)",
					data : data.percentUsedPost
				}
			],
		};

		var ctx = document.getElementById("canvas").getContext("2d");

		window.myBarChart = new Chart(ctx).Bar(barChartData, {
			responsive: false,
			scaleLabel: "<%= value + '%'%>",
			barShowStroke: false,
			customTooltips: showTooltip
		});
	});
};
