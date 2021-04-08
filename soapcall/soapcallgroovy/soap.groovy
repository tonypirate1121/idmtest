URL oURL = new URL("http://localhost:8080/ws");
// Creating the HttpURLConnection object
HttpURLConnection con = (HttpURLConnection) oURL.openConnection();
con.setRequestMethod("POST");
con.setRequestProperty("Content-type", "text/xml; charset=utf-8");
reqXML = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"\n" +
        "                                  xmlns:gs=\"http://spring.io/guides/gs-producing-web-service\">\n" +
        "   <soapenv:Header/>\n" +
        "   <soapenv:Body>\n" +
        "      <gs:getCountryRequest>\n" +
        "         <gs:name>Spain</gs:name>\n" +
        "      </gs:getCountryRequest>\n" +
        "   </soapenv:Body>\n" +
        "</soapenv:Envelope>";
con.setDoOutput(true);
OutputStream reqStream = con.getOutputStream();
reqStream.write(reqXML.getBytes());
// Reading the SOAP response XML message
InputStream resStream = con.getInputStream();
BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(resStream, "iso-8859-1"));
int status=con.getResponseCode();
String result = ""+status;
String line;
while ((line = bufferedReader.readLine()) != null) {

    result += line;
}
bufferedReader.close();
resStream.close();
System.out.println(result);
// Must return a JSON object
return [
	status: "success",
]