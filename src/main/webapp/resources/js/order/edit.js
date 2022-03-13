$(function() {

	$('tbody')
			.on(
					'click',
					'button[name="edit"]',
					function() {

						let currentRow = $(this).closest("tr");

						// let p_name = currentRow.find("td[name='p_name']");
						// let p_code = currentRow.find("td[name='p_code']");
						let price = currentRow.find("td[name='price']");
						let quantity = currentRow.find("td[name='quantity']");
						let total = currentRow.find("td[name='total']");

						// let old_p_name = p_name.text();
						// let old_p_code = p_code.text();
						let old_quantity = quantity.text();
						let old_total = total.text();

						/*
						 * p_name.html("<input name='edit_p_name' value='" +
						 * old_p_name + "'>"); p_code.html("<input
						 * name='edit_p_code' value='" + old_p_code + "'>");
						 */
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

						/*
						 * currentRow .append("<input type='hidden'
						 * name='hidden_old_p_name' value='" + old_p_name +
						 * "'>"); currentRow .append("<input type='hidden'
						 * name='hidden_old_p_code' value='" + old_p_code +
						 * "'>");
						 */
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
		// let name = currentRow.find("input[name='edit_name']").val();
		// let des = currentRow.find("input[name='edit_des']").val();
		// let code = currentRow.find("td[name='edit_des']").text();
		// let price = currentRow.find("input[name='edit_price']").val();
		let quantity = currentRow.find("input[name='edit_quantity']").val();
		console.log(quantity);
		
		let data = {
			id : id,
			quantity : quantity
		};
		$("#popup .modal-title").html("Confirm");
		$("#popup .modal-body").html("You will update this order");
		$("#popup").modal("show");
		$('#popup').on('click', 'button[name="save"]', function() {
			$.ajax({
				url : url,
				type : 'PATCH',
				data : data,
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
	});

	$('tbody')
			.on(
					'click',
					'button[name="cancel"]',
					function() {
						let currentRow = $(this).closest("tr");
						let cancle_btn = $(this);
						let p_name = currentRow
								.find("input[name='edit_p_name']");
						let p_code = currentRow
								.find("input[name='edit_p_code']");
						let quantity = currentRow
								.find("input[name='edit_quantity']");

						let old_p_name = currentRow.find(
								"input:hidden[name='hidden_old_p_name']").val();
						let old_p_code = currentRow.find(
								"input:hidden[name='hidden_old_p_code']").val();
						let old_quantity = currentRow.find(
								"input:hidden[name='hidden_old_quantity']")
								.val();
						let old_total = currentRow.find(
								"input:hidden[name='hidden_old_total']").val();

						$("#popup .modal-title").html("Confirm");
						$("#popup .modal-body").html(
								"You will cancle this update action");

						$("#popup").modal("show");
						$("#popup")
								.on(
										'click',
										"button[name=save]",
										function() {
											$("#popup").modal("toggle");
											currentRow
													.find("td[name='p_name']")
													.text(old_p_name);
											currentRow
													.find("td[name='p_code']")
													.text(old_p_code);
											currentRow.find(
													"td[name='quantity']")
													.text(old_quantity);
											currentRow.find("td[name='total']")
													.text(old_total);
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
											cancle_btn.remove();
											currentRow.find(
													'button[name="edit"]')
													.show();

										});

						// $(this).remove();

					});

	$('tbody').on('click', 'button[name="delete"]', function() {

		let currentRow = $(this).closest("tr");
		let id = currentRow.attr("id");
		let url = $(location).attr('href') + "/" + id;

		console.log(id);
		$(function() {

			$("#popup .modal-title").html("Confirm");
			$("#popup .modal-body").html("You will delete this order");
			$("#popup").modal("show");
			$('#popup').on('click', 'button[name="save"]', function() {
				$.ajax({
					url : url,
					type : 'DELETE',
					// data:{id:id,},

					success : function(response) {
						$("#popup").modal('toggle');
						currentRow.remove();
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
					}
				});
			});

		})
	});
	$('#popup').on('click', 'button[name="close"]', function() {
		$("#popup").modal('toggle');
	});

});
