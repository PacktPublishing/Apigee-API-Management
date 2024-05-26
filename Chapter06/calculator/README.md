# Apigee API Proxy JavaScript Policy Calculator

The JavaScript implemention of a simple arithmetic calculator illustrates basic features of Apigee and JavaScript policies interoperations via JavaScript Object Model, specifically context object and print() function debug pseudo-console integration.


### To set up variables and test connectivity
```
ORG=apigeex-devops
ENV=eval

API=calculator

apigeecli apis --org=$ORG list
```


### To import the api bundle into $ORG and deploy the $API

NOTE: for a current folder `--name=${PWD##*/}`

```
REV=$(apigeecli apis create bundle --name=$API --org=$ORG --proxy-folder=apiproxy --wait | jq -r .revision)

apigeecli apis deploy --ovr --wait --name $API --rev $REV --org $ORG --env $ENV
```


### Positive Test:

curl -XGET -G "https://api.exco.com/calculator?number1=3&number2=5" --data-urlencode operator=+ -v

### Negative Test:

curl -XGET -G "https://api.exco.com/calculator?number1=3&number2=5" --data-urlencode operator=% -v




