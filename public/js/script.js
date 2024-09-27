function startCarousel() {
    let activeImage = 0;
    const images = document.querySelectorAll("#carousel img");
  
    function cycleImages() {
      if (!images[activeImage]) {
        // If the active image is undefined, stop the interval and return
        clearInterval(intervalId);
        return;
      }
      //Loops the carousel
      images[activeImage].classList.remove("active");
      activeImage = (activeImage + 1) % images.length;
      images[activeImage].classList.add("active");
    }
    
    let intervalId = setInterval(cycleImages, 3000);
  }
  
  // Function to check for error in query parameters and show an alert
  function checkForError() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('error')) {
      alert("Validation failed. Name and description are required.");
    }
  }
  
  // Start the carousel and check for errors when the page loads
  window.onload = function() {
    startCarousel();
    checkForError();
  };
  
  function editItem(id, name, description) {
    // Populate the hidden field with the id
    document.getElementById("updateId").value = id;
  
    // Populate the form fields with the existing item's data
    document.getElementById("updateName").value = name;
    document.getElementById("updateDescription").value = description;
  
    // Update the form's action attribute
    document.getElementById("updateForm").action = `/item/update/${id}`;
  }
  
  //the 'await' keyword is used within an asynchronous function when a particular step requires communication or data retrieval from an external resource, such as making a request to a database (SQL or NoSQL), sending a request to an external API, waiting for a file to load, or any other task that takes time. 
  async function deleteItem(id) {
    try {
      const response = await fetch(`http://localhost:2900/item/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Item deleted successfully');
        location.reload();
      } else {
        console.log('Failed to delete item');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }

  //we use 'await' to pause the execution of our asynchronous function until the 'Promise' it is waiting for is either resolved (successfully completed) or rejected (failed)

  //a promise is javascript is specifically designed to handle operations that aren't instant (querying a database, fetching data from a server, or reading a file). It's an Object that represents the eventual completion or failure of an asynchronous operation and its resulting value. The promise will either return the data you're expecting (if resolved) or an error message (if rejected)