import ScanContainer from "../components/scanner/scanner";
import { useState, useEffect, useRef, useCallback } from "react";
import {Button, BorderedButton} from "./../components/buttons/Buttons";
import { useNavigate, Outlet } from "react-router-dom";

const SignIn = () =>{
	const [display, setDisplay] = useState(false);
	const [cameraOff, setCameraOff] = useState(true);
	const [isScanningPaused, setIsScanningPaused] = useState(false);
	const [attendeeScanDetails, setAttendeeScanDetails] = useState([]);
	const [loading, setLoading] = useState(false);
	const [displayQrScanner, setDisplayQrScanner] = useState(false);
    
	const navigate = useNavigate();

    const handleClickAdvanced = () => {
		setDisplay(false);
		setDisplayQrScanner(true);
		setIsScanningPaused(false);
	};
    
    const scanQRCode = result => {
		setIsScanningPaused(true);
		onScanQRCode(result);
	};

    const handleStop = () => {
		setIsScanningPaused(true);
		setDisplay(true);
	};

    const decodeTextFormatter = scannedText => {
		let entryText = "";
		let entry = "";
		let decodeText = scannedText.rawValue;
		if (decodeText.includes("|")) {
			entryText = `{"${decodeText.replaceAll("|", '","').replaceAll(":", '":"')}"}`;
			entry = { ...JSON.parse(entryText) };
			return entry;
		} else {
			return decodeText;
		}
	};

    const stopCamera = () => {
		setCameraOff(true);
		setIsScanningPaused(() => true);
	};

	const fetchLeadDetails = async (bookingId) => {
		try {
		  const response = await fetch(
			`https://q8nn4dzd1h.execute-api.ap-southeast-1.amazonaws.com/dev/hackathon-apis/scan/${bookingId}`
		  ,{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			  },
		  });
		  const data = await response.json();
		  if (data) {
			navigate({
				pathname: `/games`,
			});
		  } else {
			alert('Please scan proper QR Code');
		  }
		} catch (error) {
		  console.error('Error fetching words:', error);
		}
	  };

    const onScanQRCode = async decodeText => {
		setDisplay(false);
		handleStop();
		setDisplayQrScanner(true);

		const decodedEntry = decodeTextFormatter(decodeText[0]);
		fetchLeadDetails(decodedEntry.id);
	};

    const scanAttendee = () => {
		setCameraOff(false);
		setDisplayQrScanner(false);
	};

    return(
        <div className="page-bg mt-5">
            <div className="d-flex justify-content-center flex-row flex-column text-center">
                <h1 className="main-heading mt-5">Lets have fun!</h1>
                <p>Scan your QR code or fill the forms to get started!</p>
            </div>
            <div className="d-flex justify-content-center">
                <div className="">
                <ScanContainer
                handleClickAdvanced={handleClickAdvanced}
                display={display}
                scanAttendee={() => scanAttendee()}
                cameraOff={cameraOff}
                isScanningPaused={isScanningPaused}
                scanQRCode={scanQRCode}
            />
            {/* <div className="d-flex flex-column mt-5">
                <BorderedButton btnType="bordered" className="m-2" onClick={stopCamera}>
                    Stop Camera
                </BorderedButton>
            </div> */}
                </div>
                {/* <div className="d-flex align-items-center mx-4">OR</div>
                <div></div> */}
            </div>
        </div>
    )
}

export default SignIn;