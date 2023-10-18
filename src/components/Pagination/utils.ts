interface CreatePageListProps {
  totalPage: number;
  page: number;
}

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

  const isPageWithinLeft = 1 <= page && page <= 6;
  const isPageWithinRight = totalPage - 4 <= page && page <= totalPage;

  const centerPagesLength = isPageWithinLeft || isPageWithinRight ? 8 : 6;

  const pages = createArray(centerPagesLength, (i) => {
    if (isPageWithinLeft) {
      return i + 1;
    }

    if (isPageWithinRight) {
      return i + totalPage - 7;
    }

    return i + page - 3;
  });

  const leftSide = isPageWithinLeft ? [] : [1, "..."];
  const rightSide = isPageWithinRight ? [] : ["...", totalPage];

  const centerLeftPage = pages[0];
  const centerRightPage = pages[pages.length - 1];

  return {
    centerLeftPage,
    centerRightPage,
    pageList: [...leftSide, ...pages, ...rightSide],
  };
};

export default createPageList;
