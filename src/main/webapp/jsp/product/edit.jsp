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
	src="${pageContext.request.contextPath}/js/filter.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/product/edit.js"></script>


<title>${title}</title>
</head>
<body>
	<%@ include file="/jsp/template/navbar.jsp"%>
	<%@ include file="/jsp/template/modal.jsp"%>
	<%@ include file="/jsp/template/modal_error.jsp"%>
	<div class="container rounded  bg-dark  fixed-bottom">

		<div class="input-group mb-3">
			<span class="input-group-text">@</span> <input type="text"
				class="form-control" placeholder="Filter by name" aria-label="name_search"
				aria-describedby="basic-addon1" onkeyup="filter()" id="name_search" name="name_search"
				autocomplete="off">
		</div>
	</div>





	<div class="container rounded mt-5 bg-white p-md-5">
		<div class="h2 font-weight-bold">Product</div>
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

					<tr id="${product.id}">

						<td name="id">${product.id}</td>
						<td name="name" class="text-break">${product.name}</td>
						<td name="price" class="text-break">${product.price}</td>
						<td name="des" class="text-break">${product.des}</td>

						<td>
							<div class="btn-group" role="group">
								<button type="button" class="btn btn-outline-primary"
									name="edit">Edit</button>
								<button type="button" class="btn btn-outline-danger"
									name="delete" data-toggle="modal" data-target="#popup">Delete</button>

							</div>

						</td>
					</tr>
					<!-- <tr id="spacing-row">
							<td></td>
							<td></td>
							<td></td>
							
						</tr> -->
				</c:forEach>

			</tbody>

		</table>
	</div>

</body>
</html>