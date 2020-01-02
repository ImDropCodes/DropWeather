
window.addEventListener("load",()=>{
    let long;
    let lat;
    let temparatureDiscp = document.querySelector(".temp-disc");
    let temparatureDegree = document.querySelector(".temp-degree");
    let locationTimeZone = document.querySelector(".location-timezone");
    let tempSelection  = document.querySelector(".degree-section");
    let tempSpan  = document.querySelector(".degree-section span");

    if(navigator.geolocation){
        //Getting latitude and Longitude from GeoLocation 
        navigator.geolocation.getCurrentPosition(possition =>{

            long = possition.coords.longitude;
            lat = possition.coords.latitude;
            
            // cors proxy 
            const proxy = "https://cors-anywhere.herokuapp.com/";
            //DarkSky Weather API
            const API = `${proxy}https://api.darksky.net/forecast/c5fb1916ff0fa4194be5ac9198435c6e/${lat},${long}`;
            //Fetching Weather deatails from API call 
            fetch(API).then(reponse=>{
                return reponse.json();
            }).then(data=>{

                console.log(data);

                const {temperature,summary,icon} = data.currently;
                // getting temperature , temperature summary, Time Zone
                temparatureDegree.textContent = temperature;
                temparatureDiscp.textContent = summary;
                locationTimeZone.textContent = data.timezone;

                //converting F to C
                let celsius = (temperature - 32) * (5/9);

                // function for cloud icon 
                setIcon(icon,document.querySelector('.icon'));

                // click event for coonverting temperature from F to C
                tempSelection.addEventListener('click',()=>{
                    if(tempSpan.textContent === "F"){
                        tempSpan.textContent = "C";
                        temparatureDegree.textContent = Math.floor(celsius);
                    }else{
                        tempSpan.textContent = "F";
                        temparatureDegree.textContent = temperature;
                    }
                });

            })
        });

    }else{
        console.log("Permisson denine");
    }

    function setIcon(icon,iconId){
        var skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        skycons.set(iconId,Skycons[currentIcon]);

    }
});