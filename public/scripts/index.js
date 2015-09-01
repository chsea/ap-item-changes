window.onload = function(){
  console.log('hi');
  $.get('/items/changed-items', function(data) {
    data.forEach(function(item){
      var patch = item.notes.map(function(note) {
        return "<p><span class='title'>" + note.attr + ":</span> " + note.change + '</p>';
      });

      var info = ['<div class="index-item"><div class="item-head"><img src="/images/items/' + item.id +'.png" class="icon">',
      '<h1>' + item.name + '</h1></div>', patch.join('\n'), '</div>'];
      $('#items').append(info.join('\n'));
    });
  });
};
