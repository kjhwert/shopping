interface CreatePageListProps {
  totalPage: number;
  page: number;
}

const PAGE_COUNT_ELLIPSIS_ONCE = 8;
const PAGE_COUNT_ELLIPSIS_TWICE = 6;

const createArray = (length: number, callback: (index: number) => number) => {
  return Array.from({ length }, (_, i) => callback(i));
};

const createPageList = ({ page, totalPage }: CreatePageListProps) => {
  if (totalPage < 11) {
    return {
      centerLeftPage: 1,
      centerRightPage: totalPage,
      pageList: createArray(totalPage, (i) => i + 1),
    };
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

  const centerLeftPage = pages[0];
  const centerRightPage = pages[pages.length - 1];

  return {
    centerLeftPage,
    centerRightPage,
    pageList: [...leftSide, ...pages, ...rightSide],
  };
};

export default createPageList;
