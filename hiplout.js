var Hipchat     =   require('hipchatter'),
    hip         =   new Hipchat(),
    rooms       =   process.env.HIPCHAT_ROOM_ID.split('-'),
    roomTokens  =   process.env.HIPCHAT_ROOM_TOKEN.split('-'),
    mentionsVar =   process.env.HIPCHAT_ROOM_MENTION.split('-'),
    params      =   { color: 'red', notify: true };

var Hiplout = function(){}

Hiplout.prototype = {

    buildMessage: function (oldScore, newScore, callback){

        var message = '';
        if(oldScore > newScore){
            message += 'Your Klout score has decreased from ' + oldScore + ' to ' + newScore + '.' ;
        }else{
            message += 'Your Klout score has increased from ' + oldScore + ' to ' + newScore + '.' ;
        }

        callback(message);
    },


    sendMessage: function(message, callback){

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
                if(err) callback('Error notifying room: ' + err);
                else callback('Score changed!. Message sent to Hipchat room.');
            });
        }
    }
}

module.exports = Hiplout;
