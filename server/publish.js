// AWS IoT DeviceSDKの利用
var awsIot = require('aws-iot-device-sdk');

// 秘密鍵、証明書などの設定
var device = awsIot.device({
  region: 'ap-northeast-1',
  host: 'atg58ikehkkqw-ats.iot.ap-northeast-1.amazonaws.com',
  clientId: 'raspi-client',
  privateKey: './certs/329200ccf3-private.pem.key',
  clientCert: './certs/329200ccf3-certificate.pem.crt',
  caCert: './certs/root-CA.crt',
});

var count = 0;

// 通信確立した際に呼び出されるイベント
device.on('connect', function() {
  console.log('connect');
  setInterval( function() {
    count++;
    var led = count * 2;
//    console.log(led.toString());
    device.publish('topic_1', led.toString());
  }, 1000);
});

var send = function(txt){
  device.publish('topic_2', txt);
};

exports.send = send;