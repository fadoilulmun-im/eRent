/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";
//import { motion } from "framer-motion"

export default (props) => {
  const _component = useComponent("box-item2","/app/web/src/components/box-item2",{ props });
  return eval(_component.render)
}