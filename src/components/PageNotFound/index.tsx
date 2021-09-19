import React, { FC, memo } from "react";

interface Props {}

const PageNotFound: FC<Props> = () => {
  return <div>Oops!! Page not found</div>;
};

export default memo(PageNotFound);
