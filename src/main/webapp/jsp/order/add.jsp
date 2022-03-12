<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="US-ASCII">
<title>${title}</title>
<%@ include file="/jsp/template/meta.jsp"%>
<%@ include file="/jsp/template/header.jsp"%>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/order/add.js"></script>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/prepend.css" >
</head>
<body>
	<%@ include file="/jsp/template/navbar.jsp"%>
	<%@ include file="/jsp/template/modal.jsp"%>
	<div class="container rounded mt-5 bg-white p-md-5 form-group">


		<div class="input-group mb-3" id="input_group_customer">
			<div class="input-group-prepend">
				<label for="customer" class="input-group-text">Customer</label>

			</div>

			<input class="form-control" id="customer_filter"
				name="customer_filter" type="text"
				placeholder="Filter customer by code"> <select
				class="form-select" name="customer_select">
				<option disabled selected id="default_select" id="default_select">--
					select an option --</option>
				<c:forEach items="${customers }" var="customer">
					<option id=${customer.id } value="${customer.code}">${customer.code}|${customer.name}</option>
				</c:forEach>
			</select>

		</div>

		<div class="input-group mb-3" id="input_group_product">
			<div class="input-group-prepend">
				<label for="product" class="input-group-text">Product</label>
			</div>
			<input class="form-control" id="product_filter" name="product_filter"
				type="text" placeholder="Filter product by code" value="${precode}"> 
				
				<select
				class="form-select" name="product_select">
				<option disabled selected id="default_select" id="default_select">--
					select an option --</option>
				<c:forEach items="${products }" var="product">
					<option id=${product.id } value="${product.code}">${product.code}|${product.name}</option>
				</c:forEach>
			</select>

		</div>

		<div class="input-group mb-3" id="input_group_product">
			<div class="input-group-prepend">
				<label for="quantity" class="input-group-text">Quantity</label>
			</div>
		
				<input class="form-control" id="quantity" name="quantity"
				type="number" placeholder="Enter quantity" min=0 max=100>
	
		

		</div>
		<p class="text-danger" id="error_quantity"></p>
		<button type="button" class="btn btn-outline-primary mt-3 disabled"
			name="submit">Submit</button>

	</div>
</body>
</html>