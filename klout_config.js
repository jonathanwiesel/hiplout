var Klout = require("node_klout"),
    klout = new Klout(process.env.KLOUT_APIV2_KEY);

var initUser = function(username, callback){
    klout.getKloutIdentity(username, function(error, user) {
        if(error){
            callback(error, null);
        }else{
            callback(null, user.id);
        }
    });
}

var getScore = function(userId, callback){
    klout.getUserScore(userId, function(error, klout_response) {
        if(error){
            callback(error, null);
        }else{
            callback(null, Math.floor(klout_response.score));
        }
    });
}

module.exports.initUser = initUser;
module.exports.getScore = getScore;
