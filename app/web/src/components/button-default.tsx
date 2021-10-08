/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default ({ children }) => {
const _component = useComponent("button-default","/app/web/src/components/button-default",{});
return eval(_component.render);
}