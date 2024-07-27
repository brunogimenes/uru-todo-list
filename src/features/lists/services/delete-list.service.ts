import { MyFetch } from "shared/http/my-fetch";

const deleteListService = async (listId: string) => {
  MyFetch.instance.write('/api/lists/:id', {
    method: 'DELETE',
    params: {
      id: listId
    },
  });
};

export default deleteListService;