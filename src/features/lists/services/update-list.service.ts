import { MyFetch } from "shared/http/my-fetch";
import { ListModel } from "../models/list.model";

const updateListService = async (list: ListModel) => {
  MyFetch.instance.write('/api/lists/:id', {
    method: 'PUT',
    params: {
      id: list.id,
    },
    body: list,
  });
};

export default updateListService;