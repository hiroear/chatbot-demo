// import * as functions from "firebase-functions"; /* "firebase-functions"というパッケージを functionsという名前でインポート*/
// import * as admin from "firebase-admin";         /* "firebase-admin"というパッケージを adminという名前でインポート*/
// import { object } from "firebase-functions/v1/storage";
// admin.initializeApp();                           /* adminを初期化*/
// const db = admin.firestore();                    /* admin権限で firestoreを操作したい時は admin.firestore()というメソッドを使う*/
//   /* cloudFunctionsを使って adminを操作する時は、何度も admin.firestore()を書かなくてはならないが、その度に admin.firestoreを呼び出すと実行速度が遅くなってしまうので、定数 dbに入れてメモリを確保しておく*/


// /* APIを叩くと必ずレスポンスを返すことになるので、そのレスポンスを返すための関数(cloudFunctions内でしかこの関数は使わないので exportはなし)*/
// const sendResponse = (response: functions.Response, statusCode: number, body: any) => {
//   response.send({               /*response.sendメソッド*/
//     statusCode,
//     body: JSON.stringify(body)
//   });
// };


// /* cloudFunctionsで functionをデプロイする時は exportを必ず先頭につける。exportされてない関数はローカルの中でしか使えない関数になってしまうので、外部から叩きたい時は exportをつける
//   functions は1行目でインポートした "firebase-functions"
//   非同期処理を使いたいのでコールバック関数の始めに asyncをつけておく。(req: any, res: any)は TypeScriptの書き方(アノテーション) */
// export const addDataset = functions.https.onRequest(async (req: any, res: any) => {
//   /* APIを叩く時はリクエストにHTTPメソッドをつける。今回はデータを追加したいので基本的にPOSTメソッドでAPIを叩く*/
//   if (req.method !== 'POST') {                           /* HTTPが POSTじゃなかったらエラーを返す*/
//     sendResponse(res, 405, {error: "Invalid Request"});  /* 引数に(response, statusCode:405, errorの中身) */
//   } else {
//     const dataset = req.body;                   /* dataset.jsonが req.bodyとして渡される*/
//     for (const key of object.keys(dataset)) {   /* json形式の datasetは{オブジェクト型}の為そのまま配列として渡すさず、object.keysメソッドを使って dataset内の keyだけを取り出す。そして取り出した keyの配列を for文でぐるぐる廻していく*/
//       const data = dataset[key]                 /* "init", "job_offer", "website"...*/
//       await db.collection('questions').doc(key).set(data)
//       /*'questions'というデータモデル(collectionという名前のフォルダ)を作ってその中にどんどんデータを入れていくイメージ*/
//       /* doc=document ファイル一覧のようなもの("init","job_offer"などが入る)。その documentの中に書いてあるものが data("answers"や"question"が入る)*/
//     }
//     sendResponse(res, 200, {message: 'Successfully added dataset! WooHoo!'});

//   }
// });


