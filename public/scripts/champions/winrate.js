window.onload = function(){
	$('#top-menu h3 a:nth-child(4)').addClass('active');
	$.get('/champions/by-winrate?sort=post', function(data) {
		var barChartData = {
			labels : data.name,
			datasets : [
				{
					fillColor : "rgba(247,70,74,0.6)",
					strokeColor : "rgba(220,220,220,0.8)",
					highlightFill : "rgba(247,70,74,1)",
					highlightStroke: "rgba(220,220,220,1)",
					data : data.winRatePre
				}, {
					fillColor: "rgba(9,216,237,0.8)",
	        strokeColor: "rgba(151,187,205,0.6)",
	        highlightFill: "rgba(9,216,237,1)",
	        highlightStroke: "rgba(151,187,205,1)",
					data : data.winRatePost
				}
			],
		};

		var ctx = document.getElementById("canvas").getContext("2d");

		var info = {};
		info['Win rate pre-patch'] = function(data) {
			return {html: '<span class="red num">' + (data.winRatePre * 100).toFixed(2) + '%</span>', inline: true};
		};
		info['Win rate post-patch'] = function(data) {
			return {html: '<span class="blue num">' + (data.winRatePost * 100).toFixed(2)  + '%</span>', inline: true};
		};
		info.Difference = function(data) {
			var color = (data.percentPlayedPost - data.percentPlayedPre) > 0 ? 'blue' : 'red';
			return {html: '<span class="' + color +' num">' + ((data.winRatePost - data.winRatePre) * 100).toFixed(2) + '%</span>', inline: true};
		};

		window.myBarChart = new Chart(ctx).Bar(barChartData, {
			responsive: false,
			scaleGridLineColor: "rgba(100,100,100,.1)",
			scaleLineColor: "rgba(255,255,255,.3)",
			scaleLabel: "<%= Number(value * 100).toFixed(2) + ' %'%>",
			barShowStroke: false,
			scaleFontFamily: "Roboto Mono",
			scaleFontSize: 10,
			scaleFontColor: "#CCC",
			customTooltips: showTooltip(info)
		});
	});
};
