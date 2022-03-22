<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>


<!DOCTYPE html>
<html>
<head>

<%@ include file="/jsp/template/meta.jsp"%>
<%@ include file="/jsp/template/header.jsp"%>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/custom.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/customer/search.js"></script>
<title>${title}</title>
</head>
<body>
	<%@ include file="/jsp/template/navbar.jsp"%>

	

	<div class="container rounded  bg-dark  fixed-bottom">
		<form id="searchform" method="post" action="">
	
		<div class="input-group mb-3">
			<span class="input-group-text">#</span> <input type="text"
				class="form-control" placeholder="Search by name" aria-label="name_search"
				aria-describedby="basic-addon1" id="name_search" name="name_search">
				<button type="submit" class="btn btn-outline-light" name="search">Search</button>
		</div>
		</form>
		
	</div>
	
	
	<div class="container rounded mt-5 bg-white p-md-5">
		<div class="h2 font-weight-bold">
			Customer <span> <a class="btn btn btn-outline-dark btn-lg"
				href="${contextPath}/customer/edit">Edit</a>
			</span>
			<span> <a class="btn btn btn-outline-dark btn-lg"
				href="${contextPath}/customer/add">Add</a>
			</span>
		</div>
		<!-- <div class="table-responsive"> -->

		<table class="table text-wrap table-hover" id="table">
			<thead class="table-light">
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Name</th>
					<th scope="col">Address</th>
					<th scope="col">Phone</th>
					<th scope="col">Gender</th>
					<th scope="col">Birthday</th>
				<tr>
			</thead>
			<tbody class="table-light">
				<c:forEach items="${customers}" var="customer">
					<tr>
						<td>${customer.id}</td>
						<td class="text-break">${customer.name}</td>
						<td class="text-break">${customer.address}</td>
						<td class="text-break">${customer.phone}</td>
						<td class="text-break">${customer.gender}</td>
						<td class="text-break">${customer.birthday}</td>

					</tr>

				</c:forEach>

			</tbody>

		</table>
	</div>

</body>
</html>