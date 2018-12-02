new WOW().init();

/*===========================*/
//sticky header

 jQuery( window ).resize(function() {
    jQuery(".navbar-collapse").css({ maxHeight: $(window).height() - $(".navbar-header").height() + "px" });
});

//sticky header on scroll
$(window).load(function () {
  var $sticky = $(".sticky");
  var getMatchMediaBL = true;
  var getIsStickyWrapper = true;
  $mainNav=$(".main-nav");
  function $mainNavFN(o){if(!o.is(':visible'))o.slideDown('fast');}
  function $matchMediaBL() {
    return(matchMedia('(min-width:667px)').matches);
    //this value used to be 768 when it was using the sticky nav
  }
  function $isStickyWrapper() {
    return ($(".sticky-wrapper").length>0);
  }
  function $matchMediaFN() {
    getMatchMediaBL = $matchMediaBL();
    getIsStickyWrapper = $isStickyWrapper();
    if (getMatchMediaBL && !getIsStickyWrapper) {
      $sticky.sticky({topSpacing:0}).on({
        'sticky-start':function() {
          $mainNavFN($mainNav);
        },
        'sticky-end':function() {
          $mainNavFN($mainNav);
        }
      });
    } else {
      $sticky.unstick();
    }
  }
  $matchMediaFN();
  $(window).resize($.debounce(1000,$matchMediaFN));

});

$.fn.productItemReview = function() {
  var $this=this;
  var $getNumStr;
  var $reviewInt;
  var $reviewOutput;  
  var $getNumReg=/\d+/g;
  var modItems = [
    function(){
      $getNumStr=$this.find('>div.feedbackBG').addClass("rating").next().find('b').text();
      $reviewInt=parseInt($getNumStr.match($getNumReg));
        $reviewOutput='<h3>Reviews';
        if(!isNaN($reviewInt)){$reviewOutput+=' (<span class="count">'+$reviewInt+'</span>)';}
        $reviewOutput+='</h3>';
      $this.addClass('reviews-widget').prepend($reviewOutput);
    },
    function(){
      $this.find('>p').addClass("global-rating");
      $this.find('table,tbody').css({
        'display':'block',
        'width':'auto'
      }).find('.head td:eq(0),.head td:eq(1)').css('display','block');
      $this.find('tr').css('display','block').not('.head').find('td').css('display','block');
      $this.find('table').addClass('review-body').css({
        'font-size':'0.875em',
        'line-height':'1.25em'
      }).find('.head>td:first-child').css({
        'float':'left',
        'width':'auto'}
      );
      $this.find('table').find('.head').css('margin-bottom','0').each(function(){
        $(this).addClass('review').find('.title').addClass('review-title').find('strong').replaceWith('<h5 style="margin-top:2px;">'+$(this).find('.title strong').text()+'</h5>');
      });
    },
    function(){
      $this.find('.head').find('td:eq(1)',$this).css('display','block');
      $this.find('.head').find('td:gt(2)',this).prepend('<span style="display:inline-block; margin:0 8px;">|&nbsp;</span>');
    },
    function(){
      $this.find('tr',$this).filter(':not(.head)',$this).find('td:eq(0)',$this).hide();
    }
  ];
  $(modItems).each(function(i,o){o();});
}
$('#reviewLink>span').productItemReview();


