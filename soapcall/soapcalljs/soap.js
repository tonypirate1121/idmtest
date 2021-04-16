(function() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8080/ws', true);

    // build SOAP request
    var sr =
    "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"\n" +
    "                                  xmlns:gs=\"http://spring.io/guides/gs-producing-web-service\">\n" +
    "   <soapenv:Header/>\n" +
    "   <soapenv:Body>\n" +
    "      <gs:getCountryRequest>\n" +
    "         <gs:name>Spain</gs:name>\n" +
    "      </gs:getCountryRequest>\n" +
    "   </soapenv:Body>\n" +
    "</soapenv:Envelope>";

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                alert(xmlhttp.responseText);
                // alert('done. use firebug/console to see network response');
            }
        }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xmlhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    xmlhttp.setRequestHeader('Access-Control-Allow-Credentials', true);
    xmlhttp.setRequestHeader('Access-Control-Allow-Headers', true);
    xmlhttp.send(sr);
    // send request
})();