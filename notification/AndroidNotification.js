  //android notifications
  var gcm = require('node-gcm');
  var anDmessage = new gcm.Message();
  anDmessage.addData('message','message');
  anDmessage.addData('title', 'messagetitle' );
  //anDmessage.addData('msgcnt','3'); // Shows up in the notification in the status bar
  anDmessage.addData('soundname','beep.wav');
  anDmessage.timeToLive = 3000;
  var sender = new gcm.Sender('AIzaSyAJ9kNU7h4VSK2oiqrD5EatNVvzBD6zsxw');

  var token_id = "dzLyTJ1L5CU:APA91bHlpC5AusJwyjpj1EuEWa2yhGw3EWut63cVuhOY15pera2t8k5MuuMzZRjXtTDTTA9jpI7Fa2SLH3Ve3arFWwLTYZb2NdLM_6vyuAYBrxr5WdrfQo_m6lAotRMgJPYEwJCQJhzc";

  sender.sendNoRetry(anDmessage, token_id, function(err, result) {
    console.log("the result is");
    console.log( result );
    console.log( err );
  });