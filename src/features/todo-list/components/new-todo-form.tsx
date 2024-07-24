import { useState } from "react";
import Button from "../../../shared/components/form/button";
import TextField from "../../../shared/components/form/text-field";
import { todoItemModelValidations } from "../models/todo-item.model";

type NewTodoFormProps = {
  onAdd: (description: string) => void;
};
const NewTodoForm = ({ onAdd }: NewTodoFormProps) => {


  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validate = todoItemModelValidations.description(description);
    if (!validate.isValid) {
      setError(validate.errors.length ? validate.errors[0] : '');
      return;
    }

    onAdd(description);
  };


  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <h2 className="text-xl">Add New Todo</h2>
      <hr className="my-3" />
      <TextField
        aria-label="Description"
        error={error}
        onInput={(event) => setDescription(event.currentTarget.value)}
        label="Description" placeholder="Finish Celeste Level C's" className="min-w-[300px]" />

      <hr className="my-3" />

      <Button variant="solid" aria-label="Add Todo">
        Add Todo
      </Button>
    </form>
  );
}

export default NewTodoForm;