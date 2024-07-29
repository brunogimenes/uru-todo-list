import { useState } from "react";

import { FieldErrors } from "shared/models/validation-model";

import TextField from "shared/components/form/text-field";
import Button from "shared/components/form/button";
import { todoItemModelValidator } from "features/todo-list/models/todo-item.model";



type NewTodoFormProps = {
  onAdd: (description: string) => void;
};
const NewTodoForm = ({ onAdd }: NewTodoFormProps) => {


  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validResult = todoItemModelValidator({ description, id: '', isComplete: false });

    if (!validResult.isValid) {
      setErrors(validResult.errors);
      return;
    }

    onAdd(description);
  };


  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <h2 className="text-xl">Add New Todo</h2>
      <hr className="my-3" />
      <TextField
        name="description"
        aria-label="Description"
        errors={errors}
        onInput={(event) => setDescription(event.currentTarget.value)}
        label="Description" placeholder="Buy Elden Rings DLC" className="min-w-[300px]" />

      <hr className="my-3" />

      <Button variant="solid" aria-label="Add Todo">
        Add Todo
      </Button>
    </form>
  );
}

export default NewTodoForm;