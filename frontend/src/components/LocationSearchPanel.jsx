const LocationSearchPanel = ({ setVehiclePanel, suggestions, setPickup, setDestination, activeInput, setActiveInput }) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeInput === 'pickup') {
      setPickup(suggestion); // Set pickup when suggestion is clicked
    } else {
      setDestination(suggestion); // Set destination when suggestion is clicked
    }
  };

  return (
    <div>
      {suggestions.map((suggestion, i) => (
        <div onClick={() => handleSuggestionClick(suggestion.description)} key={i} className="flex items-center w-full justify-between gap-x-3 mb-1 border-2 border-transparent p-2 rounded-xl active:border-black">
            <div className="h-8 w-8 rounded-full bg-[#eeeeee] flex items-center justify-center"><i className="ri-map-pin-2-fill"></i></div>
            <h4 className="flex-1">{suggestion.description}</h4>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel;
