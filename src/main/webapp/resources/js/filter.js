function filter() {
		
	let filter = $("#code").val().toUpperCase();

	$("table > tbody > tr").each(function() {
		td_code = $(this).find("td[name='code']");
		if (td_code.text().toUpperCase().indexOf(filter) > -1) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
}
