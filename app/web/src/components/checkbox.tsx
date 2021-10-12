/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default ({ children }) => {
  const _component = useComponent("checkbox","/app/web/src/components/checkbox",{});
  return eval(_component.render);
}