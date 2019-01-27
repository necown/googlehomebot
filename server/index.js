// -----------------------------------------------------------------------------
// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート

//const bodyParser = require('body-parser');
// server.use(bodyParser.urlencoded({
//     extended: true
// }));
// server.use(bodyParser.json());

// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};


var Publish=require('./publish.js');//上記作成したpublish.js


// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000);

// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);

// -----------------------------------------------------------------------------
// ルーター設定
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    // 先行してLINE側にステータスコード200でレスポンスする。
    res.sendStatus(200);
    console.log("TEST");

var lineTxt = req.body.events[0].message.text;
var token='43lXfC4T2jLyO4UPf8mIPZFi0mjW4v4+4Vv0zJNYB+3wrmSgneoja8PxxGoFqmMVzOfh/NFUwo2rZ55RTjrM1Ec1ccySqLx85WBhHw/NTmKp5tAXx0Vyti0rrGGn4FDicpcyG4vnLNocNTdSMhdqBAdB04t89/1O/w1cDnyilFU=';
var textmain='';


if (req.body['events'][0]['source']['type'] == 'user') {
  // ユーザIDでLINEのプロファイルを検索して、ユーザ名を取得する
  var user_id = req.body['events'][0]['source']['userId'];
  var get_profile_options = {
    url: 'https://api.line.me/v2/bot/profile/' + user_id,
    json: true,
    headers: {
      'Authorization': 'Bearer '+token
    }
  };
  // req.get(get_profile_options, function(error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     var displayName=body['displayName'];
  //     textmain = displayName+"さん、、から、、ラインでメッセージが届きました。内容は、、、"+lineTxt+'、、です。';
      textmain = "ラインからメッセージが届きました。内容は、、、"+lineTxt+'、、です。';
      console.log(textmain);
      Publish.send(textmain);
  //   }
  // });
//BOTのチャットを複数名で共有すると、発言者のユーザ名が取れない仕様なので、BOT名＋メッセージとしてみた
} else if ('room' == req.body['events'][0]['source']['type']) {
  textmain="Google Homeちゃん、、から、、ラインでメッセージが届きました。内容は、、、"+lineTxt+'、、です。';
  Publish.send(textmain);
  callback('みなさまから送られた文章の\n');
}
});



