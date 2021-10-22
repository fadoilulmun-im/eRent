/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default (props) => {
  const _component = useComponent("navbar","/app/web/src/components/navbar",{props});
  return eval(_component.render);
}