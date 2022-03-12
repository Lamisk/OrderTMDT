//$(function() {
//	$("tbody>tr>td").on('click', "button[name='select']", function() {
//		let currentRow = $(this).closest("tr");
//		let code = currentRow.find("td[name='code']").text();
//		console.log(code);
//		$.ajax({
//			url : $(location).attr('href'),
//			type : 'GET',
//			data : {
//				code : code
//			},
//			success : function(response) {
////				location.reload();
//			},
//		});
//	})
//});