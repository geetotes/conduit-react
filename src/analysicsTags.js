var tagsCount = function(news){
  var result = {};
  for (var i = 0; i < news.length; i++) {
    let newsUnderTag = news[i].tags;
    for (var j = 0; j < newsUnderTag.length; j++) {
      if(result[newsUnderTag]){
        result[newsUnderTag]++;
      }else{
        result[newsUnderTag] = 1;
      }
    }
  }
  return result;
}
