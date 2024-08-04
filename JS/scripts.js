// ALERTA DE BOAS VINDAS 5S
// document.addEventListener("DOMContentLoaded", function () {
//   setTimeout(function () {
//     alert("Bem-vindo ao nosso website!");
//   }, 5000);
// });


// Função para carregar as notícias
function carregarNoticias() {
  const rssFeed = "https://feeds.simplecast.com/54nAGcIl";

  fetch(rssFeed)
    .then((response) => response.text())
    .then((str) => {
      var xmlDoc = new DOMParser().parseFromString(str, "text/xml");
      const items = xmlDoc.querySelectorAll("item");

      let news = "";

      for (let i = 0; i < 5; i++) {
        var title = items[i].querySelector("title").textContent;
        var description = items[i].querySelector("description").textContent;
        var pubDate = items[i].querySelector("pubDate").textContent;
        var link = items[i].querySelector("link").textContent;

        news +=
          `<article>
            <h3>${title}</h3>
            ${description.substring(0, 500)}(...)
            <br>
            <br>
            ${pubDate}
            <a href="${link}">${link}</a>
            <hr>
          </article>`;
      }

      document.getElementById("news").innerHTML = news;
    })
    .catch((error) => console.error("Ocorreu um erro ao carregar as notícias:", error));
}

// Chamar a função para carregar as notícias quando a página carregar
window.onload = carregarNoticias;



// ORÇAMENTO
var orcamentoForm = document.getElementById("orcamentoForm");

if (orcamentoForm) {
  orcamentoForm.addEventListener("input", calcularOrcamento);
}

function calcularOrcamento() {
  try {
    // Obter valores dos campos
    var tipoPagina = document.getElementById("tipoPagina").value;
    var prazoMeses = parseInt(document.getElementById("prazoMeses").value, 10) || 0;
    var separadores = document.getElementsByName("separadores");

    // Lógica de cálculo do orçamento
    var precoBase = 0;
    switch (tipoPagina) {
      case "opcao1":
        precoBase = 1000;
        break;
      case "opcao2":
        precoBase = 1500;
        break;
      case "opcao3":
        precoBase = 2000;
        break;
      case "opcao4":
        precoBase = 1000;
        break;
    }

    var orcamento = precoBase;

    // Calcular desconto de 5% para cada mês de prazo
    var descontoPercentual = 5 * prazoMeses;
    if (descontoPercentual > 20) {
      // Limitar desconto a 20%
      descontoPercentual = 20;
    }

    // Aplicar desconto
    var desconto = (orcamento * descontoPercentual) / 100;
    orcamento -= desconto;

    // Adicionar valor para cada checkbox marcada
    for (var i = 0; i < separadores.length; i++) {
      if (separadores[i].checked) {
        orcamento += parseInt(separadores[i].value, 10) || 0;
      }
    }

    // Atualizar a exibição do orçamento e desconto
    document.getElementById("orcamentoFinal").innerText = orcamento.toFixed(2) + " €";
    document.getElementById("descontoPercentual").innerText = descontoPercentual + "% de desconto";
  } catch (error) {
    console.error("Erro ao calcular orçamento:", error);
  }
}



// Portifólio - Galery
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const imageUrl = item
      .querySelector(".gallery-image")
      .getAttribute("data-src");
    lightboxImage.setAttribute("src", imageUrl);
    lightbox.style.display = "flex";
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.style.display = "none";
});



//FORMULARIO DE CONTACTO COM VALIDAÇÕES
const form = document.getElementById("form-contato");
const nome = document.getElementById("nome");
const apelido = document.getElementById("apelido");
const tlm = document.getElementById("tlm");
const email = document.getElementById("email");
const data = document.getElementById("data");
const motivo = document.getElementById("motivo");
const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setErrorInput(element, errorMessage) {
  element.style.border = "2px solid red";
  alert(errorMessage);
}

function setValidInput(element) {
  element.style.border = "2px solid green";
}

function validateNome() {
  const nomeValue = nome.value.trim();
  if (!nomeValue || /\d/.test(nomeValue)) {
    setErrorInput(
      nome,
      "O campo Nome aceita apenas letras e não pode estar vazio."
    );
    return false;
  } else {
    setValidInput(nome);
    return true;
  }
}

function validateApelido() {
  const apelidoValue = apelido.value.trim();
  if (!apelidoValue || /\d/.test(apelidoValue)) {
    setErrorInput(
      apelido,
      "O campo Apelido aceita apenas letras e não pode estar vazio."
    );
    return false;
  } else {
    setValidInput(apelido);
    return true;
  }
}

function validateTlm() {
  const tlmValue = tlm.value.trim();
  if (
    !/^\d+$/.test(tlmValue) ||
    tlmValue.length !== 9 ||
    !tlmValue.startsWith("9")
  ) {
    setErrorInput(
      tlm,
      "Por favor, insira um número de telefone válido (9 dígitos começando com 9)."
    );
    return false;
  } else {
    setValidInput(tlm);
    return true;
  }
}

function validateEmail() {
  const emailValue = email.value.trim();
  if (!reEmail.test(emailValue)) {
    setErrorInput(
      email,
      "Por favor, insira um endereço de e-mail válido e não pode estar vazio."
    );
    return false;
  } else {
    setValidInput(email);
    return true;
  }
}

function validateData() {
  const dataValue = data.value.trim();
  if (!dataValue) {
    setErrorInput(data, "Por favor, insira uma data.");
    return false;
  } else {
    setValidInput(data);
    return true;
  }
}

function validateMotivo() {
  const motivoValue = motivo.value.trim();
  if (!motivoValue || motivoValue.length < 5) {
    setErrorInput(
      motivo,
      "Por favor, forneça um motivo com pelo menos 5 caracteres e não pode estar vazio."
    );
    return false;
  } else {
    setValidInput(motivo);
    return true;
  }
}

function validateForm() {
  let isValid = true;
  isValid = validateNome() && isValid;
  isValid = validateApelido() && isValid;
  isValid = validateTlm() && isValid;
  isValid = validateEmail() && isValid;
  isValid = validateData() && isValid;
  isValid = validateMotivo() && isValid;
  return isValid;
}

form.addEventListener("submit", function (event) {
  if (!validateForm()) {
    event.preventDefault();
    alert("Por favor, preencha todos os campos corretamente.");
  }
});
