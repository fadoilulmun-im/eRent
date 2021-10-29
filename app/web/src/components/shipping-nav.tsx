/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default (props) => {
  const _component = useComponent("shipping-nav","/app/web/src/components/shipping-nav",{ props });
  return eval(_component.render)
}