/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default ({ children }) => {
  const _component = useComponent("button-edit-profile","/app/web/src/components/button-edit-profile",{});
  return eval(_component.render)
}