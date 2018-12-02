ss_jQuery(document).ready(function(){//when the document finishes loading
	var winW=ss_jQuery(window).width();//get the width of the window and store in variable winW
	if(ss_jQuery('.nav-full').css('display')=='none'){//if the menu displayed is the mobile
		var searchBar=ss_jQuery('.detachable-search-bar').detach();//cut the SEARCH BAR from its location and save in variable searchBar
		ss_jQuery('#insert-searchbar').append(searchBar);//paste it in the red bar for mobile
		ss_jQuery('.detachable-search-bar').addClass('mobile-search-bar');
		ss_jQuery('.detachable-search-bar div:first-child').addClass('mobile-search-bar-wrap');
		ss_jQuery('.btn-search-new').css('background-color','transparent');
		ss_jQuery('.btn-search-new span:first-child').addClass('mobile-icon-search');
		ss_jQuery('.btn-search-new span:first-child').removeClass('icon-search');
	}else{//if the menu displayed is desktop 
		ss_jQuery('.btn-search-new').css('background-color','#ec010b');//size return the red background to the search button
	}
	var winH=ss_jQuery(window).height();//get the height of the window
	var navH=ss_jQuery('.mobile-branding-header').height();//get the height of the header
	var scrllH=winH-(navH+99);//calculate the height of the child div inside the mobile menu dropdown to adjust the SCROLLER DIV
	ss_jQuery('.nav-scroller').css('height',scrllH+'px');//set the height on the child div inside the mobile menu dropdown

/*remove 'if' after split test*/
	if(ss_jQuery('.nav-mobile:visible').length!=0){//if old menu is up
		//ss_jQuery('#expertsewingconsultants').attr('display','block');
		ss_jQuery('.cmlla').addClass('new-cmlla');
	}else{//new menu is up
		//ss_jQuery('#expertsewingconsultants').css('display','none');
		ss_jQuery('.cmlla').removeClass('new-cmlla');
	}

	if(devBrowser.indexOf('msie')!=-1||devBrowser.indexOf('trident')!=-1){//check if the device is using any IE below Edge
		//ss_jQuery('head').append('<link rel="stylesheet" href="/AE/css/smp-nav-ie.css"/>');//if yes use the stylesheet for IE
		//$(".locations-container").addClass( "ie-padding-icons" );
		$(".locations-container, .mobile-search-btn").css('padding','37px 0 0 20px');
	}
});//end on document ready function

ss_jQuery(window).resize(function(){//function to run when the window is resized
	var winW=ss_jQuery(window).width();//get the window width and save in variable winW
	var searchBar=ss_jQuery('.detachable-search-bar').detach();//cut the SEARCH BAR from its location and save in variable searchBar
	if(ss_jQuery('.nav-full').css('display')=='none'){//if the desktop menu is displayed
		ss_jQuery('#insert-searchbar').append(searchBar);//paste it in the red bar for mobile
		ss_jQuery('.detachable-search-bar').addClass('mobile-search-bar');
		ss_jQuery('.detachable-search-bar div:first-child').addClass('mobile-search-bar-wrap');
		ss_jQuery('.btn-search-new').css('background-color','transparent');
		ss_jQuery('.btn-search-new span:first-child').addClass('mobile-icon-search');
		ss_jQuery('.btn-search-new span:first-child').removeClass('icon-search');
	}else{//if the menu displayed is desktop 
		ss_jQuery('.search-container').append(searchBar);//paste the search bar in its regular place next to the logo
		ss_jQuery('.btn-search-new').css('background-color','#ec010b');//set the background color to red on the search button
	}
	var winH=ss_jQuery(window).height();//get the window Height
	var navH=ss_jQuery('.mobile-branding-header').height();//
	var scrllH=winH-(navH+99);
	ss_jQuery('.nav-scroller').css('height',scrllH+'px');
/*remove 'if' after split test*/
	if(ss_jQuery('.nav-mobile:visible').length!=0){//if old menu is up
		//ss_jQuery('#expertsewingconsultants').attr('display','block');
		ss_jQuery('.cmlla').addClass('new-cmlla');
	}else{//new menu is up
		//ss_jQuery('#expertsewingconsultants').css('display','none');
		ss_jQuery('.cmlla').removeClass('new-cmlla');
	}
});

