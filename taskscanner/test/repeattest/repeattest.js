/*global input, objectID */

(function () {
    // Create a change patch
    var userinfo = openidm.read(objectID,null,["*"]);
    console.log(JSON.stringify(userinfo.mail));
    var params =  new Object();
    params.from = "iamprojecttestyishu@gmail.com";
    params.to = userinfo.mail;
    params.subject = "repeatest";
    params.type = "text/html";
    params.body = "<html><body><p>This task scanner has been repeated onece</p></body></html>";
    
    openidm.action("external/email", "send", params);

    return true; // return true to indicate successful completion
}());