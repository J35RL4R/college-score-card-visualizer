$(document).ready(function () {
    var saveButton = $("#save-button");

    saveButton.on("click", function (event) {
        event.preventDefault();
        url = {
            school: window.location.href
        }
        saveSearch(url);
    });

    function saveSearch(url) {
        $.post("/api/save", url, function () {
            location.reload();
        });
    }
});