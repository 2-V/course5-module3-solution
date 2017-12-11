(function(){
	'use strict';

	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItems);
	

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		
		var mySearch = this;
		mySearch.searchTerm = '';

		mySearch.searchItems = function () {
			MenuSearchService.getMatchedMenuItems(mySearch.searchTerm)
			.then(function(result){
				mySearch.items = result;
			});
		};

		mySearch.removeItem = function (itemIndex){
			return MenuSearchService.removeItem(itemIndex);
		};
	};

	function FoundItems(){
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				items: '<',
				onRemove: '&'
			}
		};

		return ddo;
	};

	MenuSearchService.$inject = ['$http'];
	function MenuSearchService ($http) {

		var service = this;
		var foundItems = [];

		service.getMatchedMenuItems = function(searchTerm) {
			return $http({
				method: "GET",
				url: "https://davids-restaurant.herokuapp.com/menu_items.json"
			}).then(function (result) {

			    // process result and only keep items that match
			    for (var j = 0; j < result.data.menu_items.length; j++){
				    if (result.data.menu_items[j].name.toLowerCase().indexOf(searchTerm) !== -1) {
				    	foundItems.push( {name : result.data.menu_items[j].name, short_name : result.data.menu_items[j].short_name, description : result.data.menu_items[j].description})
				    }
			    }

			    // return processed items
			    return foundItems;
			});

		}

		service.removeItem = function (itemIndex) {
			foundItems.splice(itemIndex, 1);
			return foundItems;
		};
	};
	
})();