var request = require('request');
var cheerio = require('cheerio');
var request = require('request');
var extractor = require('unfluff');
var summary = require('node-tldr');

var bot = null;

function get_content(url, cb) {
  url = url.trim();
  if(!/^https?:\/\//.test(url)) {
    url = "http://" + url;
  }
  
  request(url, cb);
}

module.exports.command = "summarize";

module.exports.run_summarize = function(remainder, parts, reply) {
  get_content(remainder, function(err, resp, html) {
    if(err) return reply(err);

    var page = cheerio.load(html);
    var letters = extractor(html).text.length;
    var MAX_LETTERS = 100;
    var ratio = 0.5;

    // try to get us down to 100 letters.
    if(letters > MAX_LETTERS) {
      ratio = MAX_LETTERS / letters;
    }

    summary.summarize(page, {shortenFactor: ratio}, function(result, failure) {
      if(failure || !result.summary.length) return;
      reply(result.summary.join("\n") + " (" + Math.round(result.compressFactor*100) + "%)");
    });
  });
};
