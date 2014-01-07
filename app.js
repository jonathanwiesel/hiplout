var cronJob = require('cron').CronJob,
    hipchat = require('./hipchat.js'),
    K = require('./klout_config.js'),
    klout_user = process.env.KLOUT_USER;

var lastScore,
    userId;


K.initUser(klout_user, function(err, user){
    if(err){
        console.log('Cannot get user: ' + err);
    }else{
        userId = user;
        K.getScore(userId, function(err, score){
            if(err){
                console.log('Cannot get initial user\'s score: ' +  err);
            }else{
                lastScore = score;
                console.log('Server initialized with score ' + lastScore + ' for user ' + klout_user);

                new cronJob('*/10 * * * * *', function(){

                    K.getScore(userId, function(error, score) {
                        if(error){
                            console.log(error);
                        }else{
                            if(Math.floor(score) != lastScore){
                                var newScore = Math.floor(score);
                                hipchat.buildMessage(newScore, lastScore);
                                lastScore = newScore;
                            }else{
                                console.log('Score still at ' + lastScore);
                            }
                        }
                    });
                }, null, true, null);
            }
        });
    }
});

