//Data
var cities = [
    {
        city : 'Cinéma le palace(sousse)',
        desc : 'Avenue Habib Bourguiba sousse',
        lat : 35.830565,
        long : 10.640730
    },
    {
        city : 'Cinéma le Colisée',
        desc : 'Rue de marseille,Tunis',
        lat : 36.800293,
        long : 10.182677

        
        
    },
    {
        city : 'Cinévog',
        desc : '10 Rue Abou Baker,Salambo,Tunis',
        lat : 36.838366,
        long : 10.3192064
    },
    {
        city : 'Ciné Jamil',
        desc : 'Rue docteur Mohamed Salah,Ariana!',
        lat : 36.846657,
        long : 10.167009
    },
    {
        city : 'CinéMadart',
        desc : 'Rue Hbib Bourguiba(Monoprix Dermech)',
        lat : 36.882776,
        long : 10.333266
    },
	{
		city : 'Ciné Café-Cinéma 5D La Marsa',
        desc : 'Rue Emrou El Kais,Marsa 2070',
        lat : 36.882769,
        long : 10.333264
		
	},
	{
		city : 'Le Mondial',
        desc : 'Rue ibn Khaldoun,Tunis',
        lat : 36.798737,
        long : 10.182670
		
	},
	{
		city : 'Cinéma Théâtre le RIO',
        desc : 'Rue Radhia Haddad,92 Rue de Yougoslavie,Tunis 1001',
        lat : 36.798437,
        long : 10.183001
	
	},
	{
		city : 'Cinéma Amilcar Hannibal',
        desc : 'Rue Habib Chatti,Tunis',
        lat : 36.834956,
        long : 10.148845
   
	
	},
	{
		city : 'Cinéma Le Palace (Tunis)',
        desc : '1001,Tunis République,54 Avenue Habib Bourguiba,Tunis',
        lat : 36.799538,
        long : 10.182634
	
	},
	{
		city : 'L\Agora',
        desc : '5 Marsa Ville 2070 La marsa,Avenue Taieb Mhiri',
        lat : 36.881543,
        long : 10.325439
	
	},
	{
		city : 'Cinéma Le Majestic',
        desc : 'Rue de Tunis,Bizerte 7000',
        lat : 37.273322,
        long : 9.876668
	
	}
	
];

//Angular App Module and Controller
angular.module('starter.map', [])
.controller('MapCtrl', function ($scope,$cordovaGeolocation, $ionicLoading, $ionicPlatform) {
	$ionicPlatform.ready(function() {
	$ionicLoading.show({
	template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Attendez S.V.P ... !'
	});
         
        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };
		$scope.markers = [];
		var infoWindow = new google.maps.InfoWindow();
		
		
		    var createMarker = function (info){

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.city
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h3>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    }

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
             
            var myLatlng = new google.maps.LatLng(lat, long);
             
            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };  
					
             
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
			
            for (i = 0; i < cities.length; i++){
        createMarker(cities[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
            $scope.map = map; 
			


		$ionicLoading.hide();           
             
        }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });
		
		
		

		
    }); 
});
