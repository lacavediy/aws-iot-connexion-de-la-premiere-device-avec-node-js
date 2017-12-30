const awsIot = require('aws-iot-device-sdk');

const device = awsIot.device({
  keyPath: './certs/private.pem.key',
  certPath: './certs/certificate.pem.crt',
  caPath: './certs/root-CA.pem',
  clientId: 'Tutoriel',
  host: 'a3luqi52ym1wdc.iot.eu-west-1.amazonaws.com'
});

device.on('connect', () => {
  console.log('connected');
  device.subscribe('TopicDeTest', (error, result) => {
    if (error) {
      console.error(error);
    }
    console.log(result);
  });

  device.publish('TopicDeTest', JSON.stringify({
    test_data: 2
  }));
});

device.on('message', (topic, payload) => {
  console.log('message', topic, payload.toString());
});
