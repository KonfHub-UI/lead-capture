import React from "react";
import "./scanner.css";
import { Scanner } from "@yudiel/react-qr-scanner";

const ScanContainer = ({
	handleClickAdvanced,
	display,
	cameraOff,
	isScanningPaused,
	scanQRCode
}) => {
	return (
		<>
			<div className="qr-parent">
				<div 
				className={display ? "d-none" : "qr-scanner-container"}
				>
					{!isScanningPaused && (
						<Scanner
							onScan={result => {
								scanQRCode(result);
							}}
							components={{
								zoom: true,
								torch: true
							}}
							classNames={{ container: "qr-scanner-style" }}
						/>
					)} 
				</div>
				{/* <button
					className="button-styles m-3"
					onClick={() => handleClickAdvanced()}
					style={display && cameraOff ? { visibility: "visible" } : { display: "none" }}
				>
					<div className="d-flex justify-content-evenly">
						<span className="d-flex align-items-center">Scan QR Code</span>
					</div>
				</button> */}
			</div>
		</>
	);
};

export default ScanContainer;
