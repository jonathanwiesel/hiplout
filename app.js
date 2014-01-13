var cronJob = require('cron').CronJob,
    Hiplout = require('./hiplout.js'),
    hiplout = new Hiplout(),
    K = require('./klout_config.js'),
    klout_user = process.env.KLOUT_USER;

var lastScore,
    userId;


K.initUser(klout_user, function(err, user){
    if(err) console.log('Cannot get user: ' + err);
    else{
        userId = user;
        K.getScore(userId, function(err, score){
            if(err) console.log('Cannot get initial user\'s score: ' +  err);
            else{
                lastScore = score;
                console.log('Server initialized with score ' + lastScore + ' for user ' + klout_user);

                new cronJob('0 */1 * * * *', function(){

                    K.getScore(userId, function(error, score) {
                        if(error) console.log(error);
                        else{
                            if(Math.floor(score) != lastScore){
                                var newScore = Math.floor(score);
                                hiplout.buildMessage(newScore, lastScore, function(message){
                                    hiplout.sendMessage(message, function(response){
                                        console.log(response)
                                    });
                                });
                                lastScore = newScore;
                            }else console.log('Score still at ' + lastScore);
                        }
                    });
                }, null, true, null);
            }
        });
    }
});

