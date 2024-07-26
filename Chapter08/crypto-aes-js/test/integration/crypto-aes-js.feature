Feature: List of Airports
  As an API consumer
  I want to encrypt plaintext and decrypt ciphertext
  So that I can use AES encryption with PBKDF2 for secure communication.

  Scenario: I should be able to encrypt plaint text with passphrase, salt, and iterations
    Given I set form parameters to
      | op         | encrypt         |
      | passphrase | secretkey123    |
      | salt       | 1oycXzfn6fU=    |
      | iterations | 10000           |
      | plaintext  | my%20message%0A |
    When I POST to /crypto-aes-js
    Then response code should be 200
    And response body path $ should be of type array with length 50

  Scenario: I should be able to decrypt cipher text with passphrase, salt, and iterations
    Given I set form parameters to
      | op         | decrypt         |
      | passphrase | secretkey123    |
      | salt       | 1oycXzfn6fU=    |
      | iterations | 10000           |
      | plaintext  | n90/3q45JlmrIQYbVu0gCQ== |
    When I POST to /crypto-aes-js
    Then response code should be 200
    And response body path $ should be of type array with length 50
