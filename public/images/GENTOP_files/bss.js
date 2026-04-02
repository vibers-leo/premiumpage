var Language = (function(window, $, undefined) {
	var $btn, $content, outTimer;

	function init() {
		initVars();
		initEvents();
	}

	function initVars() {
		$btn = $(".language");
		$content = $(".lang-area");
	}

	function initEvents() {
		$btn.on("focusin", open);
		$btn.on("mouseenter", open);
		$btn.on("focusout", close);
		$btn.on("mouseleave", close);
	}

	function open() {
		TweenMax.to($(".lang-area"), 0.5, {
			height: 90,
			ease: Power3.easeOut
		});
		TweenMax.to($content, 0.4, {
			opacity: 1,
			display: "block",
			ease: Power3.easeIn
		});
	}

	function close() {
		TweenMax.to($(".lang-area"), 1, {
			height:0,
			ease: Power3.easeInOut
		});
		TweenMax.to($content, 0.4, {
			opacity: 0,
			display: "none"
		});
	}
	return {
		open: open,
		close: close,
		init: init
	};
})(window, $);

jQuery(document).ready(function() {
	Language.init();
});

function openMenu()
{
	jQuery("#sideMask").css("display", "block");
	jQuery(".menu-in").animate({left:0});
}

function closeMenu()
{
	jQuery(".menu-in").animate({left:"-430px"}, function(){
		jQuery("#sideMask").css("display", "none");
	});
}

jQuery(function(){
	var opacityCounter      = 0,
			megaMenuAniFinished = true;
	$(".allmenu-box .menu").click(function( e ) {
			if( !megaMenuAniFinished ) return;
			isMegaMenuOpened = true;
			megaMenuAniFinished = false;
			$("#hd .submenu-wrap").show().animate({ top: 90 }, 300, "easeInOutCubic", function() {
					$(this).css({ "z-index": "99999" });
					$(this).animate({ top: 0 }, {
							duration: 200,
							easing: "easeInOutCubic"
					});
			});

			e.preventDefault();
	});

	$("#hd .submenu-wrap .side-close").click(function( e ) {
		opacityCounter = 0;
		isMegaMenuOpened = false;

		$("#hd .submenu-wrap").animate({ top: -480 }, 300, "easeInBack", function() {
				$(this).hide().css({ "z-index": "-1" });
				megaMenuAniFinished = true;
		});

		$(".util .menu").focus();
		e.preventDefault();
	});

	jQuery(".slnb-depth1").click(function(){
		var aa1 = jQuery(".slnb-aa1 li").length * 50;
		if( jQuery(".slnb-aa1").height() > 0 )
		{
			jQuery(".slnb-aa1").animate({"height" : 0}, 300);
			jQuery(this).find("p").removeClass("up");
		}
		else
		{
			jQuery(".slnb-aa2").animate({"height" : 0}, 300);
			jQuery(".slnb-aa1").animate({"height" : aa1}, 300);

			jQuery(".slnb-depth2").find("p").removeClass("up");
			jQuery(this).find("p").addClass("up");
		}
	});

	jQuery(".slnb-depth2").click(function(){
		var aa1 = jQuery(".slnb-aa2 li").length * 50;
		if( jQuery(".slnb-aa2").height() > 0 )
		{
			jQuery(".slnb-aa2").animate({"height" : 0}, 300);
			jQuery(this).find("p").removeClass("up");
		}
		else
		{
			jQuery(".slnb-aa1").animate({"height" : 0}, 300);
			jQuery(".slnb-aa2").animate({"height" : aa1}, 300);

			jQuery(".slnb-depth1").find("p").removeClass("up");
			jQuery(this).find("p").addClass("up");
		}
	});

	jQuery(".slnb-aa2 a").click(function(){
		var mtxt = jQuery(this).text();

		jQuery(".slnb-aa2").animate({"height" : 0}, 300);
		jQuery(".slnb-depth2 a p span").text(mtxt);
	});

	jQuery(".lan-area").hover(function(){
		jQuery(".lan-area").animate({
			height:"110px"
		});
	}, function(){
		jQuery(".lan-area").animate({
			height:"29px"
		});
	});
});
