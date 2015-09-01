function showTooltip(tooltip) {
  var tooltipEl = $('#custom-tooltip');

  if (!tooltip) {
    tooltipEl.hide();
    return;
  }

  $.get('/items/' + tooltip.title, function(data){
    tooltipEl.show();

    var innerHtml = [
      "<img src='/images/items/" + data.id + ".png' class='icon'>",
      "<h1>" + data.name + "</h1>",
      '<div class="info"><div class="tooltip-title">Frequency Used in Final Builds Pre-Patch:</div> <div class="tooltip-info"><span class="red num">'  + data.countPre + '</span> out of <span class="red num">398730</span> Summoners (<span class="red num">' + data.percentUsedPre + '%</span>)</div></div>',
      '<div class="info"><div class="tooltip-title">Frequency Used in Final Builds Post-Patch:</div> <div class="tooltip-info"><span class="blue num">' + data.countPost + '</span> out of <span class="blue num">399520</span> Summoners (<span class="red num">' + data.percentUsedPost + '%</span>)</div></div>'
    ];

    var champsPre = data.champsPre.map(function(champ) {
      return '<li><img src="/images/champions/' + champ.id + '.png">' + (champ.percent * 10).toFixed(2) + '%</li>';
    });
    var champsPost = data.champsPost.map(function(champ) {
      return '<li><img src="/images/champions/' + champ.id + '.png">' + (champ.percent * 10).toFixed(2) + '%</li>';
    });
    innerHtml.push('<div class="info"><div class="tooltip-title">Champions Most Often Building Pre-Patch:</div><ul>' + champsPre.join('\n') + '</ul></div>');
    innerHtml.push('<div class="info"><div class="tooltip-title">Champions Most Often Building Post-Patch:</div><ul>' + champsPost.join('\n') + '</ul></div>');

    tooltipEl.html(innerHtml.join(''));
  });

  tooltipEl.css({
    position: 'fixed',
    left: event.clientX + 10 + 'px',
    top: event.clientY - 300 + 'px'
  });
}
