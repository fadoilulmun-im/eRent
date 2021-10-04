/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default ({ children }) => {
const _component = useComponent("btn","/app/web/src/components/btn",{});
return eval(_component.render);
}