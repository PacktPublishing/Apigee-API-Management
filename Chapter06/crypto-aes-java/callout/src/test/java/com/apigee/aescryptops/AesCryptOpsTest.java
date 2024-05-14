package com.apigee.aescryptops;

import static org.junit.Assert.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.message.MessageContext;

import mockit.Mock;
import mockit.MockUp;

/**
 * Unit test for simple App.
 */
public class AesCryptOpsTest {

           
        MessageContext messageContext;
        ExecutionContext executionContext;
        
        @Before
        public void testSetup(){
                messageContext = new MockUp<MessageContext>() {
                        private Map<String,Object> variables;
                        
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
                }.getMockInstance();
                
                executionContext = new MockUp<ExecutionContext>(){}.getMockInstance();
        }
        
    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    @Test
    public void AesCryptOpsRoundTrip()
    {
        String plainText = "my message\n";

        String iterations = "10000";
        String salt = "1oycXzfn6fU=";
        String passphrase = "secretkey123";
        String cipherText = "n90/3q45JlmrIQYbVu0gCQ==";

        messageContext.setVariable( "flow.iterations", iterations );
        messageContext.setVariable( "flow.cipher-salt", salt );
        messageContext.setVariable( "flow.cipher-passphrase", passphrase );

        AesCryptOpsCallout callout = new AesCryptOpsCallout();

        // encrypt
        messageContext.setVariable( "flow.cipher-op-aes", "encrypt" );
        messageContext.setVariable( "flow.plain-text", plainText );

        callout.execute( messageContext, executionContext );

        assertEquals(cipherText, messageContext.getVariable( "flow.cipher-text" ) );

        // decrypt
        messageContext.setVariable( "flow.cipher-op-aes", "decrypt" );
        messageContext.setVariable( "flow.cipher-text", cipherText );

        callout.execute( messageContext, executionContext );

        assertEquals("my message\n", messageContext.getVariable( "flow.plain-text" ) );
    }

}
