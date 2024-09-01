"use client"
import React, {useState} from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
interface SearchProps {
  price?:string;
  guests?:string;
  bedrooms?:string;

}
const SearchBare : React.FC<SearchProps>= () => {

  //Constant
  const [price, setPrice] = useState<string>("");
  const [guests, setGuests] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const replace = useRouter();
  const params = new URLSearchParams(searchParams.toString()); 

  //Handler
  const handlSearch = ()=>{
    if (price) {
      params.set('price', price);
    } else {
      params.delete('price');
    }

    if (guests) {
      params.set('guests', guests);
    } else {
      params.delete('guests');
    }

    if (bedrooms) {
      params.set('bedrooms', bedrooms);
    } else {
      params.delete('bedrooms');
    }

    // Update the URL with the new parameters
    replace.replace(`${pathname}?${params.toString()}`);
  }
  const handleReset = () => {
    setPrice("");
    setGuests("");
    setBedrooms("");
    replace.replace(pathname); // Réinitialiser les paramètres dans l'URL
  };

  return (
    <div className="bg-transparent bg-opacity-80 p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 w-full max-w-4xl mx-auto mb-12">
      <div className="flex flex-col w-full md:w-auto">
        <label className="text-sm font-medium">Price</label>
        <select className="p-2 border rounded" value={price} onChange={(e)=>(setPrice(e.target.value))}>
          <option value="500">500</option>
          <option value="1500">1500</option>
          <option value="2000">2000</option>
          <option value="2500">2500</option>
          <option value="3000">3000</option>
          <option value="3500">3500</option>
          <option value="4000">4000</option>
          <option value="4500">4500</option>
          <option value="5000">5000</option>
          <option value="5500">5500</option>
          <option value="6000">6000</option>
          <option value="7000">7000</option>
          <option value="8000">8000</option>
          <option value="9000">9000</option>
          

        </select>
       
      </div>
     
      <div className="flex flex-col w-full md:w-auto">
        <label className="text-sm font-medium">Any Guests</label>
        <select className="p-2 border rounded" value={guests} onChange={(e)=>(setGuests(e.target.value))}>
          <option value="">Any Guests</option>
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
        </select>
      </div>
      <div className="flex flex-col w-full md:w-auto">
        <label className="text-sm font-medium">Any Bedrooms</label>
        <select className="p-2 border rounded" value={bedrooms} onChange={(e)=>(setBedrooms(e.target.value))}>
          <option value="">Any Bedrooms</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3 Bedrooms</option>
          <option value="4">4 Bedrooms</option>
          <option value="5">5 Bedrooms</option>
          <option value="6">6 Bedrooms</option>
          <option value="7">7 Bedrooms</option>$
          <option value="8">8 Bedrooms</option>
        </select>
      </div>
      <button type="button" className="bg-black text-white p-2 rounded-lg w-full md:w-auto" onClick={handlSearch}>SEARCH</button>
      <button type="button" className="bg-black text-white p-2 rounded-lg w-full md:w-auto" onClick={handleReset}>
          RESET
        </button>
    </div>
  );
};

export default SearchBare;
