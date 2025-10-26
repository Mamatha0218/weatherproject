// Fixed Weather App Script

const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateAndTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener("submit", searchForLocation);

let target = "Lucknow";

const fetchResults = async (targetLocation) => {
  try {
    // ✅ Fixed: used backticks (`) for template literal
    // ✅ Removed extra "t" after ${targetLocation}
    // ✅ Changed "http" to "https" to avoid CORS / mixed-content issues
    const url = `https://api.weatherapi.com/v1/current.json?key=d772bb9ee0d540bab62151709252010&q=${targetLocation}&aqi=no`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;

    updateDetails(temp, locationName, time, condition);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function updateDetails(temp, locationName, time, condition) {
  const [splitDate, splitTime] = time.split(" ");
  
  // ✅ Fixed typo: "spiltDate" → "splitDate"
  // ✅ Fixed: used template literal for string interpolation
  const currentDay = getDayName(new Date(splitDate).getDay());

  temperatureField.innerText = `${temp}°C`;
  locationField.innerText = locationName;
  dateAndTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
  conditionField.innerText = condition;
}

function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value.trim();
  if (target) fetchResults(target);
}

fetchResults(target);

function getDayName(number) {
  switch (number) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "";
  }
}
