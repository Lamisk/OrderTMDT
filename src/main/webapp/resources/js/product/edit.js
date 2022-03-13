$(function() {

	$('tbody')
			.on(
					'click',
					'button[name="edit"]',
					function() {

						let currentRow = $(this).closest("tr");

						let name = currentRow.find("td[name='name']");
						let des = currentRow.find("td[name='des']");
						let price = currentRow.find("td[name='price']");

						let old_name = name.text();
						let old_des = des.text();
						let old_price = price.text();
//						console.log(old_name + " " + old_des + " " + old_price);
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
		let code = currentRow.find("td[name='edit_des']").text();
		let price = currentRow.find("input[name='edit_price']").val();
//		console.log(price);
		let data = {
			id : id,
			name : name,
			des : des,
			code : code,
			price : price,

		};
		$("#popup .modal-title").html("Confirm");
		$("#popup .modal-body").html("You will update this product");
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
						let name = currentRow.find("input[name='edit_name']");
						let des = currentRow.find("input[name='edit_des']");
						let price = currentRow.find("input[name='edit_price']");

						let old_name = currentRow.find(
								"input:hidden[name='hidden_old_name']").val();
						let old_des = currentRow.find(
								"input:hidden[name='hidden_old_des']").val();
						let old_price = currentRow.find(
								"input:hidden[name='hidden_old_price']").val();

						
						
						$("#popup .modal-title").html("Confirm");
						 $("#popup .modal-body").html("You will cancle this update action");
						
						
						
						 $("#popup").modal("show");
						 $("#popup").on('click',"button[name=save]",function(){
							 $("#popup").modal("toggle");
								currentRow.find("td[name='name']").text(old_name);
								currentRow.find("td[name='des']").text(old_des);
								currentRow.find("td[name='price']").text(old_price);
								currentRow.find('button[name="confirm"]').remove();
								currentRow.find("input:hidden[name='hidden_old_name']")
										.remove();
								currentRow.find("input:hidden[name='hidden_old_des']")
										.remove();
								currentRow
										.find("input:hidden[name='hidden_old_price']")
										.remove();
								cancle_btn.remove();
								currentRow.find('button[name="edit"]').show();
								
						 });
					


//						$(this).remove();
					
						
					});

	$('tbody').on('click', 'button[name="delete"]', function() {

		let currentRow = $(this).closest("tr");
		let url = $(location).attr('href') + "/" + currentRow.attr("id")
		var id = currentRow.attr("id");
		$(function() {

			$("#popup .modal-title").html("Confirm");
			$("#popup .modal-body").html("You will delete this product");
			$("#popup").modal("show");
			$('#popup').on('click', 'button[name="save"]', function() {
				$.ajax({
					url : url,
					type : 'DELETE',

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
