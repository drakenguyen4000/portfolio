$(".js--wp-1, .js--wp-2, .js--wp-3").waypoint(
  function(direction) {
    $(".js--wp-1, .js--wp-2, .js--wp-3").addClass("animated fadeIn");
  },
  {
    offset: "50%"
  }
);


