window.onload = function(){
  $.get('/champions/by-damage?sort=difference-magic', function(data) {
      var dmgChartData = {
      labels : data.name,
      datasets : [
        {
          fillColor : "rgba(220,220,220,0.5)",
          strokeColor : "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data : data.avgMagicDamageToChampsPre
        }, {
          fillColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data : data.avgMagicDamageToChampsPost
        }
      ],
    };

		var ctx = document.getElementById("canvas").getContext("2d");

    var info = {};
    info['Average magic damage to champions pre-patch'] = function(data) {
      return data.avgMagicDamageToChampsPre.toFixed(2);
    };
    info['Average magic damage to champions post-patch'] = function(data) {
      return data.avgMagicDamageToChampsPost.toFixed(2);
    };
		info.Difference = function(data) {
			return (data.avgMagicDamageToChampsPost - data.avgMagicDamageToChampsPre).toFixed(2) + '%';
		};
    info['Average total damage to champions pre-patch'] = function(data) {
      return data.avgTotalDamageToChampsPre.toFixed(2);
    };
    info['Average total damage to champions post-patch'] = function(data) {
      return data.avgTotalDamageToChampsPost.toFixed(2);
    };
		info.Difference = function(data) {
			return (data.avgTotalDamageToChampsPost - data.avgTotalDamageToChampsPre).toFixed(2) + '%';
		};

		window.myBarChart = new Chart(ctx).Bar(dmgChartData, {
			responsive: false,
			barShowStroke: false,
			customTooltips: showTooltip(info)
		});
	});
};
