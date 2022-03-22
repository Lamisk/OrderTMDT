// customer
$(function() {
	const VIETNAMESE_STRING = "àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ";
// $.onload(function(){
// $("birthday").attr("max",new Date().toISOString().split("T")[0])
// });
	birthday.max = new Date().toISOString().split("T")[0];
	birthday.value = birthday.max = new Date().toISOString().split("T")[0];
	
	let check_name = false;
	let check_address = false;
	let check_phone = false;
	let check_birthday = false;
	checkSubmitButton = function() {
		if (check_name && check_address && check_phone) {
			$('button[name="submit"]').removeClass("disabled");
		} else {
			$('button[name="submit"]').addClass("disabled");
		}
	}
	
	checkPhone = function(input_obj, name_obj)
	{
		ret = "";
		txt = input_obj.val();
		pattern_str=/^[0-9]+$/;
		if (txt.length<10)
			{
			ret = ret.concat(`Length of ${name_obj} must equal 10.<br>`);
			}
		ret = ret.concat(checkPattern(input_obj,name_obj,pattern_str));
		return ret;
	}
	
	
// /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/
// /^[a-zA-Z]+(?:\s[a-zA-Z0-9,]+)+$/
	let pattern = new RegExp(/^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/);
	let pattern_addr = new RegExp(/^[a-zA-Z]+(?:\s[a-zA-Z0-9,]+)+$/);
	
	checkPattern = function(input_obj, name_obj, pattern_str) {
		let ret = "";
		let pattern = new RegExp(pattern_str);
		let txt = input_obj.val();
		if (!pattern.test(txt)) {

			ret = ret.concat(`Invalid format of ${name_obj}.<br>`);
		}

		return ret;
	}
	
	
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
	
	
	$("input[name='phone']").on('keyup blur keydown', function(e) {

		   charCode = (e.which) ? e.which : e.keyCode;
	        if (!((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105) || (charCode==8))) {
	        	  e.preventDefault();
	        }

		let ret = checkPhone($(this), "phone");
	
		check_phone = ret ? false : true;
		checkSubmitButton();
		if (ret) {
			$("#error_phone").html(ret);

		} else {
			$("#error_phone").html("");
		}
	});

 $("button[name='submit']").on('click',function(e){
	 name = $("input[name='name']").val();
	 address = $("input[name='address']").val();
	 phone = $("input[name='phone']").val();
	 gender = $("select[name='gender']").find("option:selected").attr("value");
	 birthday = $("input[name='birthday']").val();
	 
	 $("#popup .modal-title").html("Confirm");
	 $("#popup .modal-body").html(`Will you add this customer?<br\>
				<div class="table-responsive">
				 <table class='table table-bordered' >
				 <tbody>
						 
						  <tr>
							 <th scope="row">Name</th>
							 <td>${name}</td>
						 </tr>
						  <tr>
							 <th scope="row">Address</th>
							 <td class="text-break">${address}</td>
						 </tr>
						  <tr>
							 <th scope="row">Phone</th>
							 <td class="text-break">${phone}</td>
						 </tr>
						  <tr>
							 <th scope="row">Gender</th>
							 <td class="text-break">${gender}</td>
						 </tr>
						   <tr>
							 <th scope="row">Birthday</th>
							 <td class="text-break">${birthday}</td>
						 </tr>
						 </tbody>
				 </table>
				 </div>
				`);
	 $("#popup").modal("show");
	
	$('#popup').on('click', 'button[name="save"]', function() {
		
		 
		 $("#popup").modal("toggle");
		 $.ajax({
			 url : $("location").attr("href"),
			 type:"POST",
			 data:{
				 address: address,
				 name: name,
				 phone: phone,
				 gender: gender,
				 birthday: birthday,

			 },
			 success : function(response) {
					location.reload();
				},
				fail : function(xhr, status, error) {
					$("#popup_error .modal-title").html("Alert");
					$("#popup_error .modal-body").html(xhr.responseText);
					 $("#popup_error").modal("show");
					 $('#popup_error').on('click','button[name="close_error"]',function(){							
							 $('#popup_error').modal("toggle");
						 });
				},

				error : function(xhr, status, error) {		
						$("#popup_error .modal-title").html("Alert");
						$("#popup_error .modal-body").html(xhr.responseText);		
						 $("#popup_error").modal("show");				
						 $('#popup_error').on('click','button[name="close_error"]',function(){						
							 $('#popup_error').modal("toggle");
						 });
					},
		 });
	});
		
	 $('#popup').on('click', 'button[name="close"]', function() {
		 $('#popup').modal("toggle");
	 });
 });
	

});