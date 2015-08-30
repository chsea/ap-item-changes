function showTooltip(info) {
  return function(tooltip) {
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

      for (var title in info) {
        innerHtml.push('<div>' + title + ': ' + info[title](data));
      }

      tooltipEl.html(innerHtml.join(''));
    });

    tooltipEl.css({
      position: 'fixed',
      left: event.clientX + 10 + 'px',
      top: event.clientY - 210 + 'px'
    });
  };
}
