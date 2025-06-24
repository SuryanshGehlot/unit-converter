import { useCallback, useState } from 'react';
import { TypeOptions } from './MeasurementOptions';

function tempConvert(value, from, to) {
  if (from === to) return value;

  // Validate value is a number and not NaN
  if (isNaN(value) || value === null || value === undefined) {
    console.log('Invalid temperature value:', value);
    return 0; // Return a default value instead of throwing
  }

  let fromCelsius;
  switch (from) {
    case 'celsius':
      fromCelsius = value;
      break;
    case 'kelvin':
      fromCelsius = value - 273.15;
      break;
    case 'fahrenheit':
      fromCelsius = (value - 32) * (5 / 9);
      break;
    default:
      console.log('Invalid temperature from unit:', from);
      return 0; // Return a default value instead of throwing
  }

  switch (to) {
    case 'celsius':
      return fromCelsius;
    case 'kelvin':
      return fromCelsius + 273.15;
    case 'fahrenheit':
      return (fromCelsius * 9 / 5) + 32;
    default:
      console.log('Invalid temperature to unit:', to);
      return 0; // Return a default value
  }
}

export function useUnitConverter() {
  const [convertedVal, setConvertedVal] = useState('');

  const convert = useCallback(({ value, from, to, type }) => {
    console.log('Converting:', { value, from, to, type }); // Debug
    // Validate all inputs
    if (
      isNaN(value) ||
      !from ||
      !to ||
      !type ||
      !TypeOptions[type] ||
      !TypeOptions[type][from] ||
      !TypeOptions[type][to]
    ) {
      console.log('Invalid conversion inputs:', { value, from, to, type });
      setConvertedVal('');
      return;
    }

    if (type === 'temperature') {
      const res = tempConvert(parseFloat(value), from, to);
      console.log('Temperature result:', res); // Debug
      setConvertedVal(res.toFixed(2));
      return;
    }

    const fromType = TypeOptions[type][from];
    const toType = TypeOptions[type][to];

    if (!fromType || !toType) {
      console.log('Invalid units:', { fromType, toType });
      setConvertedVal('');
      return;
    }

    const res = (value * fromType.base_val) / toType.base_val;
    console.log('Conversion result:', res); // Debug
    setConvertedVal(res.toFixed(2));
  }, []);

  return { convertedVal, convert };
}