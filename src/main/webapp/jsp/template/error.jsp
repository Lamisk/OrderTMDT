<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>

<!DOCTYPE html>
<html>
<head>
<%@ include file="/jsp/template/meta.jsp"%>
<%@ include file="/jsp/template/header.jsp"%>
<title>${title}</title>
</head>
<body>
	<%@ include file="/jsp/template/navbar.jsp"%>
	<h1 style="color: red; align: center">ERROR PAGE!!!</h1>
	<h1>cause: ${cause}</h1>
	<h2>exception: ${exception}</h2>
	<h2>message: ${message}</h2>
	<h2>url: ${url}</h2>

</body>
</html>