//mobile dropdown
ss_jQuery('.mobile-search-btn, .mobile-search-toggle-wrap, .mobile-search-toggle').on('click touchstart',function(event){
	/*event.preventDefault();*/
	ss_jQuery('.mobile-search-bar').toggleClass('search-active');
	/*close menu when search bar opened*/
	if(ss_jQuery('div.mobile-dropdown').hasClass('dropdown-active')){
		ss_jQuery('.menu-icon-bar').toggleClass('burger-active');
		ss_jQuery('.mobile-dropdown').toggleClass('dropdown-active');
	}
	return false; //test
});

var devBrowser=window.navigator.userAgent;
var stringBrowser=String(devBrowser);
devBrowser=stringBrowser.toLowerCase();


function disableDocumentScrolling() {
    if (document.documentElement.style.position != 'fixed') {
        // Get the top vertical offset.
        var topVerticalOffset = (typeof window.pageYOffset != 'undefined') ?
            window.pageYOffset : (document.documentElement.scrollTop ? 
            document.documentElement.scrollTop : 0);
        // Set the document to fixed position (this is the only way around IOS' overscroll "feature").
        document.documentElement.style.position = 'fixed';
        // Set back the offset position by user negative margin on the fixed document.
        document.documentElement.style.marginTop = '-' + topVerticalOffset + 'px';
    }
}

function enableDocumentScrolling() {
    if (document.documentElement.style.position == 'fixed') {
    	if(devBrowser.indexOf('msie')!=-1||devBrowser.indexOf('trident')!=-1/*||devBrowser.indexOf('edge')!=-1*/){
			//console.log('its IE: '+devBrowser);
			// Remove the fixed position on the document.
        	document.documentElement.style.position = 'static';
		}else{
			//console.log('its not IE: '+devBrowser);
			// Remove the fixed position on the document.
        	document.documentElement.style.position = 'static';
		}
        // Calculate back the original position of the non-fixed document.
        var scrollPosition = -1 * parseFloat(document.documentElement.style.marginTop);
        // Remove fixed document negative margin.
        document.documentElement.style.marginTop = null;
        // Scroll to the original position of the non-fixed document.
        window.scrollTo(0, scrollPosition);
    }
}

function goToNav(location, destination){
	var currentLoc="navblock"+location;
	var targetLoc="navblock"+destination;
	ss_jQuery('#'+currentLoc).css('display','none');
	ss_jQuery('#'+targetLoc).fadeIn('fast',function(){});
	ss_jQuery('#'+targetLoc).css('display','block');
}

ss_jQuery('.hamburger-menu').on('click touchstart', function(event){
	/*event.preventDefault();*/
	ss_jQuery('.menu-icon-bar').toggleClass('burger-active');
	ss_jQuery('.mobile-dropdown').toggleClass('dropdown-active');
	/*close search bar when the menu is opened*/
	if(ss_jQuery('.mobile-search-bar').hasClass('search-active')){
		ss_jQuery('.mobile-search-bar').toggleClass('search-active');
	}	
	/*disable scroll when menu is active and refresh menu on close*/
	if(ss_jQuery('div.mobile-dropdown').hasClass('dropdown-active')){
		ss_jQuery('body').css('position','relative');
		ss_jQuery('html').css('overflow','hidden');
		disableDocumentScrolling();
	}else{
		ss_jQuery('body').css('position','');
		ss_jQuery('html').css('overflow','');
		enableDocumentScrolling();
		/*refresh nav position*/
		ss_jQuery('#navblock0').css('display','block');
		ss_jQuery('#navblock1, #navblock2, #navblock3, #navblock4, #navblock5, #navblock6, #navblock7, #navblock8, #navblock9, #navblock10, #navblock11, #navblock12, #navblock13, #navblock14, #navblock15, #navblock16, #navblock17, #navblock18, #navblock19, #navblock20, #navblock21, #navblock22, #navblock23, #navblock24, #navblock25, #navblock26, #navblock27, #navblock28, #navblock29, #navblock30, #navblock31, #navblock32').css('display','none');
	}
	/*allow inside divs to scroll even when body html is prevented*/
	ss_jQuery('nav-scroller').on('touchstart touchmove',function(){

	});
	return false; //test
});

