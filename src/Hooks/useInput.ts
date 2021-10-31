import { useState } from 'react';
import * as React from 'react';

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: type
    setValue(event?.target?.value || event);
  };

  return [value, handleChange];
};
