import { useState } from 'react';
import { motion } from 'framer-motion';

function SmartDietPlanner() {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    goal: 'maintain',
    activityLevel: 'moderate',
    dietaryRestrictions: []
  });

  const [dietPlan, setDietPlan] = useState(null);

  const activityLevels = {
    sedentary: 'Little to no exercise',
    light: 'Light exercise 1-3 times/week',
    moderate: 'Moderate exercise 3-5 times/week',
    active: 'Heavy exercise 6-7 times/week',
    veryActive: 'Very heavy exercise, physical job'
  };

  const dietaryRestrictionOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-free',
    'Dairy-free',
    'Nut-free'
  ];

  const mealPlans = {
    loss: {
      breakfast: [
        {
          meal: 'Protein-Rich Breakfast Bowl',
          ingredients: ['Greek yogurt (200g)', 'Mixed berries (100g)', 'Honey (1 tsp)', 'Granola (30g)'],
          calories: 350,
          protein: '20g',
          carbs: '45g',
          fats: '12g'
        },
        {
          meal: 'Avocado Toast',
          ingredients: ['Whole grain bread (2 slices)', 'Avocado (1/2)', 'Eggs (2)', 'Cherry tomatoes (50g)'],
          calories: 400,
          protein: '18g',
          carbs: '35g',
          fats: '15g'
        }
      ],
      lunch: [
        {
          meal: 'Grilled Chicken Salad',
          ingredients: ['Chicken breast (150g)', 'Mixed greens (100g)', 'Olive oil (1 tbsp)', 'Balsamic vinegar'],
          calories: 450,
          protein: '35g',
          carbs: '20g',
          fats: '18g'
        },
        {
          meal: 'Quinoa Buddha Bowl',
          ingredients: ['Quinoa (100g)', 'Chickpeas (100g)', 'Roasted vegetables (150g)', 'Tahini dressing'],
          calories: 500,
          protein: '25g',
          carbs: '40g',
          fats: '15g'
        }
      ],
      dinner: [
        {
          meal: 'Baked Salmon with Vegetables',
          ingredients: ['Salmon fillet (150g)', 'Broccoli (100g)', 'Sweet potato (100g)', 'Olive oil'],
          calories: 500,
          protein: '30g',
          carbs: '25g',
          fats: '20g'
        },
        {
          meal: 'Lean Beef Stir-fry',
          ingredients: ['Lean beef (150g)', 'Mixed vegetables (200g)', 'Brown rice (100g)', 'Soy sauce'],
          calories: 550,
          protein: '35g',
          carbs: '30g',
          fats: '15g'
        }
      ]
    },
    gain: {
      breakfast: [
        {
          meal: 'High-Calorie Breakfast Bowl',
          ingredients: ['Oatmeal (100g)', 'Banana (1)', 'Peanut butter (30g)', 'Protein powder (30g)', 'Milk (250ml)'],
          calories: 650,
          protein: '35g',
          carbs: '80g',
          fats: '25g'
        },
        {
          meal: 'Protein Pancakes',
          ingredients: ['Pancake mix (150g)', 'Eggs (3)', 'Protein powder (30g)', 'Maple syrup (30ml)'],
          calories: 700,
          protein: '40g',
          carbs: '85g',
          fats: '20g'
        }
      ],
      lunch: [
        {
          meal: 'Chicken Rice Bowl',
          ingredients: ['Chicken breast (200g)', 'Brown rice (150g)', 'Avocado (1)', 'Mixed vegetables (150g)'],
          calories: 750,
          protein: '45g',
          carbs: '70g',
          fats: '30g'
        },
        {
          meal: 'Pasta with Meatballs',
          ingredients: ['Whole grain pasta (150g)', 'Lean beef meatballs (200g)', 'Tomato sauce', 'Parmesan cheese'],
          calories: 800,
          protein: '50g',
          carbs: '90g',
          fats: '25g'
        }
      ],
      dinner: [
        {
          meal: 'Steak with Potatoes',
          ingredients: ['Ribeye steak (250g)', 'Potatoes (200g)', 'Vegetables (150g)', 'Olive oil'],
          calories: 850,
          protein: '55g',
          carbs: '60g',
          fats: '35g'
        },
        {
          meal: 'Salmon Pasta',
          ingredients: ['Salmon (200g)', 'Pasta (150g)', 'Cream sauce', 'Mixed vegetables (150g)'],
          calories: 800,
          protein: '45g',
          carbs: '75g',
          fats: '30g'
        }
      ]
    },
    maintain: {
      breakfast: [
        {
          meal: 'Balanced Breakfast Bowl',
          ingredients: ['Oatmeal (80g)', 'Mixed berries (100g)', 'Almonds (30g)', 'Honey (1 tsp)'],
          calories: 450,
          protein: '15g',
          carbs: '55g',
          fats: '20g'
        },
        {
          meal: 'Mediterranean Breakfast',
          ingredients: ['Whole grain bread (2 slices)', 'Eggs (2)', 'Feta cheese (30g)', 'Tomatoes (100g)'],
          calories: 500,
          protein: '25g',
          carbs: '45g',
          fats: '22g'
        }
      ],
      lunch: [
        {
          meal: 'Mediterranean Salad',
          ingredients: ['Mixed greens (150g)', 'Grilled chicken (120g)', 'Olive oil (2 tbsp)', 'Quinoa (80g)'],
          calories: 550,
          protein: '35g',
          carbs: '40g',
          fats: '25g'
        },
        {
          meal: 'Vegetable Wrap',
          ingredients: ['Whole grain wrap', 'Hummus (50g)', 'Mixed vegetables (200g)', 'Feta cheese (30g)'],
          calories: 500,
          protein: '20g',
          carbs: '50g',
          fats: '20g'
        }
      ],
      dinner: [
        {
          meal: 'Grilled Fish with Rice',
          ingredients: ['White fish (150g)', 'Brown rice (100g)', 'Roasted vegetables (200g)', 'Lemon-herb sauce'],
          calories: 600,
          protein: '40g',
          carbs: '45g',
          fats: '22g'
        },
        {
          meal: 'Tofu Stir-fry',
          ingredients: ['Tofu (200g)', 'Mixed vegetables (250g)', 'Brown rice (100g)', 'Stir-fry sauce'],
          calories: 550,
          protein: '25g',
          carbs: '50g',
          fats: '20g'
        }
      ]
    }
  };

  const calculateBMR = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = parseInt(formData.age);
    
    return 10 * weight + 6.25 * height - 5 * age + 5;
  };

  const generateDietPlan = () => {
    const bmr = calculateBMR();
    let targetCalories;

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const tdee = bmr * activityMultipliers[formData.activityLevel];

    switch (formData.goal) {
      case 'loss':
        targetCalories = tdee - 500;
        break;
      case 'gain':
        targetCalories = tdee + 500;
        break;
      default:
        targetCalories = tdee;
    }

    const randomIndex = Math.floor(Math.random() * 2);
    setDietPlan({
      calories: Math.round(targetCalories),
      breakfast: mealPlans[formData.goal].breakfast[randomIndex],
      lunch: mealPlans[formData.goal].lunch[randomIndex],
      dinner: mealPlans[formData.goal].dinner[randomIndex]
    });
  };

  const handleDownload = () => {
    if (!dietPlan) return;

    const content = `
HealthSync Diet Plan
===================

Daily Target Calories: ${dietPlan.calories}

Breakfast - ${dietPlan.breakfast.meal}
Calories: ${dietPlan.breakfast.calories}
Ingredients:
${dietPlan.breakfast.ingredients.map(i => `- ${i}`).join('\n')}
Macros: Protein ${dietPlan.breakfast.protein} | Carbs ${dietPlan.breakfast.carbs} | Fats ${dietPlan.breakfast.fats}

Lunch - ${dietPlan.lunch.meal}
Calories: ${dietPlan.lunch.calories}
Ingredients:
${dietPlan.lunch.ingredients.map(i => `- ${i}`).join('\n')}
Macros: Protein ${dietPlan.lunch.protein} | Carbs ${dietPlan.lunch.carbs} | Fats ${dietPlan.lunch.fats}

Dinner - ${dietPlan.dinner.meal}
Calories: ${dietPlan.dinner.calories}
Ingredients:
${dietPlan.dinner.ingredients.map(i => `- ${i}`).join('\n')}
Macros: Protein ${dietPlan.dinner.protein} | Carbs ${dietPlan.dinner.carbs} | Fats ${dietPlan.dinner.fats}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diet-plan.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Smart Diet Planner</h1>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  placeholder="175"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  placeholder="70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  placeholder="25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal
                </label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="maintain">Maintain Weight</option>
                  <option value="loss">Weight Loss</option>
                  <option value="gain">Weight Gain</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Level
                </label>
                <select
                  value={formData.activityLevel}
                  onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  {Object.entries(activityLevels).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Restrictions
                </label>
                <select
                  multiple
                  value={formData.dietaryRestrictions}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    dietaryRestrictions: Array.from(e.target.selectedOptions, option => option.value)
                  })}
                  className="w-full p-2 border rounded-md h-24"
                >
                  {dietaryRestrictionOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={generateDietPlan}
              className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Generate Diet Plan
            </button>
          </div>

          {dietPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Personalized Diet Plan</h2>
                <button
                  onClick={handleDownload}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Plan
                </button>
              </div>

              <div className="mb-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-2">Daily Calorie Target</h3>
                  <p className="text-3xl font-bold text-indigo-600">{dietPlan.calories} calories</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Breakfast */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4">Breakfast</h3>
                  <div className="space-y-4">
                    <p className="text-lg font-medium">{dietPlan.breakfast.meal}</p>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium mb-2">Ingredients:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {dietPlan.breakfast.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium">Nutritional Information:</p>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Calories</p>
                          <p className="font-medium">{dietPlan.breakfast.calories}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Protein</p>
                          <p className="font-medium">{dietPlan.breakfast.protein}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Carbs</p>
                          <p className="font-medium">{dietPlan.breakfast.carbs}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Fats</p>
                          <p className="font-medium">{dietPlan.breakfast.fats}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lunch */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4">Lunch</h3>
                  <div className="space-y-4">
                    <p className="text-lg font-medium">{dietPlan.lunch.meal}</p>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium mb-2">Ingredients:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {dietPlan.lunch.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium">Nutritional Information:</p>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Calories</p>
                          <p className="font-medium">{dietPlan.lunch.calories}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Protein</p>
                          <p className="font-medium">{dietPlan.lunch.protein}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Carbs</p>
                          <p className="font-medium">{dietPlan.lunch.carbs}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Fats</p>
                          <p className="font-medium">{dietPlan.lunch.fats}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dinner */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4">Dinner</h3>
                  <div className="space-y-4">
                    <p className="text-lg font-medium">{dietPlan.dinner.meal}</p>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium mb-2">Ingredients:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {dietPlan.dinner.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium">Nutritional Information:</p>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Calories</p>
                          <p className="font-medium">{dietPlan.dinner.calories}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Protein</p>
                          <p className="font-medium">{dietPlan.dinner.protein}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Carbs</p>
                          <p className="font-medium">{dietPlan.dinner.carbs}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Fats</p>
                          <p className="font-medium">{dietPlan.dinner.fats}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default SmartDietPlanner;