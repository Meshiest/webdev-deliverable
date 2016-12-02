var placeIds = {
  benny: 'ChIJEQ4and9ZwokRAloe97cJr4Y',
  stacks: 'ChIJPX36-d9ZwokRn0RtsTkjZOM',
  HanselandGriddle: 'ChIJ3Q7w_eFZwokRei-6_MMDVC4',
  boardwalk: 'ChIJHTG_yNhZwokRaqylajzgFDQ',
  flatbread: 'ChIJK00b-eX_wokReGj0KOOroQo'
}

var map;

function initMap() {
  var stevensLoc = {lat: 40.746866, lng: -74.0280354};

  map = new google.maps.Map(document.getElementById('map'), {
    center: stevensLoc,
    zoom: 17
  });

  var service = new google.maps.places.PlacesService(map);

  // get all the places
  Object.keys(placeIds).map(function(divId) {
    var placeId = placeIds[divId];
    service.getDetails({placeId: placeId},
      function (place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {

          // update the numerical score
          var ratingScore = document.querySelector("#" + divId + " .rating .score");
          ratingScore.innerHTML = place.rating;
          // add a .0 if it's just a 4
          if(ratingScore.innerHTML.length == 1)
            ratingScore.innerHTML += ".0";

          // update the number of stars
          var ratingStars = document.querySelector("#" + divId + " .rating .stars");
          ratingStars.innerHTML = genStarStr(place.rating);
          
          // update location
          var vicinity = document.querySelector("#" + divId + " .icon-pair .text");
          vicinity.innerHTML = place.vicinity;
          
          // show our loaded div
          var loadDiv = document.querySelector("#" + divId + " .loadDiv");
          loadDiv.style.display = "block";
          
          // review list
          var reviewList = document.querySelector("#" + divId + " .loadDiv .reviews");

          // load all the reviews
          for(var i in place.reviews) {
            var review = place.reviews[i];
            reviewList.innerHTML += `
              <div class='review'>
                <div>
                  <img alt='User Profile Picture' src='` + (review.profile_photo_url || 'images/user.png') + `'/>
                </div>
                <div>
                  <div class='postMeta'>
                    <span class='rating'> ` + genStarStr(review.rating) + `</span>
                    <span class='time'>
                      ` + review.relative_time_description + `
                    </span>
                    by
                    <span class='author'>
                      <a title='User Profile' href='` + review.author_url + `'>
                        ` + escapeHTML(review.author_name) + `
                      </a>
                    </span>
                  </div>
                  <span class='text'>
                    "` + escapeHTML(review.text) + `"
                  </span>
                </div>
              </div>
            `;
          }

          // photo list div
          var photoList = document.querySelector("#" + divId + " .loadDiv .photos");

          // load all the photos
          for(var i in place.photos) {
            var photo = place.photos[i];
            photoList.innerHTML += `
              <img alt="Image" src='` + photo.getUrl({'maxWidth': 300, 'maxHeight': 300}) + `'/>
            `;
          }
        }
      }
    );
  })
}

// creates a list of stars from 1 to 5
function genStarStr(rating) {
  var str = "";
  // add full stars
  for(var i = 0; i < Math.floor(rating); i++) {
    str += "<i class='material-icons'>star</i>";
  }
  // add half stars
  if(rating % 1 >= 0.5) {
    str += "<i class='material-icons'>star_half</i>";
  }
  // add empty stars
  for(var i = 0; i < 5-Math.round(rating); i++) {
    str += "<i class='material-icons'>star_border</i>";
  }
  return str;
}

// Prevents XSS by using browser's built in functionality
function escapeHTML(str) {
  var elem = document.createElement('div');
  elem.appendChild(document.createTextNode(str));
  return elem.innerHTML;
}