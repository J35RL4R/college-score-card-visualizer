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



function GetMap() {
    console.log(lat);
    console.log(lon);
    console.log(name);
    var map = new Microsoft.Maps.Map('#myMap', {
        navigationBarMode: Microsoft.Maps.NavigationBarMode.compact,
        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        center: new Microsoft.Maps.Location(lat, lon),
        zoom: 15
    });
    var center = map.getCenter();
    var pin = new Microsoft.Maps.Pushpin(center, {
        title: name,
    });

    //Add the pushpin to the map
    map.entities.push(pin);
}