import React, { useEffect } from "react";

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | Todo App`;
    window.scrollTo(0, 0);
  }, [props.title]);
  return <>{props.children}</>;
}

export default Page;
