/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default (props) => {
  const _component = useComponent("notif","/app/web/src/components/notif",{ props });
  return eval(_component.render)
}