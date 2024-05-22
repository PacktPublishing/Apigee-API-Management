function log( level, message ){
    print( new Date().toISOString() + " " + level + ": " + message  );
}

log( "Log", "Join: Start" ); 
 
// Join responses 
var weather = new XML( context.getVariable( "mashup.xml-response" ) );

var restaurants = JSON.parse( context.getVariable( "mashup.json-response" ) );

var mashupResponse = {};

mashupResponse.location = context.getVariable( "mashup.location" ).location;
mashupResponse.weather = { 
        "temperature": parseFloat(weather.temperature), 
        "conditions": weather.conditions.toString()
    };
mashupResponse.restaurants = restaurants;

response.content = JSON.stringify( mashupResponse );

log( "Log", "Join: Finish" );
