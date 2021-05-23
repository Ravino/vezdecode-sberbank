json='{"query":"query{requestMessage{getList{count\nitems{body}}}\nrequestChat{getList{count\nitems{displayName\nlastMessage{displayName\nbody}}}}}"}'


address="https://dev.plizi.fun"


echo "Authentication in service"
curl -c authCookie -H "Host: dev.plizi.fun" -d "method=authentication&username=evgeniy@nekrasov.pw&password=23gGzksMqKPPT82" $address/registration-authorization/signin/email


echo "\n\nrequest graphql struct\n"
curl --cookie authCookie -H "Host: dev.plizi.fun" -H "Content-Type: application/json" -X POST -d $json $address/api/graphql/gateway