//tier 1 buttons PRODUCTS - BRANDS
ss_jQuery('#products-btn').mouseover(function(){
	ss_jQuery('.navbar-products-dropdown').css('display','block');
	ss_jQuery('#blinder-overlay').css('display','block');
});

ss_jQuery('#products-btn').mouseout(function(){
	ss_jQuery('.navbar-products-dropdown').css('display','none');
	ss_jQuery('#blinder-overlay').css('display','none');
});

ss_jQuery('#browse-btn').mouseover(function(){
	ss_jQuery('.navbar-browse-dropdown').css('display','block');
	ss_jQuery('#blinder-overlay').css('display','block');
});

ss_jQuery('#browse-btn').mouseout(function(){
	ss_jQuery('.navbar-browse-dropdown').css('display','none');
	ss_jQuery('#blinder-overlay').css('display','none');
});

ss_jQuery('#brands-btn').mouseover(function(){
	ss_jQuery('.navbar-brands-dropdown').css('display','block');
	ss_jQuery('#blinder-overlay').css('display','block');
});

ss_jQuery('#brands-btn').mouseout(function(){
	ss_jQuery('.navbar-brands-dropdown').css('display','none');
	ss_jQuery('#blinder-overlay').css('display','none');
});
//products dropdown
var openSubCats=function(a){
	var category=ss_jQuery('#'+a.id).attr('name');
	ss_jQuery('#'+category).css('display','block');
	ss_jQuery('#tier2-'+category).toggleClass('active-tier2');
}

var closeSubCats=function(a){
	var category=ss_jQuery('#'+a.id).attr('name');
	if(cancelClose===true){return false;}
	ss_jQuery('#'+category).css('display','none');
	ss_jQuery('#tier2-'+category).toggleClass('active-tier2');
	resetMenu();
}

var openMenu=function(a){
	//var category=ss_jQuery('#'+a.id).attr('name');
	ss_jQuery('#'+a).css('display','block');
	if(ss_jQuery('#tier2-'+a).hasClass('active-tier2')){
	}else{
		ss_jQuery('#tier2-'+a).toggleClass('active-tier2');
	}
}

var closeMenu=function(a){
	//var category=ss_jQuery('#'+a.id).attr('name');
	ss_jQuery('#'+a).css('display','none');
	if(ss_jQuery('#tier2-'+a).hasClass('active-tier2')){
		ss_jQuery('#tier2-'+a).toggleClass('active-tier2');
	}
	resetMenu();
	cancelClose=false;
}
//brands dropdown
var openSubBrands=function(a){
	category=ss_jQuery('#'+a.id).attr('name');
	ss_jQuery('#'+category+'-menu').css('display','block');
	ss_jQuery('#tier2-'+category).toggleClass('active-tier2');
}

var closeSubBrands=function(a){
	category=ss_jQuery('#'+a.id).attr('name');
	if(cancelClose===true){return false;}
	ss_jQuery('#'+category+'-menu').css('display','none');
	ss_jQuery('#tier2-'+category).toggleClass('active-tier2');
	resetMenu();
}

