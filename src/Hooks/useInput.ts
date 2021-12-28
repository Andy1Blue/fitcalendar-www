import { useState } from 'react';
import * as React from 'react';

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: type it
    setValue(event?.target?.value || (typeof event == 'string' || typeof event == 'number' ? event : ' '));
  };

  return [value, handleChange];
};
