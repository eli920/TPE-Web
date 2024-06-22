"use strict"

const url = new URL('https://666c8e3949dbc5d7145e6b07.mockapi.io/api/franquicias');
url.searchParams.append('title', 'local');


fetch(url, {
    method: 'GET',
    headers: {'content-type':'application/json'},
  }).then(res => {
    if (res.ok) {
        return res.json();
    }
    // handle error
  }).then(tasks => {
    // mockapi returns only tasks that match `hello` string
  }).catch(error => {
    // handle error
  });
