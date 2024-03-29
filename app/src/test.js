fetch('http://localhost:8000/api/flights/1133').then(async res => {
  const newFlight = await res.json()

  const getAirport = async (code) => {
    const res = await fetch('http://localhost:8000/api/airports/?code=' + code)
    const arr = await res.json()
    return arr[0]
  }

  const departureAirport = await getAirport(newFlight.departure_code)
  const arrivalAirport = await getAirport(newFlight.arrival_code)


  const icao = {
    departure: departureAirport.icao,
    arrival: arrivalAirport.icao
  }

  const url = "https://flightera-flight-data.p.rapidapi.com/airport/flights/"

  const getFlights = async (direction) => {
    const params = new URLSearchParams({
      ident: icao[direction],
      time: Date.now(),
      direction
    })
    const res = await fetch(url + '?' + params, {
      headers: {
        "X-RapidAPI-Key": "53a3781c04msha73ef78bdc4e791p152aadjsn03912678e3d7",
        "X-RapidAPI-Host": "flightera-flight-data.p.rapidapi.com"
      }
    })

    if (res.ok) return await res.json()
    else return res
  }

  const departureFlights = await getFlights('departure')
  console.log(departureFlights)

})