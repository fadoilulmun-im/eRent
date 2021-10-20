/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default ({ children }) => {
  const _component = useComponent("bottom-nav-detail-product","/app/web/src/components/bottom-nav-detail-product",{});
  return eval(_component.render)
}