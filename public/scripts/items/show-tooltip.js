function showChampTooltip(id, event) {
  var tooltipEl = $('#champ-tooltip');
  $.get('/champions/id/' + id, function(champ) {
    var innerHtml = [
      "<div class='inner'><img src='/images/champions/" + champ.id + ".png' class='icon'>",
      "<h1>" + champ.name + "</h1>",
      "<h2>" + champ.title + "</h2>",
      '<div class="info"><span class="tooltip-title">Percent Played Pre-Patch:</span> <span class="red num inlineEl">' + (champ.percentPlayedPre * 100).toFixed(2) + '%</span>',
      '<br /><span class="tooltip-title">Percent Played Post-Patch:</span> <span class="blue num inlineEl">' + (champ.percentPlayedPost * 100).toFixed(2) + '%</span></div>',
      '<div class="info"><span class="tooltip-title">Average KDA Pre-Patch:</span> <span class="red num inlineEl">' + champ.avgKdaPre.toFixed(2) + '</span>',
      '<div class="info"><span class="tooltip-title">Average Dmg to Champs Pre-Patch:</span> <span class="red num inlineEl">' + champ.avgTotalDamageToChampsPre.toFixed(0) + '</span>',
      '<br /><span class="tooltip-title">Average Dmg to Champs Post-Patch:</span> <span class="blue num inlineEl">' + champ.avgTotalDamageToChampsPost.toFixed(0) + '</span></div>',
      '<div class="info"><span class="tooltip-title">Win Rate Pre-Patch:</span> <span class="red num inlineEl">' + (champ.winRatePre * 100).toFixed(2) + '</span>',
      '<br /><span class="tooltip-title">Win Rate Post-Patch:</span> <span class="blue num inlineEl">' + (champ.winRatePre * 100).toFixed(2) + '</span></div>'
    ];

    // for (var title in info) {
    //   if (info[title](champ).inline) innerHtml.push('<div class="info"><span class="tooltip-title">' + title + ':</span> <span class="num inlineEl">' + info[title](champ).html + '</span></div>');
    //   else innerHtml.push('<div class="info"><div class="tooltip-title">' + title + ':</div> <div class="tooltip-info">' + info[title](champ).html + '</div></div>');
    // }

    var itemsPre = champ.itemsPre.map(function(item) {
      return '<li><img src="/images/items/' + item.id + '.png">' + (item.percent * 100).toFixed(2) + '%</li>';
    });
    var itemsPost = champ.itemsPost.map(function(item) {
      return '<li><img src="/images/items/' + item.id + '.png">' + (item.percent * 100).toFixed(2) + '%</li>';
    });
    innerHtml.push('<div class="info"><div class="tooltip-title">Most Popular Items Pre-Patch:</div><ul>' + itemsPre.join('\n') + '</ul></div>');
    innerHtml.push('<div class="info"><div class="tooltip-title">Most Popular Items Post-Patch:</div><ul>' + itemsPost.join('\n') + '</ul></div></div>');

    tooltipEl.html(innerHtml.join(''));

    tooltipEl.css({
      position: 'fixed',
      left: event.clientX + 10 + 'px',
      top: event.clientY - 310 + 'px'
    });

    tooltipEl.show();
  });
}