var openBrandMenu=function(a){
	var category=ss_jQuery('#'+a).attr('name');
	ss_jQuery('#'+category+'-menu').css('display','block');
	if(ss_jQuery('#tier2-'+category).hasClass('active-tier2')){
	}else{
		ss_jQuery('#tier2-'+category).toggleClass('active-tier2');
	}
}

var closeBrandMenu=function(a){
	var category=ss_jQuery('#'+a).attr('name');
	ss_jQuery('#'+a).css('display','none');
	if(ss_jQuery('#tier2-'+category).hasClass('active-tier2')){
		ss_jQuery('#tier2-'+category).toggleClass('active-tier2');
	}
	resetMenu();
	cancelClose=false;
}
function resetMenu(){
	if($('.navbar-products-dropdown, .navbar-brands-dropdown').find('.active-tier2').length>0){
		$('.active-tier2').toggleClass('active-tier2');
	}
}

//hoverIntent
var config={
	over: function(){openSubCats(this)},
	out: function(){closeSubCats(this)},
	timeout:300
};

var brandConfig={
	over: function(){openSubBrands(this)},
	out: function(){closeSubBrands(this)},
	timeout:300
};

var cancelClose;

$('#tier2-sewing').hoverIntent(config);
$('#tier2-embroidery').hoverIntent(config);
$('#tier2-quilting').hoverIntent(config);
$('#tier2-serger').hoverIntent(config);
$('#tier2-industrial').hoverIntent(config);
$('#tier2-furniture').hoverIntent(config);
$('#tier2-vacuum').hoverIntent(config);
$('#tier2-irons').hoverIntent(config);
$('#tier2-brands').hoverIntent(config);

$('#tier2-babylock').hoverIntent(brandConfig);
$('#tier2-bernina').hoverIntent(brandConfig);
$('#tier2-brother').hoverIntent(brandConfig);
$('#tier2-handiquilter').hoverIntent(brandConfig);
$('#tier2-viking').hoverIntent(brandConfig);
$('#tier2-janome').hoverIntent(brandConfig);
$('#tier2-juki').hoverIntent(brandConfig);
$('#tier2-pfaff').hoverIntent(brandConfig);
$('#tier2-reliable').hoverIntent(brandConfig);
$('#tier2-miele').hoverIntent(brandConfig);
$('#tier2-oreck').hoverIntent(brandConfig);
$('#tier2-dyson').hoverIntent(brandConfig);
$('#tier2-singer').hoverIntent(brandConfig);
$('#tier2-all').hoverIntent(brandConfig);

ss_jQuery('html').mousemove(function(){
	ss_jQuery('.tier3-content').mouseenter(function(){
		var catId=ss_jQuery(this).attr('id');
		if(catId.indexOf('menu')!==-1){
			openBrandMenu(catId);
			cancelClose=true;
		}else{
			openMenu(catId);
			cancelClose=true;
		}
	});
	ss_jQuery('.tier3-content').mouseleave(function(){
		var wrapId=ss_jQuery(this).attr('id');
		if(wrapId.indexOf('menu')!==-1){
			closeBrandMenu(wrapId);
		}else{
			closeMenu(wrapId);
		}
	})
});


$('a.shopping-bag').attr('href',shoppingCartURL);

//$(".addtocart_button").replaceWith("<input id=\"btn_att_cart\" data-toggle=\"tooltip\" data-placement=\"top\" class=\"addtocart_button btn btn-skin btn-lg btn-block\" name=\"Add to Bag\" type=\"submit\" value=\"Add To My Bag\" data-original-title=\"\" title=\"\" style=\"background-color: rgb(40, 177, 29);\">");
//$(".btn-skin").css("background-color","#28b11d");
//$(".google_button .btn-block-check").css("background-color","#28b11d");
//$(".product-detail-desc .add-buttons .btn-att-cart").append("<style>.product-detail-desc .add-buttons .btn-att-cart:before {background:none !important;}</style>");