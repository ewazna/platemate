import React, { ForwardedRef, useState } from "react";
import { PiMinusBold, PiPlusBold } from "react-icons/pi";
import { RecipeIngredientsProps } from "./RecipeIngredientsProps";
import IconButton from "../../../../components/IconButton/IconButton";
import IngredientsList from "../IngredientsList/IngredientsList";
import Card from "../../../../components/Card/Card";

const RecipeIngredients = React.forwardRef<HTMLDivElement, RecipeIngredientsProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { recipe, className } = props;
    const [servingsQty, setServingsQty] = useState(recipe.portions);
    const maxServings = 99;
    const minServings = 1;

    const handleDecrement = () => {
      if (servingsQty > minServings) {
        setServingsQty(servingsQty - 1);
      }
    };

    const handleIncrement = () => {
      if (servingsQty < maxServings) {
        setServingsQty(servingsQty + 1);
      }
    };

    const handleChangeServings = (event: React.FormEvent<HTMLInputElement>) => {
      if ((event.target as HTMLInputElement).value !== "") {
        const value = parseInt((event.target as HTMLInputElement).value);
        setServingsQty(Math.min(Math.max(minServings, value), maxServings));
      } else {
        setServingsQty(minServings);
      }
    };

    return (
      <div ref={ref} className={className}>
        <div className="flex w-full items-center justify-between min-[400px]:justify-start">
          <h2>Ingredients</h2>
          <div className="flex justify-center items-center min-[400px]:ml-4">
            <IconButton
              raised
              primary
              className="h-6 w-6 p-1 mx-1 min-[400px]:m-0 min-[400px]:mr-2"
              onClick={handleDecrement}
            >
              <PiMinusBold className="h-4 w-4" />
            </IconButton>
            <div className="flex flex-nowrap">
              <input
                type="number"
                className="w-[20px] text-pm-black bg-transparent text-end focus:outline-none min-[400px]:mr-2"
                value={servingsQty}
                max={maxServings}
                min={minServings}
                onFocus={(e) => e.target.select()}
                onChange={handleChangeServings}
              />
              <span className="text-pm-black text-start">servings</span>
            </div>
            <IconButton
              raised
              primary
              className="h-6 w-6 p-1 ml-1 min-[400px]:ml-2"
              onClick={handleIncrement}
            >
              <PiPlusBold className="h-4 w-4" />
            </IconButton>
          </div>
        </div>
        <Card className="mt-4 mb-2 drop-shadow-[0_0_5px_rgba(0,0,0,0.15)]">
          <IngredientsList recipe={recipe} servings={servingsQty} />
        </Card>
      </div>
    );
  },
);

export default RecipeIngredients;
