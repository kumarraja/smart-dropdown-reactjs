import { useState, useEffect } from 'react';
import './App.css';

import SmartSelect from './components/SmartSelect'

function App() {

  let noOfItems = 5;

  const [countries, setCountries] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [SelectedCountry, setSelectedCountry] = useState('');


  useEffect(() => {
    const getCountries = async () => {
      const counList = await fetchCountries(); //calling api
      setCountries(counList.data)
    }

    getCountries()
  }, []);

  // Fetch Locations
  const fetchCountries = async () => {
    const res = await fetch('http://localhost:5000/listcountries');
    return await res.json();
  }

  const addAndSelectHandler = async (country) => {
    if (country) {
      let payload = { name: country }
      const res = await addLocation(payload) //calling api

      let countriesList = countries.slice();

      countriesList.push(res.data);
      setCountries(countriesList);
      selectHandler(country);
    }
  }

  const addLocation = async (location) => {
    const res = await fetch('http://localhost:5000/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(location),
    })

    return await res.json()
  }

  const selectHandler = (country) => {
    setSelectedCountry(country)
  }


  return (
    <div className="App">
      <h1 className="App-header">Smart Drop Down Search</h1>
      <div>
        <input type="checkbox" id="admin" name="privilege" checked={isAdmin} onChange={(event) => setIsAdmin(event.currentTarget.checked)} />
        <label htmlFor="admin">Admin</label>
      </div>

      <SmartSelect
        countries={countries}
        privilege={isAdmin}
        noOfItems={noOfItems}
        SelectedCountry={SelectedCountry}
        addAndSelectHandler={addAndSelectHandler}
        selectHandler={selectHandler}
      />

    </div>
  );
}

export default App;
