[
  {
    "description": "  As an API consumer\n  I want to encrypt plaintext and decrypt ciphertext\n  So that I can use AES encryption with PBKDF2 for secure communication.",
    "elements": [
      {
        "description": "",
        "id": "list-of-airports;i-should-be-able-to-encrypt-plaint-text-with-passphrase,-salt,-and-iterations",
        "keyword": "Scenario",
        "line": 6,
        "name": "I should be able to encrypt plaint text with passphrase, salt, and iterations",
        "steps": [
          {
            "keyword": "Before",
            "hidden": true,
            "result": {
              "status": "passed",
              "duration": 5000000
            }
          },
          {
            "keyword": "Before",
            "hidden": true,
            "result": {
              "status": "passed",
              "duration": 2000000
            }
          },
          {
            "arguments": [
              {
                "rows": [
                  {
                    "cells": [
                      "op",
                      "encrypt"
                    ]
                  },
                  {
                    "cells": [
                      "passphrase",
                      "secretkey123"
                    ]
                  },
                  {
                    "cells": [
                      "salt",
                      "1oycXzfn6fU="
                    ]
                  },
                  {
                    "cells": [
                      "iterations",
                      "10000"
                    ]
                  },
                  {
                    "cells": [
                      "plaintext",
                      "my%20message%0A"
                    ]
                  }
                ]
              }
            ],
            "keyword": "Given ",
            "line": 7,
            "name": "I set form parameters to",
            "match": {
              "location": "node_modules\\apickli\\apickli-gherkin.js:72"
            },
            "result": {
              "status": "passed",
              "duration": 3000000
            }
          },
          {
            "arguments": [],
            "keyword": "When ",
            "line": 13,
            "name": "I POST to /crypto-aes-js",
            "match": {
              "location": "node_modules\\apickli\\apickli-gherkin.js:101"
            },
            "result": {
              "status": "failed",
              "duration": 277000000,
              "error_message": "Error: Error: getaddrinfo ENOTFOUND api.exco.com\n    at C:\\Users\\YLESYUK\\work\\apigee\\Apigee-API-Management\\Chapter08\\crypto-aes-js\\node_modules\\apickli\\apickli-gherkin.js:104:16\n    at Request._callback (C:\\Users\\YLESYUK\\work\\apigee\\Apigee-API-Management\\Chapter08\\crypto-aes-js\\node_modules\\apickli\\apickli.js:486:14)\n    at self.callback (C:\\Users\\YLESYUK\\work\\apigee\\Apigee-API-Management\\Chapter08\\crypto-aes-js\\node_modules\\request\\request.js:185:22)\n    at Request.emit (node:events:519:28)\n    at Request.onRequestError (C:\\Users\\YLESYUK\\work\\apigee\\Apigee-API-Management\\Chapter08\\crypto-aes-js\\node_modules\\request\\request.js:877:8)\n    at ClientRequest.emit (node:events:519:28)\n    at TLSSocket.socketErrorListener (node:_http_client:492:9)\n    at TLSSocket.emit (node:events:519:28)\n    at emitErrorNT (node:internal/streams/destroy:169:8)\n    at emitErrorCloseNT (node:internal/streams/destroy:128:3)\n    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)"
            }
          },
          {
            "arguments": [],
            "keyword": "Then ",
            "line": 14,
            "name": "response code should be 200",
            "match": {
              "location": "node_modules\\apickli\\apickli-gherkin.js:167"
            },
            "result": {
              "status": "skipped",
              "duration": 0
            }
          },
          {
            "arguments": [],
            "keyword": "And ",
            "line": 15,
            "name": "response body path $ should be of type array with length 50",
            "match": {
              "location": "node_modules\\apickli\\apickli-gherkin.js:216"
            },
            "result": {
              "status": "skipped",
              "duration": 0
            }
          }
        ],
        "tags": [],
        "type": "scenario"
      },
      {
        "description": "",
        "id": "list-of-airports;i-should-be-able-to-decrypt-cipher-text-with-passphrase,-salt,-and-iterations",
        "keyword": "Scenario",
        "line": 17,
        "name": "I should be able to decrypt cipher text with passphrase, salt, and iterations",
        "steps": [
          {
            "keyword": "Before",
            "hidden": true,
            "result": {
              "status": "passed",
              "duration": 0
            }
          },
          {
            "keyword": "Before",
            "hidden": true,
            "result": {
              "status": "passed",
              "duration": 0
            }
          },
          {
            "arguments": [
              {
                "rows": [
                  {
                    "cells": [
                      "op",
                      "decrypt"
                    ]
                  },
                  {
                    "cells": [
                      "passphrase",
                      "secretkey123"
                    ]
                  },
                  {
                    "cells": [
                      "salt",
                      "1oycXzfn6fU="
                    ]
                  },
                  {
                    "cells": [
                      "iterations",
                      "10000"
                    ]
                  },
                  {
                    "cells": [
                      "plaintext",
                      "n90/3q45JlmrIQYbVu0gCQ=="
                    ]
                  }
                ]
              }
            ],
            "keyword": "Given ",
            "line": 18,
            "name": "I set form parameters to",
            "match": {
              "location": "node_modules\\apickli\\apickli-gherkin.js:72"
            },
            "result": {
              "status": "passed",
              "duration": 0
            }
          },
          {
            "arguments": [],
            "keyword": "When ",
            "line": 24,
            "name": "I POST to /crypto-aes-js",
            "match": {
              "location": "node_modules\\apickli\\apickli-gherkin.js:101"
            },
            "result": {
              "status": "failed",
              "duration": 109000000,
              "error_message": "Error: Error: getaddrinfo ENOTFOUND api.exco.com\n    at C:\\Users\\YLESYUK\\work\\apigee\\Apigee-API-Management\\Chapter08\\crypto-aes-js\\node_modules\\apickli\\apickli-gherkin.js:104:16\n    at Request._callback (C:\\Users\\YLESYUK\\work\\apigee\\Apigee-API-Management\\Chapter08\\crypto-aes-js\\node_modules\\apickli\\apickli.js:486:14)\n    at self.callback (C:\\Users\\YLESYUK\\work\\apigee\\Apigee-API-Management\\Chapter08\\crypto-aes-js\\node_modules\\request\\request.js:185:22)\n    at Request.emit (node:events:519:28)\n    at Request.onRequestError (C:\\Users\\YLESYUK\\work\\apigee\\Apigee-API-Management\\Chapter08\\crypto-aes-js\\node_modules\\request\\request.js:877:8)\n    at ClientRequest.emit (node:events:519:28)\n    at TLSSocket.socketErrorListener (node:_http_client:492:9)\n    at TLSSocket.emit (node:events:519:28)\n    at emitErrorNT (node:internal/streams/destroy:169:8)\n    at emitErrorCloseNT (node:internal/streams/destroy:128:3)\n    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)"
            }
          },
          {
            "arguments": [],
            "keyword": "Then ",
            "line": 25,
            "name": "response code should be 200",
            "match": {
              "location": "node_modules\\apickli\\apickli-gherkin.js:167"
            },
            "result": {
              "status": "skipped",
              "duration": 0
            }
          },
          {
            "arguments": [],
            "keyword": "And ",
            "line": 26,
            "name": "response body path $ should be of type array with length 50",
            "match": {
              "location": "node_modules\\apickli\\apickli-gherkin.js:216"
            },
            "result": {
              "status": "skipped",
              "duration": 0
            }
          }
        ],
        "tags": [],
        "type": "scenario"
      }
    ],
    "id": "list-of-airports",
    "line": 1,
    "keyword": "Feature",
    "name": "List of Airports",
    "tags": [],
    "uri": "test\\integration\\crypto-aes-js.feature"
  }
]