$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

$(document).ready(() => {
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();
  particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });
} );

