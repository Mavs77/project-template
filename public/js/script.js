
//control image carousel

function startCarousel() {
    let activeImage = 0; 
    const images = document.querySelectorAll("#carousel img")

    //this is the function that runs repeatedly to change the active image 
    function cycleImages() {
        if (!images[activeImage]) {
            clearInterval(intervalId)
            return; 
        }

        images[activeImage].classList.remove('active')
        activeImage = (activeImage + 1) % images.length //This increments the activeImage variable by 1, but also ensures that if it reaches the end of the list of images, it wraps back to the first image. You want the cycle to cycle through the images repeatedly, not just stop when it reaches the last one. 
        images[activeImage].classList.add('active')
    }

    let intervalId = setInterval(cycleImages, 3000)
}


//handle edit requests

function editItem(id, name, description) {
    document.getElementById('updateID').value = id

    document.getElementById('updateName').value = name

    document.getElementById('updateDescription') = description

    document.getElementById('updateForm').action = `/item/update/${id}`
}


//handle delete requests 

async function deleteItem(id) {
    try {
        const res = await fetch(`http://localhost:2900/item/delete/${id}`, {
            method: 'DELETE'
        })
        if(res.ok) {
            location.reload()
        } else {
            console.log('failed to delete item')
        }
    }
    catch(error) {
        console.log('error occurred:', error); 
    }
}




//handle errors from server if unable to write data (optional)
//designed to check for an error parameter in the URL and display an alert if it's found
function checkForError() {
    const urlParams = new URLSearchParams(window.location.search); //retrieves the query string from the URL (the part after the ? symbol). URLSearchParams() is a built-in function. 
    if (urlParams.has('error')) {
      alert("Validation failed. Name and description are required.");
    }
  }

  window.onload = function () {
    startCarousel(); 
    checkForError(); 
  }