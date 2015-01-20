/**
 * 
 */
		$('#loaderGif').hide();
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
			;
			$('#loaderGif').show();
		}).ajaxStop(function() {
			$("#loaderGif").dialog('close');
			$('#loaderGif').hide();
		});

		$("#btnAdd").click(function(e) {
			e.preventDefault();
			$("#errorLabel").text("");
			$("#name").val("");
			$("#surname").val("");
			$("#phone").val("");
			$("#id").val("");
			$("#captcha").val("");
			$("#btnAddUser").css("visibility", "visible");
			$("#btnUpdateUser").css("visibility", "hidden");
			$("#captchaTableRow").css("visibility", "visible");
			$("#captchaImage").css("visibility", "visible");
			$("#addUpdateModal").dialog({
				bgiframe : true,
				height : 300,
				modal : true,
			});

		});

		function insertUser() {
			var regexAlphabetic = /^([a-zA-ZÖöÜüİıŞşÇçĞğ -]+)$/;
			var regexPhone = /^(0(\d{3}) (\d{3}) (\d{2}) (\d{2}))$/;
			var input = $("#name").val();
			if (!regexAlphabetic.test(input)) {
				$("#errorLabel")
						.text(
								"Ad alanı boş olamaz ve alfabetik karakterlerden oluşmalıdır.");
				return;
			}
			input = $("#surname").val();
			if (!regexAlphabetic.test(input)) {
				$("#errorLabel")
						.text(
								"Soyad alanı boş olamaz ve alfabetik karakterlerden oluşmalıdır.");
				return;
			}
			input = $("#phone").val();
			if (!regexPhone.test(input)) {
				$("#errorLabel")
						.text(
								'Telefon numarası 0XXX XXX XX XX formatında olmalıdır.');
				return;
			}
			if ($("#captcha").val() != "ejujle") {
				$("#errorLabel").text('Captcha değerini yanlış girdiniz.');
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
							+ '<td><input class="btnDelete" type="button" value="Sil" /> <input '
							+	'class="btnUpdate" type="button" value="Güncelle" /></td>'
							+ '</tr>');
					$("#addUpdateModal").dialog('close');
				},
				error : function() {
					alert('Error while request..');
				}
			});
			
		}

		function updateUser() {
			var regexAlphabetic = /^([a-zA-ZÖöÜüİıŞşÇçĞğ -]+)$/;
			var regexPhone = /^(0(\d{3}) (\d{3}) (\d{2}) (\d{2}))$/;
			var input = $("#name").val();
			if (!regexAlphabetic.test(input)) {
				$("#errorLabel")
						.text(
								"Ad alanı boş olamaz ve alfabetik karakterlerden oluşmalıdır.");
				return;
			}
			input = $("#surname").val();
			if (!regexAlphabetic.test(input)) {
				$("#errorLabel")
						.text(
								"Soyad alanı boş olamaz ve alfabetik karakterlerden oluşmalıdır.");
				return;
			}
			input = $("#phone").val();
			if (!regexPhone.test(input)) {
				$("#errorLabel")
						.text(
								'Telefon numarası 0XXX XXX XX XX formatında olmalıdır.');
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

		$(".btnDelete").click(
				function(e) {
					$("#deleteCandidateId").text(
							$(this).closest("tr").find(".userId").text());
					e.preventDefault();
					$("#confirmDeleteModal").dialog({
						bgiframe : true,
						height : 100,
						modal : true
					});
				})

		$(".btnUpdate").click(function(e) {
			e.preventDefault();
			$("#errorLabel").text("");
			$("#btnAddUser").css("visibility", "hidden");
			$("#btnUpdateUser").css("visibility", "visible");
			$("#captchaTableRow").css("visibility", "hidden");
			$("#captchaImage").css("visibility", "hidden");
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
		})