/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";
import { motion } from "framer-motion"

export default (props) => {
  const _component = useComponent("box-item2","/app/web/src/components/box-item2",{ props });
  return (<motion.div animate={{scale:1}} initial={{scale:0.8}}>{eval(_component.render)}</motion.div>)
}