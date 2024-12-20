import React, { ForwardedRef } from "react";
import { RecipePreparingListProps } from "./RecipePreparingListProps";
import Card from "../../../../components/Card/Card";

const RecipePreparingList = React.forwardRef<HTMLDivElement, RecipePreparingListProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { recipe, className } = props;

    const preperingSteps = recipe.steps.map((step, index) => {
      const num = index + 1;
      return (
        <Card
          className="flex p-6 justify-between items-start my-4 drop-shadow-[0_0_5px_rgba(0,0,0,0.15)]"
          key={index}
        >
          <span className="mr-6 font-raleway font-black text-pm-orange-base text-6xl">{num}</span>
          <p className="leading-5 text-justify text-pm-black">{step}</p>
        </Card>
      );
    });

    return (
      <div ref={ref} className={className}>
        <h2>Preparing</h2>
        {preperingSteps}
      </div>
    );
  },
);

export default RecipePreparingList;
