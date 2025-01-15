import { useMemo } from "react";
import dayjs from "dayjs";

const useToday = (format: string = "YYYY-MM-DD") => {
  const today = useMemo(() => dayjs().format(format), [format]);
  return today;
};

export default useToday;
