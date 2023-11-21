# DisP-Track 
![](https://img.shields.io/badge/Domain-Blockchain-blue) ![](https://img.shields.io/badge/Blockchain-Hyperledger_Fabric-brown) <br/> 
Distributed Document Provenance Tracker.

## Fablo Config
This section will help you to understand ```fablo_config.json```

#### Schema and Global Configuration
- The schema points to the path (github repo) for the fablo schema. <br/>
- The engine type supported is ```docker``` and ```kubernetes```
- FabloRest should be enabled to communicate via REST API
- Explorer should be enabled to connect Blockchain Explorer
  
```
{
  "$schema": "https://github.com/hyperledger-labs/fablo/releases/download/1.2.0/schema.json",
  "global": {
    "fabricVersion": "2.4.7",
    "tls": true,
    "engine": "docker",
    "peerDevMode": false,
    "tools": {
      "fabloRest": true,
      "explorer": true
    }
  },
```

#### Organization
- Orderer is mandatory organization
- Further any number of organizations can be added
- ```name``` and ```domain``` can be changed as per the requirement
  
```
  "orgs": [
    {
      "organization": {
        "name": "Orderer",
        "domain": "orderer.amrita.edu"
      },
	 "tools": {
        "fabloRest": true
      },			
      "orderers": [
        {
          "groupName": "group1",
          "type": "raft",
          "instances": 3
        }
      ]
    },
    {
      "organization": {
        "name": "Coimbatore",
        "domain": "cb.amrita.edu"
      },
	"tools": {
        "fabloRest": true
      },			
      "peer": {
        "instances": 1,
        "db": "LevelDb"
      },
      "orderers": [
        {
          "groupName": "group2",
          "type": "solo",
          "instances": 1
        }
      ]
    }
  ],
```

#### Channel Configuration
- For a Channel, the organizations could be added

```
  "channels": [
    {
      "name": "amma",
      "orgs": [
        {
          "name": "Coimbatore",
          "peers": [
            "peer0"
          ]
        }
      ]
    }
  ],
```

#### Chaincode Configuration
- ```name```, ```version``` and ```lang``` can be changed
- ```channel``` should be existing channel as defined earlier
- ```directory``` should be the path to the chaincode folder
  
```
  "chaincodes": [
    {
      "name": "Disp-Track",
      "version": "0.1.0",
      "lang": "node",
      "channel": "amma",
      "directory": "./chaincodes/Disp-Track"
    }
  ]
}
```
