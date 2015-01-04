/*jslint browser: true, devel: true, indent: 2 */
/*global $, inName, appData */
/*

This file contains all of the code running in the background that makes resumeBuilder.js possible. We call these helper functions because they support your code in this course.

Don't worry, you'll learn what's going on in this file throughout the course. You won't need to make any changes to it until you start experimenting with inserting a Google Map in Problem Set 3.

Cameron Pittman
*/


/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
replace the %data% placeholder text you see in them.
*/
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span>%data%</span><hr/>';

var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLWelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 id="skillsH3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="#">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="#">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="#">%data%</a>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';


/*
The International Name challenge in Lesson 2 where you'll create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function () {
  "use strict";
  $('button').click(function () {
    var name, iName;
    name = $('#name')[0].innerText;
    iName = inName(name) || function () {};
    $('#name').html(iName);
  });
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
var appData;
if (appData === undefined) {
  appData = {};
}
appData.clickLocations = [];

function logClicks(x, y) {
  "use strict";
  appData.clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function (loc) {
  "use strict";
  //Pass the click coordinates, relative to the document, to the logging function
  logClicks(loc.pageX, loc.pageY);
});



/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {
  "use strict";
  /*global google */

  var locations, mapOptions;

  mapOptions = {
    disableDefaultUI: true
  };

  // This next line makes `map` a new Google Map JavaScript Object and attaches it to
  // <div id="map">, which is appended as part of an exercise late in the course.
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);


  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.

  This was found to cause "OVER_QUERY_LIMIT" calling the google maps api.  Since
  the array was mostly duplicates, changed to only include unique values.

  To facility later extension of the map capabilities (with infoWindow), the
  simple array of location strings has been replaced by an array of objects
  each of which contains a {string} property for the location, plus a reason
  property holding an array of objects, each of which provides linkage details
  about one reason (data source) the location was included.

  locReasons = [
    {
      location : 'string',
      reasons : [
        {
          source : enumeration, //schools, jobs, contacts
          occurrence : index //undefined for contacts which is not an array
        }//, ...
      ]
    }//, ...
  ];
  */
  function locationFinder() {
    var school, job, uniqueLocations;

    uniqueLocations = [];// initializes an empty array: no locations found yet

    //An inner function to DRY the logic needed to populated the array
    //source and index are sufficient to identify where the location was found
    function addLocation(location, source, index) {
      var matchEntry;
      //An inner function to find any existing entry for a location
      function findLocation(matchLocation) {
        var i;
        for (i = 0; i < uniqueLocations.length; i += 1) {
          if (uniqueLocations[i].location === matchLocation) {
            return i;
          }
        }
        return -1;//No match found
      }// ./findLocation()
      matchEntry = findLocation(location);
      if (matchEntry < 0) {
        //no existing information about the location: create an entry to hold it
        matchEntry = uniqueLocations.push({
          'location' : location,
          'reasons' : []
        });
        matchEntry -= 1;//Adjust from new length to last (just added) index
      }// ./(matchEntry < 0)
      //At the point there is always an entry: add the new reason to it
      uniqueLocations[matchEntry].reasons.push({
        'source' : source,
        'occurrence' : index
      });
    }// ./addLocation

    // add the single location property from bio to the locations data storage
    if (appData.bio.contacts.location) {//Safety net: make sure it is not empty
      addLocation(appData.bio.contacts.location, 'contacts');
    }

    // iterates through school locations and appends each location to
    // the locations array
    for (school in appData.education.schools) {
      /*jslint forin: true */ //Applies to whole function, not just the current for
      addLocation(appData.education.schools[school].location, 'schools', school);
    }

    // iterates through work locations and appends each location to
    // the locations array
    for (job in appData.work.jobs) {
      addLocation(appData.work.jobs[job].location, 'jobs', job);
    }

    return uniqueLocations;
  }// ./locationFinder

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {
    /*global google */
    var lat, lon, name, bounds, marker, infoWindow;

    // The next lines save location data from the search result object to local variables
    lat = placeData.geometry.location.lat();  // latitude from the place service
    lon = placeData.geometry.location.lng();  // longitude from the place service
    name = placeData.formatted_address;   // name of the place from the place service
    bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function () {
      // your code goes here!
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {
    var service, place, request;

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
    for (place in locations) {
      /*jslint forin: true */ //applies to the whole function, not just this block
      // the search request object
      request = {
        query: locations[place].location
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      // Very easy to overload with too many locations
      service.textSearch(request, callback);
    }
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location objects, with location string and reasons
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function () {//function (e)
  "use strict";
  /*global mapBounds */
  // Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});
