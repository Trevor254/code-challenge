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

// Remove the items initially in the beer-list <ul>
while (movie_titles_ul.hasChildNodes()) {
    movie_titles_ul.removeChild(movie_titles_ul.firstChild);
  }
  
  get_specific_movie();
  
  // Fetch the whole movies list data
  get_resource("http://localhost:3000/films").then(function (data) {
    if (data) {
      movies_data = data;
      movies_data.forEach((movie) => {
        // Create an li element
        const list_item = document.createElement("li");
  
        // Add relevant classes to the li element
        list_item.classList.add("film", "item");
  
        // Create a text node for the li element
        const movie_list_node = document.createTextNode(movie.title);
  
        // Append the text node to the "li" node:
        list_item.appendChild(movie_list_node);
  
        // Add the populated li element into the ul, with each iteration
        movie_titles_ul.appendChild(list_item);
      });
    } else {
      console.log("Retrieved movies data is empty");
    }
  
    for (let list_item of movie_titles_ul.children) {
      list_item.style.cursor = "pointer";
    }
  });
  
  // Fetch movie of a given ID
  function get_specific_movie(id = "1") {
    get_resource("http://localhost:3000/films/" + id).then(function ({
      title,
      runtime,
      capacity,
      showtime,
      tickets_sold,
      description,
      poster,
    }) {
      let list_item;
      current_movie_title = title;
      available_movie_slots = capacity - tickets_sold;
  
      for (let child of movie_titles_ul.children) {
        if (child.innerHTML === title) {
          list_item = child;
          break;
        }
      }
  
      // Movie tickets which had been sold out to remain at 0
      if (
        list_item instanceof HTMLElement &&
        list_item.classList.contains("sold-out")
      ) {
        available_movie_slots = 0;
      }
  
      movie_title.innerHTML = title;
      movie_runtime.innerHTML = `${runtime} minutes`;
      movie_info.innerHTML = description;
      movie_showtime.innerHTML = showtime;
      movie_ticket_num.innerHTML = available_movie_slots;
      movie_image_dom.setAttribute("src", poster);
    });
  }
  
  movie_titles_ul.addEventListener("click", function (event) {
    const target_movie = event.target;
    target_movie.style.cursor = "pointer";
    let movie_found;
    if (target_movie.innerHTML) {
      movie_found = movies_data.find(function ({ title }) {
        return target_movie.innerHTML === title;
      });
    }
  
    if (movie_found) get_specific_movie(movie_found.id);
  });
  
  buy_movie_ticket_btn.addEventListener("click", function () {
    // Reduce the value of remaining tickets by one every time a ticket is bought
    if (available_movie_slots > 0) {
      available_movie_slots -= 1;
      movie_ticket_num.innerHTML = available_movie_slots;
    }
  
    // If no slot remains, look for the list item and add class "sold-out"
    if (available_movie_slots < 1) {
      for (let element of movie_titles_ul.children) {
        if (element.innerHTML === current_movie_title) {
          element.classList.add("sold-out");
          break;
        }
      }
    }
  });
