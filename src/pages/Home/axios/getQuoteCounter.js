import { axiosPrivate } from "../../../api/axios";

export async function getQuoteCounter(companyId) {
  const endpoint = "company/get/" + companyId + "/counter";
  return await axiosPrivate.get(endpoint).then(res => res.data[0]?.quote_counter);
}
