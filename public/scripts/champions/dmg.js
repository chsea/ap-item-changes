window.onload = function(){
	$('#top-menu h3 a:nth-child(3)').addClass('active');
  $.get('/champions/by-damage?sort=difference-magic', function(data) {
      var dmgChartData = {
      labels : data.name,
      datasets : [
        {
          fillColor : "rgba(247,70,74,0.6)",
					strokeColor : "rgba(220,220,220,0.8)",
					highlightFill : "rgba(247,70,74,1)",
          highlightStroke: "rgba(220,220,220,1)",
          data : data.avgMagicDamageToChampsPre
        }, {
          fillColor: "rgba(9,216,237,0.8)",
	        strokeColor: "rgba(151,187,205,0.6)",
	        highlightFill: "rgba(9,216,237,1)",
          highlightStroke: "rgba(151,187,205,1)",
          data : data.avgMagicDamageToChampsPost
        }
      ],
    };

		var ctx = document.getElementById("canvas").getContext("2d");

    var info = {};
    info['Average magic damage to champions pre-patch'] = function(data) {
      return {html: '<span class="red num">' + data.avgMagicDamageToChampsPre.toFixed(2) + '</span>', inline: true};
    };
    info['Average magic damage to champions post-patch'] = function(data) {
      return {html: '<span class="blue num">' + data.avgMagicDamageToChampsPost.toFixed(2) + '</span>', inline: true};
    };
		info['Difference in magic damage'] = function(data) {
			var color = (data.percentPlayedPost - data.percentPlayedPre) > 0 ? 'blue' : 'red';
			return {html: '<span class="' + color +' num">' + (data.avgMagicDamageToChampsPost - data.avgMagicDamageToChampsPre).toFixed(2) + '</span>', inline: true};
		};
    info['Average total damage to champions pre-patch'] = function(data) {
      return {html: '<span class="red num">' + data.avgTotalDamageToChampsPre.toFixed(2) + '</span>', inline: true};
    };
    info['Average total damage to champions post-patch'] = function(data) {
      return {html: '<span class="blue num">' + data.avgTotalDamageToChampsPost.toFixed(2) + '</span>', inline: true};
    };
		info['Difference in total damage'] = function(data) {
			var color = (data.percentPlayedPost - data.percentPlayedPre) > 0 ? 'blue' : 'red';
			return {html: '<span class="' + color +' num">' + (data.avgTotalDamageToChampsPost - data.avgTotalDamageToChampsPre).toFixed(2) + '</span>', inline: true};
		};

		window.myBarChart = new Chart(ctx).Bar(dmgChartData, {
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
