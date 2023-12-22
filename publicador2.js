const mqtt = require("mqtt");
const fs = require('fs');

// const CERT = fs.readFileSync("C:\\Users\\ThiagoGought\\Desktop\\CERTIFCADOS_SSL\\ISRG Root X1.crt");

const connectOptions = {
    port : 80,
    protocol : 'ws',
    path : '/mqtt',
    clientId: 'termometro2'
};

const client = mqtt.connect("ws://mqtt.eclipseprojects.io", connectOptions); //conectando assim que cliente é criado

client.on("connect", () => {
  console.log("Cliente conectado!");
  client.subscribe("jm/teste/diferente", (err) => {
    if (!err) {
      console.log("Cliente subscrito ao topico: temperatura");
      publicarMensagens();
    }
  });
});

const publicarMensagens = () => {
  const intervalId = setInterval(() => {
    publicarTemperatura(intervalId);
  }, 5000);
};

let msg_counter = 1;
const publicarTemperatura = (intervalId) => {
  
  if (msg_counter <= 15) {
    let msg = ((Math.random() * 16) + 10).toString();
    client.publish("jm/teste/qos2", msg, {qos : 2});
    console.log("Mensagem enviada");
    msg_counter++;
  } else {
    clearInterval(intervalId); // Parar o intervalo quando 15 mensagens forem enviadas
    process.exit(0);
  }
};