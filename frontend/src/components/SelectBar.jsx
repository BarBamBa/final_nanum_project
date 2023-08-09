import React, { useState } from 'react';

function CustomSelect() {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

export default CustomSelect