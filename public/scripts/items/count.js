window.onload = function(){
	$('#top-menu h3 a:nth-child(1)').addClass('active');
	$.get('/items/by-count?sort=post', function(data) {
		var barChartData = {
			labels : data.name,
			datasets : [
				{
					fillColor : "rgba(247,70,74,0.6)",
					strokeColor : "rgba(220,220,220,0.8)",
					highlightFill : "rgba(247,70,74,1)",
					highlightStroke: "rgba(220,220,220,1)",
					data : data.percentUsedPre
				}, {
					fillColor: "rgba(9,216,237,0.6)",
	        strokeColor: "rgba(151,187,205,0.8)",
	        highlightFill: "rgba(9,216,237,1)",
	        highlightStroke: "rgba(151,187,205,1)",
					data : data.percentUsedPost
				}
			],
		};

		var ctx = document.getElementById("canvas").getContext("2d");

		window.myBarChart = new Chart(ctx).Bar(barChartData, {
			responsive: false,
			scaleGridLineColor: "rgba(100,100,100,.1)",
			scaleLineColor: "rgba(255,255,255,.3)",
			scaleLabel: "<%= value + ' %'%>",
			barShowStroke: false,
			scaleFontFamily: "Roboto Mono",
			scaleFontSize: 10,
			scaleFontColor: "#CCC",
			customTooltips: showTooltip
		});
	});
};
