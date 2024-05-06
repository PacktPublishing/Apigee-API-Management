package com.apigee.aescryptops;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Arrays;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;

public class AesCryptOpsCallout implements Execution {

    private SecretKey derivePkdf2KeyAndIv( final String passphrase, 
            final Integer keySize, final Integer iterations, final byte[] salt 
        ) throws NoSuchAlgorithmException, InvalidKeySpecException {

            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            KeySpec spec = new PBEKeySpec( passphrase.toCharArray(), salt, iterations, keySize);
            SecretKey keyiv = factory.generateSecret(spec);

            return keyiv;
    }

    public ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) {

        Integer keySize = 384;
        Integer iterations = 10000;

        SecretKeySpec key = null;
        IvParameterSpec iv = null;

        try{
            String cipherOp = messageContext.getVariable( "flow.cipher-op-aes" );
            String passphrase = messageContext.getVariable( "flow.cipher-passphrase" );
            byte[] salt =  Base64.getDecoder().decode( (String)messageContext.getVariable( "flow.cipher-salt" ) );

            if( cipherOp.equals( "encrypt" ) ){
                // op is encrypt
                String plainText = (String)messageContext.getVariable( "flow.plain-text" );

                SecretKey keyiv = derivePkdf2KeyAndIv(passphrase, keySize, iterations, salt );
                key = new SecretKeySpec( Arrays.copyOfRange( keyiv.getEncoded(), 0, 256/8 ), "AES" );
                iv = new IvParameterSpec( Arrays.copyOfRange(keyiv.getEncoded(), 256/8, 384/8 ) );
    
                Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
                cipher.init(Cipher.ENCRYPT_MODE, key, iv);
        
                byte[] cipherText = cipher.doFinal( plainText.getBytes("UTF-8") );
                
                messageContext.setVariable( "flow.cipher-text", new String( Base64.getEncoder().encodeToString( cipherText) ) );
            }else{
                // op is decrypt
                byte[] cipherText = Base64.getDecoder().decode( (String)messageContext.getVariable( "flow.cipher-text" ));

                SecretKey keyiv = derivePkdf2KeyAndIv(passphrase, keySize, iterations, salt );
                key = new SecretKeySpec( Arrays.copyOfRange( keyiv.getEncoded(), 0, 256/8 ), "AES" );
                iv = new IvParameterSpec( Arrays.copyOfRange(keyiv.getEncoded(), 256/8, 384/8 ) );
    
                Cipher cipher = Cipher.getInstance( "AES/CBC/PKCS5Padding" );
                cipher.init( Cipher.DECRYPT_MODE, key, iv );

                byte[] decrypted = cipher.doFinal( cipherText );
                
                messageContext.setVariable( "flow.plain-text", new String( decrypted, "UTF-8" ) );
            }
            return  ExecutionResult.SUCCESS;

        }catch( Exception e ){
                return  ExecutionResult.ABORT;
        }
    }
}
