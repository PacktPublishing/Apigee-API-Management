
var cipherOp = context.getVariable( "flow.cipher-op-aes" )
var passphrase = context.getVariable( "flow.cipher-passphrase" );
var salt = CryptoJS.enc.Base64.parse( context.getVariable( "flow.cipher-salt" ) );

function derivePkdf2KeyAndIv( passphrase, keySize, iterations, salt ){
    var keyiv = CryptoJS.PBKDF2(passphrase, salt, {
        keySize: keySize/32,
        iterations: iterations,
        hasher: CryptoJS.algo.SHA256
    });
  
    var key = CryptoJS.lib.WordArray.create(keyiv.words.slice(0, 256/32))
    var iv = CryptoJS.lib.WordArray.create(keyiv.words.slice( 256/32, 256/32+128/32))

    return [ key, iv ];
}

var keySize = 384;
var iterations = 10000;

if( cipherOp == "encrypt" ){
    // op is encrypt
    var plainText = context.getVariable( "flow.plain-text" );
  
    [ key, iv ] = derivePkdf2KeyAndIv ( passphrase, keySize, iterations, salt );

    var ciphertext = CryptoJS.AES.encrypt(
        plainText, 
        key,
        { 
            iv: iv,
            padding: CryptoJS.pad.Pkcs7 ,
            mode: CryptoJS.mode.CBC
    })
    context.setVariable( "flow.cipher-text", ciphertext.toString() );
}else{
    // op is decrypt
    var ciphertext =  CryptoJS.enc.Base64.parse( context.getVariable( "flow.cipher-text" ) );

    [ key, iv ] = derivePkdf2KeyAndIv ( passphrase, keySize, iterations, salt );

    var decrypted = CryptoJS.AES.decrypt(
        { ciphertext: ciphertext }, 
        key, 
        { 
            iv: iv,
            padding: CryptoJS.pad.Pkcs7 ,
            mode: CryptoJS.mode.CBC
    })
    context.setVariable( "flow.plain-text", decrypted.toString(CryptoJS.enc.Utf8) );
}
