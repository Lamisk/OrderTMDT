
$(function() {
	$("button[name='search']").on('click',function(){
		let code = $("input[name='code']").val();
		let url = $(location).attr('href');

		 $('#searchform').submit(function() {
			    $(this).attr('action',url); 
			    return true;
			  });
	});
	// Declare variables
	// var input, filter, table, tr, td, i, txtValue;
	// input = document.getElementById("code");
	// filter = input.value.toUpperCase();
	// table = document.getElementById("table");
	// tr = table.getElementsByTagName("tr");
	//
	// // Loop through all table rows, and hide those who don't match the search
	// query
	// for (i = 0; i < tr.length; i++) {
	// td = tr[i].getElementsByTagName("td")[0];
	// if (td) {
	// txtValue = td.textContent || td.innerText;
	// if (txtValue.toUpperCase().indexOf(filter) > -1) {
	// tr[i].style.display = "";
	// } else {
	// tr[i].style.display = "none";
	// }
	// }
	// }
});