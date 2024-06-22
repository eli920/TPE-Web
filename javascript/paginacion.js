"use strict"
const url = new URL();
url.searchParams.append('completed', false);
url.searchParams.append('page', 1);
url.searchParams.append('limit', 4);

fetch(url, {
  method: 'GET',
  headers: {'content-type':'application/json'},
}).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
}).then(tasks => {
  // mockapi returns first 10 tasks that are not completed
}).catch(error => {
  // handle error
})