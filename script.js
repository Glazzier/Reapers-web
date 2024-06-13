function calculateLoan() {
  const amount = parseFloat(document.getElementById("amount").value);
  const member = document.getElementById("member").value;
  const limitedMembers = [
    "Nulled",
    "benja08",
    "Darcox17",
    "Rodrigo0213pro",
    "patonuevo",
  ];
  let interest = 0;

  if (limitedMembers.includes(member) && amount > 100000) {
    alert(
      "Los miembros seleccionados tienen un límite de préstamo de 100,000."
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
  const limitedMembers = [
    "Nulled",
    "benja08",
    "Darcox17",
    "Rodrigo0213pro",
    "patonuevo",
  ];
  let interest = 0;

  if (limitedMembers.includes(member) && amount > 100000) {
    alert(
      "Los miembros seleccionados tienen un límite de préstamo de 100,000."
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
  }).then((response) => {
    if (response.ok) {
      alert("Solicitud enviada correctamente.");
    } else {
      alert("Error al enviar la solicitud.");
    }
  });
}
