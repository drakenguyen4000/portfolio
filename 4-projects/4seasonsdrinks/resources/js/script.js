$(document).ready(function() {
  /*Scroll on button clicks*/
  $(".js--scroll-to-welcome").click(function() {
    $("html, body").animate(
      { scrollTop: $(".js--sections-welcome").offset().top },
      1000
    );
  });

  $(".js--scroll-to-ingredients").click(function() {
    $("html, body").animate(
      { scrollTop: $(".js--sections-ingredients").offset().top },
      1000
    );
  });

  $(".js--scroll-to-menu").click(function() {
    $("html, body").animate(
      { scrollTop: $(".js--sections-menu").offset().top },
      1000
    );
  });

  // Detects Scrolling and changes opacity of navigation bar
  $(document).scroll(function() {
    var $nav = $("#mainnavbar");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  });
});
