/*
RegExp для списка ID
(([a-zA-Z0-9-_]{11})(,|\s|$))+
 */

/**
 * @typedef {object} Video
 * @property {string} id
 * @property {string} preview_url
 * @property {string} video_url
 * @property {string} title
 */

/**
 * @param {string} ids_string
 * @constructor
 */
function VideoService(ids_string) {
    var klass = this;

    /**
     * @type {Video[]}
     */
    this.videos = [];

    /**
     * @param {string} id
     * @return {string}
     */
    this.previewUrlGenerate = function (id) {
        return 'http://i.ytimg.com/vi/{VIDEO_ID}/hqdefault.jpg'.replace('{VIDEO_ID}', id);
    };

    /**
     * @param {string} id
     * @return {string}
     */
    this.videoUrlGenerate = function (id) {
        return '//www.youtube.com/embed/{VIDEO_ID}?autoplay=1'.replace('{VIDEO_ID}', id);
    };

    /**
     * @param {string} ids_string
     * @return {string[]}
     * @constructor
     */
    this.IDsStringToArray = function (ids_string) {
        return ids_string.replace(' ', ',').split(',');
    };

    /**
     * @async
     * @param {string} id
     * @param {string} video_url
     */
    this.loadAndSetVideoTitle = function(id, video_url) {
        var url = 'http://noembed.com/embed?url={URLENCODED_VIDEO_URL}'.replace('{URLENCODED_VIDEO_URL}', video_url);

        var req = new XMLHttpRequest();

        req.open('GET', url, true);

        req.addEventListener("load", function () {
            var video_title = JSON.parse(this.responseText)['title'];

            var foundVideo = klass.videos.find(function (video) {
               return video.id === id;
            });

            foundVideo.title = video_title;
        });

        req.addEventListener('error', function(err) {
            window.alert(err);
        });

        req.send();
    };

    var ids = this.IDsStringToArray(ids_string);

    this.videos = ids.map(function (id) {
        var video_url = klass.videoUrlGenerate(id);
        klass.loadAndSetVideoTitle(id, video_url);

        return {
            id: id,
            preview_url: klass.previewUrlGenerate(id),
            video_url: video_url,
            title: undefined
        }
    });
}

/**
 * @param {Video} video
 * @constructor
 */
function VideoCmp(video) {
    var klass = this;

    /**
     * @type {Video}
     */
    this.video = video;

    /**
     * @type {boolean}
     */
    this.activePlayer = false;

    this.play = function () {
        klass.previewEl.classList.add('hide');
        klass.playerEl.classList.remove('hide');
    };

    this.stop = function () {
        klass.previewEl.classList.remove('hide');
        klass.playerEl.classList.add('hide');
    };

    this.videoCellEl = (function () {
        var cmp = document.createElement('div');

        cmp.classList.add('video-cell');
        cmp.id = klass.video.id;

        return cmp;
    })();

    this.previewEl = document.createElement('figure');

    this.imgEl = (function () {
        var cmp = document.createElement('img');

        cmp.src = klass.video.preview_url;
        cmp.alt = klass.video.title;

        return cmp;
    })();


    this.captionEl = (function () {
        var cmp = document.createElement('figcaption');

        cmp.textContent = klass.video.title;

        return cmp;
    })();

    this.playerEl = (function () {
        var cmp = document.createElement('iframe');

        cmp.width = '480';
        cmp.height = '270';
        cmp.src = klass.video.video_url;
        cmp.frameborder = '0';
        cmp.allowfullscreen = true;
        cmp.classList.add('hide', 'player');

        return cmp;
    })();

    this.previewEl.append(this.imgEl, this.captionEl);
    this.videoCellEl.append(this.previewEl, this.playerEl);

    this.videoCellEl.addEventListener('click', function (e) {
        e.startedVideo = klass.video.id;
        klass.activePlayer = !klass.activePlayer;

        if (klass.activePlayer) {
            klass.play();
        } else {
            klass.stop();
        }
    });

    document.getElementById('video-grid').append(this.videoCellEl);
}

function App() {
    var klass = this;

    /**
     * @type {VideoService}
     */
    this.VIDEO_SERVICE = undefined;

    /**
     * @type {VideoCmp[]}
     */
    this.VIDEO_COMPONENTS = [];

    this.startup = function () {
        var videoIDsInput = document.getElementById('video-ids-input');
        var videoIDsForm = document.getElementById('video-ids-form');
        var videoGrid = document.getElementById('video-grid');

        videoIDsForm.addEventListener('submit', function (event) {
            event.preventDefault();

            var isValid = videoIDsInput.checkValidity();

            if (isValid) {
                var idsString = videoIDsInput.value;

                klass.VIDEO_SERVICE = new VideoService(idsString);

                klass.VIDEO_SERVICE.videos.forEach(function (video) {
                    klass.VIDEO_COMPONENTS.push(new VideoCmp(video));
                });
            }
        });

        videoGrid.addEventListener('click', function (e) {
            var startedVideo = e.startedVideo;

            var activePlayers = klass.VIDEO_COMPONENTS.filter(function (video) {
                return video.activePlayer === true;
            });

            if (activePlayers.length > 1) {
                activePlayers.forEach(function (player) {
                    if (player.video.id !== startedVideo) {
                        player.stop();
                    }
                });
            }
        });
    };

    return this;
}

var APP = new App();

APP.startup();
