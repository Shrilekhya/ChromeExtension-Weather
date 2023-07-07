
const findCity = () => {
    const status = document.querySelector('#status');

    const success = (currentPos) => {
        // console.log(currentPos);
        const latitude = currentPos.coords.latitude;
        const longitude = currentPos.coords.longitude;

        const cityURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
        const apiKey = chrome.runtime.getManifest().key;
        const unit ="metric";

        fetch(cityURL)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            const city = data.city;
            console.log(city);
            const tempURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}` ;
        
            fetch(tempURL)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const icon =data.weather[0].icon;
                const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png" ;
                status.textContent = data.main.temp + "℃";
                console.log(imgURL);
                var img = document.createElement("img");
                img.id = "myImg";
                document.body.appendChild(img);
                document.getElementById("myImg").src = imgURL;
                document.getElementById("getLoc").textContent = '𖡡 '+city;
            })
        })

    }

    const error = () => {
        console.log("Couldn't get ur location");
    }

    navigator.geolocation.getCurrentPosition(success , error);
}

document.querySelector('#getLoc').addEventListener('click' , findCity)