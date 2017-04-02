Template.map.helpers({  
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: function() {
    var latLng = Geolocation.latLng();
    latLng = my;
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: MAP_ZOOM,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
      };
    }
  }

});

var my;

 Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.map.onCreated(function() {
    var self = this;

    GoogleMaps.ready('map', function(map) {
      var marker;

      self.autorun(function() {
        var latLng = Geolocation.latLng();
        latLng = my;
        if (! latLng)
          return;

        if (! marker) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.la, latLng.lng),
            draggable: true,
            map: map.instance
          });
        }
        else {
          marker.setPosition(latLng);
        }
        map.instance.setCenter(marker.getPosition());
        map.instance.setZoom(MAP_ZOOM);
      });
    });
});

var MAP_ZOOM; 
var maxSpeed = 53; //vitesse max en noeud
var step =  8 / maxSpeed;



Template.instruments.helpers({
  speed: function(){
    var query = Instruments.findOne({_id: "z8sTk7Yn47MXfmSrv"});
   /* query.observeChanges({
      changed: function(newDoc, oldDoc, score){
        
        console.log('doc updated');
        return query.score;
        //this.speed;
      }
    }) */
    var speed = query.speed;
    var zoom = 20 - step * speed;
    var inter = Math.trunc(zoom);
    console.log(inter);
    MAP_ZOOM = Math.trunc(inter);
    return speed.toFixed(2);
  },
  coor: function(){
    var query = Instruments.findOne({_id: "YcRHQCLbps6ZDC99Z"});
    var lat = query.lat;
    var lng = query.lng;
    my = {lat, lng};
    console.log(my);
  },
  lat: function (){
    var query = Instruments.findOne({_id: "YcRHQCLbps6ZDC99Z"});
    var lat = query.lat;
    return lat.toFixed(6);
  },
  lng: function (){
    var query = Instruments.findOne({_id: "YcRHQCLbps6ZDC99Z"});
    var lng = query.lng;
    return lng.toFixed(6);
  },
  alt: function (){
  var query = Instruments.findOne({_id: "tzpFTAc75wodGbHfv"});
  var alt = query.altitude;
  return alt;
  }
});

Template.instruments.onCreated(
  function helloOnCreated() {
  this.speed = new ReactiveVar(0);
  this.coor = new ReactiveVar(0);
  this.lat = new ReactiveVar(0);
  this.lng = new ReactiveVar(0);
  this.alt = new ReactiveVar(0);
});

var counter = 0;
var deltaLat = -0.0182829;
var deltaLng = 0.0431911;
var deltaNoeud = 5.3;
var deltaAlt = 80;
var dir=1;



Template.demo.events({
  'click button': function(){
     //var myInterval = Meteor.setInterval(function(){
      var lat = 45.362804 + counter*deltaLat;
      var lng = 5.310274  + counter*deltaLng;
      var alt = counter * deltaAlt;
      var speed;
      if (lat > 45.362940) {
        speed = 53;
      } else {
        speed = counter * deltaNoeud;
      }

     Instruments.update({_id:"YcRHQCLbps6ZDC99Z"}, {lat : lat, lng : lng});
     Instruments.update({_id:"z8sTk7Yn47MXfmSrv"}, {speed : speed});
     Instruments.update({_id:"tzpFTAc75wodGbHfv"}, {altitude : alt});
     
     if(dir){
     if (alt >= 800) {
      counter--;
      dir = 0;
     } else {
      counter++;
     }
   }
    //}, 100);
  }
});