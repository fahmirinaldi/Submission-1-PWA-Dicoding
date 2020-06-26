const CACHE_NAME = 'miiPWA1';
var urlsToCache = [
	"/",
	"/navigasi.html",
	"/index.html",
	"/manifest.json",
	"/pages/home.html",
	"/pages/sale.html",
	"/pages/catalogue.html",
	"/pages/about_us.html",
	"/asset/logo.png",
	"/asset/logo192.png",
	"/asset/1.jpg",
	"/asset/2.jpg",
	"/asset/3.jpg",
	"/asset/banner.jpg",
	"/asset/bck.jpg",
	"/asset/circlelogo.png",
	"https://fonts.googleapis.com/icon?family=Material+Icons",
	"https://fonts.googleapis.com/css?family=Pacifico&display=swap",
	"https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
	"/css/materialize.min.css",
	"/css/style.css",
	"/js/materialize.min.js",
	"/js/service.js",
	"/js/index.js"
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
			
			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

