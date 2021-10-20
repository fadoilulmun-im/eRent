/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default (props) => {
  const _component = useComponent("box-item","/app/web/src/components/box-item",{ props });
  return eval(_component.render)
}