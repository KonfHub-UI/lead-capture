import React from "react";
import { Spinner } from "react-rainbow-components";
import "./Buttons.css";

const isDisabled = ({ disabled, isLoading, formik }) => {
	if (disabled) {
		return true;
	} else if (isLoading) {
		return true;
	} else if (formik) {
		if (formik.isValid && !formik.dirty) return true;
		else return false;
	} else return false;
};

export const Button = ({
	children,
	onClick,
	disabled,
	btnType,
	className = "",
	isLoading = false,
	formik = null
}) => {
	const getClassName = () => {
		let newClassName = "";

		if (btnType === "primary") newClassName = "primary-btn";
		else if (btnType === "primary-small") newClassName = "primary-small-btn";
		else if (btnType === "secondary-small") newClassName = "secondary-small-btn";

		if (className) newClassName = `${newClassName} ${className}`;

		return newClassName;
	};

	return (
		<button
			onClick={onClick}
			disabled={isDisabled({ disabled, isLoading, formik })}
			className={getClassName()}
		>
			{isLoading ? (
				<div className="position-relative w-100 h-100">
					<Spinner
						className={`${
							btnType === "primary" ? "white-spinner" : "small-white-spinner"
						}`}
						size="x-small"
						type="arc"
						variant="brand"
					/>
				</div>
			) : (
				children
			)}
		</button>
	);
};

export const BorderedButton = ({
	children,
	onClick,
	disabled,
	className,
	isLoading,
	formik,
	btnType,
	whiteSpinner = false
}) => {
	const getClassName = () => {
		let newClassName = "";

		if (btnType === "bordered") newClassName = "bordered-btn";
		else if (btnType === "bordered-small") newClassName = "bordered-small-button";

		if (className) newClassName = `${newClassName} ${className}`;

		return newClassName;
	};
	return (
		<button
			onClick={onClick}
			disabled={isDisabled({ disabled, isLoading, formik })}
			className={getClassName()}
		>
			{isLoading ? (
				<div className="position-relative w-100 h-100">
					<Spinner
						className={`${
							whiteSpinner ? "white-square-spinner" : "orange-square-spinner"
						}`}
						size="x-small"
						type="arc"
						variant="brand"
					/>
				</div>
			) : (
				children
			)}
		</button>
	);
};
