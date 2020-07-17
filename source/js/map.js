(function () {
    let mapContainer = document.querySelector('#contacts__map-wrapper-js');

    if (mapContainer) {
        let map = document.createElement('div');
        map.classList.add('contacts__map');
        mapContainer.appendChild(map);

        let scriptMap = document.createElement('script');
        scriptMap.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDdxiZ8JD-Awc3VOchAbkcA54-XHZJYkGY&callback=initMap';
        scriptMap.defer = true;
        scriptMap.async = true;

        window.initMap = function() {
            let coordinates = {lat: 59.9387192, lng: 30.3208587};

            let googleMap = new google.maps.Map(map, {
                center: coordinates,
                zoom: 16
            });

            let mapMarker = new google.maps.Marker({
                position: coordinates,
                map: googleMap,
                icon: '/img/map-pin.png',
                title: 'Cat energy'
            });

        };

        document.head.appendChild(scriptMap);
    }
})();
