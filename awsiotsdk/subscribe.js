//systemdに登録しています



var awsIot = require('aws-iot-device-sdk');
var sleep = require('sleep');
var pin = 4;

var exec = require('child_process').exec;

var device = awsIot.device({
  region: 'ap-northeast-1',
  host: 'atg58ikehkkqw-ats.iot.ap-northeast-1.amazonaws.com',
  clientId: 'raspi',
  privateKey: './certs/329200ccf3-private.pem.key',
  clientCert: './certs/329200ccf3-certificate.pem.crt',
  caCert: './certs/root-CA.crt',
});

// 通信確立時
device.on('connect', function() {
  console.log('connect');
  device.subscribe('topic_2');
  // すぐに書き込もうとすると権限エラーのためsleepさせる
  sleep.sleep(1);
});

// subscribeした時のイベント
device.on('message', function(topic, payload) {
  console.log('message', topic, payload.toString());

  //ここにGoogleHomeに接続するプログラムを書く　
  var command = './speaker/speaker.sh "' + payload.toString() + '"';
  exec(command, function(error, stdout, stderr) {
  // シェル上でコマンドを実行できなかった場合のエラー処理
    if (error !== null) {
      console.log('exec error: ' + error);
      return;
    }

    // シェル上で実行したコマンドの標準出力が stdout に格納されている
     console.log('stdout: ' + stdout);
  });

});

process.stdin.resume();

// Ctrl+Cによって終了する場合の処理
process.on('SIGINT', function() {
  console.log('receive SIGINT signal');
  process.exit();
});
