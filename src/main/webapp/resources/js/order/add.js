$(function() {
	filter = function(obj_input, obj_select) {
		let filter_txt = obj_input.val().toUpperCase();
		let default_value = obj_select.find('option[id="default_select"]')
				.val();
		obj_select.val(default_value);
		$(obj_select).find("option").each(function() {
//			let txt = $(this).attr("value");
			let txt = $(this).text().split("|")[1];
			if (txt) {
				txt = txt.toUpperCase();
				if (txt.indexOf(filter_txt) > -1) {
					$(this).show();

				} else {
					$(this).hide();
				}
			}
		});
	};

	$("input[name='customer_filter']").on('keyup', function() {

		filter($(this), $('select[name="customer_select"]'));
		checkSubmit();
	});
	$("input[name='product_filter']").on('keyup', function() {

		filter($(this), $('select[name="product_select"]'));
		checkSubmit();
	});

	$(window).on('load', function() {
		filter($("input[name='product_filter']"), $('select[name="product_select"]'));
		
	});
	
	checkSubmit = function() {
		let txt_product = $('select[name="product_select"]').find(
				"option:selected").attr("value");
		let txt_customer = $('select[name="customer_select"]').find(
				"option:selected").attr("value");
		let txt_quantity = checkQuantity($("input[name='quantity']"), "quantity");
// console.log(txt_product + " " + txt_customer);
		if (txt_product && txt_customer && !txt_quantity) {
			$("button[name='submit']").removeClass("disabled");
		} else {
			$("button[name='submit']").addClass("disabled");
		}
	}
	$("#input_group_product, #input_group_customer").on('click', function() {
		checkSubmit();
	});
	$("button[name='submit']").on(
			'click',
			function() {
				
				p_name = $("select[name='product_select']").find("option:selected").text().split("|")[1];
				c_name = $("select[name='customer_select']").find("option:selected").text().split("|")[1];
				
//				total = currentRow.find("td[name='total']").text();
				quantity = $("input[name='quantity']").val();
				
				$("#popup .modal-title").html("Confirm");
				$("#popup .modal-body").html(`Will you add this order?<br\>
						<div class="table-responsive">
						 <table class='table table-bordered' >
						 <tbody>
								
								  <tr>
									 <th scope="row">Customer name</th>
									 <td>${c_name}</td>
								 </tr>
								  <tr>
									 <th scope="row">Product name</th>
									 <td class="text-break">${p_name}</td>
								 </tr>
								 
								  <tr>
									 <th scope="row">Quantity</th>
									 <td>${quantity}</td>
								 </tr>
								 		
								 </tbody>
						 </table>
						 </div>
						`);
				 $("#popup").modal("show");
				 $('#popup').on('click', 'button[name="save"]', function() {
					 $("#popup").modal("toggle");
						let url = $(location).attr('origin')+"/"+$(location).attr('pathname').split("/")[1]+"/order/add";
						$.ajax({
							type : "POST",
							url : url,
							data : {
								customer_id : $('select[name="customer_select"]').find(
										"option:selected").attr("id"),
								product_id : $('select[name="product_select"]').find(
										"option:selected").attr("id"),
										quantity : $("input[name='quantity']").val(),
							},
							success : function(response) {
//								location.reload();
								window.location.href =url;
							},
							fail : function(xhr, status, error) {
								$("#popup_error .modal-title").html("Alert");
								$("#popup_error .modal-body").html(xhr.responseText);
//					
								 $("#popup_error").modal("show");
//							
								 $('#popup_error').on('click','button[name="close_error"]',function(){
//									
									 $('#popup_error').modal("toggle");
								 });
								$('#popup_error').on('hidden.bs.modal', function() {
									location.reload();
								});
							},
							error : function(xhr, status, error) {
								$("#popup_error .modal-title").html("Alert");
								$("#popup_error .modal-body").html(xhr.responseText);
//					
								 $("#popup_error").modal("show");
//							
								 $('#popup_error').on('click','button[name="close_error"]',function(){
//									
									 $('#popup_error').modal("toggle");
								 });
								$('#popup_error').on('hidden.bs.modal', function() {
									location.reload();
								});
							},

						});
				 });
				 $('#popup').on('click', 'button[name="close"]', function() {
					 $('#popup').modal("toggle");
				 });
		
			});
	$("input[name='quantity']")
			.on(
					'keydown',
					function(event) {
						if (!((48 <= event.which && event.which <= 57)
								|| (96 <= event.which && event.which <= 105) || event.which <= 31)) {
							event.preventDefault();
						}
					});
	
	checkBlank = function(input_obj, name_obj) {
		let ret = "";
		let txt = input_obj.val();
		if (txt.trim() === "") {
			ret = ret.concat(`${name_obj} must not be blank.<br>`);
		}
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
	
	checkMax = function(input_obj, name_obj,max_value=100) {
		let ret = "";
		let txt = input_obj.val();
		if (txt > max_value) {
			ret = ret.concat(`${name_obj} must less or equal ${max_value}.<br>`);
		}return ret;
	};
	
	checkQuantity = function(input_obj, name_obj) {
		let ret = "";
		ret = ret.concat(checkBlank(input_obj, name_obj));
		ret = ret.concat(checkMin(input_obj, name_obj));
		ret = ret.concat(checkMax(input_obj, name_obj));
		return ret;

	}
	
	$("input[name='quantity']").on('keyup blur', function() {

		let ret = checkQuantity($("input[name='quantity']"), "quantity");
		check_quantity = ret ? false : true;
		checkSubmit();
		if (ret) {
			$("#error_quantity").html(ret);

		} else {
			$("#error_quantity").html("");
		}
	});
	
	
	
});