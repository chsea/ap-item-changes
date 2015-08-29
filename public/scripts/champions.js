window.onload = function(){
	$.get('/champions/all?sort=name', function(data) {
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

		function showTooltip(tooltip) {
			var tooltipEl = $('#custom-tooltip');

			if (!tooltip) {
				tooltipEl.hide();
				return;
			}

			$.get('/champions/' + tooltip.title, function(data){
				tooltipEl.show();

				var innerHtml = [
					"<img src='http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/" + tooltip.title.replace(' ','') + ".png' width='100' height = '100' style='float: left'>",
					"<h1>" + data.name + "</h1>",
					"<h2>" + data.title + "</h2>"
				];

				tooltipEl.html(innerHtml.join(''));
			});

			tooltipEl.css({
        position: 'fixed',
        left: event.clientX + 10 + 'px',
        top: event.clientY - 210 + 'px',
        fontFamily: tooltip.fontFamily,
        fontSize: tooltip.fontSize,
        fontStyle: tooltip.fontStyle,
				backgroundColor: '#333',
				padding: '10px'
    	});
		}

		window.myBarChart = new Chart(ctx).Bar(barChartData, {
			responsive: false,
			scaleLabel: "<%= Number(value * 100).toFixed(2) + ' %'%>",
			barShowStroke: false,
			customTooltips: showTooltip
		});
	});
};
