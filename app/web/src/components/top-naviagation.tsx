/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default (props) => {
  const _component = useComponent("top-naviagation","/app/web/src/components/top-naviagation",{ props });
  return eval(_component.render)
}