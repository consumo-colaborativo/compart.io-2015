jQuery.fn.extend({
	bocadillo: function(){

		//Genera el SVG
		zoom=1.25;
		// Tamaños en posicion activo
		var ancho_activo=250;
		var alto_activo=250+(23.5*zoom); //250 + altura del pico
		this.data('ancho_activo', ancho_activo);
		this.data('alto_activo', alto_activo);
		//onsole.log('data', this.data('ancho_activo'));
		// Tamaños normal
		var ancho;
		var alto;
		if($(this).hasClass('size22')){
			var ancho=cg_anchocaja*2+cg_gutter;
			var alto=cg_anchocaja*2+cg_gutter;
		} else if($(this).hasClass('size21')){
			var ancho=cg_anchocaja*2+cg_gutter;
			var alto=cg_anchocaja;
		} else if($(this).hasClass('size12')){
			var ancho=cg_anchocaja;
			var alto=cg_anchocaja*2+cg_gutter;
		} else {
			var ancho=cg_anchocaja;
			var alto=cg_anchocaja;
		}
		this.data('ancho', ancho);
		this.data('alto', alto);



		var svg_def='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" >';
		//var svg_def='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+ancho+'px" height="'+(alto+24)+'px" >';
		var path_activo='';
		//onsole.log($(this).index());
		svg_def+='<defs><clipPath id="clipPath'+$(this).index()+'"><path d="';
		//inicio del pico. punto más bajo.
		pico_orientacion_izquierda=Math.random()<0.5;
		// pico_orientacion_izquierda=true;
		if(pico_orientacion_izquierda){
			desviacion_pico=10;
		} else {
			desviacion_pico=-10;
		}

		// Tamaño del radio en estado normal.
		borde_radio=13.3;
		// Tamaño del borde en estado activo, 50%, para que se pareza a un circulo;
		borde_radio_activo=Math.round(ancho_activo*0.5);
		// Inicio del pico en estado normal. Aleatorio. "25 es medio pico de ancho"
		inicio_pico=Math.round((borde_radio*zoom)+(25*zoom)+Math.random()*(ancho-(borde_radio*zoom)-(borde_radio*zoom)-(25*zoom)-(25*zoom))); //Borde radio + mitad del pico + aleatorio de (ancho - los bordes de los radios menos el pico completo.)
		// Inicio del pico en estado activo, centrado;
		inicio_pico_centrado=Math.round(ancho_activo*0.5);

		var fc=0.551915024494; //Factor de curva
		// Pico lado derecho
			path_activo+='M'+(inicio_pico_centrado)+','+alto_activo;
			svg_def+='M'+(inicio_pico+desviacion_pico)+','+alto;
			path_activo+='c'+(7*zoom)+',0,'+(0*zoom)+',-'+(23.5*zoom)+','+(25*zoom)+',-'+(23.5*zoom);
			svg_def+='c'+(7*zoom)+',0,'+(0*zoom-desviacion_pico)+',-'+(23.5*zoom)+','+(25*zoom-desviacion_pico)+',-'+(23.5*zoom);
		
		path_activo+='H'+(ancho_activo-borde_radio_activo+25*zoom);
		svg_def+='H'+(ancho-borde_radio*zoom);
		path_activo+='c'+(borde_radio_activo-25*zoom)*fc*0.8+',0 '+(borde_radio_activo-25*zoom)+',-'+(borde_radio_activo-25*zoom)*(1-fc)+' '+(borde_radio_activo-25*zoom)+',-'+(borde_radio_activo);
		svg_def+='c'+(borde_radio*zoom)*fc+',0 '+(borde_radio*zoom)+',-'+(borde_radio*zoom)*(1-fc)+' '+(borde_radio*zoom)+',-'+(borde_radio*zoom);
		path_activo+='V'+(borde_radio_activo);
		svg_def+='V'+(borde_radio*zoom);
		path_activo+='c0,-'+(borde_radio_activo)*fc+' -'+(borde_radio_activo)*(1-fc)+',-'+(borde_radio_activo)+' -'+(borde_radio_activo)+',-'+(borde_radio_activo);
		svg_def+='c0,-'+(borde_radio*zoom)*fc+' -'+(borde_radio*zoom)*(1-fc)+',-'+(borde_radio*zoom)+' -'+(borde_radio*zoom)+',-'+(borde_radio*zoom);
		path_activo+='H'+(borde_radio_activo);
		svg_def+='H'+(borde_radio*zoom);
		path_activo+='c-'+(borde_radio_activo)*fc+',0 -'+(borde_radio_activo)+','+(borde_radio_activo)*(1-fc)+' -'+(borde_radio_activo)+','+(borde_radio_activo);
		svg_def+='c-'+(borde_radio*zoom)*fc+',0 -'+(borde_radio*zoom)+','+(borde_radio*zoom)*(1-fc)+' -'+(borde_radio*zoom)+','+(borde_radio*zoom);
		path_activo+='V'+(alto_activo-borde_radio_activo-23.6*zoom);
		svg_def+='V'+(alto-borde_radio*zoom-23.6*zoom);
		path_activo+='c0,'+(borde_radio_activo)*(1-fc*0.8)+' '+(borde_radio_activo-25*zoom)*fc+','+(borde_radio_activo)+' '+(borde_radio_activo-25*zoom)+','+(borde_radio_activo);
		svg_def+='c0,'+(borde_radio*zoom)*(1-fc)+' '+(borde_radio*zoom)*fc+','+(borde_radio*zoom)+' '+(borde_radio*zoom)+','+(borde_radio*zoom);
		//Pico lado izquierdo
			path_activo+='H'+(inicio_pico_centrado-25*zoom);
			svg_def+='H'+(inicio_pico-25*zoom);
			path_activo+='c'+(25*zoom)+',0,'+(18*zoom)+','+(23.5*zoom)+','+(25*zoom)+','+(23.5*zoom);
			svg_def+='c'+(25*zoom)+',0,'+(18*zoom+desviacion_pico)+','+(23.5*zoom)+','+(25*zoom+desviacion_pico)+','+(23.5*zoom);
		path_activo+='z';
		svg_def+='z';
		svg_def+='" /></clipPath></defs>';
		svg_def+='<image id="imagen" x="0" y="0" width="'+ancho+'" height="'+(alto+24)+'" xlink:href="http://placekitten.com/'+ancho*2+'/'+(alto+24)*2+'" style="opacity: 1; clip-path: url(#clipPath'+$(this).index()+'); " />';
		svg_def+='<rect x="0" y="0" width="'+(cg_anchocaja*2+cg_gutter)+'" height="'+(cg_anchocaja*2+cg_gutter)+'" style="opacity: 0; fill: #00cc00; clip-path: url(#clipPath'+$(this).index()+'); " />';
		svg_def+='</svg>';

		$(this).attr('data-path-hover', path_activo).css({'width':ancho_activo+'px', 'height':(alto_activo+24)+'px'}).prepend(svg_def);

		// Calcula posición del pico

		$(this).children('.point1').css({
			left : inicio_pico_centrado,
			top : alto_activo
		});
		$(this).children('.point2').css({
			left : inicio_pico+desviacion_pico,
			top : alto
		});
		this.data('movimientoActivoX', inicio_pico_centrado - (inicio_pico+desviacion_pico) );
		this.data('movimientoActivoY', alto_activo - alto );
		this.actualizaEventos();
	},

	actualizaEventos: function(){
		var speed = 100;
		var easing = mina.linear;

		var s = Snap( $(this).children( 'svg' ).get(0) ), path = s.select( 'path' ),
			pathConfig = {
				from : path.attr( 'd' ),
				to : $(this).attr( 'data-path-hover' )
			}
			var image = s.select( 'image' );
			var rect = s.select( 'rect' );

		$(this).on( 'mouseenter', function() {
			//transforma SVG
			path.animate( { 'path' : pathConfig.to }, speed, easing );
			image.attr({opacity:0});
			rect.attr({opacity:1});

			//onsole.log($(this).data('anchoactivo'));
			//Mueve caja
			$(this).css({
				'width' : (cg_anchocaja*2+cg_gutter)+'px',
				'height' : (cg_anchocaja*2+cg_gutter)+'px',
				'z-index' : 100
			}).animate({
				'margin-left' : -1*$(this).data('movimientoActivoX')+'px',
				'margin-top' : -1*$(this).data('movimientoActivoY')+'px'
			});
		} );

		$(this).on( 'mouseleave', function() {
			path.animate( { 'path' : pathConfig.from }, speed, easing );
			// setTimeout(function(){
			image.attr({opacity:1});
			rect.attr({opacity:0});
			// }, speed);

			$(this).animate({
				'margin-left' : '0px',
				'margin-top' : '0px',
				'z-index' : 0
			}, speed, 'linear');
			// $(this).css({
			// 	'width' : $(this).data('ancho')+'px',
			// 	'width' : $(this).data('alto')+'px'
			// })

		} );
	}
});