import { useState } from 'react';

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return [value, handleChange];
};
