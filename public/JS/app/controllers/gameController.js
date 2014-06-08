Game2048.gameModule.controller('gameCtrl',['$scope','game2048Service',function($scope, game2048Service){
		$scope.grids = game2048Service.getState();

		$scope.keys = [];
		$scope.keys.push({ code: 38, action: function() { $scope.move('up') }});
		$scope.keys.push({ code: 39, action: function() { $scope.move('right') }});
		$scope.keys.push({ code: 40, action: function() { $scope.move('down') }});
		$scope.keys.push({ code: 37, action: function() { $scope.move('left') }});
		
		$scope.move = function(dir){
			$scope.grids = game2048Service.getState(dir);
		}

		// Key event handler re-used from http://plnkr.co/edit/rwUDTtkQkaQ0dkIFflcy?p=preview

		$scope.$on('keydown', function( msg, code ) {
			$scope.keys.forEach(function(o) {
				if ( o.code !== code ) { 
					return; 
				}
	 			o.action();
	 			$scope.$apply();
			});
		});

		$scope.getClass = function(number){
			return "grid-" + number.toString();
		}

		$scope.getDigits = function(number){
			return "digits-" + number.toString().length;
		}


	}]);
