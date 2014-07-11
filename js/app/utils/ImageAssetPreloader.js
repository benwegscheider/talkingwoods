var ImageAssetPreloader = (function () {
    function ImageAssetPreloader() {
        this.preloadedImages = [];
        this.preloaderQueue = [];
        this.preloaderData = [];

	    _.bindAll(this, 'addImageURL', 'start', 'loadNext', 'onLoaded');
    }
    ImageAssetPreloader.prototype.addImageURL = function (url, data) {
//        console.log('queue for preloading', url);
        this.preloaderQueue.push(url);
        this.preloaderData.push(data);
    };
    ImageAssetPreloader.prototype.start = function () {
        this.loadNext();
    };
    ImageAssetPreloader.prototype.loadNext = function () {
        if(this.preloaderQueue.length > 0) {
            var url = this.preloaderQueue[0];
            var image = new Image();
            $(image).load(this.onLoaded);
            this.current = image;
            image.src = url;
        } else {
            $(this).trigger('complete');
        }
    };
    ImageAssetPreloader.prototype.onLoaded = function (e) {
        var data = this.preloaderData[0];

        this.preloadedImages.push(this.current);
        this.preloaderQueue.shift();
        this.preloaderData.shift();
        var total = this.preloadedImages.length + this.preloaderQueue.length;
        var percentage = this.preloadedImages.length / total;
        $(this).trigger('progress', [
            percentage
        ]);
        $(this).trigger('imageloaded', [this.current, data]);
        this.loadNext();
    };
    return ImageAssetPreloader;
})();
