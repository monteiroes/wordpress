const form = document.getElementById("form_test");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (checkForm()) {
      showLoading();
      fetch("wp-admin/admin-ajax.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(new FormData(form)),
      })
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          hideLoading();
          if (jsonResponse.data.code == 200) {
            formSend(jsonResponse.data.status);
          }

          if (jsonResponse.data.code == 400) {
            formError(jsonResponse.data.error);
          }
        })
        .catch((error) => {
          hideLoading();
        });
    }
  });
}

function showLoading() {
  // Action on loading
}

function hideLoading() {
  // Action on load finish
}

function checkForm() {
  /*
   * Valores | trim() -> Remove espaços em branco
   */

  const nameValue = nameUser.value.trim();
  const emailValue = email.value.trim();

  if (nameValue === "") {
    setError(nameUser, "Por favor, preencha seu nome.");
  } else {
    setSuccess(nameUser);
  }

  if (emailValue === "") {
    setError(email, "Por favor, adicione seu e-mail.");
  } else if (!validateEmail(emailValue)) {
    setError(email, "Insira um e-mail válido.");
  } else {
    setSuccess(email);
  }

  if (!document.querySelector(".form-control.error")) {
    return true;
  } else {
    return false;
  }
}

/* Ações */

function setError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;
  formControl.className = "form-control error";
}

function setSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

/* Buscar informações pelo CEP */
jQuery(function ($) {
  $("#cep").focusout(function () {
    $.ajax({
      url: "https://viacep.com.br/ws/" + $(this).val() + "/json/unicode/",
      dataType: "json",
      success: function (resposta) {
        $("#address").val(`${resposta.logradouro}, ${resposta.bairro}`);
        setSuccess(cep);
        setSuccess(address);
      },
      error: function (resposta) {
        if (resposta.statusText == "error") {
          setError(cep, "O CEP digitado é inválido.");
        }
      },
    });
  });
});
