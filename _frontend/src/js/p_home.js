/*jslint browser:true */
/*global $, jQuery*/
(function ($) {
  "use strict";
	// Home
	if($('body#home').length>0){
  	$('.popupvideo').magnificPopup({type:'iframe'});
	}
}(jQuery));