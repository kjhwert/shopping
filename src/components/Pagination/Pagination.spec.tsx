import Pagination from "./index";
import { fireEvent, render, screen } from "@testing-library/react";

describe("<Pagination />", () => {
  const fn = jest.fn();

  describe("모든 페이지가 10페이지 이하일 때", () => {
    it("모든 페이지가 5일 때 5페이지 모두 노출된다.", () => {
      const totalPage = 5;

      render(<Pagination page={1} totalPage={totalPage} onChange={fn} />);

      for (let i = 1; i <= totalPage; i++) {
        expect(screen.getByText(i)).toBeInTheDocument();
      }
    });
    it("모든 페이지가 10일 때 10페이지 모두 노출된다.", () => {
      const totalPage = 10;

      render(<Pagination page={1} totalPage={totalPage} onChange={fn} />);

      for (let i = 1; i <= totalPage; i++) {
        expect(screen.getByText(i)).toBeInTheDocument();
      }
    });
    it("페이지 점프 기능은 제공하지 않는다.", () => {
      render(<Pagination page={1} totalPage={10} onChange={fn} />);

      expect(screen.queryByRole("prev-ellipsis")).not.toBeInTheDocument();
      expect(screen.queryByRole("next-ellipsis")).not.toBeInTheDocument();
    });
  });

  describe("모든 페이지가 10페이지 이상이고", () => {
    describe("이전 페이지의 개수가 6페이지 이하일 때", () => {
      it("이전 페이지는 중략되지 않는다.", () => {
        render(<Pagination page={6} totalPage={20} onChange={fn} />);

        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("4")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("6")).toBeInTheDocument();
        expect(screen.getByText("7")).toBeInTheDocument();
        expect(screen.getByText("8")).toBeInTheDocument();

        expect(screen.queryByRole("prev-ellipsis")).not.toBeInTheDocument();
      });
    });

    describe("이전 페이지의 개수가 7페이지 이상일 때", () => {
      it("이전 페이지는 중략된다.", () => {
        render(<Pagination page={7} totalPage={20} onChange={fn} />);

        expect(screen.queryByText("2")).not.toBeInTheDocument();
        expect(screen.queryByText("3")).not.toBeInTheDocument();

        expect(screen.getByRole("prev-ellipsis")).toBeInTheDocument();
      });
    });

    describe("이후 페이지의 개수가 5페이지 이상일 때", () => {
      it("이후 페이지는 중략된다.", () => {
        render(<Pagination page={15} totalPage={20} onChange={fn} />);

        expect(screen.queryByText("18")).not.toBeInTheDocument();
        expect(screen.queryByText("19")).not.toBeInTheDocument();

        expect(screen.getByRole("next-ellipsis")).toBeInTheDocument();
      });
    });

    describe("이후 페이지의 개수가 4페이지 이하일 때", () => {
      it("이후 페이지는 중략되지 않는다.", () => {
        render(<Pagination page={16} totalPage={20} onChange={fn} />);

        expect(screen.getByText("18")).toBeInTheDocument();
        expect(screen.getByText("19")).toBeInTheDocument();

        expect(screen.queryByRole("next-ellipsis")).not.toBeInTheDocument();
      });
    });
  });

  describe("props test", () => {
    it("page는 기본 페이지", () => {
      render(<Pagination page={1} totalPage={5} onChange={fn} />);
      expect(screen.getByText("1")).toHaveClass("active");
    });
    it("totalPage는 전체 페이지", () => {
      render(<Pagination page={1} totalPage={50} onChange={fn} />);
      expect(screen.getByText("50")).toBeInTheDocument();
    });
    it("onChange 페이지가 변경될 때 변경된 페이지 값을 반환", () => {
      render(<Pagination page={10} totalPage={20} onChange={fn} />);

      fireEvent.click(screen.getByRole("prev-page"));
      expect(fn).toHaveBeenCalledWith(9);

      fireEvent.click(screen.getByRole("next-page"));
      expect(fn).toHaveBeenCalledWith(10);

      fireEvent.click(screen.getByRole("prev-ellipsis"));
      expect(fn).toHaveBeenCalledWith(6);

      fireEvent.click(screen.getByRole("next-ellipsis"));
      expect(fn).toHaveBeenCalledWith(9);

      fireEvent.click(screen.getByText("20"));
      expect(fn).toHaveBeenCalledWith(20);
    });
  });

  describe("LeftArrow", () => {
    it("현재 페이지가 1페이지일 경우 미노출", () => {
      render(<Pagination page={1} totalPage={5} onChange={fn} />);
      expect(screen.queryByRole("prev-page")).not.toBeInTheDocument();
    });
    it("현재 페이지가 2페이지 이상일 경우 노출", () => {
      render(<Pagination page={2} totalPage={5} onChange={fn} />);
      expect(screen.getByRole("prev-page")).toBeInTheDocument();
    });
    it("클릭하면 이전 페이지로 이동", () => {
      render(<Pagination page={2} totalPage={5} onChange={fn} />);

      fireEvent.click(screen.getByRole("prev-page"));

      expect(screen.getByText("1")).toHaveClass("active");
    });
  });

  describe("RightArrow", () => {
    it("현재 페이지가 마지막 페이지일 경우 미노출", () => {
      render(<Pagination page={5} totalPage={5} onChange={fn} />);

      expect(screen.queryByRole("next-page")).not.toBeInTheDocument();
    });
    it("현재 페이지가 마지막 페이지가 아닐 경우 노출", () => {
      render(<Pagination page={4} totalPage={5} onChange={fn} />);

      expect(screen.getByRole("next-page")).toBeInTheDocument();
    });
    it("클릭하면 다음 페이지로 이동", () => {
      render(<Pagination page={4} totalPage={5} onChange={fn} />);

      fireEvent.click(screen.getByRole("next-page"));

      expect(screen.getByText("5")).toHaveClass("active");
    });
  });

  describe("Leftellipsis 클릭시", () => {
    it("중략된 페이지로 이동", () => {
      render(<Pagination page={20} totalPage={40} onChange={fn} />);

      fireEvent.click(screen.getByRole("prev-ellipsis"));

      expect(screen.getByText("16")).toHaveClass("active");

      fireEvent.click(screen.getByRole("prev-ellipsis"));

      expect(screen.getByText("12")).toHaveClass("active");

      fireEvent.click(screen.getByRole("prev-ellipsis"));

      expect(screen.getByText("8")).toHaveClass("active");
    });
  });
  describe("Rightellipsis", () => {
    it("중략된 페이지로 이동", () => {
      render(<Pagination page={20} totalPage={40} onChange={fn} />);

      fireEvent.click(screen.getByRole("next-ellipsis"));

      expect(screen.getByText("23")).toHaveClass("active");

      fireEvent.click(screen.getByRole("next-ellipsis"));

      expect(screen.getByText("26")).toHaveClass("active");

      fireEvent.click(screen.getByRole("next-ellipsis"));

      expect(screen.getByText("29")).toHaveClass("active");
    });
  });
});
