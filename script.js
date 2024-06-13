let usuarios = [];

fetch("usuarios.json")
  .then((response) => response.json())
  .then((data) => {
    usuarios = data;
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
  });

document.addEventListener("DOMContentLoaded", () => {
  updateMaxAmount(); // Actualizar el valor máximo del slider en la carga inicial
});

function updateAmountValue(value) {
  document.getElementById("amount-value").textContent = value;
  document.getElementById("amount-number").value = value;
}

function updateAmountSlider(value) {
  document.getElementById("amount-value").textContent = value;
  document.getElementById("amount").value = value;
}

function updateMaxAmount() {
  const member = document.getElementById("member").value;
  const limitedMembers = [
    "Nulled",
    "benja08",
    "Darcox17",
    "Rodrigo0213pro",
    "patonuevo",
  ];
  const amountSlider = document.getElementById("amount");
  const amountNumber = document.getElementById("amount-number");

  const usuario = usuarios.find((u) => u.nombre === member);

  if (usuario && usuario.new) {
    amountSlider.max = "30000";
    amountNumber.max = "30000";
    alert(
      "Los usuarios nuevos del clan están limitados a 30,000 por préstamo por motivos de seguridad del clan."
    );
  } else if (limitedMembers.includes(member)) {
    amountSlider.max = "100000";
    amountNumber.max = "100000";
  } else {
    amountSlider.max = "1000000";
    amountNumber.max = "1000000";
  }

  if (parseInt(amountSlider.value) > parseInt(amountSlider.max)) {
    updateAmountValue(amountSlider.max);
  }
}

function calculateLoan() {
  const member = document.getElementById("member").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const usuario = usuarios.find((u) => u.nombre === member);

  if (usuario && usuario.tienePrestamo) {
    alert(
      "Ya tienes un préstamo activo. Contacta a Glazzier para gestionar más préstamos."
    );
    return;
  }

  const limitedMembers = [
    "Nulled",
    "benja08",
    "Darcox17",
    "Rodrigo0213pro",
    "patonuevo",
  ];
  let interest = 0;

  if (
    (usuario.new && amount > 30000) ||
    (limitedMembers.includes(member) && amount > 100000)
  ) {
    alert(
      "Los miembros seleccionados tienen un límite de préstamo de 100,000 y los nuevos miembros tienen un límite de 30,000."
    );
    return;
  }

  if (amount <= 50000) {
    interest = 0.1;
  } else if (amount <= 150000) {
    interest = 0.15;
  } else if (amount <= 400000) {
    interest = 0.2;
  } else {
    interest = 0.3;
  }

  const totalAmount = amount + amount * interest;
  const interestPercentage = interest * 100;

  document.getElementById(
    "interest-rate"
  ).textContent = `Interés Aplicado: ${interestPercentage}%`;
  document.getElementById(
    "loan-amount"
  ).textContent = `Monto Solicitado: $${amount.toFixed(2)}`;
  document.getElementById(
    "loan-return"
  ).textContent = `Monto a Devolver: $${totalAmount.toFixed(2)}`;
  document.getElementById("loan-result").style.display = "block";
  document.getElementById("send-button").style.display = "block";
}

function sendNotification() {
  const member = document.getElementById("member").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const reason = document.getElementById("reason").value;
  const usuario = usuarios.find((u) => u.nombre === member);

  if (usuario && usuario.tienePrestamo) {
    alert(
      "Ya tienes un préstamo activo. Contacta a Glazzier para gestionar más préstamos."
    );
    return;
  }

  const limitedMembers = [
    "Nulled",
    "benja08",
    "Darcox17",
    "Rodrigo0213pro",
    "patonuevo",
  ];
  let interest = 0;

  if (
    (usuario.new && amount > 30000) ||
    (limitedMembers.includes(member) && amount > 100000)
  ) {
    alert(
      "Los miembros seleccionados tienen un límite de préstamo de 100,000 y los nuevos miembros tienen un límite de 30,000."
    );
    return;
  }

  if (amount <= 50000) {
    interest = 0.1;
  } else if (amount <= 150000) {
    interest = 0.15;
  } else if (amount <= 400000) {
    interest = 0.2;
  } else {
    interest = 0.3;
  }

  const totalAmount = amount + amount * interest;

  const webhookUrl =
    "https://discord.com/api/webhooks/1250709911827124224/pLUeebCedhyU6RURVp4hidg3-dwY1LR47jQyFVkckRRTn5P-B4iMf2Jl8DHchOufbe_Z";
  const data = {
    content: "<@631907198930386950>",
    embeds: [
      {
        title: "Nueva solicitud de préstamo",
        color: 0x61dafb,
        fields: [
          { name: "Miembro", value: member },
          { name: "Cantidad Solicitada", value: `$${amount.toFixed(2)}` },
          { name: "Monto a Devolver", value: `$${totalAmount.toFixed(2)}` },
          { name: "Motivo", value: reason },
        ],
        timestamp: new Date(),
      },
    ],
  };

  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("Solicitud enviada correctamente.");
      } else {
        response.text().then((text) => {
          alert(`Error al enviar la solicitud: ${text}`);
        });
      }
    })
    .catch((error) => {
      alert(`Error al enviar la solicitud: ${error.message}`);
    });
}
