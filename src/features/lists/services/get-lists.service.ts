import { MyFetch } from "shared/http/my-fetch";
import { ListModel } from "../models/list.model";

const getListsService = async () => {
  const response = await MyFetch.instance.read<ListModel[]>('/api/lists');
  return response;
}

export default getListsService;