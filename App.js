import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isValidJson, setIsValidJson] = useState(false);
  const [responseData, setResponseData] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const jsonData = JSON.parse(inputValue);
      setIsValidJson(true);
      axios.post('https://your-backend-api-url.com/bfhl', jsonData)
        .then((response) => {
          setResponseData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      setIsValidJson(false);
    }
  };

  const handleOptionChange = (event) => {
    const selectedOptionsArray = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selectedOptionsArray);
  };

  useEffect(() => {
    document.title = 'Your Roll Number';
  }, []);

  return (
    <div>
      <h1>JSON Input</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={inputValue} onChange={handleInputChange} />
        <button type="submit">Submit</button>
        {isValidJson ? (
          <div>
            <h2>Response</h2>
            <select multiple value={selectedOptions} onChange={handleOptionChange}>
              <option value="alphabets">Alphabets</option>
              <option value="numbers">Numbers</option>
              <option value="highestAlphabet">Highest Alphabet</option>
            </select>
            {selectedOptions.includes('alphabets') && (
              <div>
                <h3>Alphabets</h3>
                <ul>
                  {responseData.alphabets.map((alphabet) => (
                    <li key={alphabet}>{alphabet}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedOptions.includes('numbers') && (
              <div>
                <h3>Numbers</h3>
                <ul>
                  {responseData.numbers.map((number) => (
                    <li key={number}>{number}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedOptions.includes('highestAlphabet') && (
              <div>
                <h3>Highest Alphabet</h3>
                <p>{responseData.highestAlphabet}</p>
              </div>
            )}
          </div>
        ) : (
          <p>Invalid JSON input</p>
        )}
      </form>
    </div>
  );
}

export default App;
