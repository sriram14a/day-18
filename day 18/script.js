const rowEl = document.querySelector('.row')
const searchEl = document.getElementById('search')


let result = [];

searchEl.addEventListener('keyup', (e) => {
  const searchCountry = e.target.value
  const filtered = result.filter((country) => { return (country.name.common.toLowerCase().includes(searchCountry.toLowerCase())); });
  showCountry(filtered);

});

function countries() {
  let country = fetch("https://restcountries.com/v3.1/all");
  country.then((res) => res.json())
    .then((data) => {
      console.log(data);
      result = data;

      showCountry(result);
    });
}
countries();


function showCountry(data1) {
  const countryDetails = data1.map((data1,index) => {
  //  console.log(index)
    return `
      <div class="card text-center crd shadow  mt-3" style="width: 18rem;">
        <h5 class="card-title " id="country">${data1.name.common}</h5>
        <img src="${data1.flags.png}" class="card-img-top hgt img-thumbnail " >
        <div class="card-body">
          <p class="card-text">Capital: ${data1.capital}</p>
          <p class="card-text">Region: ${data1.region}</p>
          <p class="card-text">Country code: ${data1.cca3}</p>
          <button type="button"  class="btn btn-primary" value ="${data1.capital}" onclick="getweather('${data1.capital}',${index})" >click here for weather</button>
          <button class="btn btn-success ml-2 p-0 pl-5 pr-5" style="display:none" id=btn${index}></button>
          </div>
    </div>
  </div>`

  }).join('')
  rowEl.innerHTML = countryDetails;
}
const card = document.getElementsByClassName('card-body')
console.log(card)

function getweather(country1,index) {
  console.log(index)
  let btn=document.getElementById('btn'+index)
  console.log(btn)
  const countryName = country1
  var tempEl = document.getElementById("temp")
  var windEl = document.getElementById("wind")

  let weather = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=6dcd37847701c28cf9e109b337e4b27b`);
  weather.then((res1) => res1.json())
    .then((data1) => {
      console.log(data1);

      
      btn.style.display="block" ,"text-center"
      btn.innerHTML = ` <p id="temp">temp: ${data1.main.temp}</p>
      <p id="wind">wind speed: ${data1.wind.speed}</p>`
      
 
      
    });

}