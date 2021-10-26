/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default (props) => {
  const _component = useComponent("delivery-status","/app/web/src/components/delivery-status",{props});
  return eval(_component.render)
}