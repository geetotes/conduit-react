/**
 * Simple sorting priority Algorithm.
 *
 * @type {{}}
 */
var hash = {};
var score = 0;
var scoreCards = [];

function algFunction(store) {
    getKeys(store.userBooks);
    setOrder(store.news);
    return store;
}

/*
Assigns tags to a key pair
 */
function getKeys(theKeys){
    for (var i=0; i<theKeys.size; i++){
        hash[theKeys[i]] = theKeys;
    }
}

/*
function executeOrdering(user, articles) {
    setOrder(getImportance(user), articles);
    return
}*/

/*
Finding the order of articles
 */
function setOrder(articles) {
    for(var i=0; i<articles.size; i++){
        for(var j=0; j<articles.Object.tags.size; j++){
            if(hash[articles.Object.tags[j]] === true) {
                score += hash[articles.Object.tags[j]];
            }
        }
    }
}

export default algFunction;
