<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>


<!DOCTYPE html>
<html>
<head>
<%@ include file="/jsp/template/meta.jsp"%>
<%@ include file="/jsp/template/header.jsp"%>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/customer/add.js"></script>
<title>${title}</title>
</head>
<body>
	<%@ include file="/jsp/template/navbar.jsp"%>
	<%@ include file="/jsp/template/modal.jsp"%>
	<%@ include file="/jsp/template/modal_error.jsp"%>
	<div class="container rounded mt-5 bg-white p-md-5">

		<form>


			<div class="mb-3 mt-3">
				<label for="name" class="form-label">Name:</label> <input
					type="text" class="form-control" id="name"
					placeholder="Enter customer's name" name="name" autocomplete="off"
					autofocus>
				<p class="text-danger" id="error_name"></p>
			</div>

			<div class="mb-3">
				<label for="address" class="form-label">Address:</label> <input
					type="text" class="form-control" id="address"
					placeholder="Enter customer's address" name="address"
					autocomplete="off">
				<p class="text-danger" id="error_address"></p>
			</div>

			<div class="mb-3 mt-3">
				<label for="phone" class="form-label">Phone:</label> <input
					type="text" class="form-control" id="phone"
					placeholder="Enter customer's phone" name="phone"
					autocomplete="off" maxlength=10>
				<p class="text-danger" id="error_phone"></p>
			</div>

			<div class="mb-3 mt-3">
				<label for="gender" class="form-label">Gender:</label>
				<!-- <input
					type="text" class="form-control" id="gender"
					placeholder="Enter customer's gender" name="gender" autocomplete="off"
					> -->
				<select id="gender" name="gender" class="form-select">
					<option id="male" value="male" selected>Male</option>
					<option id="female" value="female">Female</option>
				</select>
				<!-- <p class="text-danger" id="error_gender"></p> -->
			</div>
			<div class="mb-3 mt-3">
				<label for="birthday" class="form-label">Birthday:</label>
				<!-- <input
					type="text" class="form-control" id="birthday"
					placeholder="Enter customer's birthday" name="birthday" autocomplete="off"
					> -->

				<!-- <p class="text-danger" id="error_birthday"></p> -->
				<input type="date" class="form-control" id="birthday"
					name="birthday">
			</div>
			<button type="button" class="btn btn-outline-primary disabled"
				name="submit">Submit</button>

		</form>
	</div>

</body>
</html>