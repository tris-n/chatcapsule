import { motion } from 'framer-motion'

const loadingSpinner = {
	width: "16px",
	height: "16px",
	border: "3px solid",
	borderColor: "#fff transparent #fff transparent",
	borderRadius: "50%",
}

interface SpinnerProps {
	type: string;
}


const SpinnerButton = ({type}: SpinnerProps) => {

	return (
			<button className={type === "Delete" ? 'delete_outline_btn_active' : 'edit_outline_btn2'} disabled>
				<span style={{marginRight: "10px"}}>
					{type === "Create" && "Creating"}
					{type === "Edit" && "Editing"}
					{type === "Delete" && "Deleting"}
					{type === "Load" && "Loading"}
				</span>
				<motion.div 
					animate={{rotate: [0, 360]}}
					transition={{duration: 1.2, ease: "linear", repeat: Infinity}}
				>
					<div style={loadingSpinner}></div>
				</motion.div>
			</button>
	)
}
export default SpinnerButton