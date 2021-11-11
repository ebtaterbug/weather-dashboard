function displayWeather(data) {
    $(".city").text(data.name);
    $("#date").text("(" + moment().format('L') + ")");
    $("#temp").text(Math.round((((data.main.temp-273.15)*1.8)+32)) + " °F");
    $("#wind").text(data.wind.speed + " MPH");
    $("#humidity").text(data.main.humidity + " %");
    $("#uv-index").text(data.wind.speed + " MPH");
};

function getWeather() {
    var city = $('input').val();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b451e261be7a552705f2a22389c1a371";
    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayWeather(data);
    });
};

function getWeatherList(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b451e261be7a552705f2a22389c1a371";
    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayWeather(data);
    });
};

$("#btn").on("click", function() {
    getWeather();
    var searchList = [];
    $(".searches").append($("<li class='search' ></li>").text($('input').val()));
    
    $(".searches").each(function () {
        searchList.push(this.innerHTML);
    })

    localStorage.setItem('searchList', JSON.stringify(searchList));
    return id
});


$(".searches").on("click", "li", function() {
    var city = $(this).text();
    getWeatherList(city);
});


loadData();

function loadData() {
    if (localStorage.getItem("searchList")) {
        var searchList = JSON.parse(localStorage.getItem("searchList"));
        $(".searches").each(function(i) {
            this.innerHTML = searchList[i];
        })
    }
};