function filter() {
		
	let filter = $("#name_search").val().toUpperCase();

	$("table > tbody > tr").each(function() {
		td_code = $(this).find("td[name='name']");
		console.log(td_code.text());
		if (td_code.text().toUpperCase().indexOf(filter) > -1) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
}
