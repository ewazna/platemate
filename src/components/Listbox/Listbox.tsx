import { ListboxProps } from "./ListboxProps";
import { PiCheckFatFill } from "react-icons/pi";

function Listbox(props: ListboxProps) {
  const {
    options,
    selectionType,
    onChange,
    value,
    selectionColor,
    bgOptionColor,
    selectionIcons,
    ...rest
  } = props;

  const handleSelect = (id: string) => {
    if (selectionType === "multi") {
      let newValue;
      if (value) {
        const index = value.indexOf(id);
        if (index >= 0) {
          newValue = value.slice();
          newValue.splice(index, 1);
        } else {
          newValue = value.concat(id);
        }
      } else {
        newValue = [id];
      }
      onChange(newValue);
    } else if (selectionType === "single") {
      onChange(value.includes(id) ? [] : [id]);
    }
  };

  const handleClick = (id: string) => {
    handleSelect(id);
  };

  const genList = options.map((option, i) => {
    return (
      <li
        key={i}
        className={
          "flex items-center justify-between w-full my-1 px-3 py-1 text-black rounded-full  " +
          (value?.includes(option.value) ? selectionColor : bgOptionColor)
        }
        onClick={() => handleClick(option.value)}
      >
        {option.icon}
        <span className="ml-2 grow">{option.label}</span>
        {value?.includes(option.value) ? (
          <PiCheckFatFill className={selectionIcons ? "justify-self-end text-white" : "hidden"} />
        ) : null}
      </li>
    );
  });
  return <ul {...rest}>{genList}</ul>;
}

export default Listbox;
