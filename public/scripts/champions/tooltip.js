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
        "<div class='inner'><img src='/images/champions/" + data.id + ".png' class='icon'>",
        "<h1>" + data.name + "</h1>",
        "<h2>" + data.title + "</h2>"
      ];

      for (var title in info) {
        if (info[title](data).inline) innerHtml.push('<div class="info"><span class="tooltip-title">' + title + ':</span> <span class="num inlineEl">' + info[title](data).html + '</span></div>');
        else innerHtml.push('<div class="info"><div class="tooltip-title">' + title + ':</div> <div class="tooltip-info">' + info[title](data).html + '</div></div>');
      }

      var itemsPre = data.itemsPre.map(function(item) {
        return '<li><img src="/images/items/' + item.id + '.png">' + (item.percent * 100).toFixed(2) + '%</li>';
      });
      var itemsPost = data.itemsPost.map(function(item) {
        return '<li><img src="/images/items/' + item.id + '.png">' + (item.percent * 100).toFixed(2) + '%</li>';
      });
      innerHtml.push('<div class="info"><div class="tooltip-title">Most Popular Items Pre-Patch:</div><ul>' + itemsPre.join('\n') + '</ul></div>');
      innerHtml.push('<div class="info"><div class="tooltip-title">Most Popular Items Post-Patch:</div><ul>' + itemsPost.join('\n') + '</ul></div></div>');

      tooltipEl.html(innerHtml.join(''));
    });

    tooltipEl.css({
      position: 'fixed',
      left: event.clientX + 10 + 'px',
      top: event.clientY - 210 + 'px'
    });
  };
}
