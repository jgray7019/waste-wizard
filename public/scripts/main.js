'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var wasteApp = {};

var wasteItems = [];

wasteApp.events = function () {
	// on form submit
	// wasteApp.onFormSubmitListener();

	wasteApp.getWasteData();
	// wasteApp.findMatchingItems();
};

// on click of search button, ajax call takes place to find data string that matches user's input
// wasteApp.onFormSubmitListener = function () {
// 	$('.main__formSearchBtn').on('click', function(e) {
// 		e.preventDefault();

// 	})
// };

wasteApp.getWasteData = function () {
	$.ajax({
		url: './public/data/data.json',
		method: 'GET',
		dataType: 'json'
	}).then(function (res) {
		// console.log(res);
		wasteItems.push.apply(wasteItems, _toConsumableArray(res));
		console.log(wasteItems);
	});
};

wasteApp.findMatchingItems = function (wordToMatch, wasteItems) {
	return wasteItems.filter(function (wasteItem) {
		var regex = new RegExp(wordToMatch, 'gi');

		return wasteItem.ALT_WORDS.match(regex) || wasteItem.TITLE.match(regex);
	});
};

wasteApp.displayMatchingItems = function () {
	var matchingItemsArray = wasteApp.findMatchingItems(this.value, wasteItems);

	var html = matchingItemsArray.map(function (wasteItem) {
		console.log(wasteItem);

		// let wasteTitleEL = $('<span>').text(wasteItem.TITLE);
		// let wasteAlternateEL = $('<span>').text(wasteItem.ALT_WORDS);

		// let wasteLi = $('<li>').addClass('suggestion').append(wasteAlternateEL, wasteTitleEL);
		// $('.main_formSuggestions').append(wasteLi);
		return '\n\t\t\t<li>\n\t\t\t\t<span>' + wasteItem.TITLE + '</span>\n\t\t\t\t<span>' + wasteItem.ALT_WORDS + '</span>\n\t\t\t</li>\n\t\t';
	});

	$('.main_formSuggestions').html(html);
};

$('.main__searchInput').on('change', wasteApp.displayMatchingItems);
$('.main__searchInput').on('keyup', wasteApp.displayMatchingItems);

wasteApp.init = function () {
	wasteApp.events();
};

$(function () {
	wasteApp.init();
});