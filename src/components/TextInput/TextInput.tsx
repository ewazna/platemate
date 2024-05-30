import className from "classnames";
import { twMerge } from "tailwind-merge";
import { TextInputProps } from "./TextInputProps";

function TextInput(props: TextInputProps) {
  const { children, basic, raised, disabled, icon, id, ...rest } = props;

  const isBasic = basic || (!basic && !raised);

  const classes = twMerge(
    className(
      "flex grow items-center px-11 py-2 rounded-full",
      "font-roboto font-medium outline-none text-pm-black ",
      "placeholder:text-pm-grey-darker focus:border focus:border-pm-green-base",
      {
        "bg-pm-grey-base": isBasic,
        "bg-pm-white drop-shadow-xl": raised,
        "opacity-20 pointer-events-none": disabled,
      },
      rest.className
    )
  );

  function checkTypeVariation({ basic, raised }: TextInputProps) {
    const count = Number(!!basic) + Number(!!raised);
    if (count > 1) {
      throw new Error("Only one of basic, raised can be true");
    }
  }

  checkTypeVariation(props);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input type="text" id={id} {...rest} className={classes} />
      <div className="absolute top-1/2 left-4 -translate-y-1/2 text-m mx-1 text-pm-grey-darker">
        {icon}
      </div>
    </>
  );
}
export default TextInput;
