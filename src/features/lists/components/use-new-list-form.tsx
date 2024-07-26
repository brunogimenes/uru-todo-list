import { useState } from 'react';
import { ListModel, listModelValidateObject } from '../models/list.model';

export const useNewListForm = (onAdd: (list: ListModel) => void) => {
  const [list, setList] = useState<ListModel>({
    id: '',
    name: '',
    description: '',
    color: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setList((prevList) => ({
      ...prevList,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validate = listModelValidateObject(list);
    if (!validate.isValid) {
      setError(validate.errors.length ? validate.errors[0] : '');
      return;
    }
    onAdd(list);
  };

  return {
    list,
    error,
    handleInputChange,
    handleSubmit,
  };
};
