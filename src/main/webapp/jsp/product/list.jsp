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
	src="${pageContext.request.contextPath}/js/product/search.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/product/list.js"></script>
<title>${title}</title>
</head>
<body>
	<%@ include file="/jsp/template/navbar.jsp"%>



	<div class="container rounded  bg-dark  fixed-bottom">
		<form id="searchform" method="post" action="">

			<div class="input-group mb-3">
				<span class="input-group-text">#</span> <input type="text"
					class="form-control" placeholder="Search by name" aria-label="Code"
					aria-describedby="basic-addon1" id="name_search" name="name_search">
				<button type="submit" class="btn btn-outline-light" name="search">Search</button>
			</div>
		</form>

	</div>


	<div class="container rounded mt-5 bg-white p-md-5">
		<div class="h2 font-weight-bold">
			Product <span> <a class="btn btn btn-outline-dark btn-lg"
				href="${contextPath}/product/edit">Edit</a>
			</span> <span> <a class="btn btn btn-outline-dark btn-lg"
				href="${contextPath}/product/add">Add</a>
			</span>
		</div>
		<!-- <div class="table-responsive"> -->

		<table class="table text-wrap table-hover" id="table">
			<thead class="table-light">
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Name</th>
					<th scope="col">Price</th>
					<th scope="col">Description</th>
					<th scope="col">Action</th>
				<tr>
			</thead>
			<tbody class="table-light">
				<c:forEach items="${products}" var="product">
					<tr>
						<td>${product.id}</td>
						<td class="text-break">${product.name}</td>

						<td class="text-break">${product.price}</td>
						<td class="text-break">${product.des}</td>
						<td><a href="${contextPath}/order/add/${product.id}"
							class="btn btn-outline-success" role="button">Select</a></td>
					</tr>

				</c:forEach>

			</tbody>

		</table>
	</div>

</body>
</html>