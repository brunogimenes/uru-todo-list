import { useState } from 'react';
import { ListModel, listModelValidateObject } from '../../models/list.model';
import { FieldErrors } from '../../../../shared/models/validation-model';

type UseNewListFormProps = {
  initialList: ListModel;
  onConfirm: (list: ListModel) => void;
};

export const useNewListForm = (props: UseNewListFormProps) => {
  const { initialList, onConfirm } = props;
  const [list, setList] = useState<ListModel>(initialList);
  const [errors, setErrors] = useState<FieldErrors>({});


  const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setList((prevList) => ({
      ...prevList,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationResult = listModelValidateObject(list);
    setErrors(validationResult.errors);

    if (!validationResult.isValid) {
      return;
    }

    onConfirm(list);
  };

  return {
    list,
    errors,
    handleInputChange,
    handleSubmit,
  };
};
