window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector("temperature");
  const temperatureSpan = document.querySelector("temperatue span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const gateway = "https://cors-anywhere.herokuapp.com/";
      const api_url = `${gateway}https://url(darksky.net)/${lat},${long}`;

      fetch(api_url)
        .then((reponse) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          // modify DOM elements using the api
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // degree C formula
          let degreeC = (temperature - 32) * (5 / 9);
          // set icon
          setIcons(icon, document.querySelector(".icon"));

          // convert degree C to F and vice versa onclick
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureSpan.textContent = Math.floor(degreeC);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUppercase();
    skycons.play();
    return skycons.set(iconID, skycons[currentIcon]);
  }
});
