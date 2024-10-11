// Your code here
// an asynchronous function to read http request
async function get_resource(url) {
    const response = await fetch(url);
    return response.json();
  }

  // variables
let movies_data, available_movie_slots, current_movie_title;

// dom elements
const movie_titles_ul = document.getElementById("films");
const movie_titles_li = document.getElementsByClassName("film");
const movie_image_dom = document.getElementById("poster");
const movie_title = document.getElementById("title");
const movie_runtime = document.getElementById("runtime");
const movie_info = document.getElementById("film-info");
const movie_showtime = document.getElementById("showtime");
const movie_ticket_num = document.getElementById("ticket-num");
const buy_movie_ticket_btn = document.getElementById("buy-ticket");
