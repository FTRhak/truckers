/*global ng:true, google:true */

(function (app) {
    'use strict';
    //https://developers.google.com/maps/documentation/javascript/markers?hl=ru#introduction

    var map;
    app.initMap = function () {
        /*map = new google.maps.Map(document.getElementById('mapView'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });*/
    };

    class BaseMarker {
        constructor(map, icon, title, draggable) {
            this.icon = icon;

            this._map = map;
            this._location = { lat: 0, lng: 0 };

            this._marker = new google.maps.Marker({
                position: this._location,
                map: map,
                draggable: draggable,
                title: title,
                icon: this.icon
            });


            this.showMarker();
        }

        addListener(event, callback) {
            let marker = this._marker;
            this._marker.addListener('click', function () {
                callback(this._map, marker, arguments);
            });
        }

        setLocation(lat, lng) {
            this._location.lat = lat;
            this._location.lng = lng;
            this._marker.setPosition(this._location);
        }

        showMarker() {
            this._marker.setMap(this._map);
        }
        hideMarker() {
            this._marker.setMap(null);
        }
    }

    class OwnCarMarker extends BaseMarker {
        constructor(map) {
            super(map, 'icons/markers/own_truck.png', 'Your own car', false);
        }

        showCircle(radius) {
            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.5,
                strokeWeight: 1,
                fillColor: '#FF0000',
                fillOpacity: 0.2,
                map: this._map,
                center: this._location,
                radius: radius
            });

        }
    }

    class TruckerMarker extends BaseMarker {
        constructor(map) {
            super(map, 'icons/markers/other_truck.png');
        }
    }

    class GasMarker extends BaseMarker {
        constructor(map) {
            super(map, 'icons/markers/gas_station.png');
        }
    }


    app.MapNavigatorComponent = ng.core.Component({
        selector: '[map-controller]',
        templateUrl: 'templates/wall/map.html'
    }).Class({
        constructor: [app.Server, function (server) {
            let id = 'abiding-pod-130508';
            //this.targetPagel = document.getElementById("mapContent");
            


        }],
        
        ngOnInit () {
            this._initComponent();
        },
        ngAfterViewChecked() {
            //console.log("ngAfterViewChecked");
        },
        
        
        _initComponent() {
            let currentLocation = { lat: -34.43183746326928, lng: 150.45929235839844 };
            map = new google.maps.Map(document.getElementById('mapView'), {
                center: currentLocation,
                zoom: 10
            });
            var infowindow = new google.maps.InfoWindow({
                content: '<div id="content">Hello</div>'
            });

            this.owncar = new OwnCarMarker(map);

            var ok = this.owncar._marker;

            this.owncar.setLocation(currentLocation.lat, currentLocation.lng);
            this.owncar.addListener('click', function (map1, marker1, data) {

                infowindow.open(map, ok);

                console.log(infowindow);
            });

            this.owncar.showCircle(10000);


            this.trakersList = [];


            var trakers = [
                {
                    latitude: -34.41541184964377,
                    longitude: 150.49705786132813
                }, {
                    latitude: -34.44825984942498,
                    longitude: 150.37861151123047
                }, {
                    latitude: -34.462697556199494,
                    longitude: 150.4235867919922
                }];
            for (let i = 0; i < trakers.length; i++) {
                const traker = trakers[i];
                let el = new TruckerMarker(map);
                el.setLocation(traker.latitude, traker.longitude);
                this.trakersList.push(el);

            }

        },
        
        actionFollewMe() {
            
        },

        actionTrafic() {
            var trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);

        },

        actionTransit() {
            var transitLayer = new google.maps.TransitLayer();
            transitLayer.setMap(map);

        },

        actionFullScreen(ev) {
            let targetPagel = document.getElementById("mapContent");
            const status = document.fullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement;
            
            if (status) {
                document.cancelFullScreen = document.cancelFullScreen || document.mozCancelFullScreen || document.webkitCancelFullScreen;
                document.cancelFullScreen();
            } else {
                targetPagel.requestFullscreen = targetPagel.requestFullscreen || targetPagel.mozRequestFullScreen || targetPagel.webkitRequestFullscreen;
                targetPagel.requestFullscreen();
            }
        }
    });

})(window.app || (window.app = {}));
