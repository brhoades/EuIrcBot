module.exports.command = "tbh";
module.exports.run = function(remainder, parts, reply, command, from, to, text, raw) {
	var honestly = [
		"truthfully",
		"honestly",
		"to be honest",
		"let me tell you",
		"for real",
		"not gonna lie",
		"T B honest",
		"honestly TBH",
		"to be H",
		"TBH",
		"HA!",
		"hahahaha",
		"frankly",
		"to be frank",
		"really",
		"literally",
		"I'm tellin' ya",
		"on a literal level",
		"seriously",
		"no lie",
		"in all honesty",
		"truth be told",
		"personally honestly",
	]

	var numPhrases = Math.floor(Math.random() * 14) + 2; // [2,16]
	if(parts.length > 0) {
		numPhrases = parseInt(parts[0],10);
		if(numPhrases < 1) {
			reply("k");
			return;
		}
		if(numPhrases > 16) {
			reply("noap");
			return;
		}
	}


	var phrases = [];
	for(var i = 0; i < numPhrases; i++) {
		phrases.push(honestly[Math.floor(Math.random() * honestly.length)]);
	}

	var phrase = phrases.join(' ');
	reply(phrase.charAt(0).toUpperCase() + phrase.slice(1));
}
