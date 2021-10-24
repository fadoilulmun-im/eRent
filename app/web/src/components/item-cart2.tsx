/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default (props) => {
  const _component = useComponent("item-cart2","/app/web/src/components/item-cart2",{props});
  return eval(_component.render)
}