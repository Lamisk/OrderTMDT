$(function() {

	$('tbody')
			.on(
					'click',
					'button[name="edit"]',
					function() {
						let currentRow = $(this).closest("tr");

						let name = currentRow.find("td[name='name']");
						let address = currentRow.find("td[name='address']");

						let old_name = name.text();
						let old_address = address.text();

						name.html("<input name='edit_name' value='" + old_name
								+ "'>");
						address.html("<input name='edit_address' value='"
								+ old_address + "'>");

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
								.append("<input type='hidden' name='hidden_old_address' value='"
										+ old_address + "'>");

						$(this).hide()

					});

	$('tbody').on('click', 'button[name="confirm"]', function() {

		let currentRow = $(this).closest("tr");
		let url = $(location).attr('href');

		let id = currentRow.attr("id");
		let name = currentRow.find("input[name='edit_name']").val();
		let address = currentRow.find("input[name='edit_address']").val();
		let code = currentRow.find("td[name='edit_address']").text();

		let data = {
			id : id,
			name : name,
			address : address,
			code : code,

		};
		$("#popup .modal-title").html("Confirm");
		$("#popup .modal-body").html("You will update this customer");
		$("#popup").modal("show");
		$('#popup').on('click', 'button[name="save"]', function() {
			$.ajax({
				url : url,
				type : 'PATCH',

				data : data,
				// contentType : 'application/json; charset=utf-8',
				// dataType : 'json',

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

	$('tbody').on(
			'click',
			'button[name="cancel"]',
			function() {

				let currentRow = $(this).closest("tr");

				let name = currentRow.find("input[name='edit_name']");
				let address = currentRow.find("input[name='edit_address']");

				let old_name = currentRow.find(
						"input:hidden[name='hidden_old_name']").val();
				let old_address = currentRow.find(
						"input:hidden[name='hidden_old_address']").val();

				currentRow.find("td[name='name']").text(old_name);
				currentRow.find("td[name='address']").text(old_address);

				$(this).remove();
				currentRow.find('button[name="confirm"]').remove();
				currentRow.find("input:hidden[name='hidden_old_name']")
						.remove();
				currentRow.find("input:hidden[name='hidden_old_address']")
						.remove();

				currentRow.find('button[name="edit"]').show();
			});

	$('tbody').on('click', 'button[name="delete"]', function() {

		let currentRow = $(this).closest("tr");
		let url = $(location).attr('href') + "/" + currentRow.attr("id")
		var id = currentRow.attr("id");
		$(function() {

			$("#popup .modal-title").html("Confirm");
			$("#popup .modal-body").html("You will delete this customer");
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
