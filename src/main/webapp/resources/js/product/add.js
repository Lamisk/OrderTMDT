$(function() {
	let check_name = false;
	let check_des = false;
	let check_price = false;

	checkBlank = function(input_obj, name_obj) {
		let ret = "";
		let txt = input_obj.val();
		if (txt.trim() === "") {
			ret = ret.concat(`${name_obj} must not be blank.<br>`);
		}
		return ret;
	}
	checkPrice = function(input_obj, name_obj) {
		let ret = "";
		ret = ret.concat(checkBlank(input_obj, name_obj));
		ret = ret.concat(checkMin(input_obj, name_obj));
		ret = ret.concat(checkMax(input_obj, name_obj));
		return ret;

	}
	checkMin = function(input_obj, name_obj,min_value=0) {
		let ret = "";
		let txt = input_obj.val();
		if (txt < min_value) {
			ret = ret.concat(`${name_obj} must greater or equal ${min_value}.<br>`);
		}
		return ret;
	};
	
	checkMax = function(input_obj, name_obj,max_value=100000000) {
		let ret = "";
		let txt = input_obj.val();
		if (txt > max_value) {
			ret = ret.concat(`${name_obj} must less or equal ${max_value}.<br>`);
		}
	
		return ret;
	};
	checkSubmitButton = function() {
		// console.log(check_name+" "+check_des+" "+check_price);
		if (check_name && check_des && check_price) {
			$('button[name="submit"]').removeClass("disabled");
		} else {
			$('button[name="submit"]').addClass("disabled");
		}
	}
	let pattern = new RegExp(/^[a-zA-Z0-9 ]+$/);
	check = function(input_obj, name_obj, min_len, max_len) {
		let ret = "";

		let txt = input_obj.val();
		if (!pattern.test(txt)) {

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

	$("input[name='des']").on('keyup blur', function() {

		let ret = checkBlank($(this), "description");
		check_des = ret ? false : true;
		checkSubmitButton();
		if (ret) {
			$("#error_des").html(ret);

		} else {
			$("#error_des").html("");
		}
	});

	$("input[name='price']").on('keydown', function(event) {
		if (!((48 <= event.which && event.which <= 57)||(96 <= event.which && event.which <= 105)||event.which<=31)) {
			event.preventDefault();
		}
	});
	$("input[name='price']").on('keyup blur', function() {

		let ret = checkPrice($(this), "price");
		check_price = ret ? false : true;
		checkSubmitButton();
		if (ret) {
			$("#error_price").html(ret);

		} else {
			$("#error_price").html("");
		}
	});
	
	$("#submit").on('click',function(){
		
		 $("#popup .modal-title").html("Confirm");
		 $("#popup .modal-body").html("You will add this product");
		 $("#popup").modal("show");
		
		$('#popup').on('click', 'button[name="save"]', function() {
			
			 $("#popup").modal("toggle");
			 $.ajax({
				 url : $("location").attr("href"),
				 type:"POST",
				 data:{
					 des: $("input[name='des']").val(),
					 name: $("input[name='name']").val(),
					 price: $("input[name='price']").val(),
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
});