window.onload = function(){
	$('#top-menu h3 a:nth-child(2)').addClass('active');

	$.get('/items/changed-items', function(data) {
    data.forEach(function(item) {
      var champsPre = item.champsPre.map(function(champ) {
        return '<li class="champ" data-name="' + champ.id + '"><img src="/images/champions/' + champ.id + '.png">' + (champ.percent * 100).toFixed(2) + '%</li>';
      });

      var champsPost = item.champsPost.map(function(champ) {
        return '<li onmouseenter="showChampTooltip($(this).data(\'name\')" data-name="' + champ.id + '"><img src="/images/champions/' + champ.id + '.png">' + (champ.percent * 100).toFixed(2) + '%</li>';
      });

      var info = ['<div class="item"><div class="item-head"><img src="/images/items/' + item.id +'.png" class="icon">',
      '<h1>' + item.name + '</h1></div>',
      '<div class=".canvas-el"><canvas id="item' + item.id +'" height="100" width="200"></canvas></div>',
      '<p>Built by <span class="red num">'  + item.countPre + '</span> out of <span class="red num">398730</span> (<span class="num red inlineEl">' + item.percentUsedPre + '%</span>) of summoners pre-patch</p>',
      '<p>Built by <span class="blue num">'  + item.countPost + '</span> out of <span class="blue num">399520</span> (<span class="num blue inlineEl">' + item.percentUsedPost + '%</span>) of summoners post-patch</p>',
      '<p>Champions Most Often Building Pre-Patch:</p>',
      '<ul>' + champsPre.join('\n') + '</ul>',
      '<p>Champions Most Often Building Post-Patch:</p>',
      '<ul>' + champsPost.join('\n') + '</ul></div>'];
      $('#changed-content').append(info.join('\n'));

      drawChart(item);

      $('li.champ').hover(function(event){
        showChampTooltip($(this).data('name'), event);
      }, function() {
        $('#champ-tooltip').hide();
      });
    });
  });
};
