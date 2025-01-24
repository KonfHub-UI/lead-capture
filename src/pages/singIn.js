import ScanContainer from "../components/scanner/scanner";
import { useState, useEffect, useRef, useCallback } from "react";
import {Button, BorderedButton} from "./../components/buttons/Buttons";

const SignIn = () =>{
	const [display, setDisplay] = useState(false);
	const [cameraOff, setCameraOff] = useState(true);
	const [isScanningPaused, setIsScanningPaused] = useState(false);
	const [attendeeScanDetails, setAttendeeScanDetails] = useState([]);
	const [loading, setLoading] = useState(false);
	const [displayQrScanner, setDisplayQrScanner] = useState(false);
    
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

    const onScanQRCode = async decodeText => {
		setDisplay(false);
		handleStop();
		setDisplayQrScanner(true);

		const decodedEntry = decodeTextFormatter(decodeText[0]);
		
			// const findAttendeeFromIndexDB = await attendees.get(decodedEntry.id);
			// setAttendeeScanDetails(findAttendeeFromIndexDB);
				// if (decodedEntry["id"].includes(",")) {
				// 	let SingleBuyerAttendeeIdArr = [...decodedEntry["id"].split(",")];
				// 	var encodedBookingId = encodeURIComponent(decodedEntry["id"]);
				// 	let SingleBuyerAttendeeDetailsArr = [];
				// 	let checkInAttendeeDetails = [];
				// 	await Promise.all(
				// 		SingleBuyerAttendeeIdArr.map(async (individualAttendee, index) => {
				// 			const findAttendeeFromIndexDB = await attendees.get(individualAttendee);
				// 			SingleBuyerAttendeeDetailsArr.push(findAttendeeFromIndexDB);
				// 			if (findAttendeeFromIndexDB.checkInStatus == "true") {
				// 				checkInAttendeeDetails.push(findAttendeeFromIndexDB);
				// 			}
				// 			if (findAttendeeFromIndexDB.customForms) {
				// 				showListOfForms(findAttendeeFromIndexDB.customForms);
				// 			}
				// 			if (SingleBuyerAttendeeIdArr.length === index + 1) {
				// 				setCheckInBoxToggleArr(SingleBuyerAttendeeDetailsArr);
				// 			}
				// 		})
				// 	);
				// 	navigate({
				// 		pathname: `/Events/${event_id}/scanDetails/singleBuyer`,
				// 		search: `?bookingId=${encodedBookingId}&accessCode=${accessCode}`
				// 	});
				// } else if (findAttendeeFromIndexDB) {
				// 	navigate({
				// 		pathname: `/Events/${event_id}/scanDetails/scanModal`,
				// 		search: `?bookingId=${findAttendeeFromIndexDB.bookingId}`
				// 	});
				// 	findDuplicate(decodedEntry["id"]);
				// 	setSingleAttendee(findAttendeeFromIndexDB);
				// 	if (findAttendeeFromIndexDB.customForms) {
				// 		showListOfForms(findAttendeeFromIndexDB.customForms);
				// 	}
				// } else if (decodedEntry?.["eid"] === event_id && !findAttendeeFromIndexDB) {
				// 	setBookingIdForSyncNow(decodedEntry.id);
				// 	if (!networkStatus) {
				// 		setNewAttendeeNoNetworkModal(true);
				// 		setNewAttendeeModal(true);
				// 	} else {
				// 		setNewAttendeeNoNetworkModal(false);
				// 		SyncDetailsClickHandler(decodedEntry.id);
				// 	}
				// 	setLoadingNewData(false);
				// }
			
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