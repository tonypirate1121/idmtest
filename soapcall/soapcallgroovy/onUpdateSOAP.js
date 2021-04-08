require('onUpdateUser').preserveLastSync(object, oldObject, request);
if (oldObject.password != object.password){
console.log(JSON.stringify(object.password));
var params = {
    "url": "http://localhost:18080/openidm/endpoint/soap",
    "method": "GET",
    "headers": {
      "X-OpenIDM-Username" : "openidm-admin",
      "X-OpenIDM-Password" : "openidm-admin"
    }
  	};
openidm.action("external/rest", "call", params);
//console.log(JSON.stringify(response));
}else{
console.log("password not changed");
}