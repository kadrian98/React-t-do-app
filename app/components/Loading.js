import React, { useEffect } from "react";
import Page from "./Page";

function Loading() {
  return (
    <Page title="...">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Page>
  );
}

export default Loading;
