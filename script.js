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
    const phoneNumber = cleanPhoneNumber(document.getElementById("phone").value);

    // Criar o objeto com os dados do formulário
    const formData = {
        name,
        email,
        team,
        gender,
        age,
        city,
        state,
        phoneNumber
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

function formatPhoneNumber(input) {
    // Remove all non-digit characters from the input
    const cleanedNumber = input.value.replace(/\D/g, '');

    // Check if the cleaned number has the expected length
    if (cleanedNumber.length !== 11) {
        console.error('Invalid phone number length. Expected 11 digits.');
        return; // Do nothing if invalid
    }

    // Extract the area code and the remaining digits
    const areaCode = cleanedNumber.slice(0, 2);
    const firstPart = cleanedNumber.slice(2, 7);
    const secondPart = cleanedNumber.slice(7);

    // Format the phone number
    const formattedNumber = `(${areaCode}) ${firstPart}-${secondPart}`;
    input.value = formattedNumber;
}

function cleanPhoneNumber(phoneNumber) {
    return phoneNumber.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
}