let searchbar1 = document.getElementById("text");
let searchbar2 = document.getElementById("text-d");
let userdata = {};
let userdata2 = {};
// console.log("ooooooooooooooooooo", userdata2);

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
  "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_UOZwiZVIv6kj0RHsaBBC8HXGggRa5&ipAddress"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    userdata = {
      ip: data.ip,
      location: data.location.country,

      timezone: data.location.timezone,
      isp: data.isp,
    };

    map.setView([data.location.lat, data.location.lng], 13);
    marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
    document.getElementById("ip").innerText = userdata.ip;
    document.getElementById("location").innerText = userdata.location;
    document.getElementById("timezone").innerText = userdata.timezone;
    document.getElementById("isp").innerText = userdata.isp;
  });

const csvmaker = (data) => {
  const headers = Object.keys(data);
  const values = Object.values(data);
  return [headers.join(","), values.join(",")].join("\n");
};

const download = (data) => {
  const blob = new Blob([data], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  // console.log("what", a.href);

  a.download = "Your Data.csv";
  a.click();
};

const get = function () {
  console.log("llll", { ...userdata, ...userdata2 });

  // JavaScript bject
  const csvdata = csvmaker({ ...userdata, ...userdata2 });
  // console.log(csvdata);

  // Download the CSV file
  download(csvdata);
};

// Getting element by id and adding eventlistener
// to listen everytime button get pressed
const btn = document.getElementById("action");
btn.addEventListener("click", get);

function search() {
  let searchbar = document.getElementById("text").value;
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
        // console.log();
        if (result === true) {
          fetch(
            "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_UOZwiZVIv6kj0RHsaBBC8HXGggRa5&ipAddress=" +
              searchbar
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              userdata = {
                ip: data.ip,
                location: data.location.country,

                timezone: data.location.timezone,
                isp: data.isp,
              };
              // console.log(data);
              map.flyTo([data.location.lat, data.location.lng], 13);
              marker = L.marker([data.location.lat, data.location.lng]).addTo(
                map
              );
              marker.bindPopup(data.location.city).openPopup();
              document.getElementById("ip").innerText = userdata.ip;
              document.getElementById("location").innerText = userdata.location;
              document.getElementById("timezone").innerText = userdata.timezone;

              document.getElementById("isp").innerText = userdata.isp;
            });
        } else {
          fetch(
            "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_UOZwiZVIv6kj0RHsaBBC8HXGggRa5&domain=" +
              searchbar
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              // console.log(data);
              userdata = {
                ip: data.ip,
                location: data.location.country,

                timezone: data.location.timezone,
                isp: data.isp,
              };
              map.flyTo([data.location.lat, data.location.lng], 13);
              marker = L.marker([data.location.lat, data.location.lng]).addTo(
                map
              );
              marker.bindPopup(data.location.city).openPopup();
              document.getElementById("ip").innerText = userdata.ip;
              document.getElementById("location").innerText = userdata.location;
              document.getElementById("timezone").innerText = userdata.timezone;
              document.getElementById("isp").innerText = userdata.isp;
            });
        }
      }
    });
  } else {
    document.getElementById("errormsg").innerText = "please write it proper";
  }
}

function searchd() {
  let searchbar = document.getElementById("text-d").value;
  const domainPattern =
    /^(https?:\/\/)?(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

  dresult = domainPattern.test(searchbar);

  if (dresult) {
    document.getElementById("errormsg-d").innerText = "";
    searchbar2.addEventListener("keyup", function onEvent(e) {
      if (e.keyCode === 13) {
        // console.log(searchbar);
        fetch(
          "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_UOZwiZVIv6kj0RHsaBBC8HXGggRa5&domain=" +
            searchbar
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // console.log(data);
            userdata = {
              ip: data.ip,
              location: data.location.country,

              timezone: data.location.timezone,
              isp: data.isp,
            };
            map.flyTo([data.location.lat, data.location.lng], 13);
            marker = L.marker([data.location.lat, data.location.lng]).addTo(
              map
            );
            marker.bindPopup(data.location.city).openPopup();
            document.getElementById("ip").innerText = userdata.ip;
            document.getElementById("location").innerText = userdata.location;
            document.getElementById("timezone").innerText = userdata.timezone;
            document.getElementById("isp").innerText = userdata.isp;
          });
        fetch(
          "https://whatcms.org/API/Tech?key=wxodkkm5tivu58deo3mq267bctge3bvron1o2ae42x4nhhg2mjfv2lrn5t1s0mn7eyk0zo&url=" +
            searchbar
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // console.log("all data", data);

            // console.log("please", data.meta.social);
            result = data.results;

            for (let index = 0; index < result.length; index++) {
              const element = result[index];
              // console.log("heeyy", element.name);
              let ele = document.createElement("h3");
              ele.id = `cms1`;
              ele.innerText = element.categories[0];
              document.getElementById("stack_info").append(ele);

              let value = document.createElement("h3");
              value.id = `cms`;
              value.innerText = element.name;
              document.getElementById("cmso").append(value);
              userdata2[element.categories[0]] = element.name;
              console.log("ppppppppppppppppp", userdata2);
            }

            meta = data.meta.social;

            for (let index = 0; index < meta.length; index++) {
              const element_meta = meta[index];

              let net = document.createElement("h3");
              net.id = "network";
              net.innerText = element_meta.network;
              document.getElementById("stack_info").append(net);

              let net_value = document.createElement("h3");
              net_value.id = "network_value";
              net_value.innerText = element_meta.url;
              document.getElementById("cmso").append(net_value);
              userdata2[element_meta.network] = element_meta.url;
              console.log("kkkkkkkkkkk", userdata2);
            }
          });
      }
    });
  } else {
    document.getElementById("errormsg-d").innerText =
      "please write correct domain";
  }
}
