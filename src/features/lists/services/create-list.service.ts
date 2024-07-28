import { MyFetch } from "shared/http/my-fetch";
import { ListModel } from "../models/list.model";

const createListService = async (list: ListModel) => {
  return await MyFetch.instance.write('/api/lists', {
    method: 'POST',
    body: list,
  });
};

export default createListService;