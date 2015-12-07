/*jslint browser:true */
/*global $, jQuery*/
(function ($) {
  "use strict";
  if(1==2){

		var cg_anchocaja=150; //Mínimo bloque de ancho. Cada caja puede ser 150 o 150+8+150;
		var cg_gutter=8; //Separación entre cajas

		$(document).ready(function() {
			// Nested
			$("#container").nested({
			  minWidth: cg_anchocaja,
			  gutter: cg_gutter
			});

			//SVG
			$('#container>.box').each(function(index, el) {
				$(el).bocadillo();
			});
		});
	}
}(jQuery));