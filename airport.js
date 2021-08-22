const data = {
    "airport_data": [
        {
            "Code": "CGK",
            "Name": "Soekarno Hatta International Airport",
            "City": "Jakarta"
        },
        {
            "Code": "YIA",
            "Name": "Yogyakarta International Airport",
            "City": "Yogyakarta"
        },
        {
            "Code": "DPS",
            "Name": "Ngurah Rai International Airport",
            "City": "Denpasar"
        },
        {
            "Code": "SIN",
            "Name": "Changi International Airport",
            "City": "Singapore"
        }
    ],
    "airlines_data": [
        {
            "Code": "GA",
            "Name": "Garuda Indonesia"
        },
        {
            "Code": "SQ",
            "Name": "Singapore Airlines"
        },
        {
            "Code": "QZ",
            "Name": "Air Asia Indonesia"
        }
    ],
    "airplane_data": [
        {
            "airlines": "GA",
            "departure_airport": "CGK",
            "departure_time": "2021-08-17T08:20",
            "arival_airport": "SIN",
            "arival_time": "2021-08-17T10:50"
        },
        {
            "airlines": "SQ",
            "departure_airport": "CGK",
            "departure_time": "2021-08-17T17:00",
            "arival_airport": "SIN",
            "arival_time": "2021-08-17T19:30"
        },
        {
            "airlines": "QZ",
            "departure_airport": "CGK",
            "departure_time": "2021-08-17T10:05",
            "arival_airport": "DPS",
            "arival_time": "2021-08-17T12:20"
        },
        {
            "airlines": "GA",
            "departure_airport": "CGK",
            "departure_time": "2021-08-17T13:10",
            "arival_airport": "YIA",
            "arival_time": "2021-08-17T14:20"
        }
    ]
}

const mappingData = (datas) => {
    const airlines_data = data.airlines_data
    const airport_data = data.airport_data
    for (let i = 0; i < datas.length; i++) {
        const el = datas[i];
        el.airlines_name = airlines_data.filter(x => x.Code === el.airlines)[0].Name
        if (el.airlines_name === 'Garuda Indonesia') {
            el.img = 'garuda_airlane.png'
        }
        else if(el.airlines_name === 'Singapore Airlines'){
            el.img = 'singapore_airlines.png'
        } else {
            el.img = 'air_asia_logo.png'
        }
        el.departure_airport = airport_data.filter(x => x.Code === el.departure_airport)[0].City 
        el.destination_airport = airport_data.filter(x => x.Code === el.arival_airport)[0].City 
        el.departure_date = formatDate(el.departure_time);
        el.departure_time = formatTime(el.departure_time)
        el.arival_date = formatDate(el.arival_time);
        el.arival_time = formatTime(el.arival_time);
    }
    return datas
}

const renderCard = (airplane) => {
    let results = '';
    const airplane_data = airplane ? airplane : mappingData(data.airplane_data)
    // console.log(airplane_data[0].departure_time.split(':'));

    if (airplane_data.length > 0) {
        for (var i = 0; i < airplane_data.length; i++) {
            let el = airplane_data[i]
            results += `
                <div class="col-sm-12 my-2">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-lg-6 text-center my-2">
                                    <img src="assets/${el.img}" alt="lutfhansa_airlane" height="60">
                                </div>
                                <div class="col-xs-12 col-sm-12 col-lg-6 my-2">
                                    <div class="row plane">
                                        <div class="col-6 airport">
                                            <p class="text-secondary">${el.departure_airport}</p>
                                            <div class="h2">${el.departure_time}</div>
                                            <p class="text-secondary">${el.departure_date}</p>
                                        </div>
                                        <div class="col-6 airport">
                                            <p class="text-secondary">${el.destination_airport}</p>
                                            <div class="h2">${el.arival_time}</div>
                                            <p class="text-secondary">${el.arival_date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
        }
    } else {
        results += `
            <div class="col-sm-12 my-2">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 text-center">
                                <div class="h4">Tidak ada data!</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    renderTime()
    document.querySelector("#airplane").innerHTML = results;
}

const renderTime = () => {
    let results = '<option value="" disabled selected>Choose Time...</option>'
    for (let i = 1; i <= 24; i++) {
        results += `
            <option value=${i}>${i}</option>
        `
    }
    document.querySelector("#filterTime").innerHTML = results;
}

// Filter sort arr render Card
filterName.addEventListener("click", function(e) {
    let datas;
    let sort_by = e.target.dataset.sort
    if (sort_by === 'asc') {
        datas = data.airplane_data.sort((a, b) => a.airlines_name.localeCompare(b.airlines_name));
    } else {
        datas = data.airplane_data.sort((a, b) => b.airlines_name.localeCompare(a.airlines_name));
    }
    document.querySelector('#filterName').dataset.sort = sort_by === 'asc' ? 'desc' : 'asc'

    return renderCard(datas)
});

// Filter arr render Card
const handleSelect = () => {
    var datas;
    var times = document.querySelector('#filterTime').value;
    datas = data.airplane_data.filter(x => x.departure_time.split(':')[0] === times);
    return renderCard(datas)

}
// filterTime.addEventListener("click", function(e) {
//     let datas;
//     var times = e.target.value
    // if (times !== "") {
    //     datas = data.airplane_data.filter(x => x.departure_time.split(':')[0] === times);
    //     return renderCard(datas)
    // }

// });

const formatDate = (dateplane) => {
    let date = new Date(dateplane)
    let _month = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December']
    var month = _month[date.getMonth() + 1]
    return month + " " + date.getDate()
}

const formatTime = (dateplane) => {
    let date = new Date(dateplane)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    // console.log(hours);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes
    return strTime;
}

renderCard()