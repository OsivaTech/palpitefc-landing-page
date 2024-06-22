document.getElementById("show-form-btn").addEventListener("click", function () {
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("show-form-btn").style.display = "none";
    document.getElementById("show-form-btn-box").style.display = "none";
});

document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar o envio do formulário para atualizar a página

    // Capturar os dados do formulário
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const team = document.getElementById("team").value;
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;

    // Criar o objeto com os dados do formulário
    const formData = {
        name,
        email,
        team,
        gender,
        age,
        city,
        state
    };

    // Enviar a requisição POST para o endpoint especificado
    fetch('https://palpitefutebolclube.com:5114/api/waitinglist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.status === 204) {
                // Chama o webhook depois de redirecionar
                fetch('https://api.pushcut.io/8i-jJ922TBAyxfkvaf4k8/notifications/NotificationPalpite', {
                    method: 'GET'
                }).then(wbResponse => {
                    if (!wbResponse.ok) {
                        console.error('Erro ao chamar o webhook:', wbResponse.statusText);
                    } else {
                        console.log("Webhook chamado com sucesso");
                    }
                }).catch(wbError => {
                    console.error('Erro ao chamar o webhook:', wbError);
                });
                window.location.href = 'success/index.html';
            } else {
                alert('Esse e-mail já está cadastrado.');
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

document.getElementById("age").addEventListener("input", function (event) {
    if (event.target.validity.rangeUnderflow) {
        event.target.setCustomValidity('Você precisa ter 18 anos ou mais.');
    } else {
        event.target.setCustomValidity('');
    }
});