angular.module('Compartio.Common')
	.directive("dropdown", function(
		$rootScope,
		DebugService
		) {
	return {
		restrict: "E",
		templateUrl: "partials/directive-dropdown.html",
		scope: {
			placeholder: "@",
			list: "=",
			selected: "=",
			property: "@",
			callback: "&" //función con un argumento args
		},
		link: function(scope) {
			scope.listVisible = false;
			scope.isPlaceholder = true;
			DebugService.log("Selected "+scope.selected);
			scope.select = function(item) {
				scope.isPlaceholder = false;
				scope.selected = item;
				scope.listVisible = false;
			};

			scope.isSelected = function(item) {
				return item[scope.property] === scope.selected[scope.property];
			};

			scope.show = function() {
				scope.listVisible = true;
			};
			//Para cuando clicka fuera, se manda cerrar
			$rootScope.$on("documentClicked", function(inner, target) {
				if (!$(target[0]).is(".select.open") && $(target[0]).parents(".select.open").length === 0)
					scope.$apply(function() {
						scope.listVisible = false;
					});
			});

			scope.$watch("selected", function(value) {
				scope.isPlaceholder = scope.selected[scope.property] === undefined;
				scope.display = scope.selected[scope.property];
				//Si tiene callback, lo ejecuta
				scope.callback({item: value});
			});
		}
	};
});