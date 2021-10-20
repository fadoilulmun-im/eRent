/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default ({ children }) => {
  const _component = useComponent("payment-nav","/app/web/src/components/payment-nav",{});
  return eval(_component.render)
}