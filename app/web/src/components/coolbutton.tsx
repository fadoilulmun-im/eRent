/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default (props) => {
  const _component = useComponent("coolbutton","/app/web/src/components/coolbutton",{props});
  return eval(_component.render)
}