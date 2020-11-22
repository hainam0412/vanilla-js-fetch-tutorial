const api = "http://localhost:3000/books";

/* GET */
fetch(api)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      const li = document.createElement("li");
      li.classList.add("mb-3");
      li.innerHTML = `
                        <p>${element.title}</p>
                        <p>${element.author}</p>
                        <div>
                            <button class='del-btn btn btn-danger' data-id='${element.id}'>Delete</button>
                        </div>
                        `;
      document.querySelector(".books").appendChild(li);
    });
    /**
     * DELETE
     */
    document.querySelectorAll(".del-btn").forEach((button) => {
      button.addEventListener('click' , () =>{
          const id = button.dataset.id
          fetch(`${api}/${id}` , {
              method:'DELETE'
          })
          .then(res => res.json())
          .then(data => {
              location.reload()
          })
          .catch(err => console.log(err))
      });
    });
  })
  .catch((err) => console.log(err));
/**
 * POST
 */

document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const book = {
    title: document.querySelector("#title").value,
    author: document.querySelector("#author").value,
  };
  fetch(api, {
    method: "POST",
    body: JSON.stringify(book),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then((data) => {
      document.querySelector("#title").value = "";
      document.querySelector("#author").value = "";
      location.reload();
    })
    .catch((err) => console.log(err));
});
