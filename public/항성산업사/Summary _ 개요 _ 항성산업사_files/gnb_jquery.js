$(document).ready(function() {
$("#menu_sub").hover(
	function () {
			$('.menu_list').finish().slideDown('fast');
	},
	function () {
			$('.menu_list').finish().slideUp('fast');
	}
);
});

$(document).ready(function () {
				$('#menu').tabify();
				$('#menu2').tabify();
			});

$(document).ready(function(e){
	$("#gnb").on("mouseenter",function(e){
		$(".wrap_header").stop().animate({"height":355})
	})
	$("#gnb").on("mouseleave",function(e){
		$(".wrap_header").stop().animate({"height":87})
	})
})

$(document).ready(function(){

var menu_tab = $('.submenu a.tab'), menu_item = $('.submenu .menu_list');

menu_tab.click(function(e){
		e.preventDefault();
		menu_tab.removeClass('active');
		menu_item.slideUp('normal');

		if($(this).next().is(':hidden') == true) {
			 $(this).addClass('active');
			 $(this).next().slideDown('normal');
		}
});
});
