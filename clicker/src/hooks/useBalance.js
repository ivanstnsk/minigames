import { useState } from 'react';

export default function useBalance() {
  const [value, setValue ] = useState(0);
  
  return [
    value,
    setValue
  ];
}
