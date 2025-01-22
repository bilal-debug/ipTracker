let searchbar1 = document.getElementById("text");

var map = L.map("map");
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
var marker = L.marker([51.5, -0.09]).addTo(map);

function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);
}

map.on("click", onMapClick);

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);

fetch(
  "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_FILuXNHijJMOxXUcDdlLIANoCEtQO&ipAddress"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    map.setView([data.location.lat, data.location.lng], 13);
    marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
    document.getElementById("ip").innerText = data.ip;
    document.getElementById("location").innerText =
      data.location.city +
      "," +
      data.location.country +
      data.location.postalCode;
    document.getElementById("timezone").innerText = data.location.timezone;
    document.getElementById("isp").innerText = data.isp;
  });
function search() {
  let searchbar = document.getElementById("text").value;
  console.log(document.getElementById("text").value);
  const ipv4Pattern =
    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
  result = ipv4Pattern.test(searchbar);

  const domainPattern =
    /^(https?:\/\/)?(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

  dresult = domainPattern.test(searchbar);

  if (result || dresult) {
    document.getElementById("errormsg").innerText = "";
    searchbar1.addEventListener("keyup", function onEvent(e) {
      if (e.keyCode === 13) {
        console.log();
        if (result === true) {
          fetch(
            "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_FILuXNHijJMOxXUcDdlLIANoCEtQO&ipAddress=" +
              searchbar
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data);
              map.setView([data.location.lat, data.location.lng], 13);
              marker = L.marker([data.location.lat, data.location.lng]).addTo(
                map
              );
              marker.bindPopup(data.location.city).openPopup();
              document.getElementById("ip").innerText = data.ip;
              document.getElementById("location").innerText =
                data.location.city +
                data.location.country +
                data.location.postalCode;
              document.getElementById("timezone").innerText =
                data.location.timezone;
              document.getElementById("isp").innerText = data.isp;
            });
        } else {
          fetch(
            "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_FILuXNHijJMOxXUcDdlLIANoCEtQO&domain=" +
              searchbar
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data);
              map.setView([data.location.lat, data.location.lng], 13);
              marker = L.marker([data.location.lat, data.location.lng]).addTo(
                map
              );
              marker.bindPopup(data.location.city).openPopup();
              document.getElementById("ip").innerText = data.ip;
              document.getElementById("location").innerText =
                data.location.city +
                data.location.country +
                data.location.postalCode;
              document.getElementById("timezone").innerText =
                data.location.timezone;
              document.getElementById("isp").innerText = data.isp;
            });
        }
      }
    });
  } else {
    document.getElementById("errormsg").innerText = "please write it proper";
  }
}
