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
        return 'http://www.youtube.com/watch?v={VIDEO_ID}\n'.replace('{VIDEO_ID}', id);
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
 *
 * @param {Video} video
 * @constructor
 */
function VideoCmp(video) {

    /**
     * @type {Video}
     */
    this.video = video;

    var videoCellEl = document.createElement('div');

    videoCellEl.classList.add('video-cell');
    videoCellEl.id = this.video.id;

    var previewEl = document.createElement('figure');
    var imgEl = document.createElement('img');

    imgEl.src = this.video.preview_url;
    imgEl.alt = this.video.title;

    var captionEl = document.createElement('figcaption');

    captionEl.textContent = this.video.title;

    previewEl.append(imgEl, captionEl);
    videoCellEl.append(previewEl);

    document.getElementById('video-grid').append(videoCellEl);
}

var VIDEO_SERVICE;

var videoIDsInput = document.getElementById('video-ids-input');
var videoIDsForm = document.getElementById('video-ids-form');

videoIDsForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var isValid = videoIDsInput.checkValidity();

    if (isValid) {
        var idsString = videoIDsInput.value;

        VIDEO_SERVICE = new VideoService(idsString);

        VIDEO_SERVICE.videos.forEach(function (video) {
            new VideoCmp(video);
        });
    }
});

