// http://api.weatherapi.com/v1/current.json?key=dcfc15afe5454453a96123401250304&q=delhi&aqi=no

const input = document.querySelector('#input');
const submit = document.querySelector('#submit');
const city = document.querySelector('.city');
const condition = document.querySelector('.condition');
const temp = document.querySelector('.temp');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon');
const dates = document.querySelector('.dates');

submit.addEventListener('click', search); // added submit to the event listener
let target = 'delhi';

const fetchData = async (targetlocation) => {
  let url = `http://api.weatherapi.com/v1/current.json?key=dcfc15afe5454453a96123401250304&q=${targetlocation}&aqi=no`
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  let locationNameInfo = data.location.name;
  let timeStamp = data.current.last_updated;
  let tempVal = data.current.temp_c;
  let conditions = data.current.condition.text; 
  let dates = data.location.localtime;


  update(tempVal, conditions, timeStamp, locationNameInfo); // added locationName to the update function call

}

function update(tempVal, conditions, timeStamp, locationNameInfo) {

  let day = timeStamp.split(' ')[0];
  let month = timeStamp.split(' ')[1];
  let currentday = getnumber(new Date(day).getDate());
  city.innerHTML = `<p>${locationNameInfo}</p>`; // corrected to use locationName instead of data.location.name
  condition.innerHTML = `<p>${conditions}</p>`; // corrected to use condition instead of condition.text
  temp.innerHTML = `<p>${tempVal}</p>`;
  dates.innerHTML = `<p>${day} ${currentday} ${month}</p>`;
  if (conditions == 'Sunny') {
    icon.innerHTML = `<img src="https://www.clipartmax.com/png/middle/24-248320_sunny-weather-symbol-transparent.png" alt="icon">`;
  } else if(conditions == "Partly cloudy" || conditions == 'Cloudy' || conditions == 'Overcast'|| conditions == 'Mist'){
    icon.innerHTML = `<img src="https://static.vecteezy.com/system/resources/previews/023/258/075/non_2x/weather-icon-cloudy-sky-icon-free-png.png" alt="icon">`;
  }else if(conditions == 'Rainy' || conditions == 'Patchy rain nearby'){
    icon.innerHTML = `<img src="https://th.bing.com/th/id/OIP.OeR01rX5IalsizMIf4V46AHaGD?rs=1&pid=ImgDetMain" alt="icon">`;
  }else if(conditions == 'Snowy' || conditions == 'Blowing snow' || conditions == "Patchy light snow"){
    icon.innerHTML = `<img src="https://th.bing.com/th/id/R.715f81f0596f419ec433d39ed2dd5b2b?rik=JQR8dBhMH6hGdg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-snowy-file-snow-svg-1024.png&ehk=P8V1bmhBbJqMKNpTyrisq2HfzPqTOpXdR34e07vfZto%3d&risl=&pid=ImgRaw&r=0" alt="icon">`;
  }else{
    icon.innerHTML = `no image found`;
  }
  
}

function search(e) {
  e.preventDefault();
  target = input.value;
  fetchData(target);
}

fetchData(target);
function getnumber(Number){
  switch (Number) {
    case 0:
      return "monday"
    case 1:
      return "tuesday"
    case 2:
      return "wednesday"
    case 3:
      return "thursday"
    case 4:
      return "friday"
    case 5:
      return "saturday"
    case 6:
      return "sunday"

    default:
      break;
  }
}