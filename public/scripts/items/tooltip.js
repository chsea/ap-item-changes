function showTooltip(tooltip) {
  var tooltipEl = $('#custom-tooltip');

  if (!tooltip) {
    tooltipEl.hide();
    return;
  }

  $.get('/items/' + tooltip.title, function(data){
    tooltipEl.show();

    var innerHtml = [
      "<img src='/images/items/" + data.id + ".png' width='100' height = '100' style='float: left'>",
      "<h1>" + data.name + "</h1>",
      '<div><div class="tooltip-title">Frequency Used in Final Builds Pre-Patch:</div> <div class="tooltip-info">' + data.countPre + ' out of 398730 Summoners (' + data.percentUsedPre + '%)</div></div>',
      '<div><div class="tooltip-title">Frequency Used in Final Builds Post-Patch:</div> <div class="tooltip-info">' + data.countPost + ' out of 398730 Summoners (' + data.percentUsedPost + '%)</div></div>'
    ];

    var champsPre = data.champsPre.map(function(champ) {
      return '<li><img src="/images/champions/' + champ.id + '.png">' + (champ.percent * 10).toFixed(2) + '%</li>';
    });
    var champsPost = data.champsPost.map(function(champ) {
      return '<li><img src="/images/champions/' + champ.id + '.png">' + (champ.percent * 10).toFixed(2) + '%</li>';
    });
    innerHtml.push('<div class="tooltip-title">Champions Most Often Building Pre-Patch</div><ul>' + champsPre.join('\n') + '</ul>');
    innerHtml.push('<div class="tooltip-title">Champions Most Often Building Post-Patch</div><ul>' + champsPost.join('\n') + '</ul>');

    tooltipEl.html(innerHtml.join(''));
  });

  tooltipEl.css({
    position: 'fixed',
    left: event.clientX + 10 + 'px',
    top: event.clientY - 210 + 'px'
  });
}
