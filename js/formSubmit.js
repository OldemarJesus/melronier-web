function submitForm() {
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
    var peopleInput = document.getElementById("people");
    var dataInput = document.getElementById("date");
    var horaInput = document.getElementById("hora");
    var descriptionInput = document.getElementById("description");


    // validar os inputs
    if (nameInput.value.length < 5 || nameInput.value.length > 13) {
        alert("O campo <nome> é obrigatório. Deve conter entre 5 á 13 caracteres");
        nameInput.style.border = '1px solid red';
        return
    } else {
        nameInput.style.border = 'none';
    }

    if (!validateEmail(emailInput.value)) {
        alert("O email inserido é inálido!");
        emailInput.style.border = '1px solid red';
        return
    } else {
        emailInput.style.border = 'none';
    }

    if (phoneInput.value.length != 9) {
        alert("O telemóvel inserido é inálido!");
        phoneInput.style.border = '1px solid red';
        return
    } else {
        phoneInput.style.border = 'none';
    }

    if (peopleInput.value < 2 || peopleInput.value > 20) {
        alert("O número de pessoas inserido é inálido! Deve informar 2 pessoas no mínimo e 20 no máximo!");
        peopleInput.style.border = '1px solid red';
        return
    } else {
        peopleInput.style.border = 'none';
    }

    var nowDate = new Date();
    nowDate.setHours(0, 0, 0, 0);
    // Add a day
    nowDate.setDate(nowDate.getDate() + 1)
    var targetDate = new Date(dataInput.value);

    if (nowDate.getTime() > targetDate.getTime()) {
        alert("A data inserida não é válida! Deve introduzir a data do dia seguinte");
        dataInput.style.border = '1px solid red';
        return
    } else {
        dataInput.style.border = 'none';
    }

    if (!validateHhMm(horaInput)) {
        alert("A Hora inserida não é válida");
        return
    }

    if (descriptionInput.value.length != 0 && (descriptionInput.value.length < 5 || descriptionInput.value.length > 500)) {
        alert("A sua mensagem é inválida! Deve introduzir entre 5 à 50 caracteres");
        descriptionInput.style.border = '1px solid red';
        return
    } else {
        descriptionInput.style.border = 'none';
    }

    // make array of data to save
    data = {
        "email": emailInput.value,
        "name": nameInput.value,
        "phone": phoneInput.value,
        "peopleNumber": peopleInput.value,
        "dataEntrada": dataInput.value + "T" + horaInput.value + ":00",
        "description": descriptionInput.value
    };

    sendToApi(data);
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validateHhMm = (inputField) => {
    var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(inputField.value);

    if (isValid) {
        inputField.style.backgroundColor = 'rgba(0,0,0,0.0)';
    } else {
        inputField.style.backgroundColor = '#fba';
    }

    return isValid;
}

const sendToApi = (data) => {
    // const response = $.post("http://localhost:4000/agendamentos", data);

    $.ajax({
        type: "POST",
        url: "https://melronier-api.vercel.app/agendamentos",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (dataRes) {
            alert("O seu pedido foi registado com sucesso sobe o id: " + dataRes._id);
        }
    }).then(function () {
        alert("Processo terminado!");
    })

}
