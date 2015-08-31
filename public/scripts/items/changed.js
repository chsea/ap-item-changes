window.onload = function(){
	$.get('/items/changed-items', function(data) {
    data.forEach(function(item) {
      var champsPre = item.champsPre.map(function(champ) {
        return '<li class="champ" data-name="' + champ.id + '"><img src="/images/champions/' + champ.id + '.png"></li>';
      });

      var champsPost = item.champsPost.map(function(champ) {
        return '<li onmouseenter="showChampTooltip($(this).data(\'name\')" data-name="' + champ.id + '"><img src="/images/champions/' + champ.id + '.png"></li>';
      });

      var info = ['<div class="item"><img src="/images/items/' + item.id +'.png">',
      '<h1>' + item.name + '</h1>',
      // '<div class="patch">' + item.notes + '</div>',
      '<canvas id="item' + item.id +'"></canvas>',
      '<p>Built by ' + item.percentUsedPre + '% of summoners pre-patch</p>',
      '<p>Built by ' + item.percentUsedPost + '% of summoners post-patch</p>',
      '<p>Champions Most Often Building Pre-Patch:</p>',
      '<ul>' + champsPre.join('\n') + '</ul></div>',
      '<p>Champions Most Often Building Post-Patch:</p>',
      '<ul>' + champsPost.join('\n') + '</ul></div>'];
      $('#changed-content').append(info.join('\n'));

      drawChart(item);

      $('li.champ').hover(function(){
        showChampTooltip($(this).data('name'));
      }, function() {
        $('#champ-tooltip').hide();
      });
    });
  });
};
