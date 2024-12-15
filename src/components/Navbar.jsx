import React, { useState } from 'react';
import CardContainer from './CardContainer';
import Modal from './Modal';
import useGetData from '../hooks/useGetData';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to store meals by week
  const [mealsByWeek, setMealsByWeek] = useState({
    week1: [],
    week2: [],
    week3: [],
    week4: [],
  });

  // Mock meal details mapping (replace this with actual data)
  const mealDetails = useGetData();

  // Handle tab switching
  const handleTabClick = (index) => {
    setActiveTab(index);
    setSelectedCards([]);
  };

  // Handle card selection
  const handleCardClick = (mealId) => {
    setSelectedCards((prevSelected) => {
      if (prevSelected.includes(mealId)) {
        return prevSelected.filter((id) => id !== mealId);
      } else {
        return [...prevSelected, mealId];
      }
    });
  };

  // Handle "Add a Meal" button click
  const handleAddMealClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Assign meals to a specific week
  const handleAddMealToWeek = (week) => {
    setMealsByWeek((prev) => {
      const newMeals = selectedCards.filter(
        (mealId) => !prev[week].includes(mealId) // Ensure no duplicate meals
      );
      return {
        ...prev,
        [week]: [...prev[week], ...newMeals],
      };
    });
    setSelectedCards([]); // Clear selected cards after adding
    handleCloseModal(); // Close modal
    setActiveTab(['week1', 'week2', 'week3', 'week4'].indexOf(week) + 1); // Switch to the respective week
  };

  // Handle meal deletion
  const handleDeleteMeal = (mealId, week) => {
    setMealsByWeek((prev) => {
      return {
        ...prev,
        [week]: prev[week].filter((id) => id !== mealId), // Remove the mealId from the specific week
      };
    });
  };

  // Render meals for the active tab
  const renderMealsForTab = () => {
    const weekKeys = ['week1', 'week2', 'week3', 'week4'];
    const currentWeek = weekKeys[activeTab - 1]; // Map tab index to week keys

    if (currentWeek) {
      return mealsByWeek[currentWeek].length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mealsByWeek[currentWeek].map((mealId) => {
            const meal = mealDetails.recipes[mealId - 1];
            return (
              <div
                key={mealId}
                className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white flex flex-col mb-9 cursor-pointer"
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
                  {/* Trash Button */}
                  <button
                    className="absolute top-2 left-2 bg-red-500 text-white rounded-full p-2"
                    onClick={() => handleDeleteMeal(mealId, currentWeek)} // Delete meal when clicked
                  >
                    🗑️
                  </button>
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
                      <span key={index} className={index < meal.rating ? 'text-yellow-500' : 'text-gray-300'}>
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No meals added to this week yet.</p>
      );
    }
    return null; // For "All Meals" tab
  };

  return (
    <div className="w-full lg:pl-60 pt-4">
      <div className="flex flex-wrap items-center justify-between border-gray-300">
        <div className="flex flex-wrap gap-20 mb-4 lg:mb-0">
          {['All Meals', 'Week 1', 'Week 2', 'Week 3', 'Week 4'].map(
            (label, index) => (
              <div
                key={index}
                className={`py-2 px-4 cursor-pointer text-xl font-semibold ${
                  activeTab === index
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-700'
                }`}
                onClick={() => handleTabClick(index)}
              >
                {label}
              </div>
            )
          )}

          <div className="lg:ml-10">
            <button
              className="py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 w-full sm:w-auto"
              disabled={selectedCards.length === 0}
              onClick={handleAddMealClick}
            >
              Add a Meal
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === 0 && (
          <CardContainer
            selectedCards={selectedCards}
            onCardClick={handleCardClick}
          />
        )}
        {activeTab >= 1 && renderMealsForTab()}
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Choose a Week</h2>
            <div className="grid grid-cols-2 gap-4">
              {['week1', 'week2', 'week3', 'week4'].map((week, index) => (
                <button
                  key={index}
                  className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => handleAddMealToWeek(week)}
                >
                  {`Week ${index + 1}`}
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
