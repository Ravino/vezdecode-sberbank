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
        marital
        gender
        avatar
        frends {
          getList {
            cursor
            count
            items {
              frendId
              profileId
              displayName
              createdAt
              updatedAt
            }
          }
        }
        posts {
          getList {
            cursor
            count
            items {
              postId
              authorId
              displayName
              body
              createdAt
              updatedAt
              likes {
                getList {
                  cursor
                  count
                  items {
                    likeId
                    authorId
                    displayName
                  }
                }
              }
              shares {
                getList {
                  cursor
                  count
                  items {
                    shareId
                    authorId
                    displayName
                  }
                }
              }
              comments {
                getList {
                  cursor
                  count
                  items {
                    commentId
                    postId
                    authorId
                    displayName
                    body
                    createdAt
                    updatedAt
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
