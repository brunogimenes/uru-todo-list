import { MyFetch } from "shared/http/my-fetch";

const deleteListService = async (listId: string) => {
  MyFetch.instance.delete('/api/lists/:id', {
    id: listId
  },
  );
};

export default deleteListService;