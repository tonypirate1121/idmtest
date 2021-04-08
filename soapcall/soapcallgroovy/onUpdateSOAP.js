require('onUpdateUser').preserveLastSync(object, oldObject, request);
if (oldObject.password != object.password){
console.log(JSON.stringify(object.password));
var params = {
    "url": "http://localhost:8080/ws",
    "method": "POST",
    "headers": {
      "Content-Type": "text/xml"
    },
  	"body":"<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"xmlns:gs=\"http://spring.io/guides/gs-producing-web-service\"><soapenv:Header/><soapenv:Body><gs:getCountryRequest><gs:name>Spain</gs:name></gs:getCountryRequest></soapenv:Body></soapenv:Envelope>"
};
response = openidm.action("external/rest", "call", params);
console.log(JSON.stringify(response));
}else{
console.log("password not changed");
}