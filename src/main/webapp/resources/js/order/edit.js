//ORDER
$(function() {

	$('tbody')
			.on(
					'click',
					'button[name="edit"]',
					function() {

						let currentRow = $(this).closest("tr");

						 currentRow.find("button[name='delete']").hide();
						let price = currentRow.find("td[name='price']");
						let quantity = currentRow.find("td[name='quantity']");
						let total = currentRow.find("td[name='total']");

						
						let old_quantity = quantity.text();
						let old_total = total.text();

						
						quantity
								.html("<input name='edit_quantity' type='number' min=0 max=100 value='"
										+ old_quantity + "'>");

						currentRow
								.find('.btn-group')
								.prepend(
										"<button type='button' class='btn btn-outline-secondary' name='cancel'>Cancel</button>");
						currentRow
								.find('.btn-group')
								.prepend(
										"<button type='button' class='btn btn-outline-success' name='confirm'>Confirm</button>");

						
						currentRow
								.append("<input type='hidden' name='hidden_old_quantity' value='"
										+ old_quantity + "'>");
						currentRow
								.append("<input type='hidden' name='hidden_old_total' value='"
										+ old_total + "'>");
						$(this).hide()
						// FOR EDIT PRICE
						$("input[name='edit_quantity']")
								.on(
										'keydown',
										function(event) {
											console.log("ASD");
											if (!((48 <= event.which && event.which <= 57)
													|| (96 <= event.which && event.which <= 105) || event.which <= 31)) {
												event.preventDefault();
											}

										}).on('keyup', function() {
									if ($(this).val() > 100) {
										$(this).val(100);

									}
									total.text(price.text() * $(this).val());
								}).on('change', function() {
									total.text(price.text() * $(this).val());
								});
					});

	$('tbody').on('click', 'button[name="confirm"]', function(e) {

		let currentRow = $(this).closest("tr");
		let url = $(location).attr('href');

		let id = currentRow.attr("id");
		p_name = currentRow.find("td[name='p_name']").text();
		c_name = currentRow.find("td[name='c_name']").text();
		price = currentRow.find("td[name='price']").text();
		total = currentRow.find("td[name='total']").text();
		quantity = currentRow.find("input[name='edit_quantity']").val();
		
	 
	
		
		let data = {
			id : id,
			quantity : quantity
		};
		$("#popup .modal-title").html("Confirm");
		$("#popup .modal-body").html(`Will you update this order?<br\>
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
							 <th scope="row">Price</th>
							 <td>${price} VND</td>
						 </tr>
						  <tr>
							 <th scope="row">Quantity</th>
							 <td>${quantity}</td>
						 </tr>
						 						  <tr>
							 <th scope="row">Total</th>
							 <td>${total}</td>
						 </tr>
						 </tbody>
				 </table>
				 </div>
				`);
		$("#popup").modal("show");
		$('#popup').on('click', 'button[name="save"]', function() {
			$('#popup').modal("toggle");
			$.ajax({
				url : url,
				type : 'PATCH',
				data : data,
				success : function(response) {
					location.reload();
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
	});

	$('tbody')
			.on(
					'click',
					'button[name="cancel"]',
					function() {
						let currentRow = $(this).closest("tr");
						p_name = currentRow.find("td[name='p_name']").text();
						c_name = currentRow.find("td[name='c_name']").text();
						price = currentRow.find("td[name='price']").text();
						
					
						// let name = currentRow.find("input[name='edit_name']").val();
						
						let quantity = currentRow
								.find("input[name='edit_quantity']");

					
						
						let old_quantity = currentRow.find(
								"input:hidden[name='hidden_old_quantity']")
								.val();
						

						$("#popup .modal-title").html("Confirm");
						$("#popup .modal-body").html(`Will you delete this order?<br\>
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
											 <th scope="row">Price</th>
											 <td>${price} VND</td>
										 </tr>
										  <tr>
											 <th scope="row">Quantity</th>
											 <td>${old_quantity}</td>
										 </tr>
										 						  <tr>
											 <th scope="row">Total</th>
											 <td>${price*quantity} VND</td>
										 </tr>
										 </tbody>
								 </table>
								 </div>
								`);
						$("#popup").modal("show");
						$("#popup")
								.on(
										'click',
										"button[name=save]",
										function() {
											$("#popup").modal("toggle");
											
											currentRow.find(
													"td[name='quantity']")
													.text(old_quantity);
											currentRow.find("td[name='total']")
													.text($("input[name='hidden_old_total']").val());
											
											currentRow.find(
													'button[name="confirm"]')
													.remove();
											currentRow
													.find(
															"input:hidden[name='hidden_old_name']")
													.remove();
											currentRow
													.find(
															"input:hidden[name='hidden_old_des']")
													.remove();
											currentRow
													.find(
															"input:hidden[name='hidden_old_price']")
													.remove();
											currentRow.find("button[name='cancel']").remove();
											currentRow.find(
													'button[name="edit"]')
													.show();
											 currentRow.find("button[name='delete']").show();

										});

						// $(this).remove();

					});

	$('tbody').on('click', 'button[name="delete"]', function() {

		let currentRow = $(this).closest("tr");
		let id = currentRow.attr("id");
		let url = $(location).attr('href') + "/" + id;

		
		$(function() {
			
			id = currentRow.attr("id");
			p_name = currentRow.find("td[name='p_name']").text();
			c_name = currentRow.find("td[name='c_name']").text();
			price = currentRow.find("td[name='price']").text();
			total = currentRow.find("td[name='total']").text();
			quantity = currentRow.find("td[name='quantity']").text();
			
			$("#popup .modal-title").html("Confirm");
			$("#popup .modal-body").html(`Will you delete this order?<br\>
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
								 <th scope="row">Price</th>
								 <td>${price} VND</td>
							 </tr>
							  <tr>
								 <th scope="row">Quantity</th>
								 <td>${quantity}</td>
							 </tr>
							 						  <tr>
								 <th scope="row">Total</th>
								 <td>${total}</td>
							 </tr>
							 </tbody>
					 </table>
					 </div>
					`);
			$("#popup").modal("show");
			$('#popup').on('click', 'button[name="save"]', function(e) {
				e.stopImmediatePropagation();
				$("#popup").modal("toggle");
				$.ajax({
					url : url,
					type : 'DELETE',
					// data:{id:id,},

					success : function(response) {
						$("#popup").modal('toggle');
//						currentRow.remove();
						location.reload();
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

		})
	});
	$('#popup').on('click', 'button[name="close"]', function() {
		$("#popup").modal('toggle');
	});

});
