const vindexer = require("video-indexer");
const Vindexer = new vindexer("08240643f7bf4046861c15aa8ed4a9b6");
var express = require("express");

//use the application off of express.
var app = express();

//define the route for "/"
app.get("/", function (request, response){
    //show this file when the "/" is requested
   response.sendFile(__dirname+"/test.html");
});
app.use(express.static('/Users/tanveershaikh/hackillinois18/'));
//start the server
app.listen(8080);


// Upload video via a URL and generate intelligent insights. If no URL is specified, the file should be passed as a multipart/form body content.
/*Vindexer.uploadVideo({
    // Optional
    videoUrl: "http://mi.eng.cam.ac.uk/research/projects/VideoRec/CamVid/pr/DBoverview.mpg",
    name: 'My video name',
    privacy: 'Private',
    language: 'English',
    externalId: 'customvideoid',
    description: 'Check out this great demo video!',
    partition: 'demos'
})
    .then( function(result){ console.log (result.body) } );
*/
// Get full insights from previously-processed video
/*Vindexer.getBreakdown("98b9d2234d")

    .then( function(result){ console.log (result.body) } );;
*/
var obj = {
    'key': 'value',
    'another key': 'another value',
     anUnquotedKey: 'more value!'
};


var dict = []; // create an empty array
var myMap = new Map();
var keyString = 'training curve vs dataset';
dict.push({
    key:   "training curve vs dataset",
    value: "learning curve"
});
var keyString1 = 'Cheap flight tickets in minimum time';

myMap.set(keyString, "learning curve");
myMap.set(keyString1, "Greedy Algorithm");
dict.push({
    key:   "Cheap flight tickets in minimum time",
    value: "Greedy Algorithm"
});

var search;
app.get("/my-url", function(req, res) {
  console.log(myMap.get(req.query.search_term));



  Vindexer.search({
     // Optional
  privacy: 'Private',
  query: req.query.search_term,
  keywords:req.query.search_term,
  pageSize: 10,
  textScope:'Transcript',
  language: 'English',
  searchInPublicAccount: false
})
  .then( function(result){
  res.setHeader('Content-Type', 'text/html');
    search = JSON.parse(result.body);
    console.log(search.results);
    var html="";
    html="<div style=\"left:50%;\">";
    res.write(html);
    var len=Math.min(search.results.length,3);
    var j=0,l=0;
    var html1;
    var html2;
    for(i = 0; i < len; i++)
    {
     Vindexer.getPlayerWidgetUrl(search.results[i].id)
       .then( function(result){
        html1 = "<br/><iframe width=\"560\" height=\"315\" src=" +result.body+  "frameborder=\"0\"  allowfullscreen></iframe><span style=\"display:block\" ><h3><a herf='/'>"+search.results[j].name.replace(/[^a-zA-Z0-9]+/g, " ")+"</a></h3></span><div style=\"display-inline:block;width:550px;\">";  /*<span style=\"display:block\" >"+search.results[k].searchMatches[0].text+"</span>";*/
        j++;

        res.write(html1);
        if(search.results[l].searchMatches!=undefined){
        for(k=0;k<search.results[l].searchMatches.length;k++)
        {
        if(search.results[l].searchMatches[k]!=undefined)
        {
        console.log("Test "+search.results[l].searchMatches[k].text+"\n");
        html2="<span>"+search.results[l].searchMatches[k].text+"</span>"+".........";
        res.write(html2);
      }
    }
    }

    l++;
    });

}
res.write("</div>");
res.write("<a href=\"javascript:history.back()\">Go Back</a>");
  } );

    // finally, respond to the client


});
