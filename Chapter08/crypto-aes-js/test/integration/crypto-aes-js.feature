Feature: AES/PBKDF2 encryption and decryption
  As an API consumer
  I want to encrypt plaintext and decrypt ciphertext
  So that I can use AES encryption with PBKDF2 for secure communication.

  Scenario: I should be able to encrypt plaint text with passphrase, salt, and iterations
    Given I set form parameters to
      | parameter  | value           |
      | op         | encrypt         |
      | passphrase | secretkey123    |
      | salt       | 1oycXzfn6fU=    |
      | iterations | 1000            |
      | plaintext  | my%20message%0A |
    When I POST to /crypto-aes-js
    Then response code should be 200
    And response body should contain G3MsZWqmrpAESPwFPHWttw==

  Scenario: I should be able to decrypt cipher text with passphrase, salt, and iterations
    Given I set form parameters to
      | parameter  | value           |
      | op         | decrypt         |
      | passphrase | secretkey123    |
      | salt       | 1oycXzfn6fU=    |
      | iterations | 1000            |
      | ciphertext | G3MsZWqmrpAESPwFPHWttw== |
    When I POST to /crypto-aes-js
    Then response code should be 200
    And response body should contain my%20message%0A
