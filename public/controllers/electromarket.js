angular.module("electromarket")
	.constant("dataUrl", "http://localhost:5500/resources/products")
	.constant("orderUrl", "http://localhost:5500/resources/orders")
	.controller("electromarketCtrl", function ($scope, $http, $location, dataUrl, orderUrl, cart) {
		$scope.data = {};
		
		$http.get(dataUrl).then(successTransfer,errorTransfer);
			
		function successTransfer (data) {
				$scope.data.products = data.data;
		};
		
		function errorTransfer (error) {
				$scope.data.error = error.data;
		};
		
		$scope.sendOrder = function (shippingDetails) {
			var order = angular.copy(shippingDetails);
			order.products = cart.getProducts();
			$http.post(orderUrl, order)
				.then(successOrder, errorOrder)
				.finally(function () {
					$location.path("/complete");
				});
				
			function successOrder (data) {
				$scope.data.orderId = data.data.id;
				cart.getProducts().length = 0;
			};
			
			function errorOrder (error) {
				$scope.data.orderError = error.data;
			};
		}
		
	});