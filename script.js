const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = "30";
const apiKey = "096WIXUo2GXgai-I8SjL-FzryV5ef10P_qrbJua3Zz0";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if images were loaded
function imageLoaded(){
  console.log('image loaded')
  imageLoaded++;
  if(imageLoaded === totalImages){
    ready = true;
    console.log('ready =', ready)
  }
}

// Create Elements For Links And Photos, Add To Dom
// Data change fails
function displayPhotos() {

  totalImages = photosArray.length;
  console.log('Total Images = ', totalImages)
  //Run function for each object in photosArray
  photosArray.forEach((photo) => {
    //create a
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    //create img
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    item.append(img);
    imgContainer.append(item);
  });
  // Event listener, check when each is finished loading
  img.addEventListener("load", imageLoaded());
}

// Get photos from Unsplash Api

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    console.log(displayPhotos());
    // const data = await response.json();
    // console.log(data)
  } catch (error) {
    // console.log("Server down");
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    console.log("loaded");
    getPhotos();
  }
});

getPhotos();
