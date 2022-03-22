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
<%-- <script type="text/javascript"
	src="${pageContext.request.contextPath}/js/order/search.js"></script> --%>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/order/edit.js"></script>
<title>${title}</title>
</head>
<body>
	<%@ include file="/jsp/template/navbar.jsp"%>
	<%@ include file="/jsp/template/modal.jsp"%>
	<%@ include file="/jsp/template/modal_error.jsp"%>
	

	

	<div class="container rounded mt-5 bg-white p-md-5">
		<div class="h2 font-weight-bold">
			Order 
			<%-- <span> <a class="btn btn btn-outline-dark btn-lg"
				href="${contextPath}/order/edit">Edit</a>
			</span> <span> <a class="btn btn btn-outline-dark btn-lg"
				href="${contextPath}/order/add">Add</a>
			</span> --%>
		</div>
		<!-- <div class="table-responsive"> -->

		<table class="table text-wrap table-hover" id="table">
			<thead class="table-light">
				<tr>
					<th scope="col">ID</th>
					
					<th scope="col">Customer name</th>
					
					<th scope="col">Product name</th>
				
					<th scope="col">Price (VND)</th>
					<th scope="col">Quantity</th>
					<th scope="col">Total (VND)</th>
					<th scope="col">Action</th>
				<tr>
			</thead>
			<tbody class="table-light">
				<c:forEach items="${orderItems}" var="orderItem">
					<tr id=${orderItem.id}>
						<td name="id">${orderItem.id}</td>
					
						<td class="text-break" name="c_name">${orderItem.customer.name}</td>
					
						<td class="text-break" name="p_name">${orderItem.product.name}</td>
						<%-- <td class="text-break">${orderItem.product.name}</td> --%>
						<td class="text-break" name="price">${orderItem.product.price}</td>

						<td name="quantity">${orderItem.quantity}</td>

						<td class="text-break"name="total">${orderItem.total}</td>
				
						<td>
							<div class="btn-group" role="group">
								<button type="button" class="btn btn-outline-primary"
									name="edit">Edit</button>
								<button type="button" class="btn btn-outline-danger"
									name="delete" data-toggle="modal" data-target="#popup">Delete</button>

							</div>

						</td>
					</tr>

				</c:forEach>

			</tbody>

		</table>
	</div>

</body>
</html>