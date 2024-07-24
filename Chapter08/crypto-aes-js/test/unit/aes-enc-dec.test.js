

const jspolicy = "../../apiproxy/resources/jsc/aes-enc-dec";
const cryptojs = "../../apiproxy/resources/jsc/crypto-js-3.3.0.min";


const requirer = () => {
    try {
        return require( jspolicy )
    } catch (error) {
        console.error('failed to find a source')
    }
};

describe('aes crypt ops tests', () => {
    let plainText = "my message\n";

    let salt = '1oycXzfn6fU=';
    let iterations = 10000;
    let passphrase = 'secretkey123';
    let cipherText = 'n90/3q45JlmrIQYbVu0gCQ=='

    beforeEach(() => {
        jest.resetModules();
        
        global.context = {};
        global.CryptoJS = require( cryptojs )
    });

    it('aes encrypt test', () => {
        global.context.getVariable = jest.fn()
        .mockReturnValueOnce('encrypt')
        .mockReturnValueOnce( passphrase )
        .mockReturnValueOnce( salt )
        .mockReturnValueOnce( iterations )
        .mockReturnValueOnce( plainText );
        
    
        global.context.setVariable = jest.fn();
 
        
        require( jspolicy )
 
        expect( global.context.setVariable ).toHaveBeenCalledTimes( 1 );
        expect( global.context.setVariable.mock.calls[0][1] ).toBe( cipherText );
    });

    it('aes decrypt test', () => {

        global.context.getVariable = jest.fn()
        .mockReturnValueOnce('decrypt')
        .mockReturnValueOnce( passphrase )
        .mockReturnValueOnce( salt )
        .mockReturnValueOnce( iterations )
        .mockReturnValueOnce( cipherText );
        

        global.context.setVariable = jest.fn();

        require( jspolicy )

        expect( global.context.setVariable ).toHaveBeenCalledTimes( 1 );
        expect( global.context.setVariable.mock.calls[0][1] ).toBe( plainText );
    })
})


