package com.apigee.jsonsanitizer;

import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.Map;

import mockit.Injectable;
import mockit.Mock;
import mockit.MockUp;

import org.junit.Before;
import org.junit.Test;

import com.apigee.flow.message.Message;
import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.message.MessageContext;

public class JsonSanitizerCalloutTest {

        MessageContext messageContext;
        @Injectable Message message;
        ExecutionContext executionContext;
        
        @Before
        public void testSetup(){
                messageContext = new MockUp<MessageContext>() {
                        private Map<String,Object> variables;
                        @SuppressWarnings("unused")
                        public void $init(){
                                getVariables();
                        }
                        private Map<String,Object> getVariables(){
                                if( variables == null){
                                        variables = new HashMap<String,Object>();
                                }
                                return variables;
                        }
                        @Mock
                        public Object getVariable(final String name){
                                return getVariables().get(name);
                        }
                        @Mock
                        public boolean setVariable(final String name, final Object value){
                                getVariables().put(name, value);
                                return true;
                        }
                        @Mock
                        public Message getMessage(){
                                return message;
                        }
                        @Mock
                        public Message getRequestMessage(){
                                return message;
                        }
                }.getMockInstance();
                
                message = new MockUp<Message>(){
                        @Mock
                        public String getContent(){
                                return messageContext.getVariable("message.content");
                        }
                        @Mock
                        public void setContent( String value ){
                                messageContext.setVariable("message.content", value);
                        }
                        @Mock
                        public String getHeader(final String name){
                                // expect getHeader("Content-Type")
                                return "application/json; charset=utf-8";
                        }
                        @Mock
                        public boolean setHeader(final String name, final Object value){
                                // expect getHeader("Content-Length")
                                messageContext.setVariable("message.content.length", value);
                                return true;
                        }
                }.getMockInstance();

                executionContext = new MockUp<ExecutionContext>(){}.getMockInstance();
        }
        
        @Test
        public void sanitizeMessageContent(){
                messageContext.setVariable("message.content",  "{foo:'bar',arr:[1,2,3,],val:/*/true**/false}");
                
                JsonSanitizerCallout callout = new JsonSanitizerCallout();
                
                callout.execute(messageContext, executionContext);
 
                assertEquals( messageContext.getMessage().getContent(), "{\"foo\":\"bar\",\"arr\":[1,2,3],\"val\":false}" );
                assertEquals( (int)messageContext.getVariable("message.content.length"), 39);
        }
}
