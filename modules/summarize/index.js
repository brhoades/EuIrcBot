var request = require('request');
var cheerio = require('cheerio');
var extractor = require('unfluff');
var summary = require('node-tldr');

function get_content(url, cb) {
  url = url.trim();
  if(!/^https?:\/\//.test(url)) {
    url = "http://" + url;
  }
  
  request(url, cb);
}

module.exports.command = "summarize";

module.exports.run_summarize = function(remainder, parts, reply) {
  var ratio = 0.3;
  var max_letters = 1000;
  var url = parts[0];
  if(parts.length == 0)
    return reply("Provide a URL and, optionally a maximum number, of words to get a summary.");
  else if(parts.length > 1)
    max_letters = parseInt(parts[1]);

  get_content(url, function(err, resp, html) {
    if(err) return reply(err);

    var page = cheerio.load(html);
    var letters = extractor(html).text.length;

    // try to get us down to 100 letters.
    if(letters > max_letters) {
      ratio = max_letters / letters;
    }

    summary.summarize(page, {shortenFactor: ratio}, function(result, failure) {
      if(failure || !result.summary.length) return;
      reply(result.summary.join("\n") + " (" + Math.round(result.compressFactor*100) + "%)");
    });
  });
};
