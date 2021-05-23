"use strict";


const axios = require("axios");


const query = `
  mutation {
    requestMutation {
      create(body: "123")
    }
  }
`

const request = {
  query
};


axios.post("http://localhost:3000/post", request).then( d => console.log(JSON.stringify(d.data.data)), err => console.log(err.response.data));
