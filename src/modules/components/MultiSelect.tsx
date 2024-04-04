import axios from "axios";
import React, { KeyboardEventHandler } from "react";
import { useQuery } from "react-query";
import Select, {
  components,
  GroupBase,
  MultiValueRemoveProps,
} from "react-select";
import { DataType } from "./store";

const fetchData = async () => {
  return await axios.get(
    "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
  );
};
interface Option {
  readonly label: string;
  readonly value: string;
}

export const MultiSelect = () => {
  const [value, setValue] = React.useState<readonly Option[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const { data, isError, isLoading } = useQuery("mockdata", fetchData, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const createOption = (label: string) => ({
    label,
    value: label,
  });

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
    }
  };

  const MultiValueRemove = (
    props: MultiValueRemoveProps<Option, true, GroupBase<Option>>
  ) => {
    return (
      <components.MultiValueRemove {...props}>X</components.MultiValueRemove>
    );
  };

  if (isLoading) {
    return <h3>Loading ...</h3>;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  if (!data) {
    <h3>No date</h3>;
  }

  const safeEval = (expression: string) => {
    try {
      return Function(`return (${expression})`)();
    } catch (error) {
      console.error("Ошибка вычисления выражения:", error);
      return null;
    }
  };

  const newDate = data?.data.map((e: DataType) => {
    let resultValue;

    if (typeof e.value === "string") {
      resultValue = safeEval(e.value);
    }

    return {
      category: e.category,
      id: e.id,
      label: e.name,
      value: resultValue ? resultValue : e.value,
    };
  });

  return (
    <div>
      <Select
        isMulti
        value={value}
        name="colors"
        options={newDate}
        components={{ MultiValueRemove }}
        onChange={(newValue) => setValue(newValue)}
        onInputChange={(newValue) => setInputValue(newValue)}
        className="basic-multi-select"
        classNamePrefix="select"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
