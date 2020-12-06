$(document).ready(function() {
  /*Scroll on buttons*/
  $(".js--scroll-to-destinations").click(function() {
    $("html, body").animate(
      { scrollTop: $(".js--sections-destinations").offset().top },
      1000
    );
  });

  $(".js--scroll-to-cuisines").click(function() {
    $("html, body").animate(
      { scrollTop: $(".js--sections-cuisines").offset().top },
      1000
    );
  });

  $(".js--scroll-to-contact-us").click(function() {
    $("html, body").animate(
      { scrollTop: $(".js--sections-contact-us").offset().top },
      1000
    );
  });

  /*Image popups*/
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function(item) {
        return item.el.attr('title');
      }
    }
  });
});

/*Destination cards fade directions*/
var card = [1, 2, 3, 4, 5, 6];

card.forEach(function(card) {
  if (card < 4) {
    $(".js--wp-" + card.toString()).waypoint(
      function(direction) {
        $(".js--wp-" + card.toString()).addClass("animated fadeInRight");
      },
      {
        offset: "50%"
      }
    );
  } else {
    $(".js--wp-" + card.toString()).waypoint(
      function(direction) {
        $(".js--wp-" + card).addClass("animated fadeInLeft");
      },
      {
        offset: "50%"
      }
    );
  }
});

/*Cuisines Images Fade in*/
$(".js--wp-7").waypoint(
  function(direction) {
    $(".js--wp-7").addClass("animated fadeIn");
  },
  {
    offset: "50%"
  }
);
