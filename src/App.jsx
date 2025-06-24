import { useState, useEffect } from 'react';
import './App.css';
import { InputBox } from './components';
import { useUnitConverter } from './hooks/useUnitConverter';
import { TypeOptions } from './hooks/MeasurementOptions';

function App() {
  const { convertedVal, convert } = useUnitConverter();
  const [value, setValue] = useState('');
  const [type, setType] = useState('length');

  // Initialize default units
  const defaultUnits = Object.keys(TypeOptions[type] || {});
  const [from, setFrom] = useState(defaultUnits[0] || '');
  const [to, setTo] = useState(defaultUnits[1] || '');

  // When type changes, update units
  useEffect(() => {
    const units = Object.keys(TypeOptions[type] || {});
    setFrom(units[0] || '');
    setTo(units[1] || '');
  }, [type]);

  // Auto-convert when any relevant input changes
  useEffect(() => {
    if (value && from && to && type) {
      convert({ value: parseFloat(value), from, to, type });
    }
  }, [value, from, to, type, convert]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100"
      style={{
        backgroundImage: "url('/unit-converter/bgimage.png')",
        backgroundSize: "cover"
      }}
    >
      <h1 className="text-3xl sm:text-4xl text-black font-semibold mb-6">Unit Converter</h1>
      <div className="w-full max-w-lg bg-white/20 border border-gray-600 rounded-xl p-6 backdrop-blur-md shadow-md">
        <div className="mb-4">
          <InputBox
            label="From"
            value={value}
            onValueChange={setValue}
            onTypeChange={setType}
            TypeOptions={Object.keys(TypeOptions)}
            selectType={type}
            onUnitChange={setFrom}
            unitOptions={Object.keys(TypeOptions[type] || {})}
            selectUnit={from}
          />
        </div>
        <div className="mb-4">
          <InputBox
            label="To"
            value={convertedVal || ''}
            valueDisable={true}
            onTypeChange={setType}
            TypeOptions={Object.keys(TypeOptions)}
            selectType={type}
            onUnitChange={setTo}
            unitOptions={Object.keys(TypeOptions[type] || {})}
            selectUnit={to}
          />
        </div>
      </div>
    </div >
  );
}

export default App;
