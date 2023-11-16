import React from "react";
import { PropsWithChildren } from "react";
import Loading from "../Loading";

const SuspenseBoundary = (props: PropsWithChildren) => {
  return (
    <React.Suspense fallback={<Loading />}>{props.children}</React.Suspense>
  );
};

export default SuspenseBoundary;
