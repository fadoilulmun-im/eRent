/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default ({ children }) => {
  const _component = useComponent("shipping-nav","/app/web/src/components/shipping-nav",{});
  return eval(_component.render)
}