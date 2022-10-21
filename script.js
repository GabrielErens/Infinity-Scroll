const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let numberOfImagesLoaded = 5;
const apiKey = "096WIXUo2GXgai-I8SjL-FzryV5ef10P_qrbJua3Zz0";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numberOfImagesLoaded}`;

// Check if images were loaded
function imageLoaded() {
  console.log("image loaded");
  imagesLoaded++;
  console.log(imagesLoaded)
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready =", ready);
    numberOfImagesLoaded = 10;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numberOfImagesLoaded}`;
  }
}

// Create Elements For Links And Photos, Add To Dom
// Data change fails
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("Total Images = ", totalImages);
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
    // Event listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    item.append(img);
    imgContainer.append(item);
    // Add photo owners name
    const imageFrame = document.createElement('h2');
    imageFrame.innerHTML = photo.user.username; 
    imageFrame.className = 'userName'; 
    imgContainer.append(imageFrame)
    // Shows amount of downloads
    const btnDownload = document.createElement('a');
    btnDownload.className = 'btnDownloads';
    btnDownload.id = 'btnDownload'
    btnDownload.textContent = `Download`;
    btnDownload.setAttribute('href',photo.links.download)

  
    imgContainer.append(btnDownload)
    const description = document.createElement('p')
    description.className = 'description'
    if(photo.description === null){
      description.textContent = 'No description available';
    }else{
      description.textContent = photo.description;
    }
    // needs conditional logic
    imgContainer.append(description)
  });

}

// Get photos from Unsplash Api

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    console.log(photosArray)
  } catch (error) {
    // console.log("Server down");
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
  console.log(photosArray.length);
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    console.log("loaded");
    console.log(ready);
    console.log("total img =", totalImages);
    ready = false;
    getPhotos();
    // console.log(imageLoaded)
  }
});

getPhotos();
