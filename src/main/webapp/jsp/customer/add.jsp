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

	<div class="container rounded mt-5 bg-white p-md-5">
		<%-- <form action="${contextPath}/customer/add" method="post" name="form"
			id="form"> --%>
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

			<button type="button" class="btn btn-outline-primary disabled"
				name="submit">Submit</button>

		</form>
	</div>

</body>
</html>