import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { Option } from "../types/option";

export function useStates() {
  return useQuery({
    queryKey: ["states"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:3000/api/users/states")
        .then((res) => res.data),
  });
}
