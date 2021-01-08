exports.location=navigator.geolocation.getCurrentPosition((d)=>{return d});
exports.apiKey=`51ba72e56ed84395a2a85e73fa65ac5b`
name='Indore'
exports.apiUrl=`api.openweathermap.org/data/2.5/weather?q=${name}&appid=${this.apiKey}`
exports.apiUrl2=`api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=51ba72e56ed84395a2a85e73fa65ac5b`