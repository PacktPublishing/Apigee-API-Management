function log( level, message ){
    print( new Date().toISOString() + " " + level + ": " + message  );
}

log( "Log", "Fork Start" );

// sample request: curl "https://api.exco.com/mashup?lat=-121.8946165&lon=37.3340573"
var location = { "location": {
    "lat": parseFloat( context.getVariable( "request.queryparam.lat" ) ),
    "lon": parseFloat( context.getVariable( "request.queryparam.lon" ) )
  }
};

// mock payloads
var payloadJson = [
        {"name": "Restaurant A", "rating": 4.5, "features": ["outdoor seating"]},
        {"name": "Restaurant B", "rating": 4.2, "features": ["delivery"]},
        {"name": "Restaurant C", "rating": 4.8, "features": []},
    ];

var payloadXml = "<weather>\n" 
    + "    <temperature>72</temperature>\n"
    + "    <conditions>Sunny</conditions>\n"
    + "</weather>";

function onCompleteJson( response, error ){
    if (response){
        if( response.status == 200){
            log( "Log", "Fork: onCompleteJson, 200" );
            
            var json = JSON.parse(response.content)
            context.setVariable( "mashup.json-response", json.data );
        }
    }else{
        throw new Error(error);
    }
     
}


function onCompleteXml( response, error ){
    if (response){
        if( response.status == 200){
            log( "Log", "Fork: onCompleteXml, 200" );
            
            var json = JSON.parse(response.content)
            context.setVariable( "mashup.xml-response", json.data )
        }
    }else{
        throw new Error(error);
    }
     
}

var reqJson = new Request( "https://httpbin.org/delay/5", 
    "POST", 
    { "Content-Type": "application/json"}, 
    JSON.stringify(payloadJson) );

var reqXml = new Request( "https://httpbin.org/delay/7",
    "POST", 
        { "Content-Type": "application/xml" }, 
    payloadXml );

context.setVariable( "mashup.location", location )
 
httpClient.send( reqJson, onCompleteJson );
 
httpClient.send( reqXml, onCompleteXml );

log( "Log", "Fork: Finish" );
