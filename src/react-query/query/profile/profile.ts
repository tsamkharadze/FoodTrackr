import { Profile } from "@/types/user";
import { getProfileInfo } from "../../../supabase/account";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

export const useGetProfile = <T = Profile | null>({
  userId,
  queryOptions = {},
}: {
  userId: string;
  queryOptions?: Omit<UseQueryOptions<T, unknown, T>, "queryKey">;
}): UseQueryResult<T, unknown> => {
  return useQuery<T, unknown, T>({
    queryKey: ["profileInfo", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is missing");
      const response = await getProfileInfo(userId);
      return (response?.data?.[0] ?? null) as T;
    },
    enabled: !!userId,
    ...queryOptions,
  });
};
