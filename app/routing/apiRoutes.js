var friendList = require('../data/friends.js');

module.exports = function(app){

    app.get('/api/friends', function(req, res) {
        res.json('friendList');
    });

    app.post('/api/friends', function(req, res) {
        console.log("req.body");
        console.log(req.body);

        var newScores = req.body.scores;
        var scoresArray = [];
        var bestMatch = 0;
        var besties = [];

        //calc scores for all friends in friendList
        for(var i=0; i<friendList.length; i++){
            var scoresDiff = 0;
            for(var j=0; j<newScores.length; j++){
                scoresDiff += (Math.abs(parseInt(friendList[i].scores[j]) - parseInt(newScores[j])));
            }
            scoresArray.push(scoresDiff);
        }
        console.log(scoresArray);

        //find first best match
        for(var i=0; i<scoresArray.length; i++){
            if(scoresArray[i] < scoresArray[bestMatch]){
                bestMatch = i;
            }
        };
        console.log("best match: " + bestMatch);

        // find all best matches with same score as scoreArray[bestMatch];
        // besties.push(friendList[bestMatch]);
        for(var k=0; k<scoresArray.length; k++){
            if(scoresArray[k] == scoresArray[bestMatch]){
                besties.push(friendList[k]);
                console.log("besties");
                console.log(besties);
            };
        }
        

        
        //return bestMatch data
        res.json(besties);

        //pushes new submission into the friendsList array
        // friendList.push(req.body);
        // });
    });
}
