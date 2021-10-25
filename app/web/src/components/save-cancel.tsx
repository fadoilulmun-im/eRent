/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default (props) => {
  const _component = useComponent("save-cancel","/app/web/src/components/save-cancel",{props});
  return eval(_component.render)
}