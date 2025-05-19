const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN');
const LINE_URL = 'https://api.line.me/v2/bot/message/reply';

function doPost(e) {

  // 送られてきたデータの取り出し
  const json = JSON.parse(e.postData.contents);
  const data = json.events[0]

  const message = createReplyMessage(data.message.text)
 
  // 返信メッセージの構築
  const option = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': data.replyToken,
      'messages': [{
        "type": "text",
        "text": message
      }],
    }),
  }

  UrlFetchApp.fetch(LINE_URL,option);
}

function createReplyMessage(reeceivedMessage) {
  if(reeceivedMessage === 'おはよう'){
    return 'おはよう！今日も1日頑張ろう！'
  }
  if(reeceivedMessage === 'おやすみ'){
    return 'おやすみ。いい夢見てね。'
  }
  return reeceivedMessage
}