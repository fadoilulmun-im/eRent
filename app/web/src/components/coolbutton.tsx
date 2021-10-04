/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default ({ children }) => {
  const _component = useComponent("coolbutton","/app/web/src/components/coolbutton",{});
  return eval(_component.render)
}