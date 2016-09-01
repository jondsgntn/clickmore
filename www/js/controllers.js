angular.module('clickmore.controllers', [])

.controller('AppCtrl', function($scope, UserService, MediaSrv) {

	$scope.users = [];
	$scope.descSortorder = '-clickCount';
	$scope.ascSortorder = 'clickCount';

	function getAllUsers() {
		UserService.getUsers()
			.then(function (result) {
				$scope.users = result.data.data;
			});
	}

	$scope.addUser = function(id) {
		UserService.addUser(id);
	}

	function getUser(id) {
		UserService.getCurrentUser(id)
			.then(function(result){
				if (result.data[0] === undefined){
					addUser(id);
					getUser(id);
				} else {
					$scope.currentUser = result.data[0];
					$scope.currentUserName = $scope.currentUser["userName"];
					$scope.userClickCount = $scope.currentUser["clickCount"];
				}
			});
	}

	$scope.addCount = function(object) {
		object.clickCount++;
		$scope.userClickCount = object.clickCount;
		UserService.updateUser(object.id, object)
			/*.then(function(result){
				getAllUsers();
			});*/
	}
	$scope.greaterThan = function(prop, val){
	    return function(item){
	      return item[prop] > val;
	    }
	}
	$scope.lessThan = function(prop, val){
	    return function(item){
	      return item[prop] < val;
	    }
	}
	getAllUsers();

	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener("deviceready", getUuid, false);
	function onDeviceReady() {
	    MediaSrv.loadMedia('mp3/fanfare.mp3').then(function(media){
			media.play();
		});
	}
	function getUuid() {
		//$scope.uuid = device.uuid;
		var uuid = device.uuid;
		//var uuid = 0;
		getUser(uuid);
	}
	//getUuid();

	window.setInterval(function(){
		getAllUsers();
	}, 1000);

})