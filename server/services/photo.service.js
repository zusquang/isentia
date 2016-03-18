var request = require('request')

PhotoService = function() {};

PhotoService.prototype.getPhotos = function(callback) {
	request('https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1', callback);
}

PhotoService.prototype.getPhotosByTags = function(tags, callback) {
	request('https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=' + tags + '&nojsoncallback=1', callback);
}

module.exports = new PhotoService();