const wasteApp = {};

wasteApp.getWasteData = function(){
	$.ajax({
		url: './public/data/data.json',
		method: 'GET',
		dataType: 'json'
	}).then(function(res) {
		console.log(res);
	})
};

wasteApp.init = function(){
	wasteApp.getWasteData();
};

$(function(){
	wasteApp.init();
});

