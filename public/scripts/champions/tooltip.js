function showTooltip(info) {
  return function(tooltip) {
    var tooltipEl = $('#custom-tooltip');

    if (!tooltip) {
      console.log('why');
      tooltipEl.hide();
      return;
    }

    $.get('/champions/' + tooltip.title, function(data){
      tooltipEl.show();

      var innerHtml = [
        "<img src='/images/champions/" + data.id + ".png' width='100' height = '100' style='float: left'>",
        "<h1>" + data.name + "</h1>",
        "<h2>" + data.title + "</h2>"
      ];

      for (var title in info) innerHtml.push('<div><div class="tooltip-title">' + title + ':</div> <div class="tooltip-info">' + info[title](data) + '</div></div>');

      var itemsPre = data.itemsPre.map(function(item) {
        return '<li><img src="/images/items/' + item.id + '.png" class="item">' + (item.percent * 100).toFixed(2) + '%</li>';
      });
      var itemsPost = data.itemsPost.map(function(item) {
        return '<li><img src="/images/items/' + item.id + '.png" class="item">' + (item.percent * 100).toFixed(2) + '%</li>';
      });
      innerHtml.push('<div class="tooltip-title">Most Popular Items Pre-Patch</div><ul>' + itemsPre.join('\n') + '</ul>');
      innerHtml.push('<div class="tooltip-title">Most Popular Items Post-Patch</div><ul>' + itemsPost.join('\n') + '</ul>');

      tooltipEl.html(innerHtml.join(''));
    });

    tooltipEl.css({
      position: 'fixed',
      left: event.clientX + 10 + 'px',
      top: event.clientY - 210 + 'px'
    });
  };
}
