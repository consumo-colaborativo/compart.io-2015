angular.module('Compartio.Common')
	.constant('DEBUG', {
		'active': true
	})
	.service('DebugService', function(DEBUG) {
			var service = this;
			service.log = function(txt){
				var currentdate = new Date(),
				txtdate = currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + ". ";
				if(DEBUG.active){
					console.log("%c"+txtdate+"%s", "color: blue", txt);
				}
			};

	});
