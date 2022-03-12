$(function() {
	let check_name = false;
	let check_address = false;
	checkSubmitButton = function() {
		if (check_name && check_address) {
			$('button[name="submit"]').removeClass("disabled");
		} else {
			$('button[name="submit"]').addClass("disabled");
		}
	}
	let pattern = new RegExp(/^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/);
	let pattern_addr = new RegExp(/^[a-zA-Z]+(?:\s[a-zA-Z0-9,]+)+$/);
	check = function(input_obj, name_obj, min_len, max_len, allow_num=false) {
		let ret = "";
		let target_patern = pattern;
		let txt = input_obj.val();
		if (allow_num){
			target_patern = pattern_addr;
		}
		if (!target_patern.test(txt)) {

			ret = ret.concat(`Invalid format of ${name_obj}.<br>`);
		}

		if (!(min_len <= txt.length && txt.length <= max_len)) {

			ret = ret
					.concat(`Length of ${name_obj} must between ${min_len} and ${max_len}.<br>`);

		}
		if (txt != txt.trim()) {
			ret = ret
					.concat(`${name_obj} can not start or end with blank.<br>`);
		}

		if (txt.trim() === "") {
			ret = ret.concat(`${name_obj} must not be blank.<br>`);
		}

		return ret;
	}

	$("input[name='name']").on('keyup blur', function() {

		let ret = check($(this), "name", 2, 30);
		check_name = ret ? false : true;
		checkSubmitButton();
		if (ret) {
			$("#error_name").html(ret);
			
		} else {
			$("#error_name").html("");
			
		}
//
// if (check_name && check_address) {
// $('button[name="submit"]').removeClass("disabled");
// } else {
// $('button[name="submit"]').addClass("disabled");
// }

		checkSubmitButton();
	});

	$("input[name='address']").on('keyup blur', function() {

		let ret = check($(this), "address", 2, 100,true);
		check_address = ret ? false : true;
		checkSubmitButton();
		if (ret) {
			$("#error_address").html(ret);

		} else {
			$("#error_address").html("");
		}
	});

 $("button[name='submit']").on('click',function(e){

	 $("#popup .modal-title").html("Confirm");
	 $("#popup .modal-body").html("You will add this order");
	 $("#popup").modal("show");
	
	$('#popup').on('click', 'button[name="save"]', function() {
		
		 $("#popup").modal("toggle");
		 $.ajax({
			 url : $("location").attr("href"),
			 type:"POST",
			 data:{
				 address: $("input[name='address']").val(),
				 name: $("input[name='name']").val(),
			 },
			 success : function(response) {
					location.reload();
				},
				fail : function(reponse) {
					$("#popup .modal-title").html("Alert");
					$("#popup .modal-body").html(xhr.responseText);
					$("button[name='save']").hide();
					$('#popup').on('hidden.bs.modal', function() {
						location.reload();
					});
				},
				error : function(xhr, status, error) {
					$("#popup .modal-title").html("Alert");
					$("#popup .modal-body").html(xhr.responseText);
					$("button[name='save']").hide();
					$('#popup').on('hidden.bs.modal', function() {
						location.reload();
					});
				},
		 });
	});
		
	 $('#popup').on('click', 'button[name="close"]', function() {
		 $('#popup').modal("toggle");
	 });
 });
	
// $("#form").on('submit', function(e) {
//	
// $("#popup .modal-title").html("Confirm");
// $("#popup .modal-body").html("You will update this customer");
// $("#popup").modal("show");
//	
//		 
// $('#popup').on('click', 'button[name="save"]', function() {
//
// $("#form").submit();
//			  
// });
//	
// $('#popup').on('click', 'button[name="close"]', function() {
//
// e.preventDefault();
// $('#popup').modal("toggle");
// });
//
// });
});