import { useEffect, useState } from "react";

interface PageListProps {
  page: number;
  totalPage: number;
}

const PAGE_COUNT_ELLIPSIS_ONCE = 8;
const PAGE_COUNT_ELLIPSIS_TWICE = 6;

const createArray = (length: number, callback: (index: number) => number) => {
  return Array.from({ length }, (_, i) => callback(i));
};

const usePageList = ({ page, totalPage }: PageListProps) => {
  const [pageList, setPageList] = useState<(number | string)[]>([]);

  const [leftEllipsisPage, setLeftEllipsisPage] = useState(1);
  const [rightEllipsisPage, setRightEllipsisPage] = useState(totalPage);

  useEffect(() => {
    if (totalPage < 11) {
      setPageList(createArray(totalPage, (i) => i + 1));
      return;
    }

    const isLeftSideEllipsis = 7 <= page;
    const isRightSideEllipsis = page < totalPage - 4;

    const centerPagesLength =
      isLeftSideEllipsis && isRightSideEllipsis
        ? PAGE_COUNT_ELLIPSIS_TWICE
        : PAGE_COUNT_ELLIPSIS_ONCE;

    const pages = createArray(centerPagesLength, (i) => {
      if (!isLeftSideEllipsis) {
        return i + 1;
      }

      if (!isRightSideEllipsis) {
        return i + totalPage - 7;
      }

      return i + page - 3;
    });

    const leftSide = isLeftSideEllipsis ? [1, "..."] : [];
    const rightSide = isRightSideEllipsis ? ["...", totalPage] : [];

    const leftEllipsisPage = pages[0] - 1;
    const rightEllipsisPage = pages[pages.length - 1] + 1;

    setLeftEllipsisPage(leftEllipsisPage);
    setRightEllipsisPage(rightEllipsisPage);
    setPageList([...leftSide, ...pages, ...rightSide]);
  }, [page, totalPage]);

  return {
    leftEllipsisPage,
    rightEllipsisPage,
    pageList,
  };
};

export default usePageList;