/*=========================*/
/*====main navigation and sliders====*/
/*==========================*/
jQuery(document).ready(function () {  
  //$(".main-nav").clone().appendTo("body").clickMenu({expanders:true});
  $("header .main-nav").clickMenu();
  $(".toggle-menu-header").on("click", function(e){
    e.preventDefault();
    $("body").toggleClass("sticky-menu");
    $(".is-sticky .main-nav").slideToggle();
  });
  
  if (matchMedia('(max-width:767px)').matches) {
    $(".top-categories .blocks-main").slick({
      prevArrow: "<button type='button' data-role='none' class='slick-prev'><span class='visuallyhidden'>Previous</span><span class='icon-arrowleft'></span></button>",
      nextArrow: "<button type='button' data-role='none' class='slick-next'><span class='visuallyhidden'>Next</span><span class='icon-arrowright'></span></button>"
    });
  }
  
  $('.hero-banner').slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 8000,
    prevArrow: "<button type='button' data-role='none' class='slick-prev'><span class='visuallyhidden'>Previous</span><span class='icon-arrowleft'></span></button>",
    nextArrow: "<button type='button' data-role='none' class='slick-next'><span class='visuallyhidden'>Next</span><span class='icon-arrowright'></span></button>"
  });
  
  $('.top-products').slick({
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: "<button type='button' data-role='none' class='slick-prev'><span class='visuallyhidden'>Previous</span><span class='icon-arrowleft'></span></button>",
    nextArrow: "<button type='button' data-role='none' class='slick-next'><span class='visuallyhidden'>Next</span><span class='icon-arrowright'></span></button>",
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true          
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true          
        }
      }
    ]
    
  });
  
  $('.single-product-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: !1,
    prevArrow: "<button type='button' data-role='none' class='slick-prev'><span class='visuallyhidden'>Previous</span><span class='icon-arrowleft'></span></button>",
    nextArrow: "<button type='button' data-role='none' class='slick-next'><span class='visuallyhidden'>Next</span><span class='icon-arrowright'></span></button>",
    asNavFor: '.alt-views',
    infinite: false,
    dots: true
  }); 
  $('.alt-views').slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    asNavFor: '.single-product-slider',
    dots: false,
    //centerMode: true,
    focusOnSelect: true,
    infinite: false,
    prevArrow: "<button type='button' data-role='none' class='slick-prev'><span class='visuallyhidden'>Previous</span><span class='icon-arrowleft'></span></button>",
    nextArrow: "<button type='button' data-role='none' class='slick-next'><span class='visuallyhidden'>Next</span><span class='icon-arrowright'></span></button>",      
  }); 

});

jQuery(document).ready(function(){
//    jQuery(".search-toggle").click(function(){
//        jQuery(".search-bar").slideDown('fast');
//    });
//    jQuery('.search-close').click(function () {
//            jQuery('.search-bar').slideUp();
//        });
  if (screen.width <= 1199) {
    $(".callouts").clone().appendTo("main");    
  }
  
  $("footer ul.link-list").on("click", ".expand-trigger", function(e){
    e.preventDefault();
    $(this).children(".fa").toggleClass("fa-caret-up").closest("li").find("ul.list-unstyled").toggle();
  });
  
  $(".footer .contact .showroom-text").on("click", function(e){
    e.preventDefault();
    $(this).children(".expand-trigger").children("span").toggleClass("icon-plus").toggleClass("icon-minus").closest("li").find("p").toggle();

  });
  
  // $(".coupon-code").on("click", "label", function(e){
  //  e.preventDefault();
  //  $(this).toggleClass("opened")
  //  $(".coupon-form").toggle();   
  // });

/*  
  $('.cart-total').affix({
    offset: {     
      top: $('.cart-total').top,
      bottom: ($('footer').outerHeight(true))
    }
  });
*/

    //START
    //This should be removed after we style all the right modules for the Cart 

   
    $(".ordering-insturctions textarea").attr("placeholder", "Enter ordering instructions here");
    $(".ordering-insturctions textarea").addClass("form-control");
    
    $(".gc-form input").addClass("form-control gc-number");
    $(".form-control.gc-number").attr("placeholder", "Number");
    
    $(".gc-form input+input").addClass("form-control gc-pin");
    $(".form-control.gc-pin").attr("placeholder", "Pin");
    $(".form-control.gc-pin").removeClass("gc-number");

    $(".gc-form input+input+input").addClass("btn btn-secondary");
    $(".gc-form input+input+input").removeClass("form-control gc-pin"); 
    $(".gc-form input+input+input").removeClass("button375"); 
    //$(".gc-form input+input+input").removeAttr("src"); 
    //$(".gc-form input+input+input").removeAttr("type", "image");
    //$(".gc-form input+input+input").attr("type", "submit");
    //$(".gc-form .btn.btn-secondary").attr("placeholder", "").attr("value", "Redeem");              
    $('.gc-form:contains("Number:")').each(function(){
        $(this).html($(this).html().split("Number:").join(""));
    });      
    $('.gc-form:contains("PIN:")').each(function(){
        $(this).html($(this).html().split("PIN:").join(""));
    });          
    $('.gc-form:contains(":")').each(function(){
        $(this).html($(this).html().split(":").join(""));
    });        
    
    $(".coupon-code input").addClass("form-control");
    $(".coupon-code input+input").removeClass("form-control button152"); 
    $(".coupon-code input+input").addClass("btn btn-secondary");
    //$(".coupon-code input+input").removeAttr("src"); 
    //$(".coupon-code input+input").removeAttr("type", "image");
    //$(".coupon-code input+input").attr("type", "submit");
    //$(".coupon-code input+input").attr("value", "Submit");      
    
    //$("input.pay_expr_chkout").removeAttr("src");  
    //$("input.pay_expr_chkout").removeAttr("type", "image");
    //$("input.pay_expr_chkout").attr("type", "submit");    
    //$("input.pay_expr_chkout").attr("value", "");
    
    $(".google_button span").removeAttr("style");
    $(".google_button #CBP_wrapper").removeAttr("style");
    $(".google_button span").addClass("button_disp_inline_block");
    $(".google_button span+span+span").removeClass("button_disp_inline_block");
    $(".google_button span+span+span").addClass("button_disp_block");
    $(".google_button span+span+span input").removeClass("button8"); 
    $(".google_button span+span+span input").addClass("btn-block-check"); 
    //$(".google_button span+span+span input").removeAttr("src"); 
    //$(".google_button span+span+span input").removeAttr("type", "image");
    //$(".google_button span+span+span input").attr("type", "submit");
    //$(".google_button span+span+span input").attr("value", "Checkout");    
    
    $('.table-condensed #ss_payment:contains("Select payment type:")').each(function(){
        $(this).html($(this).html().split("Select payment type:").join(""));
    });      
    
    
    $(".zipncountry tr").addClass("select-option");
    $(".zipncountry td.zipncountry_txt").attr("style", "display:none;");
    $(".zipncountry td.zipncountry input").addClass("form-control");
    $(".zipncountry td.zipncountry input").attr("placeholder", "Enter Zip");
    $(".zipncountry tr+tr+tr").addClass("second");
    
    // END
    
});

