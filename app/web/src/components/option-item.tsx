/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default (props) => {
  const _component = useComponent("option-item","/app/web/src/components/option-item",{ props });
  return eval(_component.render)
}