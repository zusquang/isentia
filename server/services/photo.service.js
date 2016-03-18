var request = require('request')

PhotoService = function() {};

PhotoService.prototype.getPhotos = function(page, callback) {
	request('https://api.flickr.com/services/feeds/photos_public.gne?format=json&page=' + page + '&nojsoncallback=1', callback);
}

PhotoService.prototype.getPhotosByTags = function(page, tags, callback) {
	request('https://api.flickr.com/services/feeds/photos_public.gne?format=json&page=' + page + '&tags=' + tags + '&nojsoncallback=1', callback);
}

module.exports = new PhotoService();