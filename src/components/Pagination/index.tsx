import * as S from "./styles";
import IconArrow from "../../assets/icons/IconArrow";
import { useCallback, useState } from "react";
import createPageList from "./utils";

interface PaginationProps {
  page: number;
  totalPage: number;
  onChange: (page: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const { page, totalPage, onChange } = props;

  const [currentPage, setCurrentPage] = useState(page);

  const { pageList, centerLeftPage, centerRightPage } = createPageList({
    page: currentPage,
    totalPage,
  });

  const handlePageChange = useCallback(
    (page: number) => {
      onChange(page);
      setCurrentPage(page);
    },
    [onChange],
  );

  const handlePageClick = useCallback(
    (page: number | string, index: number) => {
      if (typeof page === "string") {
        if (index === 1) {
          handlePageChange(centerLeftPage - 1);
        } else {
          handlePageChange(centerRightPage + 1);
        }
        return;
      }

      handlePageChange(page);
    },
    [centerLeftPage, centerRightPage, handlePageChange],
  );

  return (
    <S.Layout>
      {currentPage > 1 && (
        <S.Arrow
          role="prev-page"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <IconArrow direction="left" />
        </S.Arrow>
      )}
      <S.PageList>
        {pageList.map((page, index) => (
          <S.PageItem
            key={`page-${index}`}
            role={
              typeof page === "string"
                ? index === 1
                  ? "prev-jump"
                  : "next-jump"
                : undefined
            }
            onClick={() => handlePageClick(page, index)}
          >
            <S.PageSpan className={currentPage === page ? "active" : ""}>
              {page}
            </S.PageSpan>
          </S.PageItem>
        ))}
      </S.PageList>
      {currentPage < totalPage && (
        <S.Arrow
          role="next-page"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <IconArrow direction="right" />
        </S.Arrow>
      )}
    </S.Layout>
  );
};

export default Pagination;
