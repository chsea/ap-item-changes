function showChampTooltip(id) {
  $.get('/champions/id/' + id, function(champ) {
    $('#champ-tooltip').html(champ.name);

    $('#champ-tooltip').css({
      position: 'fixed',
      left: 0,
      top: 0
      // left: event.clientX + 10 + 'px',
      // top: event.clientY + 10 + 'px'
    });

    $('#champ-tooltip').show();
  });
}
