//customer
$(function() {
	$('tbody')
	.on(
			'keydown keyup blur', 'input[name="edit_phone"]',function(e){
				charCode = (e.which) ? e.which : e.keyCode;
		        if (!((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105) || (charCode==8))) {
		        	  e.preventDefault();
		        }
			});
	
	
	$('tbody')
			.on(
					'click',
					'button[name="edit"]',
					function() {
						let currentRow = $(this).closest("tr");
// SAVE DATA
						let name = currentRow.find("td[name='name']");
						let address = currentRow.find("td[name='address']");
						let phone = currentRow.find("td[name='phone']");
						let gender = currentRow.find("td[name='gender']");
						let birthday = currentRow.find("td[name='birthday']");

						let old_name = name.text();
						let old_address = address.text();
						let old_phone = phone.text();
						let old_gender = gender.text();
						let old_birthday = birthday.text();

// CHANGE TYPE INPUT
						name.html("<input name='edit_name' value='" + old_name
								+ "'>");
						address.html("<input name='edit_address' value='"
								+ old_address + "'>");
						phone.html("<input name='edit_phone' value='"
								+ old_phone + "' maxlength=10>");
						gender.html(`
						<select id="gender" name="edit_gender"'>
					<option id="male" value="male" ${old_gender=="MALE"?"selected":""}>Male</option>
					<option id="female" value="female" ${old_gender=="FEMALE"?"selected":""}>Female</option>
				</select>
						`);
						birthday.html(`<input type='date' name='edit_birthday' value=
								${old_birthday} max=${new Date().toISOString().split("T")[0]}>`);

// SHOW/HIDE/ADD BUTTON
						currentRow
								.find('.btn-group')
								.prepend(
										"<button type='button' class='btn btn-outline-secondary' name='cancel'>Cancel</button>");

						currentRow
								.find('.btn-group')
								.prepend(
										"<button type='button' class='btn btn-outline-success' name='confirm'>Confirm</button>");
						$(this).hide();
						currentRow.find("button[name='delete']").hide();
// ADD HIDDEN
						currentRow
								.append("<input type='hidden' name='hidden_old_name' value='"
										+ old_name + "'>");
						currentRow
								.append("<input type='hidden' name='hidden_old_address' value='"
										+ old_address + "'>");
						currentRow
								.append("<input type='hidden' name='hidden_old_phone' value='"
										+ old_phone + "'>");
						currentRow
								.append("<input type='hidden' name='hidden_old_gender' value='"
										+ old_gender + "'>");
						currentRow
								.append("<input type='hidden' name='hidden_old_birthday' value='"
										+ old_birthday+ "'>");

						

					});

	$('tbody').on('click', 'button[name="confirm"]', function() {

		let currentRow = $(this).closest("tr");
		let url = $(location).attr('href');

		let id = currentRow.attr("id");
		let name = currentRow.find("input[name='edit_name']").val();
		let address = currentRow.find("input[name='edit_address']").val();
		let phone = currentRow.find("input[name='edit_phone']").val();
		let gender = currentRow.find("select[name='edit_gender']").find("option:selected").attr("value");
		let birthday = currentRow.find("input[name='edit_birthday']").val();
		
		let data = {
			id : id,
			name : name,
			address : address,
			phone:phone,
			gender:gender,
			birthday:birthday
		};
		
		$("#popup .modal-title").html("Confirm");
		$("#popup .modal-body").html(`Will you update this customer?<br\>
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
				url : url,
				type : 'PATCH',

				data : data,
			

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
	});

	$('tbody').on(
			'click',
			'button[name="cancel"]',
			function() {

				let currentRow = $(this).closest("tr");

				let name = currentRow.find("input[name='edit_name']");
				let address = currentRow.find("input[name='edit_address']");
				let phone = currentRow.find("input[name='edit_phone']");
				let gender = currentRow.find("input[name='edit_gender']");
				let birthday = currentRow.find("input[name='edit_birthday']");
				
				
				let old_name = currentRow.find(
						"input:hidden[name='hidden_old_name']").val();
				let old_address = currentRow.find(
						"input:hidden[name='hidden_old_address']").val();
				let old_phone = currentRow.find(
				"input:hidden[name='hidden_old_phone']").val();
		let old_gender = currentRow.find(
				"input:hidden[name='hidden_old_gender']").val();
		let old_birthday = currentRow.find(
		"input:hidden[name='hidden_old_birthday']").val();

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
							 <th scope="row">Address</th>
							 <td class="text-break">${old_address}</td>
						 </tr>
						<tr>
							 <th scope="row">Phone</th>
							 <td class="text-break">${old_phone}</td>
						 </tr>
						 <tr>
							 <th scope="row">Gender</th>
							 <td class="text-break">${old_gender}</td>
						 </tr>
						 <tr>
							 <th scope="row">Birthday</th>
							 <td class="text-break">${old_birthday}</td>
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
					currentRow.find("td[name='name']").text(old_name);
					currentRow.find("td[name='address']").text(old_address);
					currentRow.find("td[name='phone']").text(old_phone);
					currentRow.find("td[name='gender']").text(old_gender);
					currentRow.find("td[name='birthday']").text(old_birthday);
				
					

					$(this).remove();
					currentRow.find('button[name="confirm"]').remove();
					currentRow.find("input:hidden[name='hidden_old_name']")
							.remove();
					currentRow.find("input:hidden[name='hidden_old_address']")
							.remove();
					currentRow.find("input:hidden[name='hidden_old_phone']")
					.remove();
			currentRow.find("input:hidden[name='hidden_old_gender']")
					.remove();
			currentRow.find("input:hidden[name='hidden_old_birthday']")
			.remove();
			
			currentRow.find("button[name='cancel']").remove();
					currentRow.find('button[name="edit"]').show();
					currentRow.find("button[name='delete']").show();
					
				});
			
			});

	$('tbody').on('click', 'button[name="delete"]', function() {

		let currentRow = $(this).closest("tr");
		let url = $(location).attr('href') + "/" + currentRow.attr("id")
		var id = currentRow.attr("id");
		
		 
		 name = currentRow.find("td[name='name']").text();
		 address = currentRow.find("td[name='address']").text();
		 phone = currentRow.find("td[name='phone']").text();
		 gender = currentRow.find("td[name='gender']").text();
	birthday = currentRow.find("td[name='birthday']").text();
		 
		$(function() {

			$("#popup .modal-title").html("Confirm");
			$("#popup .modal-body").html(`Will you delete this customer?<br\>
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
					url : url,
					type : 'DELETE',

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
	$('#popup_error').on('hidden.bs.modal', function() {
		location.reload();
	});
});
