
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<link rel="stylesheet" href="resources/css/myCss.css" type="text/css" />
<script src="http://code.jquery.com/jquery-latest.js">
	
</script>
<script src="http://code.jquery.com/ui/1.11.2/jquery-ui.js">
	
</script>
</head>
<body>
	<h2>Kullanıcı Listesi</h2>


	<table id="tableUsers" border="1">
		<thead>
			<th>ID</th>
			<th>Ad</th>
			<th>Soyad</th>
			<th>Telefon</th>
			<th>Seçenekler</th>
		</thead>
		<tbody>
			<c:forEach var="user" items="${userList}">
				<tr>
					<td class="userId">${user.id}</td>
					<td class="userName">${user.name}</td>
					<td class="userSurname">${user.surname}</td>
					<td class="userPhone">${user.phone}</td>
					<td><input class="btnDelete" type="button" value="Sil" /> <input
						class="btnUpdate" type="button" value="Güncelle" /></td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
	<input type="button" value="Kayıt Ekle" id="btnAdd" />
	
	
	<div class="loaderGif" id="loaderGif">
		<img id="imgLoaderGif" alt="Not found"
			src="resources/images/ajax-loader.gif" />
	</div>
	
	<div class="confirmDeleteModalWindow" id="confirmDeleteModal"
		style="display: none;">
		<label id="deleteCandidateId" hidden="true"></label> </br> <label>Seçilen
			kayıt sistemden silinecek.</label> </br>
		<button id="btnConfirmDelete" onclick="deleteUser();">Tamam</button>
		<button id="btnCancelDelete"
			onclick="$('#confirmDeleteModal').dialog('close');">İptal</button>
	</div>
	
	<div class="addUpdateModalWindow" id="addUpdateModal"
		style="display: none;">
		<div id="modalContents">

			<table id="userInfo">

				<tr style="visibility: hidden">
					<td><label>Id:</label></td>
					<td><input type="text" id="id" /></td>
				</tr>
				<tr>
					<td><label>Ad:</label></td>
					<td><input type="text" id="name" /></td>
				</tr>
				<tr>
					<td><label>Soyad:</label></td>
					<td><input type="text" id="surname" /></td>
				</tr>
				<tr>
					<td><label>Telefon:</label></td>
					<td><input type="text" id="phone" /></td>
				</tr>
				<tr id="captchaTableRow">
					<td><label>Captcha:</label></td>
					<td><input type="text" id="captcha" /></td>
				</tr>
				<tr>
					<td></td>
					<td><img id="captchaImage" alt="Not found"
						src="resources/images/captcha1.png" /></td>
				</tr>
				<tr>
					<td></td>

					<td>
						<button id="btnAddUser" onclick="insertUser();"
							style="visibility: hidden">Kaydet</button>
						<button id="btnUpdateUser" onclick="updateUser();"
							style="visibility: hidden">Güncelle</button>
							<button id="btnCancel" onclick="$('#addUpdateModal').dialog('close');">İptal</button>
					</td>
				</tr>
			</table>
			<label id="errorLabel"></label>
		</div>
	</div>
	
	<script src="resources/javascript/jQueryMethods.js" type="text/javascript">

	</script>
</body>
</html>

