interface Sort<T> {
  field: T;
  order: SortOrder;
}

type SortOrder = "asc" | "desc";
