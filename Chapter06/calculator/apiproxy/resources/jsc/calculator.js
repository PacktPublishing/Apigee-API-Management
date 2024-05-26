const number1 = parseFloat( context.getVariable( "request.queryparam.number1" ) );
const number2 = parseFloat( context.getVariable( "request.queryparam.number2" ) );

const operator = context.getVariable( "request.queryparam.operator" );

print( "Number1: " + number1 );
print( "Operator: " + operator);
print( "Number2: " + number2 );

var result = 0;
if( operator == "+" ){
    result = number1 + number2;
}else if(operator == "-" ){
    result = number1 - number2;
}else if( operator == "*" ){
    result = number1 * number2;
}else if(operator == "/" ){
    result = number1 / number2;
}else{
    throw "Unknown operation: " + operator;
}

context.setVariable( "response.content", result );
context.setVariable( "response.header.content-type", 'text/plain');

print( "Result: " + result);