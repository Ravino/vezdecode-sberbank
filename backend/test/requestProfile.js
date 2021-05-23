"use strict";


const axios = require("axios");


const query = `
  query {
    requestProfile {
      get {
        profileId
        firstname
        lastname
        displayName
        country
        city
        age
        avatar
      }
    }
  }
`;

const request = {
  query
};


axios.post("http://localhost:3000/graphql/gateway", request).then( d => console.log(JSON.stringify(d.data.data)), err => console.log(err.response.data));
