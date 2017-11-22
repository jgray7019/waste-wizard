var wasteApp = {};


const wasteItems = [];

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
		wasteItems.push(...res);
		console.log(wasteItems);
	});
};


wasteApp.findMatchingItems = function (wordToMatch, wasteItems) {
	return wasteItems.filter(wasteItem => {
		const regex = new RegExp(wordToMatch, 'gi');

		return wasteItem.ALT_WORDS.match(regex) || wasteItem.TITLE.match(regex)
	});
}

wasteApp.displayMatchingItems = function() {
	const matchingItemsArray = wasteApp.findMatchingItems(this.value, wasteItems);


	const html = matchingItemsArray.map(wasteItem => {
		console.log(wasteItem);

	// let wasteTitleEL = $('<span>').text(wasteItem.TITLE);
	// let wasteAlternateEL = $('<span>').text(wasteItem.ALT_WORDS);

	// let wasteLi = $('<li>').addClass('suggestion').append(wasteAlternateEL, wasteTitleEL);
	// $('.main_formSuggestions').append(wasteLi);
		return `
			<li>
				<span>${wasteItem.TITLE}</span>
				<span>${wasteItem.ALT_WORDS}</span>
			</li>
		`;

	});
	
	$('.main_formSuggestions').html(html);

}

$('.main__searchInput').on('change', wasteApp.displayMatchingItems);
$('.main__searchInput').on('keyup', wasteApp.displayMatchingItems);

wasteApp.init = function(){
	wasteApp.events();
};


$(function(){
	wasteApp.init();
});