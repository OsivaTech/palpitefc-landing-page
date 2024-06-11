// Defina a data de lançamento
var launchDate = new Date("July 3, 2024 14:00:00").getTime();

// Atualize a contagem regressiva a cada 1 segundo
var x = setInterval(function () {
    // Obtenha a data e hora atual
    var now = new Date().getTime();

    // Encontre a diferença entre agora e a data de lançamento
    var distance = launchDate - now;

    // Cálculos de tempo para dias, horas, minutos e segundos
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Função para formatar números com dois dígitos
    function formatNumber(num) {
        return num < 10 ? "0" + num : num;
    }

    // Exibir o resultado nos elementos com id correspondente
    document.getElementById("days").innerHTML = formatNumber(days);
    document.getElementById("hours").innerHTML = formatNumber(hours);
    document.getElementById("minutes").innerHTML = formatNumber(minutes);
    document.getElementById("seconds").innerHTML = formatNumber(seconds);

    // Se a contagem regressiva terminar, escreva algum texto
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Já está no ar!";
    }
}, 1000);

// Seleciona o campo de data de nascimento
var dataNascimentoInput = document.getElementById("birthday");

// Define o formato da data para exibir quando o campo é focado
var formatoData = "dd/mm/aaaa";

// Adiciona um ouvinte de evento para o evento de foco
dataNascimentoInput.addEventListener("focus", function () {
    // Quando o campo é focado, altera o placeholder para exibir o formato da data
    dataNascimentoInput.setAttribute("type", "date");
    dataNascimentoInput.setAttribute("placeholder", formatoData);
});

// Adiciona um ouvinte de evento para o evento de desfoco
dataNascimentoInput.addEventListener("blur", function () {
    // Quando o campo perde o foco, restaura o placeholder original
    dataNascimentoInput.setAttribute("type", "text");
    dataNascimentoInput.setAttribute("placeholder", "Data de Nascimento");
});

document.getElementById("show-form-btn").addEventListener("click", function () {
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("show-form-btn").style.display = "none";
});

document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar o envio do formulário para atualizar a página
    
    // Capturar os dados do formulário
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const team = document.getElementById("team").value;
    const gender = document.getElementById("gender").value;
    const birthday = document.getElementById("birthday").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;

    // Criar o objeto com os dados do formulário
    const formData = {
        name,
        email,
        team,
        gender,
        birthday,
        city,
        state
    };

    // Enviar a requisição POST para o endpoint especificado
    fetch('http://dev.palpitefutebolclube.com:5113/api/waitinglist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.status === 204) {
            alert('Cadastro realizado com sucesso!');
        } else {
            alert('Email já cadastrado.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Ocorreu um erro ao realizar o cadastro.');
    });
});

function mascara(tel) {
    tel.value = tel.value
        .replace(/\D/g, "") // Remove tudo o que não é dígito
        .replace(/^(\d{2})(\d)/g, "($1) $2") // Coloca parênteses em volta dos dois primeiros dígitos
        .replace(/(\d)(\d{4})$/, "$1-$2"); // Coloca hífen entre o quarto e o quinto dígitos
}