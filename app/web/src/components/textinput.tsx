/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default ({ children }) => {
  const _component = useComponent("textinput","/app/web/src/components/textinput",{});
  return eval(_component.render)
}