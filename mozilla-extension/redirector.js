// Listens to outbound requests on Chrome
// before a TCP connection has been established
browser.webRequest.onBeforeRequest.addListener(

  function(details) {
    var url = details.url;

    // Filters for www.amazon.com requests only
    if(url.includes('www.amazon.com')) {
      return smileUrlConstructor(url);
    }
  },
  {
    // Listens on all URLs
    urls: ['<all_urls>'],
    types: ["main_frame","sub_frame"]
  },
  // Blocks initial network request, waits for listener to return
  ['blocking']

);


// Constructs an AmazonSmile URL given an existing Amazon URL
// Redirects request to AmazonSmile
function smileUrlConstructor(url){

  var amazonSmile = 'https://smile.amazon.com';
  var regexAmazon = new RegExp(/(www\.amazon\.com)/);
  var parseAmazonUrl = url.split(regexAmazon);
  var amazonProduct = parseAmazonUrl[parseAmazonUrl.length-1];

  if(amazonProduct !== regexAmazon) {
    return {
      redirectUrl: amazonSmile + amazonProduct
    };
  }

}