package com.apigee.jsonsanitizer;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;
import com.google.json.JsonSanitizer;

public class JsonSanitizerCallout implements Execution {

    public ExecutionResult execute( MessageContext messageContext, ExecutionContext executionContext ) {

        try{
            String contentType = messageContext.getMessage().getHeader("Content-Type");
            if( !(contentType  == null ) && contentType.toLowerCase().contains("/json") ){
                String request = messageContext.getMessage().getContent();
        
                String json = JsonSanitizer.sanitize(request);

                messageContext.getMessage().setContent(json);
                messageContext.getRequestMessage().setHeader("Content-Length", json.length());
            }
            return  ExecutionResult.SUCCESS;
        }catch( Exception e ){
            return  ExecutionResult.ABORT;
        }
    }
}