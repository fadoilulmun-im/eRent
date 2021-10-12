/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default ({ children }) => {
const _component = useComponent("chk","/app/web/src/components/chk",{});
return eval(_component.render);
}