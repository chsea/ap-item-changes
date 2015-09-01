window.onload = function(){
	$('#top-menu h3 a:nth-child(1)').addClass('active');

	$.get('/champions/by-count?sort=post', function(data) {
		var barChartData = {
			labels : data.name,
			datasets : [
				{
					fillColor : "rgba(247,70,74,0.6)",
					strokeColor : "rgba(220,220,220,0.8)",
					highlightFill : "rgba(247,70,74,1)",
					highlightStroke: "rgba(220,220,220,1)",
					data : data.percentPlayedPre
				}, {
					fillColor: "rgba(9,216,237,0.8)",
	        strokeColor: "rgba(151,187,205,0.6)",
	        highlightFill: "rgba(9,216,237,1)",
	        highlightStroke: "rgba(151,187,205,1)",
					data : data.percentPlayedPost
				}
			],
		};

		var ctx = document.getElementById("canvas").getContext("2d");

		var info = {};
		info['Number of matches played pre-patch'] = function(data) {
			return {html: '<span class="red num">' + data.countPre + '</span> out of <span class="red num">39873</span> matches (<span class="red num">' + (data.percentPlayedPre * 100).toFixed(2) + '%</span>)', inline: false};
		};
		info['Number of matches played post-patch'] = function(data) {
			return {html: '<span class="blue num">' + data.countPost + '</span> out of <span class="blue num">39952</span> matches (<span class="blue num">' + (data.percentPlayedPost * 100).toFixed(2)  + '%</span>)', inline: false};
		};
		info.Difference = function(data) {
			var color = (data.percentPlayedPost - data.percentPlayedPre) > 0 ? 'blue' : 'red';
			return {html: '<span class="' + color +' num">' + ((data.percentPlayedPost - data.percentPlayedPre) * 100 ).toFixed(2) + '%</span>', inline: true};
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
