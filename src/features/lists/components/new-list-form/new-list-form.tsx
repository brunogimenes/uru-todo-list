import React from 'react';
import Button from '../../../../shared/components/form/button';
import TextField from '../../../../shared/components/form/text-field';
import { ListModel } from '../../models/list.model';
import { useNewListForm } from './use-new-list-form';
import SelectField from '../../../../shared/components/form/select';
import { listColors } from '../../config/list-colors';


type NewListFormProps = {
  initialList: ListModel;
  onConfirm: (list: ListModel) => void;
};

const NewListForm = (props: NewListFormProps) => {
  const { initialList, onConfirm } = props;
  const { list, errors, handleInputChange, handleSubmit } = useNewListForm(
    {
      initialList,
      onConfirm,
    }
  );

  const buttonText = initialList.id ? 'Edit List' : 'Create List';

  return (
    <form className="flex flex-col rounded p-4" onSubmit={handleSubmit}>
      <TextField
        aria-label="Name"
        name="name"
        errors={errors}
        onInput={handleInputChange}
        value={list.name}
        label="Name"
        placeholder="Shopping List"
        className="min-w-[300px]"
      />

      <TextField
        aria-label="Description"
        name="description"
        errors={errors}
        onInput={handleInputChange}
        value={list.description}
        label="Description"
        placeholder="🛒 Shopping List"
        className="min-w-[300px]"
      />
      <div className="flex items-center">
        <SelectField
          aria-label="Color"
          name="color"
          errors={errors}
          value={list.color}
          onChange={handleInputChange as React.ChangeEventHandler<HTMLSelectElement>}
          label="Color"
          options={listColors}
          className="min-w-[300px]"
        />
        <div className="h-4 w-4 rounded-full ml-4" style={{
          backgroundColor: list.color,
        }} />
      </div>

      <hr className="my-3" />

      <Button variant="solid" aria-label="Add List">
        {buttonText}
      </Button>
    </form>
  );
};

export default NewListForm;
