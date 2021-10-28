/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default ({ children }) => {
  const _component = useComponent("order-history","/app/web/src/components/order-history",{});
  return eval(_component.render);
}