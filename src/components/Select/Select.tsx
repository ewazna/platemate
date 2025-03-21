import React, { LegacyRef } from "react";
import ReactSelect, {
  components,
  MultiValue,
  OptionProps,
  StylesConfig,
  SelectInstance,
} from "react-select";
import { SelectProps } from "./SelectProps";
import { PiCheckFatFill } from "react-icons/pi";
import { Option } from "../../models";

const CustomOption = (props: OptionProps) => {
  return (
    <components.Option {...props}>
      {props.children}
      {props.isSelected && <PiCheckFatFill className="text-white" />}
    </components.Option>
  );
};

const Select = React.forwardRef<SelectInstance, SelectProps>(
  (props, ref: LegacyRef<SelectInstance>) => {
    const {
      name,
      options,
      placeholder,
      value,
      onChange,
      isMulti,
      invalid,
      errors,
      disabled,
      ...rest
    } = props;

    const styles: StylesConfig = {
      input: (provided) => ({
        ...provided,
        position: "absolute",
        color: "#140F1F",
        borderRadius: "20px",
      }),
      placeholder: () => ({
        color: "#A5A5A5",
      }),
      option: (provided, state) => ({
        ...provided,
        display: "flex",
        overflow: "hidden",
        justifyContent: "space-between",
        alignItems: "center",
        width: "calc(100% - 16px)",
        backgroundColor: state.isFocused || state.isSelected ? "#C4C4C4" : "#E6E6E600",
        textAlign: "left",
        borderColor: "#A1BB0D",
        borderRadius: "20px",
        marginLeft: "8px",
        marginRight: "8px",
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: "#E6E6E6",
        borderRadius: "20px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        translateTop: "4px",
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        color: "#A5A5A5",
      }),
      multiValue: (styles) => {
        return {
          ...styles,
          display: "inline",
        };
      },
      multiValueLabel: (styles) => ({
        ...styles,
        display: "inline",
        backgroundColor: "#C4C4C4",
        borderRadius: "6px 0px 0px 6px",
      }),
      multiValueRemove: (styles) => ({
        ...styles,
        display: "inline",
        padding: "1px 4px 2px 4px",
        backgroundColor: "#C4C4C4",
        borderRadius: "0px 6px 6px 0px",
        ":hover": {
          color: "white",
        },
      }),
      control: (_provided, state) => ({
        display: "flex",
        height: "40px",
        backgroundColor: "#E6E6E6",
        fontWeight: "500",
        textAlign: "left",
        borderRadius: "20px",
        paddingLeft: "8px",
        border: invalid
          ? state.isFocused
            ? "2px solid #FF2E2E"
            : "1px solid #FF2E2E"
          : state.isFocused
            ? "2px solid #A1BB0D"
            : "none",
        boxShadow: "none",
      }),
    };

    const handleChange = (selectedValue: unknown) => {
      if (onChange) {
        onChange(
          isMulti
            ? (selectedValue as MultiValue<Option>).map((option) => option.value)
            : selectedValue
              ? (selectedValue as Option).value
              : null,
        );
      }
    };

    return (
      <>
        <ReactSelect
          ref={ref}
          name={name}
          options={options}
          placeholder={placeholder}
          isMulti={isMulti}
          isDisabled={disabled}
          onChange={(selectedValue) => handleChange(selectedValue)}
          value={
            isMulti
              ? options.filter((option) => value.includes(option.value))
              : options.find((option) => option.value === value) || null
          }
          styles={styles}
          components={{ Option: CustomOption }}
          {...rest}
        ></ReactSelect>
        {errors && (
          <p className="col-span-2 text-pm-error-base text-sm font-medium w-full text-right pr-4">
            {errors.message}
          </p>
        )}
      </>
    );
  },
);

export default Select;
