/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default ({ children }) => {
  const _component = useComponent("total-price-cart","/app/web/src/components/total-price-cart",{});
  return eval(_component.render)
}