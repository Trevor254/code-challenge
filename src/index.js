// Your code here
// an asynchronous function to read http request
async function get_resource(url) {
    const response = await fetch(url);
    return response.json();
  }