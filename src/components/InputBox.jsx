import React, { useId } from 'react';

function InputBox({
  label,
  value,
  onValueChange,
  onTypeChange,
  TypeOptions = [],
  selectType = 'length',
  valueDisable = false,
  className = '',
  onUnitChange,
  unitOptions = [],
  selectUnit,
}) {
  const valueInputId = useId();

  return (
    <div className={`bg-white/10 p-4 rounded-lg text-sm flex flex-col ${className}`}>
      <div className="flex flex-row gap-4">
        <div className="w-1/2">
          <label htmlFor={valueInputId} className="text-black/80 mb-2 inline-block">
            {label}
          </label>
          <input
            id={valueInputId}
            className="outline-none w-full bg-transparent py-1.5 text-black/80 placeholder-white/50"
            type="number"
            placeholder="Value"
            disabled={valueDisable}
            value={value}
            onChange={(e) => onValueChange && onValueChange(e.target.value)}
          />
        </div>
        <div className="w-1/2 flex flex-col justify-end">
          <p className="text-black/80 mb-2">Unit</p>
          <select
            className="rounded-lg px-1 py-1 bg-white/20 text-black/80 cursor-pointer outline-none"
            value={selectUnit}
            onChange={(e) => onUnitChange && onUnitChange(e.target.value)}
          >
            {unitOptions.map((unit) => (
              <option key={unit} value={unit}>
                {TypeOptions[selectType]?.[unit]?.name || unit}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-black/80 mb-2">Measurement Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-white/20 text-black/80 cursor-pointer outline-none w-full"
          value={selectType}
          onChange={(e) => onTypeChange && onTypeChange(e.target.value)}
        >
          {Object.keys(TypeOptions).map((measure) => (
            <option key={measure} value={measure}>
              {measure.charAt(0).toUpperCase() + measure.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
