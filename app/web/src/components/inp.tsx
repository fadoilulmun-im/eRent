/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default ({ children }) => {
  const _component = useComponent("inp","/app/web/src/components/inp",{});
  return eval(_component.render)
}