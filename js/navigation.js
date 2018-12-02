/*! CLICK NAVIGATION FUNCTIONALITY
/* Version: 1.0
/* Author: Nick Goodrum
/* Followed WAI-ARIA spec except for typing a letter key keyboard functionality
/* TO DO - CALLBACKS, DATA-ATTRIBUTES, CLEARING FOCUS CLASS WHEN TABBED AWAY WITHOUT OPENING MENU */

(function($){
	'use strict';

	/*----------- ADD DEBOUNCER -----------*/

	// Code from Underscore.js

	var debounce = function (func, wait, immediate) {
		var timeout;
		return function () {
			var context = this, args = arguments;
			var later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	/*-----------  ADD PROTOTYPE FOR OLDER BROWSERS -----------*/
	if (!Function.prototype.bind) {
		Function.prototype.bind = function(){
			var fn = this, args = Array.prototype.slice.call(arguments),
				object = args.shift();
			return function(){
				return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
			};
		};
	}

	/*----------- ADD MATCHMEDIA -----------*/

	function $matchMediaBL() {
		return(matchMedia('(min-width:768px)').matches);
	}

	var ClickMenu = (function() {

		function ClickMenu(element, settings) {
			var _ = this,
				dataSettings;

			_.defaults = {
				menutype : "dropdown",
				animationSpeed : 400,
				toggle : "toggle-menu",
				menu: "cm-menu",
				htmlClass: "cm-js-menu-active",
				expanderText: "expand / collapse",
				landings : false,
				expanders: false,
				singleClick : true,
				fadeObject : '#cmlla'
			};

			dataSettings = $(element).data() || {};

			_.options = $.extend({}, _.defaults, dataSettings, settings);

			_.menu = element;
			_.$menu = $(element);
			_.$menuBar = _.$menu.find("." + _.options.menu);
			_.$menuToggle = _.$menu.find("." + _.options.toggle);
			_.isActive = false;
			_.lastEventType;
			_.currentFocus = 0;
			_.initialLinks = [];
			_.currentLinks = [];

			_.keyHandler = $.proxy(_.keyHandler, _);
			_.showMenu = $.proxy(_.showMenu, _);
			_.hideMenu = $.proxy(_.hideMenu, _);
			_.menuToggle = $.proxy(_.menuToggle, _);
			_.fadeToggle = $.proxy(_.fadeToggle, _);
			_.subMenuToggle = $.proxy(_.subMenuToggle, _);
			_.menuHandler = $.proxy(_.menuHandler, _);
			_.menuToggleHandler = $.proxy(_.menuToggleHandler, _);

			_.init();
		}

		return ClickMenu;
	}());

	ClickMenu.prototype.init = function() {
		var _ = this;

		//Bind Toggle Function to expand/collapse menu in small screens
		_.$menuToggle.on("click touchstart", _.menuToggle);

		// Add Aria Aspects and initial classes to menu wrap and menu
		_.$menu.addClass("cm-js-enabled").attr({"role" : "navigation", "tabindex": "0"});
		_.$menuBar.attr("role", "menubar");

		//If there are prior dropdowns you want to get the highest one and add to the numbers
		var idNum = 1;

		if ( $("[id^='cm-dropdown']").last().length > 0 ) {
			var highestNum = 0;

			$("[id^='cm-dropdown']").each(function(){
				var currentNum = $(this).attr("id").split("dropdown")[1];

				highestNum = currentNum && highestNum < parseInt(currentNum, 10) ? parseInt(currentNum, 10) : highestNum;
			});

			idNum = highestNum + 1;
		}

		_.$menu.on('keydown', _.keyHandler);

		// Change into FOCUS with corresponding namespace function
		_.$menu.on("focus", function(){
			if ( _.$menuToggle.is(":visible") && !_.isActive ){
				_.showMenu();
			}

			if ( ! _.$menu.hasClass("cm-js-inFocus") && ! _.isActive ) {
				_.$menu.addClass("cm-js-inFocus").attr("tabindex", "-1");

				_.currentLinks[_.currentFocus].attr("tabindex", "0").focus();
			}

		});

		_.initialLinks = [];

		_.$menu.find("." + _.options.menu + " a").each(function () {
			var $anchor = $(this);
			var $parentLi = $anchor.closest('li');

			$anchor.attr({"role" : "menuitem", "tabindex" : "-1" });
			$parentLi.attr("role", "presentation");

			if ( ! $parentLi.data("type") && $parentLi.parent().hasClass(_.options.menu)) {
				$parentLi.attr('data-type', _.options.menutype);
			}

			// Have anchor do what it normally would do unless it has subs

			if ($anchor.siblings().not("a").length > 0) {
				//Style it up via class
				var $expandable = $anchor.siblings();

				var newID = "cm-dropdown" + idNum;

				if (_.options.expanders) {
					var $sibling = $("<a id='"+ newID +"' href='#' role='menuitem' aria-haspopup='true' class='has-sub' tabindex='-1'><span><span class='visually-hidden'>" + _.options.expanderText + "</span></span></a>");
					$anchor.wrap("<div class='expander-wrap'></div>").after($sibling);

					$sibling.on("click", _.subMenuToggle);
				} else {
					//if there is an ID use it and make sure the expandable item gets it otherwise add the new id created
					$anchor.attr("id") ? newID = $anchor.attr("id") : $anchor.attr("id", "cm-dropdown" + idNum);
					// bind click functionality for anchors as well as aria / class
					$anchor.attr({ "aria-haspopup" : "true"}).addClass("has-sub").on("click", _.subMenuToggle);
				}

				var visibleAlready = $expandable.height() > 0 ? true : false;
				$expandable.attr({"role": "menu", "aria-expanded" : visibleAlready, "aria-hidden" : !visibleAlready, "aria-labelledby" : newID });

				if (_.options.landings && !_.options.expanders) {
					var $duplicate = $expandable.is("ul") ? $("<li class='link-landing'>" + $anchor.get(0).outerHTML + "</li>") : $("<div class='link-landing'>" + $anchor.get(0).outerHTML + "</div>");
					$duplicate.children().removeAttr("aria-haspopup class id");
					$duplicate.find("a").removeClass("has-sub");
					$expandable.prepend($duplicate);
				}

				if ( $parentLi.data("type") && $parentLi.data("type") === "sliding") {
					var $subMenu = $("<div class='sub-menu cm-js-inactive'></div>");

					$expandable.wrap($subMenu);

					var adjustMenu = function(){
						var maxWidth = _.$menu.innerWidth(),
							leftPosition = $parentLi.position().left,
							$adjustable;

						$adjustable = $parentLi.children(".sub-menu");
						$adjustable.find("> ul > li > ul").innerWidth(maxWidth);

						$adjustable.innerWidth(maxWidth).css("left", "-" + leftPosition + "px");
					};

					var debounceAdjustments = debounce(adjustMenu, 300);

					$(window).load(function(){
						adjustMenu();

						$(window).resize(debounceAdjustments);
					});

				}

				if (newID === "cm-dropdown" + idNum) {
					idNum++;
				}
			}

			// ADD In Initial Links for main tier
			if ( $anchor.closest("[role]:not(a)").data("type") ) {
				_.initialLinks.push($anchor);

				if (_.options.expanders) {
					_.initialLinks.push($sibling);
				}
			}

		});

		_.currentLinks = _.initialLinks;

	};

	ClickMenu.prototype.keyHandler = function(e) {
		var _ = this;

		if ( ! _.$menu.hasClass("cm-js-inFocus") ) {
			_.$menu.addClass("cm-js-inFocus").attr("tabindex", "-1");
		}
		//LEFT UP RIGHT DOWN
		if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
			//Prevent Scrolling aspects from browser
			e.preventDefault();

			//Maintain currentLink since it will potentially be overwritten wtih the next focus
			var oldLink = _.currentLinks[_.currentFocus];

			//Don't do anything if in mid transition
			if (oldLink) {
				var inMainTier = oldLink.closest("[role]:not(a)").attr("data-type"),
					inSecondTier = oldLink.closest("[role=menu]:not(a)").closest("[role=presentation]").attr("data-type"),
					next, direction, close, open;

				//IF LEFT / UP  (Depending on TIER) change next item to rotate to

				if (inMainTier) {
					// IF LEFT / RIGHT rotate to new item
					if (e.keyCode === 37) {
						direction = "prev";
					} else if (e.keyCode === 39) {
						direction = "next";
					} else if (e.keyCode === 40 || e.keyCode === 38) {
						open = true;
					}
				} else {
					// IF UP / DOWN rotate to new item - IF LEFT on sub subs close menu
					if (e.keyCode === 38) {
						direction = "prev";
					} else if (e.keyCode === 40) {
						direction = "next";
					} else if ( e.keyCode === 39) {
						open = true;
					} else if ( ! inSecondTier && e.keyCode === 37 ) {
						close = true;
					}
				}

				if (direction) {

					if (direction === "prev") {
						//If there aren't any prior items move to last item in the list
						_.currentFocus = _.currentFocus - 1 >= 0 ? _.currentFocus - 1 : _.currentLinks.length - 1;
					} else {
						//If there aren't any more items move to first item in the list
						_.currentFocus = _.currentFocus + 1 < _.currentLinks.length ? _.currentFocus + 1 : 0;
					}
					next = _.currentLinks[_.currentFocus];

				}

				//If there isn't anything next click the anchor
				if (next) {
					oldLink.attr("tabindex", "-1");
					_.currentLinks[_.currentFocus].attr("tabindex", "0").focus();
				} else if (close) {
					//Same as ESCAPE
					_.$menu.find(".opened").last().find("[aria-haspopup]").first().trigger("click");
				} else if (open) {
					//Only open if it isn't opened - escape is how to close a menu
					if ( ! oldLink.closest("li").hasClass("clicked") ) {
						_.currentLinks[_.currentFocus].trigger("click");
					}
				}
			}
			//ESCAPE
		} else if (e.keyCode === 27) {
			e.preventDefault();
			_.$menu.find(".opened").last().find("[aria-haspopup]").first().trigger("click");
			//SPACE BAR
		} else if (e.keyCode === 32) {
			e.preventDefault();
			_.currentLinks[_.currentFocus].trigger("click");
		}
	};

	ClickMenu.prototype.cleanUpEvents = function () {
		var _ = this;
		_.$menu.find("li a").off("click", _.subMenuToggle);
		_.$menu.find("li a[tabindex=0]").attr("tabindex", "-1");

		// Change into FOCUS with corresponding namespace function
		_.$menu.off("focus");
		_.$menu.off('keydown', _.keyHandler);

		$("html").off("click touchstart focusin", _.menuHandler);
		$("html").off("click touchstart", _.menuToggleHandler);
	};

	ClickMenu.prototype.destroy = function() {
		var _ = this;

		_.$menu.removeClass("cm-js-enabled cm-js-inFocus");
		_.$menu.find("li").removeClass("opened animating animated");
		_.cleanUpEvents();
	};

	ClickMenu.prototype.showMenu = function() {
		var _ = this;

		_.isActive = true;
		_.$menu.addClass("cm-js-active");

		_.$menuToggle.addClass("active");
		$("html").addClass(_.options.htmlClass); // ADD FOR INITIAL STYLING

		_.$menu.focus();

		$("html").off("click touchstart", _.menuToggleHandler);
		// ADD TOGGLE HANDLER AFTER ANIMATION TO PREVENT CLOSING MENUS FROM REMOVING THE HANDLER
		if ($matchMediaBL()) {
			setTimeout(function(){
				$("html").addClass(_.options.htmlClass).on("click touchstart focusin", _.menuToggleHandler);
			}, _.options.animationSpeed);
		}
		
		_.fadeToggle(true);
		
	};

	ClickMenu.prototype.hideMenu = function() {
		var _ = this;
		_.isActive = false;
		_.$menu.removeClass("cm-js-active cm-js-inFocus");
		_.$menuToggle.removeClass("active");

		if ($matchMediaBL()) {
			$("html").removeClass(_.options.htmlClass).addClass("cm-animate-out").off("click touchstart focusin", _.menuToggleHandler);
		}

		setTimeout(function(){
			$("html").removeClass("cm-animate-out");
		}, _.options.animationSpeed);

		_.fadeToggle(true);

	};

	ClickMenu.prototype.menuToggle = function(e) {
		var _ = this;
		e.preventDefault();
		if ( ! (_.lastEventType === "touchstart" && e.type === "click") ) {
			_.isActive ? _.hideMenu() : _.showMenu();
		}
		_.lastEventType = e.type;
	};

	ClickMenu.prototype.fadeToggle = function(isMobi,e) {
		var _ = this;
		var $menu = $(_.$menu);
		var $fadeObject = $(_.options.fadeObject);
		if (isMobi) {
			$fadeObject.toggleClass('activeMobi');
		} else {
			if ( !$menu.find('.toggle-menu').is(':visible') ) {
				if (e && $fadeObject.hasClass('active') && !$menu.find('.cm-menu>li').hasClass('opened')) {
					$fadeObject.removeClass('active');
					setTimeout(function(){$fadeObject.removeClass('opened');},_.options.animationSpeed);
				} else if (!$fadeObject.hasClass('active') && $menu.find('.cm-menu>li').hasClass('opened')) {
					$fadeObject.addClass('opened active');
				}
			}
		}
	}

	ClickMenu.prototype.subMenuToggle = function(e) {
		var _ = this;

		var $currAnchor = $(e.currentTarget),
			$parentLi = $currAnchor.closest("li"),
			$menuCol = $currAnchor.closest("[data-type]"),
			menuType = $menuCol.data("type"),
			relatedMenu = $("[aria-labelledby=" + $currAnchor.attr("id") + "]");

		if ($parentLi.hasClass("opened")) {

			$("html").off("click touchstart focusin", _.menuHandler);

			if (_.options.singleClick) {
				e.preventDefault();

				if (menuType === "sliding" && $parentLi.parents(".sub-menu").hasClass("sub-menu")) {
					$parentLi.parents(".sub-menu").addClass("cm-js-inactive");
				}

				$parentLi.removeClass("opened animating animated");

				if (_.$menu.find(".opened").length > 0){
					$("html").on("click touchstart focusin", _.menuHandler);
				}

				relatedMenu.attr({ "aria-expanded" : "false", "aria-hidden" : "true" });

				$.each(_.currentLinks, function() {
					var $anchor = this;
					$anchor.attr("tabindex", "-1");
				});

				_.currentLinks = [];

				setTimeout(function(){
					if ( ! $parentLi.data("type") ) {
						var actualKey = 0;

						$parentLi.closest("[role=menu]").find("a").each(function(key, val){
							//How do you find :hidden items that aren't actually hidden? Check the height of the parent - be careful of floating clearout issues
							var $val = $(val);
							//Looks like even with animation speed done correctly there can be a minor amount of pixels still transitioning in css
							if ($val.closest("[role=menu]").height() > 10 && $val.closest("[role=menu]").width() > 10) {
								_.currentLinks.push($val);

								if ($currAnchor.attr("id") === $val.attr("id")) {
									_.currentFocus = actualKey;
								}

								actualKey++;
							}
						});
					} else {
						_.currentLinks = _.initialLinks;
						_.currentFocus = $parentLi.index();
					}

					$currAnchor.attr("tabindex", "0").focus();
				}, _.options.animationSpeed);

			}

			_.fadeToggle(false,true);

		} else {
			// Otherwise Open submenu and attach site click handler
			// Also - close any other open menus and their children
			e.preventDefault();

			$parentLi.addClass("opened animating").siblings().removeClass("opened animating animated")
				.find(".opened").removeClass("opened animating animated");

			$parentLi.siblings().find(".sub-menu").addClass("cm-js-inactive");

			if ( menuType === "sliding" && $parentLi.parents(".sub-menu").length > 0 ) {
				$parentLi.parents(".sub-menu").removeClass("cm-js-inactive");
			}

			relatedMenu.attr({ "aria-expanded" : "true", "aria-hidden" : "false" });

			$.each(_.currentLinks, function() {
				var $anchor = this;
				$anchor.attr("tabindex", "-1");
			});

			_.currentLinks = [];

			//Wait until timer is complete so the bindings and currentLink groupings don't overlap
			setTimeout(function(){
				if ($parentLi.hasClass("animating")) {
					$parentLi.removeClass("animating").addClass("animated");
				}

				$parentLi.find("[role=menu]").first().find("a").each(function(key, val){
					//How do you find :hidden items that aren't actually hidden? Check the height of the parent - be careful of floating clearout issues
					var $val = $(val);

					if ( $val.closest("[role=menu]").height() > 10 && $val.closest("[role=menu]").width() > 10 ) {
						_.currentLinks.push($val);
					}
				});

				//this below code is an addition from Kyle at SMP. it auto opens the submenu navigation window if it is not opened. it also sets the focus onto the last submenu that was oepend for mobile
				if($parentLi.find(".sub-menu-list").first().attr("aria-expanded") == "false") {
					_.currentLinks[0].trigger("click");
				}
				if($parentLi.find(".sub-menu").attr("class") == "sub-menu cm-js-inactive") {
					_.currentLinks[0].trigger("click");
				}
				//end kyles changes

				_.currentFocus = 0;
				_.currentLinks[_.currentFocus].attr("tabindex", "0").focus();

				// ADD TOGGLE HANDLER AFTER ANIMATION TO PREVENT CLOSING MENUS FROM REMOVING THE HANDLER
				if ($matchMediaBL()) {
					$("html").on("click touchstart focusin", _.menuHandler);
				}

			}, _.options.animationSpeed);

			_.fadeToggle(false,false);

		}
	};

	ClickMenu.prototype.menuToggleHandler = function(e) {
		var _ = this;

		if ( ! $.contains(_.menu, e.target) ) {
			_.$menu.find("." + _.options.toggle).trigger("click");
			$("html").removeClass(_.options.htmlClass).off("click touchstart", _.menuToggleHandler);
		}
	};

	ClickMenu.prototype.menuHandler = function(e) {

		var _ = this;

		if ( ! $.contains(_.menu, e.target) && ! _.$menu.is($(e.target)) ) {
			_.$menu.find(".opened").removeClass("opened animated animating");
			_.$menu.find("[role=menu]").attr({ "aria-expanded" : "false", "aria-hidden" : "false" });
			_.$menu.find(".sub-menu").addClass("cm-js-inactive");
			_.$menu.find("li a[tabindex=0]").attr("tabindex", "-1");

			_.currentLinks = _.initialLinks;
			_.currentFocus = 0;

			$(".cm-js-inFocus").removeClass("cm-js-inFocus").attr("tabindex", "0");

			$("html").off("click touchstart focusin", _.menuHandler);

			_.fadeToggle(false,true);

		}
	};

	$.fn.clickMenu = function() {
		var _ = this,
			opt = arguments[0],
			args = Array.prototype.slice.call(arguments, 1),
			l = _.length,
			i = 0,
			ret;

		for (i; i < l; i++) {
			if (typeof opt == 'object' || typeof opt == 'undefined') {
				_[i].clickMenu = new ClickMenu(_[i], opt);
			} else {
				ret = _[i].clickMenu[opt].apply(_[i].clickMenu, args);
			}

			if (typeof ret != 'undefined') return ret;
		}

		return _;
	};

})(jQuery);