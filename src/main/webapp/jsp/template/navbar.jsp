<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>

<div class="container-fluid">
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
		<div class="container-fluid">
			<a class="navbar-brand" href="${contextPath}/${backto}">${title}</a>
			<button class="navbar-toggler" type="button"
				data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown" aria-expanded="false"
				aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse " id="navbarNavDropdown">
				<ul class="navbar-nav">
				
					<li class="nav-item"><a class="nav-link active"
						aria-current="page" href="${contextPath}/">Home</a></li>
						
						
				
					
						<li class="nav-item dropdown"><a
						class="nav-link dropdown-toggle" href="#"
						id="navbarDropdownMenuLink" role="button"
						data-bs-toggle="dropdown" aria-expanded="false"> Order </a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							<li><a class="dropdown-item"
								href="${contextPath}/order/list">List all order</a></li>
							<li><a class="dropdown-item"
								href="${contextPath}/order/add">Add order</a></li>
							<%-- <li><a class="dropdown-item"
								href="${contextPath}/order/edit">Edit order</a></li> --%>
						</ul>
					
					<li class="nav-item dropdown"><a
						class="nav-link dropdown-toggle" href="#"
						id="navbarDropdownMenuLink" role="button"
						data-bs-toggle="dropdown" aria-expanded="false"> Product </a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							<li><a class="dropdown-item"
								href="${contextPath}/product/list">List all product</a></li>
							<li><a class="dropdown-item"
								href="${contextPath}/product/add">Add product</a></li>
							<li><a class="dropdown-item"
								href="${contextPath}/product/edit">Edit product</a></li>
						</ul>

						<ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							<li><a class="dropdown-item" href="${contextPath}">List
									all product</a></li>
							<li><a class="dropdown-item" href="#">Add product</a></li>

						</ul></li>
						
						
					<li class="nav-item dropdown"><a
						class="nav-link dropdown-toggle" href="#"
						id="navbarDropdownMenuLink" role="button"
						data-bs-toggle="dropdown" aria-expanded="false"> Customer </a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							<li><a class="dropdown-item"
								href="${contextPath}/customer/list">List all customer</a></li>
							<li><a class="dropdown-item"
								href="${contextPath}/customer/add">Add customer</a></li>
							<li><a class="dropdown-item"
								href="${contextPath}/customer/edit">Edit customer</a></li>
						</ul>

						<ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							<li><a class="dropdown-item" href="${contextPath}">List
									all product</a></li>
							<li><a class="dropdown-item" href="#">Add product</a></li>

						</ul></li>
						
						
						
				</ul>
				<%-- <form class="d-flex" action="${contextPath}/<%= request.getParameter("objectPrefix") %>/search">
					<input class="form-control me-2" type="text" placeholder="Search By Code">
					<button class="btn btn-primary" type="button">Search</button>
				</form> --%>
			</div>

		</div>

	</nav>

</div>
