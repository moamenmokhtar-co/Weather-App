

let findInput = document.getElementById('findInput');
let rowData = document.getElementById('rowData');

let findBtn = document.getElementById('findBtn');

let dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
let monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let now = new Date();




findInput.addEventListener('input', function () {
    getWeather(findInput.value)
})


let locationData = '';
let currentData = '';


let currentDay = '';
let nextDay = '';
let day;
let month;

let todayIcon = '';
let todayStatus = '';
let humidity = '';
let windDegree = '';
let windDirection = '';
let nextDayIcon = '';
let maxTempNextDay = '';
let minTempNextDay = '';


let afterNextDayIcon = '';
let afterNextDayStatus = '';
let maxTempAfterNextDay = '';
let minTempAfterNextDay = '';




findBtn.style.display = 'none';

findInput.style.textDecoration = 'none';





async function getWeather(location) {
    try {




        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=35aefc9995e440c6a21194034241406&q=${location}&days=3`);
        let data = await response.json();


        findBtn.style.display = 'block';
        findInput.style.textDecoration = 'none';

        findBtn.style.backgroundColor = 'rgb(27, 163, 156)'
        findBtn.style.backgroundColor = 'rgb(27, 163, 156)'
        findBtn.innerText = 'oK'


        locationData = data.location;
        currentData = data.current;

        currentDay = dayNames[now.getDay()];
        nextDay = dayNames[(now.getDay()+1) %7];
        afterNextDay = dayNames[(now.getDay()+2) %7];

        currentDayNumber = now.getDate();

        currentMonth = monthNames[now.getMonth()];



        todayIcon = currentData.condition.icon;
        todayStatus = currentData.condition.text;

        humidity = currentData.humidity;
        windSpeed = currentData.wind_kph;
        windDirection = currentData.wind_dir;




        nextDayIcon = data.forecast.forecastday[1].day.condition.icon;
        nextDayStatus = data.forecast.forecastday[1].day.condition.text;
        maxTempNextDay = data.forecast.forecastday[1].day.maxtemp_c;
        minTempNextDay = data.forecast.forecastday[1].day.mintemp_c;




        afterNextDayIcon = data.forecast.forecastday[2].day.condition.icon;
        afterNextDayStatus = data.forecast.forecastday[2].day.condition.text;
        maxTempAfterNextDay = data.forecast.forecastday[2].day.maxtemp_c;
        minTempAfterNextDay = data.forecast.forecastday[2].day.mintemp_c;




        displayData()


    } catch (error) {
        if (location == '') {
            findBtn.style.display = 'none';
            findInput.value.style.textDecoration = 'none';
        }
        findBtn.style.backgroundColor = 'rgb(241, 130, 141)'
        findBtn.style.borderColor = 'rgb(241, 130, 141)'
        findInput.style.textDecoration = 'underline rgb(241, 130, 141) dotted'
        findBtn.innerText = 'Invalid Keyword'
    }

}




function displayData() {
    let cartoona = `<div class="col-md-4 p-0">
    <div class="card ">
        <div class="card-header d-flex justify-content-between bg-card-header-a rounded-0">
            <p class="m-0">${currentDay}</p>
            <p class="m-0">${currentDayNumber}${currentMonth}</p>
        </div>

        <div class="card-body bg-card-a">
            <p class="name">${locationData.name}</p>
            <p class="today-degree">${currentData.temp_c}&deg;C</p>
            <img src='${todayIcon}' alt='todayIcon'>
            <p class="status">${todayStatus}</p>

            <div class="d-flex justify-content-start gap-2">
                <p><i class="fa-solid fa-droplet me-1"></i>${humidity}</p>
                <p><i class="fa-solid fa-wind me-1"></i>${windSpeed} km/h</p>
                <p><i class="fa-regular fa-compass me-1"></i>${windDirection}</p>
            </div>


        </div>
    </div>
</div>
<div class="col-md-4  p-0">
    <div class="card ">
        <div class="card-header d-center bg-card-header-b rounded-0">
            <p class="m-0 ">${nextDay}</p>

        </div>

        <div class="card-body bg-card-b d-flex align-items-start justify-content-center">

            <div class='text-center p-2'>
                <img src='${nextDayIcon}' alt='nextDayIcon'>
                <p class="degree">${maxTempNextDay}&deg;C</p>
                <p class='min-temp'>${minTempNextDay}&deg;</p>
                <p class="status">${nextDayStatus}</p>
            </div>



        </div>
    </div>
</div>
<div class="col-md-4  p-0">
    <div class="card">
        <div class="card-header d-center bg-card-header-a rounded-0">
            <p class="m-0 ">${afterNextDay}</p>

        </div>

        <div class="card-body bg-card-a d-flex align-items-start justify-content-center">
            <div class='text-center p-2'>
                <img src='${afterNextDayIcon}' alt='nextDayIcon'>
                <p class="degree">${maxTempAfterNextDay}&deg;C</p>
                <p class='min-temp'>${minTempAfterNextDay}&deg;</p>
                <p class="status">${afterNextDayStatus}</p>
            </div>



        </div>
    </div>
</div>`;


    rowData.innerHTML = cartoona;
}

let contactLink = document.getElementById('contactLink');
contactLink.addEventListener('click', function () {
    window.location.href = 'contact.html'
})


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getWeather(`${latitude},${longitude}`)
            console.log(`'${latitude},${longitude}'`);

        });
    }


}



window.onload = function () {
    getLocation();
};


