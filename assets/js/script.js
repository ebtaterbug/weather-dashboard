function displayWeather(data) {
    $(".city").text(data.name);
    $("#date").text("(" + moment().format('L') + ")");
    $("#temp").text(Math.round((((data.main.temp-273.15)*1.8)+32)) + " °F");
    $("#wind").text(data.wind.speed + " MPH");
    $("#humidity").text(data.main.humidity + " %");
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
            getForecast(data.coord.lat, data.coord.lon);
            return data
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
            getForecast(data.coord.lat, data.coord.lon);
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

function getForecast(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude={part}&appid=b451e261be7a552705f2a22389c1a371";
    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayForecast(data);
        })
};

function displayForecast(data) {
    $("#uv-index").text(data.current.uvi);
    
    for (var i = 1; i < 6; i++) {
    $('#temp'+[i]).text(Math.round(((((data.daily[i].temp.max)-273.15)*1.8)+32)) + " °F");
    $('#wind'+[i]).text(data.daily[i].wind_speed);
    $('#humidity'+[i]).text(data.daily[i].humidity);
    $('.date'+[i]).text(moment().add([i], 'days').format('L'));
    $('#icon'+[i]).attr("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");
    }

    if (data.current.uvi <= 2) {
        $("#uv-index").addClass("green");
        $("#uv-index").removeClass("yellow");
        $("#uv-index").removeClass("red");
    } 
    
    else if (data.current.uvi <= 7) {
        $("#uv-index").addClass("yellow");
        $("#uv-index").removeClass("red");
        $("#uv-index").removeClass("green");
    }
    
    else if (data.current.uvi > 7) {
        $("#uv-index").addClass("red");
        $("#uv-index").removeClass("yellow");
        $("#uv-index").removeClass("green");
    }
};