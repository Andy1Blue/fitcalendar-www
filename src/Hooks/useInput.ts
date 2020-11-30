import { useState } from 'react';

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    bind: {
      value: value,
      onChange: (event: any) => {
        setValue(event.target.value);
      },
    },
  };
};
