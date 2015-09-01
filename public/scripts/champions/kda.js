window.onload = function(){
	$('#top-menu h3 a:nth-child(2)').addClass('active');
	$.get('/champions/by-kda?sort=post', function(data) {
		var barChartData = {
			labels : data.name,
			datasets : [
				{
					fillColor : "rgba(247,70,74,0.6)",
					strokeColor : "rgba(220,220,220,0.8)",
					highlightFill : "rgba(247,70,74,1)",
					highlightStroke: "rgba(220,220,220,1)",
					data : data.avgKdaPre
				}, {
					fillColor: "rgba(9,216,237,0.8)",
	        strokeColor: "rgba(151,187,205,0.6)",
	        highlightFill: "rgba(9,216,237,1)",
	        highlightStroke: "rgba(151,187,205,1)",
					data : data.avgKdaPost
				}
			],
		};

		var ctx = document.getElementById("canvas").getContext("2d");

		var info = {};
		info['Average Kills/Deaths/Assists pre-patch'] = function(data) {
			return {html: '<span class="red num">' + data.avgKillsPre.toFixed(2) + '</span> | ' + '<span class="red num">' + data.avgDeathsPre.toFixed(2) + '</span> | ' + '<span class="red num"><span class="red num">' + data.avgAssistsPre.toFixed(2) + '</span> (' + '<span class="red num">' + data.avgKdaPre.toFixed(2) + ' KDA</span>)', inline: false};
		};
		info['Average Kills/Deaths/Assists post-patch'] = function(data) {
			return {html: '<span class="blue num">' + data.avgKillsPost.toFixed(2) + '</span> | ' + '<span class="blue num">' + data.avgDeathsPost.toFixed(2) + '</span> | ' + '<span class="blue num">' + data.avgAssistsPost.toFixed(2) + '</span> (<span class="blue num">' + data.avgKdaPost.toFixed(2) + ' KDA</span>)', inline: false};
		};
		info.Difference = function(data) {
			var color = (data.avgKillsPost - data.avgKillsPlayedPre) > 0 ? 'blue' : 'red';
			return {html: '<span class="' + color +' num">' + (data.avgKillsPost - data.avgKillsPre).toFixed(2) + '</span> | <span class="' + color + ' num">' + (data.avgDeathsPost - data.avgDeathsPre).toFixed(2) + '</span> | <span class="' + color + ' num">' + (data.avgAssistsPost - data.avgAssistsPre).toFixed(2) + ' (<span class="' + color + ' num">' + (data.avgKdaPre - data.avgKdaPost).toFixed(2) + ' KDA</span>)', inline: false};
		};

		window.myBarChart = new Chart(ctx).Bar(barChartData, {
			responsive: false,
			scaleGridLineColor: "rgba(100,100,100,.1)",
			scaleLineColor: "rgba(255,255,255,.3)",
			barShowStroke: false,
			scaleFontFamily: "Roboto Mono",
			scaleFontSize: 10,
			scaleFontColor: "#CCC",
			customTooltips: showTooltip(info)
		});
	});
};
