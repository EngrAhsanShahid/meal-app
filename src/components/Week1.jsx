import React from 'react';
import useGetData from '../hooks/useGetData';
import Cards from './Cards'; // Import the Cards component

const Week1 = ({ onCardClick }) => {
  const getAllMeal = useGetData();
  console.log("getAllMeal=>", getAllMeal); // Log to check the structure of the data

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20">
      {/* Dynamically render the Cards components based on getAllMeal data */}
      {getAllMeal?.recipes?.map((meal) => (
        <Cards key={meal.id} meal={meal} onCardClick={onCardClick} />
      ))}
    </div>
  );
};

export default Week1;
