//Documentation so I dont forget:
//ISSUES: Reddit struggles to understand how to process _______ and ------ without giving me ugly
//looking lines. No clue how to fix that.

//Thanks https://blog.syntonic.io/2017/07/07/reddit-bot-nodejs-example/ for enabling me
require('dotenv').config();

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
    userAgent: 'reddit-bot-example-node',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});
const client = new Snoostorm(r);


// Configure options for stream: subreddit & results per query
const streamOpts = {
    subreddit: 'testingground4bots',
    results: 25
};

// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts);

//Define a maximum word count if you want.
const maxWidth = 100;
//Double backslash so one \ will be represented
const cowString = 
`        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`


// On comment, perform whatever logic you want to do
comments.on('comment', (comment) => {
	mssg = ""
    commentWords = comment.body.split(" ");
    if (commentWords[0] === '!cowsay'){
    	for(var i=1; i<Math.min(commentWords.length-1,50);i++){
			mssg = mssg.concat(commentWords[i]+" ");
    	}
    	mssg = mssg.concat(commentWords[i]);
    	console.log(mssg);
    	outputMssg = panelConstructor(mssg);
    	outputMssg = outputMssg.concat(cowString);
    	console.log(outputMssg);
    	comment.reply(outputMssg);
    }
});
  


//var mssg = testMssg;
var cowsayString = "";

function panelConstructor(mssg){

	var panelWidth = mssg.length+2;
	cowsayString = ""
	//makeTop(panelWidth);
	makeBody(mssg);
	//makeBottom(panelWidth);
	return cowsayString
} 

//Would make the top part of the speech bubble for the cow
//But doesnt work since I dont fully understand reddit's formatting rules
//Same spplies for make bottom.
function makeTop(panelWidth){
	cowsayString = cowsayString.concat(" ")
	for(var i=0;i<panelWidth;i++){
		cowsayString = cowsayString.concat("\_")
	}
	cowsayString = cowsayString.concat(" \r\n")
}

function makeBody(mssg){
	cowsayString = cowsayString.concat(">"+mssg+"\r\n"+"\r\n")
	//cowsayString = cowsayString.concat("< "+mssg+" >\r\n")
}

function makeBottom(panelWidth){
	cowsayString = cowsayString.concat(" ")
	for(var i=0;i<panelWidth;i++){
		cowsayString = cowsayString.concat("\-")
	}
	cowsayString = cowsayString.concat(" \r\n")
}
