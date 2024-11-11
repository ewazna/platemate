import { IngredientsListProps } from "./IngredientsListProps";

function IngredientsList({ recipe, servings }: IngredientsListProps) {
  const portions = recipe.portions;

  const ingredients = recipe.ingredients.map((ingredient, index) => {
    const quantity =
      Math.round((ingredient.quantity / portions) * servings * 100) / 100;
    return (
      <li key={index} className="flex w-full">
        <span className="px-0.5 w-1/4 text-pm-black">{ingredient.name}</span>
        <span className="px-0.5 text-pm-black">{quantity}</span>
        <span className="px-0.5 text-pm-black">{ingredient.unit}</span>
      </li>
    );
  });

  return <ul className="text-left">{ingredients}</ul>;
}

export default IngredientsList;
