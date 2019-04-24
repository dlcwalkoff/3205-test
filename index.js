/*
RegExp для списка ID
(([a-zA-Z0-9-_]{11})(,|\s|$))+
 */




const videoIDsInput = document.getElementById('video-ids-input');
const videoIDsForm = document.getElementById('video-ids-form');

videoIDsForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const isValid = videoIDsInput.checkValidity();

    if (isValid) {
        videoIDsInput.value = null;
    }
});

document.addEventListener('DOMContentLoaded', function (event) {
    console.log('document');
});
