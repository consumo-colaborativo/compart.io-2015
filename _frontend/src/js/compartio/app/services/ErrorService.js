angular.module('Compartio.Common')
	.service('ErrorService', function(DEBUG) {
			var service = this;
			service.log = function(txt){
				var currentdate = new Date(),
				txtdate = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + "-" + currentdate.getMilliseconds() +". ";
				if(DEBUG.active){
					console.log("%c"+txtdate+"%s", "color: red", txt);
					for (var i=1; i < arguments.length; i++) {
						console.log(arguments[i]);
			    }
				}
			};

	});
