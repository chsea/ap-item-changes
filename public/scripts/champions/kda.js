window.onload = function(){
	$.get('/champions/by-kda?sort=post', function(data) {
		var barChartData = {
			labels : data.name,
			datasets : [
				{
					fillColor : "rgba(220,220,220,0.5)",
					strokeColor : "rgba(220,220,220,0.8)",
					highlightFill: "rgba(220,220,220,0.75)",
					highlightStroke: "rgba(220,220,220,1)",
					data : data.avgKdaPre
				}, {
					fillColor: "rgba(151,187,205,0.5)",
	        strokeColor: "rgba(151,187,205,0.8)",
	        highlightFill: "rgba(151,187,205,0.75)",
	        highlightStroke: "rgba(151,187,205,1)",
					data : data.avgKdaPost
				}
			],
		};

		var ctx = document.getElementById("canvas").getContext("2d");

		var info = {};
		info['Average Kills/Deaths/Assists pre-patch'] = function(data) {
			return (data.avgKillsPre.toFixed(2) + ' | ' + data.avgDeathsPre.toFixed(2) + ' | ' + data.avgAssistsPre.toFixed(2) + '(' + data.avgKdaPre.toFixed(2) + ' KDA)');
		};
		info['Average Kills/Deaths/Assists post-patch'] = function(data) {
			return (data.avgKillsPost.toFixed(2) + ' | ' + data.avgDeathsPost.toFixed(2) + ' | ' + data.avgAssistsPost.toFixed(2) + '(' + data.avgKdaPost.toFixed(2) + ' KDA)');
		};
		info.Difference = function(data) {
			return (data.avgKillsPost - data.avgKillsPre).toFixed(2) + '%' + ' | ' + (data.avgDeathsPost - data.avgDeathsPre).toFixed(2) + '%' + ' | ' + (data.avgAssistsPost - data.avgAssistsPre).toFixed(2) + '(' + (data.avgKdaPre - data.avgKdaPost).toFixed(2) + ' kda)';
		};

		window.myBarChart = new Chart(ctx).Bar(barChartData, {
			responsive: false,
			barShowStroke: false,
			customTooltips: showTooltip(info)
		});
	});
};
