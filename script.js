const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

console.log(`Image container ${imgContainer}`);
console.log(loader);
// Unsplash API
const count = "10";
const apiKey = "096WIXUo2GXgai-I8SjL-FzryV5ef10P_qrbJua3Zz0";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];
// Create Elements For Links And Photos, Add To Dom
// Data change fails
function displayPhotos() {
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
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    console.log('loaded')
    getPhotos();
  }
});
getPhotos();
