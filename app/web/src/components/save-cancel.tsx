/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default ({ children }) => {
  const _component = useComponent("save-cancel","/app/web/src/components/save-cancel",{});
  return eval(_component.render)
}