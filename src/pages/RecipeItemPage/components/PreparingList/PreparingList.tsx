import Card from "../../../../components/Card/Card";
import { PreparingListProps } from "./PreparingListProps";

function PreparingList({ recipe }: PreparingListProps) {
  const preperingSteps = recipe.steps.map((step, index) => {
    const num = index + 1;
    return (
      <Card className="flex p-6 justify-between items-start my-4" key={index}>
        <span className="mr-6 font-raleway font-black text-pm-orange-base text-6xl">{num}</span>
        <p className="leading-5 text-justify text-pm-black">{step}</p>
      </Card>
    );
  });

  return <>{preperingSteps}</>;
}
export default PreparingList;
