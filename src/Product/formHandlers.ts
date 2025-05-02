export const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>, key: string) => (value: string) => {
    setter(prev => ({ ...prev, [key]: value }));
  };
  
  export const handleNumericInputChange = (setter: React.Dispatch<React.SetStateAction<any>>, key: string) => (value: string) => {
    const parsedValue = parseFloat(value);
    setter(prev => ({
      ...prev,
      [key]: isNaN(parsedValue) ? undefined : parsedValue,
    }));
  };
  