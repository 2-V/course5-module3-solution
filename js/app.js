(function(){
	'use strict';

	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', foundItems);
	

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		
		var mySearch = this;

		mySearch.foundItems = function (searchTerm) {
			MenuSearchService.getMatchedMenuItems(searchTerm);

		}


	}

	function foundItems(){
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				items: '<'
			},
			controller: 'NarrowItDownController as mySearch',
			bindToController: true
		}

		return ddo;
	};

	function MenuSearchService ($http) {

		var service = this;


		service.getMatchedMenuItems = function(searchTerm) {
			 console.log("search term: " + searchTerm);
			return $http({
				method: "GET",
				url: "https://davids-restaurant.herokuapp.com/menu_items.json"
			}).then(function (result) {

			    // process result and only keep items that match
			    var foundItems = [];

			    for (var j = 0; j < result.data.menu_items.length; j++){
				    if (result.data.menu_items[j].name.toLowerCase().indexOf(searchTerm) !== -1) {
				    	foundItems.push( {name : result.data.menu_items[j].name, short_name : result.data.menu_items[j].name})
				    }
			    }


			    // return processed items
			    console.log(foundItems);
			    return foundItems;
			});

		}

	}
	


})();