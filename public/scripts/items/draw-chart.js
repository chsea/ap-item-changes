function drawChart(item) {
  var barChartData = {
    labels : ['Pre-Patch', 'Post-Patch'],
    datasets : [
      {
        fillColor : "rgba(220,220,220,0.5)",
        strokeColor : "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data : [item.percentUsedPre, item.percentUsedPost]
      }
    ],
  };

  var ctx = document.getElementById("item" + item.id).getContext("2d");

  window.myBarChart = new Chart(ctx).Bar(barChartData, {
    responsive: false,
    scaleLabel: "<%= value + '%'%>",
    barShowStroke: false
  });
}
