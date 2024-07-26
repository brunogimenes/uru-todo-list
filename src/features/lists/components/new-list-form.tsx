import React from 'react';
import Button from '../../../shared/components/form/button';
import TextField from '../../../shared/components/form/text-field';

import { ListModel } from '../models/list.model';
import { useNewListForm } from './use-new-list-form';
import SelectField from '../../../shared/components/form/select';


type NewListFormProps = {
  onAdd: (list: ListModel) => void;
};

const NewListForm = ({ onAdd }: NewListFormProps) => {
  const { list, error, handleInputChange, handleSubmit } = useNewListForm(onAdd);

  const colorOptions = [
    { value: '', label: 'Select a color' },
    { value: '#ff0000', label: 'Red' },
    { value: '#00ff00', label: 'Green' },
    { value: '#0000ff', label: 'Blue' },
  ];

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <h2 className="text-xl">Add New List</h2>
      <hr className="my-3" />

      <TextField
        aria-label="Name"
        name="name"
        error={error}
        onInput={handleInputChange}
        label="Name"
        placeholder="Shopping List"
        className="min-w-[300px]"
      />

      <TextField
        aria-label="Description"
        name="description"
        error={error}
        onInput={handleInputChange}
        label="Description"
        placeholder="🛒 Shopping List"
        className="min-w-[300px]"
      />

      <SelectField
        aria-label="Color"
        name="color"
        error={error}
        onChange={handleInputChange as React.ChangeEventHandler<HTMLSelectElement>}
        label="Color"
        options={colorOptions}
        className="min-w-[300px]"
      />

      <hr className="my-3" />

      <Button variant="solid" aria-label="Add List">
        Add List
      </Button>
    </form>
  );
};

export default NewListForm;
