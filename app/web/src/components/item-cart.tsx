/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default (props) => {
  const _component = useComponent("item-cart","/app/web/src/components/item-cart",{ props });
  return eval(_component.render)
}