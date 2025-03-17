import { useLoaderData } from "react-router-dom";
import "./App.css";
import CoffeeCard from "./components/CoffeeCard";
import { useState } from "react";

function App() {
  const loadedCoffees = useLoaderData();
  const [coffees, setCoffees]= useState(loadedCoffees)
  return (
    <>
      <h1 className="text-9xl text-red-700"></h1>The Coffee was loaded :{" "}
      {coffees.length}
      <div className="grid grid-cols-3 md:grid-cols-2 gap-5">
        {coffees.map((coffee) => (
          <CoffeeCard
          
          coffee={coffee}
          coffees={coffees}
          setCoffees={setCoffees}
          ></CoffeeCard>
        ))}
      </div>
    </>
  );
}

export default App;
