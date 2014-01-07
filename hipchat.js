var Hipchat     =   require('hipchatter'),
    hip         =   new Hipchat(process.env.HIPCHAT_API_V2_KEY),
    rooms       =   process.env.HIPCHAT_ROOM_ID.split('-'),
    roomTokens  =   process.env.HIPCHAT_ROOM_TOKEN.split('-'),
    mentionsVar =   process.env.HIPCHAT_ROOM_MENTION.split('-'),
    params      =   { from: 'Klout', color: 'red', notify: true };

var buildMessage = function (oldScore, newScore){

    var message = '';
    if(oldScore > newScore){
        message += 'Your Klout score has decreased from ' + oldScore + ' to ' + newScore + '.' ;
    }else{
        message += 'Your Klout score has increased from ' + oldScore + ' to ' + newScore + '.' ;
    }

    sendMessage(message);
}


function sendMessage(message){

    params.message = message;
    params.message_format = 'text';

    for(var k=0; k < rooms.length; k++){

        params.token = roomTokens[k];

        if(process.env.HIPCHAT_ROOM_MENTION){
            var mentions = 'Alerting';
            for(var j=0; j < mentionsVar.length; j++){
                mentions += ' @' + mentionsVar[j];
            }

            params.message += mentions;
        }

        hip.notify(rooms[k], params, function(err) {
            if(err){
                console.log(err);
            }else{
                console.log('Score changed!. Message sent to Hipchat room.');
            }
        });
    }


}


module.exports.buildMessage = buildMessage;
