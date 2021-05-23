"use strict";


const axios = require("axios");


const query = `
  query {
    requestProfile {
      get {
        profileId
        posts {
          getList {
            cursor
            items {
              postId
              displayName
              comments {
                getList {
                  items {
                    commentId
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const request = {
  query
};


axios.post("http://localhost:3000/gateway", request).then( d => console.log(JSON.stringify(d.data.data)), err => console.log(err.response.data));
