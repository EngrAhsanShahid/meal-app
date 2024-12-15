import React from 'react';
import Cards from './Cards'; // Import the Card component
import useGetData from '../hooks/useGetData';
const CardContainer = ({ selectedCards, onCardClick }) => {
  const getAllMeal = useGetData();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20">
      {/* Dynamically render the Card components based on getAllMeal data */}
      {getAllMeal?.recipes?.map((meal) => (
        <Cards key={meal.id} meal={meal} isActive={selectedCards.includes(meal.id)} onClick={() => onCardClick(meal.id)} />
      ))}
    </div>
  );
};

export default CardContainer;
