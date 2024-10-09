import className from "classnames";
import { twMerge } from "tailwind-merge";
import { TextAreaProps } from "./TextAreaProps";

function TextArea(props: TextAreaProps) {
  const { children, basic, raised, disabled, icon, id, value, error, ...rest } = props;

  const isBasic = basic || (!basic && !raised);

  const classes = twMerge(
    className(
      "flex grow items-center px-11 py-2 rounded-full",
      "font-roboto font-medium text-pm-black ",
      "placeholder:text-pm-grey-darker focus-visible:outline-2 focus-visible:outline-pm-green-base",
      {
        "bg-pm-grey-base": isBasic,
        "bg-pm-white drop-shadow-xl": raised,
        "border border-pm-error-base focus-visible:outline-2 focus-visible:outline-pm-error-base":
          error,
        "opacity-20 pointer-events-none": disabled,
      },
      rest.className,
    ),
  );

  function checkTypeVariation({ basic, raised }: TextAreaProps) {
    const count = Number(!!basic) + Number(!!raised);
    if (count > 1) {
      throw new Error("Only one of basic, raised can be true");
    }
  }

  checkTypeVariation(props);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <textarea id={id} value={value} {...rest} className={classes} />
      <div className="absolute top-1/2 left-4 -translate-y-1/2 text-m mx-1 text-pm-grey-darker">
        {icon}
      </div>
    </>
  );
}

export default TextArea;