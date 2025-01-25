import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDebounce } from "@uidotdev/usehooks";
import i18n from "@/i18n";
import { Input } from "@/components/ui/input";
import { useFoodSearch } from "@/react-query/query/profile/food";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import qs from "qs";

const FoodsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const { t } = useTranslation();
  const language = i18n.language === "ka" ? "ka" : "en";
  const [search, setSearch] = useState(searchQuery); // Initialize with searchQuery

  const debouncedSearch = useDebounce(search, 500);

  const handleSearchChange = (value: string) => {
    const queryString = qs.stringify({ search: value }, { skipNulls: true });
    setSearchParams(queryString);
    setSearch(value);
  };

  const {
    data: foods = [],
    isLoading,
    isError,
  } = useFoodSearch(debouncedSearch, language);

  if (isLoading) {
    return <div>{t("foods-table-translation.loading")}</div>;
  }

  if (isError) {
    return <div>{`${t("foods-table-translation.error")} ${isError}`}</div>;
  }

  const handleSetSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearchChange(value); // Call handleSearchChange when input changes
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("foods-table-translation.title")}</CardTitle>
        <Input
          placeholder={t("foods-table-translation.search-placeholder")}
          value={search}
          onChange={handleSetSearch}
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                {t("foods-table-translation.table-head-name-en")}
              </TableHead>
              <TableHead>
                {t("foods-table-translation.table-head-name-ka")}
              </TableHead>
              <TableHead>
                {t("foods-table-translation.table-head-calories")}
              </TableHead>
              <TableHead>
                {t("foods-table-translation.table-head-protein")}
              </TableHead>
              <TableHead>
                {t("foods-table-translation.table-head-carbs")}
              </TableHead>
              <TableHead>
                {t("foods-table-translation.table-head-fat")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {foods.map((food, index) => (
              <TableRow key={index}>
                <TableCell>{food.name_en}</TableCell>
                <TableCell>{food.name_ka}</TableCell>
                <TableCell>{food.calories_per_100?.toFixed(1)}</TableCell>
                <TableCell>{food.proteins_per_100?.toFixed(1)}</TableCell>
                <TableCell>{food.carbs_per_100?.toFixed(1)}</TableCell>
                <TableCell>{food.fats_per_100?.toFixed(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FoodsTable;
