/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default (props) => {
  const _component = useComponent("rent-now","/app/web/src/components/rent-now",{ props });

  return eval(_component.render)
}