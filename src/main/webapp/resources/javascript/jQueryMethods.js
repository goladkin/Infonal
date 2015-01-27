/**
 * 
 */
$(document).ajaxStart(function() {

	$("#loaderGif").dialog({
		bgiframe : true,
		height : 48,
		width : 48,
		modal : true,
		closeOnEscape : false,
		open : function(event, ui) {
			$(".ui-dialog-titlebar-close").hide();
		}
	}).dialog("widget").find(".ui-dialog-title").hide();
	$('#loaderGif').show();
}).ajaxStop(function() {
	$('#loaderGif').hide();
	$("#loaderGif").dialog('close');
});

$(document).on('click', '#btnAdd', function(e) {
	e.preventDefault();
	$("#errorLabel").text("");
	$("#name").val("");
	$("#surname").val("");
	$("#phone").val("");
	$("#id").val("");
	$("#captcha").val("");
	$("#btnAddUser").css("display", "inline");
	$("#btnUpdateUser").css("display", "none");
	$("#captchaTableRow").css("display", "table-row");
	$("#captchaImage").css("display", "inline");
	$("#addUpdateModal").dialog({
		bgiframe : true,
		height : 300,
		modal : true,
	});

});

$(document).on('click', '.btnDelete', function(e) {
	$("#deleteCandidateId").text(
			$(this).closest("tr").find(".userId").text());
	e.preventDefault();
	$("#confirmDeleteModal").dialog({
		bgiframe : true,
		height : 100,
		modal : true
	});
});

$(document).on('click', '.btnUpdate', function(e) {
	e.preventDefault();
	$("#errorLabel").text("");
	$("#btnAddUser").css("display", "none");
	$("#btnUpdateUser").css("display", "block");
	$("#captchaTableRow").css("display", "none");
	$("#captchaImage").css("display", "none");
	var $row = $(this).closest("tr");
	$("#addUpdateModal").dialog({
		bgiframe : true,
		height : 300,
		modal : true,
	});
	$('#name').val($row.find(".userName").text());
	$('#surname').val($row.find(".userSurname").text());
	$('#phone').val($row.find(".userPhone").text());
	$('#id').val($row.find(".userId").text());
});

$(document).on('click', '#btnConfirmDelete', function(e) {
	deleteUser();
});

$(document).on('click', '#btnCancelDelete', function(e) {
	$('#confirmDeleteModal').dialog('close');
});

$(document).on('click', '#btnCancel', function(e){
	$('#addUpdateModal').dialog('close');
});

$(document).on('click', '#btnAddUser', function(e){
	insertUser();
});

$(document).on('click', '#btnUpdateUser', function(e){
	updateUser();
});

function insertUser() {
	if(!inputsValid()) {
		return;
	}
	$.ajax({

		type : "post",
		url : "http://localhost:8080/InfonalAssignment/user/add",
		cache : false,
		data : 'name=' + $("#name").val() + "&surname="
		+ $("#surname").val() + "&phone=" + $("#phone").val()
		+ "&captcha=" + $("#captcha").val(),
		success : function(response) {
			$('#tableUsers tr:last').after('<tr>' 
					+ '<td class="userId">' + response + '</td>'
					+ '<td class="userName">' + $("#name").val() + '</td>'
					+ '<td class="userSurname">' + $("#surname").val() + '</td>'
					+ '<td class="userPhone">' + $("#phone").val() + '</td>'
					+ '<td><button class="btnDelete" value="Sil">Sil</button> <button '
					+	'class="btnUpdate">Güncelle</button></td>'
					+ '</tr>');
			$("#addUpdateModal").dialog('close');
		},
		error : function() {
			alert('Error while request..');
		}
	});

}

function updateUser() {
	if(!inputsValid()) {
		return;
	}
	$.ajax({
		type : "post",
		url : "http://localhost:8080/InfonalAssignment/user/update",
		cache : false,
		data : 'name=' + $('#name').val() + '&surname='
		+ $('#surname').val() + '&phone=' + $('#phone').val()
		+ '&id=' + $('#id').val(),
		success : function(response) {
			var tableRow = $("td.userId").filter(function() {
				return $(this).text() == $('#id').val();
			}).closest("tr");
			tableRow.find('td:first').text($('#id').val()).next('td').text($('#name').val())
			.next('td').text($('#surname').val()).next('td').text($('#phone').val());
			$("#addUpdateModal").dialog('close');
		},
		error : function() {
			alert('Error while request...');
		}
	});
}

function deleteUser() {
	var $id = $("#deleteCandidateId").text();
	$.ajax({
		type : "post",
		url : "http://localhost:8080/InfonalAssignment/user/delete",
		cache : false,
		data : 'id=' + $id,
		success : function(response) {
			var tableRow = $("td.userId").filter(function() {
				return $(this).text() == $id;
			}).closest("tr");
			tableRow.remove();
			$("#confirmDeleteModal").dialog('close');
		},
		error : function() {
			alert('Error while request...');
		}
	});
}

function inputsValid() {
	var regexAlphabetic = /^([a-zA-ZÖöÜüİıŞşÇçĞğ -]+)$/;
	var regexPhone = /^(0(\d{3}) (\d{3}) (\d{2}) (\d{2}))$/;
	var input = $("#name").val();
	if (!regexAlphabetic.test(input)) {
		$("#errorLabel")
		.text(
		"Ad alanı boş olamaz ve alfabetik karakterlerden oluşmalıdır.");
		return false;
	}
	input = $("#surname").val();
	if (!regexAlphabetic.test(input)) {
		$("#errorLabel")
		.text(
		"Soyad alanı boş olamaz ve alfabetik karakterlerden oluşmalıdır.");
		return false;
	}
	input = $("#phone").val();
	if (!regexPhone.test(input)) {
		$("#errorLabel")
		.text(
		'Telefon numarası 0XXX XXX XX XX formatında olmalıdır.');
		return false;
	}
	return true;
}

