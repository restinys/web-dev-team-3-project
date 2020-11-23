$(document).ready(function() {
var $results = $('.result'),
  $checks = $(':checkbox[name^="f1"]');
$checks.change(function() {
  var $checked = $checks.filter(':checked');
  /* show all when nothing checked*/
  if (!$checked.length) {
    $results.show();
    return; /* quit here if nothing checked */
  }

  var filters = $('form').map(function() {
    var $checked = $(this).find('input:checkbox[name^="f1"]:checked');
    return $checked.length ? [$checked.map(function() {
      return this.value
    }).get()] : undefined;
  }).get().filter(Boolean);


  var $filtered = $results.hide();
  filters.forEach(function(values) {
    $filtered = $filtered.filter(function() {
      return $(this).data('category').split(' ').some(function(cat) {
        return values.indexOf(cat) > -1;
      });
    });
  });
  $filtered.show();

  /* do something when there aren't any matches */
  if (!$results.length) {
    alert('Ooops...no matches');
  }
});
});

