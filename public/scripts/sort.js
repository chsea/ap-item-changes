function reCalc(sort) {
  $.get('/champions/all?sort=' + sort, function(data){
    myBarChart.scale.xLabels = data.name;
    data.percentPlayedPre.forEach(function(value, i) {
      myBarChart.datasets[0].bars[i].value = value;
      myBarChart.datasets[0].bars[i].label = data.name[i];
    });
    data.percentPlayedPost.forEach(function(value, i) {
      myBarChart.datasets[1].bars[i].value = value;
      myBarChart.datasets[1].bars[i].label = data.name[i];
    });

    myBarChart.update();
  });
}
