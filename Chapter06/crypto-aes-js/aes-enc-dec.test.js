

const jspolicy = "./aes-enc-dec.js"

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
    let passphrase = 'secretkey123';
    let cipherText = 'n90/3q45JlmrIQYbVu0gCQ=='

    beforeEach(() => {
        jest.resetModules();
        global.context = {};
    });

    it('aes encrypt test', () => {
        global.context.getVariable = jest.fn()
        .mockReturnValueOnce('encrypt')
        .mockReturnValueOnce( passphrase )
        .mockReturnValueOnce( salt )
        .mockReturnValueOnce( plainText );
        
    
        global.context.setVariable = jest.fn();
 
        requirer()
 
        expect( global.context.setVariable ).toHaveBeenCalledTimes( 1 );
        expect( global.context.setVariable.mock.calls[0][1] ).toBe( cipherText );
    });

    it('aes decrypt test', () => {

        global.context.getVariable = jest.fn()
        .mockReturnValueOnce('decrypt')
        .mockReturnValueOnce( passphrase )
        .mockReturnValueOnce( salt )
        .mockReturnValueOnce( cipherText );
        

        global.context.setVariable = jest.fn();

        requirer()

        expect( global.context.setVariable ).toHaveBeenCalledTimes( 1 );
        expect( global.context.setVariable.mock.calls[0][1] ).toBe( plainText );
    })
})


