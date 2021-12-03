
import { motion } from "framer-motion";

export default (props) => {
    return (
        <motion.span whileTap={{ scale: 0.9 }} style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }} onClick={props.onClick}
            className={(props.active ? "border-blue-700" : "border-coolGray-300") +
                " px-5 py-2 text-sm text-coolGray-900 bg-white shadow border rounded-full flex items-center"}>

            {props.title}

        </motion.span>
    )
}