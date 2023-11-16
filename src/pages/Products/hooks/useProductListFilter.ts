import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const useProductListFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  useEffect(() => {
    if (Number.isNaN(page)) {
      handlePageChange(1);
    }
  }, []);

  return {
    page,
    onPageChange: handlePageChange,
  };
};

export default useProductListFilter;
