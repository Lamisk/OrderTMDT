//ORDER
$(function() {
	 var html_status = `<select id="select_status" name="select_status" >`;
	function get_status() {
		   base_url = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
		   $.ajax(
					{
						 type: "get",
					     url: base_url+"/status/list",
					     success: function(response){
					         data = JSON.parse(response);	        
					         for (id in data){ 
					        	txt = `<option id=${id} value=${data[id]}>${data[id]}</option>`
					        		 html_status = html_status.concat(txt);
					         }	         
					         html_status = html_status.concat("<\select>");
// console.log(html_status);
					     }
					});
		}
	get_status();

	$('tbody')
			.on(
					'click',
					'button[name="edit"]',
					function() {

						 currentRow = $(this).closest("tr");
						currentRow.find("button[name='delete']").hide();
						

						 price = currentRow.find("td[name='price']");
						 quantity = currentRow.find("td[name='quantity']");
						 total = currentRow.find("td[name='total']");
						 o_status = currentRow.find("td[name='status']");

						// SAVE OLD
						 old_quantity = quantity.text();
						 old_total = total.text();
						 old_status = o_status.text();
//						 console.log("old_status",old_status);

// CHANGE TYPE
						quantity
								.html("<input name='edit_quantity' type='number' min=0 max=100 value='"
										+ old_quantity + "'>");
						o_status.html(html_status);
						
						currentRow.find("select[name='select_status']").find("option").each(function(){
//							console.log($(this).text());
							 currentRow = $(this).closest("tr");
							
//							console.log("old",old_status)
							if (($(this)).attr("value")==old_status){
								$(this).attr('selected', 'selected');
//								console.log($(this).text(), 'selected');
							}
					
						});

// ADD BUTTON
						currentRow
								.find('.btn-group')
								.prepend(
										"<button type='button' class='btn btn-outline-secondary' name='cancel'>Cancel</button>");

						currentRow
								.find('.btn-group')
								.prepend(
										"<button type='button' class='btn btn-outline-success' name='confirm'>Confirm</button>");

// ADD HIDDEN
						currentRow
								.append("<input type='hidden' name='hidden_old_quantity' value='"
										+ old_quantity + "'>");
						currentRow
								.append("<input type='hidden' name='hidden_old_total' value='"
										+ old_total + "'>");
						currentRow
						.append("<input type='hidden' name='hidden_old_status' value='"
								+ old_status + "'>");
						
						$(this).hide()
						// FOR EDIT PRICE
						currentRow.find("input[name='edit_quantity']")
								.on(
										'keydown',
										function(event) {
											
											if (!((48 <= event.which && event.which <= 57)
													|| (96 <= event.which && event.which <= 105) || event.which <= 31)) {
												event.preventDefault();
											}

										}).on('keyup', function() {
									if ($(this).val() > 100) {
										$(this).val(100);

									}
									 currentRow = $(this).closest("tr");
									 price = currentRow.find("td[name='price']");
									 total = currentRow.find("td[name='total']");
									total.text(price.text() * $(this).val());
								}).on('change', function() {
									 currentRow = $(this).closest("tr");
									 price = currentRow.find("td[name='price']");
									 total = currentRow.find("td[name='total']");
									total.text(price.text() * $(this).val());
								});
					});

	$('tbody').on('click', 'button[name="confirm"]', function(e) {

		 currentRow = $(this).closest("tr");
		 url = $(location).attr('href');

		 id = currentRow.attr("id");
		p_name = currentRow.find("td[name='p_name']").text();
		c_name = currentRow.find("td[name='c_name']").text();
		price = currentRow.find("td[name='price']").text();
		total = currentRow.find("td[name='total']").text();
		quantity = currentRow.find("input[name='edit_quantity']").val();
		status_id = currentRow.find("select[name='select_status']").find("option:selected").attr("id");
		status_name = currentRow.find("select[name='select_status']").find("option:selected").attr("value");
	 
	
		
		 data = {
			id : id,
			quantity : quantity,
			status_id: status_id
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
						 					  <tr>
							 <th scope="row">Status</th>
							 <td>${status_name}</td>
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
					function(e) {
						e.stopImmediatePropagation();
						currentRow = $(this).closest("tr");
						p_name = currentRow.find("td[name='p_name']").text();
						c_name = currentRow.find("td[name='c_name']").text();
						price = currentRow.find("td[name='price']").text();
										
						 quantity = currentRow
								.find("input[name='edit_quantity']");

						 old_quantity = currentRow.find(
								"input[name='hidden_old_quantity']")
								.val();
						
						 old_total = currentRow.find(
						"input[name='hidden_old_total']")
						.val();

						$("#popup .modal-title").html("Confirm");
						$("#popup .modal-body").html(`Will you reset this order?<br\>
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
											 <td>${old_total} VND</td>
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
											
											
// RESTOR OLD
											currentRow.find("td[name='total']")
													.text(old_total);
											currentRow.find("td[name='quantity']")
											.text(old_quantity);
											
// REMOVE HIDDEN
											currentRow.find("input[name='hidden_old_total']").remove();
											currentRow.find("input[name='hidden_old_quantity']").remove();
											currentRow.find("input[name='hidden_old_status']").remove();
											
// SHOW/HIDE/REMOVE BUTTON
											currentRow.find(
													'button[name="confirm"]')
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

		 currentRow = $(this).closest("tr");
		 id = currentRow.attr("id");
		 url = $(location).attr('href') + "/" + id;

		
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
