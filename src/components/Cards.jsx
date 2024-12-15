import React from 'react';

const Cards = ({ meal, isActive, onClick }) => {
  const rating = Math.round(meal.rating) || 0;

  return (
    <div
      onClick={onClick}
      className={`max-w-xs rounded-lg overflow-hidden shadow-lg bg-white flex flex-col mb-9 cursor-pointer ${
        isActive ? 'border-4 border-blue-500' : 'border border-gray-200'
      }`}
      style={{ minHeight: '400px' }}
    >
      {/* Image with Meal Label */}
      <div className="relative">
        <img
          src={meal.image || 'https://via.placeholder.com/300'}
          alt={meal.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black text-white py-1 px-3 text-sm font-semibold rounded-md">
          {Array.isArray(meal.mealType) ? meal.mealType.join(', ') : meal.mealType || 'Dinner'}
        </div>
      </div>

      {/* Meal Title and Instructions */}
      <div className="px-4 py-3 flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 truncate" style={{ minHeight: '24px' }}>
          {meal.name || 'Unknown Meal'}
        </h3>
        <p className="text-gray-600 text-sm mt-2" style={{ minHeight: '48px', overflow: 'hidden' }}>
          {meal.instructions
            ? meal.instructions.slice(0, 100) + (meal.instructions.length > 100 ? '...' : '')
            : 'No instructions available.'}
        </p>
      </div>

      {/* Cuisine and Rating */}
      <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200" style={{ minHeight: '48px' }}>
        <div className="text-sm text-gray-600">Cuisine: {meal.cuisine || 'Unknown'}</div>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, index) => (
            <span key={index} className={index < rating ? 'text-yellow-500' : 'text-gray-300'}>
              &#9733;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
