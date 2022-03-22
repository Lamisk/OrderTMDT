//product

$(function() {
	

	$('tbody')
			.on(
					'click',
					'button[name="edit"]',
					function() {
						
						let currentRow = $(this).closest("tr");
						 currentRow.find("button[name='delete']").hide();
						let name = currentRow.find("td[name='name']");
						let des = currentRow.find("td[name='des']");
						let price = currentRow.find("td[name='price']");
				

						let old_name = name.text();
						let old_des = des.text();
						let old_price = price.text();
					
						
						name.html("<input name='edit_name' value='" + old_name
								+ "'>");
						des.html("<input name='edit_des' value='" + old_des
								+ "'>");
						price
								.html("<input name='edit_price' type='number' min=0 max=100000000 value='"
										+ old_price + "'>");
						

						currentRow
								.find('.btn-group')
								.prepend(
										"<button type='button' class='btn btn-outline-secondary' name='cancel'>Cancel</button>");
						currentRow
								.find('.btn-group')
								.prepend(
										"<button type='button' class='btn btn-outline-success' name='confirm'>Confirm</button>");

						currentRow
								.append("<input type='hidden' name='hidden_old_name' value='"
										+ old_name + "'>");
						currentRow
								.append("<input type='hidden' name='hidden_old_des' value='"
										+ old_des + "'>");
						currentRow
								.append("<input type='hidden' name='hidden_old_price' value='"
										+ old_price + "'>");
						
						$(this).hide()
						// FOR EDIT PRICE
						$("input[name='edit_price']")
								.on(
										'keydown',
										function(event) {
											if (!((48 <= event.which && event.which <= 57)
													|| (96 <= event.which && event.which <= 105) || event.which <= 31)) {
												event.preventDefault();
											}

										}).on('keyup', function() {
									if ($(this).val() > 100000000) {
										$(this).val(100000000);
									}
								});
					});

	
	$('tbody').on('click', 'button[name="confirm"]', function() {
		
		let currentRow = $(this).closest("tr");
		let url = $(location).attr('href');

		let id = currentRow.attr("id");
		let name = currentRow.find("input[name='edit_name']").val();
		let des = currentRow.find("input[name='edit_des']").val();
		
		let price = currentRow.find("input[name='edit_price']").val();
		
		let data = {
			id : id,
			name : name,
			des : des,
		
			price : price,

		};
		

		$("#popup .modal-title").html("Confirm");
		$("#popup .modal-body").html(`Will you update this product?<br\>
				<div class="table-responsive">
				 <table class='table table-bordered' >
				 <tbody>
						
						  <tr>
							 <th scope="row">Name</th>
							 <td>${name}</td>
						 </tr>
						  <tr>
							 <th scope="row">Description</th>
							 <td class="text-break">${des}</td>
						 </tr>
						 <tr>
							 <th scope="row">Price</th>
							 <td>${price} VND</td>
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
						currentRow = $(this).closest("tr");
					
						 cancle_btn = $(this);
						console.log(currentRow.attr("id"));
						
						 name = currentRow.find("input[name='edit_name']");
						 des = currentRow.find("input[name='edit_des']");
						 price = currentRow.find("input[name='edit_price']");
					

						 old_name = currentRow.find(
								"input:hidden[name='hidden_old_name']").val();
						 old_des = currentRow.find(
								"input:hidden[name='hidden_old_des']").val();
						 old_price = currentRow.find(
								"input:hidden[name='hidden_old_price']").val();
					

						$("#popup .modal-title").html("Confirm");
						$("#popup .modal-body").html(`Will you reset product data to:<br\>
								<div class="table-responsive">
								 <table class='table table-bordered' >
								 <tbody>
										
										  <tr>
											 <th scope="row">Name</th>
											 <td>${old_name}</td>
										 </tr>
										  <tr>
											 <th scope="row">Description</th>
											 <td class="text-break">${old_des}</td>
										 </tr>
										 <tr>
											 <th scope="row">Price</th>
											 <td>${old_price} VND</td>
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
										function(e) { 
										e.stopImmediatePropagation();
									
											$("#popup").modal("toggle");
											
											
										
											currentRow.find("td[name='name']")
													.text(old_name);
											currentRow.find("td[name='des']")
													.text(old_des);
											currentRow.find("td[name='price']")
													.text(old_price);
											
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
//											
											currentRow.find("button[name='cancel']").remove();
// console.log("C: ",currentRow.attr("id"));
											 currentRow.find("button[name='delete']").show();
											currentRow.find(
													'button[name="edit"]')
													.show();

										});

						

					});

	$('tbody').on('click', 'button[name="delete"]', function() {

		 currentRow = $(this).closest("tr");
		
		 url = $(location).attr('href') + "/" + currentRow.attr("id")
		 id = currentRow.attr("id");
		
		 
		 name = currentRow.find("td[name='name']").text();
		 des = currentRow.find("td[name='des']").text();
		 price = currentRow.find("td[name='price']").text();
		 
		 
		$(function() {

			$("#popup .modal-title").html("Confirm");
			$("#popup .modal-body").html(`Will you delete this product?<br\>
					<div class="table-responsive">
					 <table class='table table-bordered' >
					 <tbody>
							 
							  <tr>
								 <th scope="row">Name</th>
								 <td>${name}</td>
							 </tr>
							  <tr>
								 <th scope="row">Description</th>
								 <td class="text-break">${des}</td>
							 </tr>
							 <tr>
								 <th scope="row">Price</th>
								 <td>${price} VND</td>
							 </tr>
							 </tbody>
					 </table>
					 </div>
					`);
			$("#popup").modal("show");
			$('#popup').on('click', 'button[name="save"]', function() {
				$.ajax({
					url : url,
					type : 'DELETE',

					success : function(response) {
						$("#popup").modal('toggle');
// currentRow.remove();
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
