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



function GetMap()
{
    console.log(lat);
    var map = new Microsoft.Maps.Map('#myMap', {
            navigationBarMode: Microsoft.Maps.NavigationBarMode.compact,
            center: new Microsoft.Maps.Location(lat, lon),
        });
}