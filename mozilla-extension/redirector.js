// Listens to outbound requests on browser
// before a TCP connection has been established
browser.webRequest.onBeforeRequest.addListener(

  function(details) {
    var url = details.url;

    // Amazon URLs to ignore when redirecting
    var filters = [ '(redirect=true)',
                    '(redirector.html)',
                    '(/ap/)' ];

    // Fixes too many redirects bug when
    // user is not logged to Amazon
    if(url.match(filters.join('|'))) {
      return;
    }

    // Returns AmazonSmile URL
    return smileUrlConstructor(url);
  },
  {
    // Checks main and sub-frames (e.g. iframe)
    types: ["main_frame","sub_frame"]
  },
  // Blocks initial network request, waits for listener to return
  ['blocking']

);


// Constructs an AmazonSmile URL given an existing Amazon URL
// Redirects request to AmazonSmile
function smileUrlConstructor(url){

  var amazonSmile = 'https://smile.amazon.com';
  var regexAmazon = new RegExp(/(\.amazon\.com)/);
  var parseAmazonUrl = url.split(regexAmazon);
  var amazonProduct = parseAmazonUrl[parseAmazonUrl.length-1];

  if(amazonProduct !== regexAmazon) {
    return {
      redirectUrl: amazonSmile + amazonProduct
    };
  }

}