jQuery(window).load(function () {
    jQuery(".content-scroll").mCustomScrollbar({advanced: {
            updateOnContentResize: true
        },
        scrollButtons: {enable: false},
        mouseWheelPixels: "200",
        theme: "dark-2"
    });
});


//tooltips
jQuery(function () {
    jQuery('[data-toggle="tooltip"]').tooltip();
});

/**match heights**/
jQuery(document).ready(function () {
  $('.item_holder .title h5').matchHeight();
  $('.category-list-thumb h3').matchHeight();
    $('.category-brand-list-thumb').matchHeight();
  $('.product-listing .product-listing-row .item_holder .title h2').matchHeight();
  $('ul.sub-menu-list li').matchHeight();
  $('.brand-list-thumb h3').matchHeight();
});

/**temporary hawk search functionality for demo purposes, this should be deleted**/
jQuery(document).ready(function () {
  // bind click event to filter heading to hide/show for small devices
  $(".hawk-railNavHeading").on("click", function () {
    var railNavHeading = $(this);
    var hawkNavFilters = railNavHeading.next(".hawkRailNav");
    railNavHeading.toggleClass("hawk-railNavHeadingActive");
    hawkNavFilters.toggleClass("hawk-notCollapsed");
  }); 
  // bind click event to filter group heading to hide/show for small devices
  $(".hawk-guidedNavWrapper .hawk-navGroup .hawk-groupHeading").on("click", function () {
    var facetGroup = $(this).closest(".hawk-navGroup");
    facetGroup.toggleClass("hawk-notCollapsed");
  });

  // handles collapsible display on larger screens
  $(".hawk-guidedNavWrapper .hawk-collapsible .hawk-groupHeading").on("click", function () {
    var facetGroup = $(this).closest(".hawk-navGroup");
    facetGroup.toggleClass("hawk-collapsed");
    var fieldName = facetGroup.attr("data-field");
    var collapsed = false;
    if (facetGroup.hasClass("hawk-collapsed")) {
      collapsed = true;
    }
    //$.cookie(fieldName, collapsed, { expires: 365 });
  });
  $(".hawkRailNav").delegate(".hawk-navGroup li a", "mouseover mouseout click", function (event) {        
    var facetCont = $(this).parent();

    if (event.type == "mouseover") {
      facetCont.addClass("hawkFacet-hover");
    } else if (event.type == "mouseout") {
      facetCont.removeClass("hawkFacet-hover");
    } else if (event.type == "click") {
      event.preventDefault();
      facetCont.toggleClass("hawkFacet-active");
    };
  }); 
});