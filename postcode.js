const form = document.getElementById('form')
const apiURL = 'https://api.postcodes.io/postcodes/'


// adding event listner in form
form.addEventListener('submit', (e) => {
  e.preventDefault()
  searchValue = search.value.trim()
  clearSearchResults()
  searchPostCode(searchValue)
})

async function searchPostCode(searchValue) {
  const searchResult = await fetch(`${apiURL}${searchValue}/nearest`)
  console.log(searchResult)

  if (searchResult.status == 404) {
    alert('404 Error: Cannot find postcode, please enter a valid postcode.')
  }

  const data = await searchResult.json()
  showData(data)

  location.hash = searchValue
  history.replaceState(null, null, searchValue);
}

function showData(data) {
  const results = data["result"];

  for (let i = results.length - 1; i >= 0; i--) {

    const postcode = `<p class="mt-5">Postcode: <mark>${data.result[i].postcode}</mark></p>`
    const country = `<p class="mt-5">Country: <mark>${data.result[i].country}</mark></p>`
    const region = `<p class="mt-5">Region: <mark>${data.result[i].region}</mark></p>`

    document.querySelector('#resultPostcode').insertAdjacentHTML('afterbegin', postcode)
    document.querySelector('#resultCountry').insertAdjacentHTML('afterbegin', country)
    document.querySelector('#resultRegion').insertAdjacentHTML('afterbegin', region)
  }

  document.querySelector('#backButton').insertAdjacentHTML('afterbegin',
  "<a href='/' class='w-100 btn btn-lg btn-primary mt-5' type='submit'>Back</a>")
}

function clearSearchResults() {
        document.querySelector("#resultPostcode").innerHTML = '';
        document.querySelector("#resultCountry").innerHTML = '';
        document.querySelector("#resultRegion").innerHTML = '';
        document.querySelector("#backButton").innerHTML = '';
}