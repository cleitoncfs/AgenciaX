// Mapa
var map = L.map("map").setView([38.7003, -9.4184], 13);

// Adiciona a camada do mapa primeiro
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Função para calcular e exibir a rota
function calculateRoute() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var origin = [38.7003, -9.4184];
      var destination = [position.coords.latitude, position.coords.longitude];

      // Adiciona marcadores nos pontos de origem e destino
      L.marker(origin).addTo(map);
      L.marker(destination).addTo(map);

      var latlngs = [origin, destination];

      var polyline = L.polyline(latlngs, { color: "red", opacity: 0.5 }).addTo(
        map
      );

      map.fitBounds(polyline.getBounds());
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

// Associar a função ao botão Como chegar
document
  .getElementById("btn-como-chegar")
  .addEventListener("click", function () {
    calculateRoute();
  });
