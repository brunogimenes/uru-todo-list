import useMutateLists from "../hooks/use-mutate-list";
import { ListModel } from "../models/list.model";

type DeleteListDialogProps = {
  list: ListModel;
  onAfterDelete: () => void;
  onCancel: () => void;
}

const DeleteListDialog = (props: DeleteListDialogProps) => {
  const { list, onAfterDelete, onCancel } = props;

  const { deleteList } = useMutateLists();

  const onConfirm = async () => {
    await deleteList(list.id);
    onAfterDelete();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded flex flex-col">
        <h2 className="text-lg font-semibold">Delete List</h2>
        <p>Are you sure you want to delete the list <span className="font-semibold">{list.name}</span>?</p>
        <div className="flex justify-end mt-4">
          <button className="bg-red-500 text-white rounded px-4 py-2 mr-2" onClick={onConfirm}>Delete</button>
          <button className="bg-gray-300 text-gray-800 rounded px-4 py-2" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteListDialog;