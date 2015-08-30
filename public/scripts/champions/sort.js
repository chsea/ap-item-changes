function reCalc(page, sort, bar1, bar2) {
  $.get('/champions/by-' + page +'?sort=' + sort, function(data){
    myBarChart.scale.xLabels = data.name;
    data[bar1].forEach(function(value, i) {
      myBarChart.datasets[0].bars[i].value = value;
      myBarChart.datasets[0].bars[i].label = data.name[i];
    });
    data[bar2].forEach(function(value, i) {
      myBarChart.datasets[1].bars[i].value = value;
      myBarChart.datasets[1].bars[i].label = data.name[i];
    });

    myBarChart.update();
  });
}
