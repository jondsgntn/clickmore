angular.module('clickmore.services', [])

.service('UserService', function ($http, Backand, $q) {
  var baseUrl = '/1/objects/';
  var objectName = 'users/';
 
  function getUrl() {
    return Backand.getApiUrl() + baseUrl + objectName;
  }
 
  function getUrlForId(id) {
    return getUrl() + id;
  }

  function getUserById(newId) {
  	return Backand.getApiUrl() + '/1/query/data/getUserByUUID?parameters=%7B%22newID%22:%22' + newId +'%22%7D';
  }

  function getUserName(){
    var name1 = ['Artistic', 'Devils', 'Goblins', 'Mean', 'Modest', 'Serpents', 'Paladins', 'Rusy', 'Wandering', 'Wet', 'WiseHarpy', 'Worn', 'BirdAnd', 'FoxAnd', 'Robbers', 'TavernOf', 'Artisans', 'BladesOf', ];
    var name2 = ['Trolls', 'Stein', 'Fish', 'Mercenary', 'Warrior', 'Prayer', 'Claw', 'Head', 'Saloon', 'Alehouse', 'Tavern', 'Casque', 'Club', 'Staff', 'Birds', 'Chant', 'King', 'Sorcerer', 'Sorceress', 'Chaos'];
    return name1[Math.floor(Math.random() * name1.length)] + name2[Math.floor(Math.random() * name2.length)];
  }
 
  getUsers = function () {
    return $http.get(getUrl());
  }

  addUser = function(id) {
  	var user = {};
  	user.uuid = id;
  	user.clickCount = 0;
    user.userName = getUserName() + id.substr(id.length-3);
  	return $http.post(getUrl(), user);
  }

  getCurrentUser = function(id) {
  	return $http.get(getUserById(id));
  }

  updateUser = function (id, object) {
  	return $http.put(getUrlForId(id), object);
  }
 
  return {
    getUsers: getUsers,
    getCurrentUser: getCurrentUser,
    updateUser: updateUser
  }
});