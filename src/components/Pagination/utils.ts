interface CreatePageListProps {
  totalPage: number;
  page: number;
}

const createPageList = ({ page, totalPage }: CreatePageListProps) => {
  if (totalPage < 11) {
    return {
      centerLeftPage: 1,
      centerRightPage: totalPage,
      pageList: [...Array.from({ length: totalPage }, (_, i) => i + 1)],
    };
  }

  const pageList = new Array(10);
  pageList[9] = totalPage;

  const isPageWithinLeft = 1 <= page && page <= 6;
  const isPageWithinRight = totalPage - 4 <= page && page <= totalPage;

  const centerPagesLength = isPageWithinLeft || isPageWithinRight ? 8 : 6;

  const pages = Array.from({ length: centerPagesLength }).map((_, i) => {
    if (isPageWithinLeft) {
      return i + 1;
    }

    if (isPageWithinRight) {
      return totalPage - 7 + i;
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
