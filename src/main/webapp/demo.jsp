<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
	integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
	crossorigin="anonymous">

<%-- <link href="${contextPath}/css/bootstrap.min.css" rel="stylesheet"> --%>
<!-- <link href="@{/resources/css/bootstrap.min.css}" rel="stylesheet"> -->
</head>
<body>
	<div class="container">
		<h1>Employee Register Form:</h1>
		<div class="card">
			<div class="card-body">
				<form action="<%=request.getContextPath()%>/register" method="post">

					<div class="form-group row">
						<label for="firstName" class="col-sm-2 col-form-label">First
							Name</label>
						<div class="col-sm-7">
							<input type="text" class="form-control" name="firstName"
								placeholder="Enter first name">
						</div>
					</div>

					<div class="form-group row">
						<label for="lastName" class="col-sm-2 col-form-label">Last
							Name</label>
						<div class="col-sm-7">
							<input type="text" class="form-control" name="lastName"
								placeholder="Enter last name">
						</div>
					</div>

					<div class=" form-group row">
						<label for="lastName" class="col-sm-2 col-form-label">User
							Name</label>
						<div class="col-sm-7">
							<input type="text" class="form-control" name="username"
								placeholder="Enter user name">
						</div>
					</div>

					<div class="form-group row">
						<label for="lastName" class="col-sm-2 col-form-label">Passwrod</label>
						<div class="col-sm-7">
							<input type="password" class="form-control" name="password"
								placeholder="Enter Password">
						</div>
					</div>

					<div class="form-group row">
						<label for="lastName" class="col-sm-2 col-form-label">Address</label>
						<div class="col-sm-7">
							<input type="text" class="form-control" name="address"
								placeholder="Enter Address">
						</div>
					</div>

					<div class="form-group row">
						<label for="contact" class="col-sm-2 col-form-label">Contact
							No</label>
						<div class="col-sm-7">
							<input type="text" class="form-control" name="contact"
								placeholder="Enter Contact Address">
						</div>
					</div>

					<button type="submit" class="btn btn-primary">Submit</button>
				</form>
			</div>
		</div>
	</div>
	
	<a href="customer/list">All customer</a>
</body>
</html>