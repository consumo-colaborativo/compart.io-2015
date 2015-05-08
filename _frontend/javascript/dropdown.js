//  ____  ____   __  ____  ____   __   _  _  __ _ 
// (    \(  _ \ /  \(  _ \(    \ /  \ / )( \(  ( \
//  ) D ( )   /(  O )) __/ ) D ((  O )\ /\ //    /
// (____/(__\_) \__/(__)  (____/ \__/ (_/\_)\_)__)
//

$(dropdownInicia);

function dropdownInicia(){

	// Cierra popup al clickar fuera
	$('html').click(function() {
		$('.select.open').removeClass('open');
	});

	$('.select:not(.disabled)').click(function(e){
		e.stopPropagation();
		var select = $(e.target).parents('.select');
		// var drop = $(e.target).parent().find('.dropdown');
		if(select.hasClass("open")){
			select.removeClass("open");
		} else {
			$('.select.open').removeClass('open');
			select.addClass("open");
			//Scroll
			$(".nano").nanoScroller();
		}
	});
	$('.select .dropdown li:not(.link) a').click(function(e){
		//e.preventDefault();
		var slug = $(e.target).attr('href');
		var text = $(e.target).text();
		$(e.target).parents('.select').addClass('selected');
		$(e.target).parents('.select').find('.button a').html(text+'<span></span>');
		$(e.target).parents('.select').find('input').val(slug);
		$(e.target).parents('.select').find('form').submit();
	})

}
