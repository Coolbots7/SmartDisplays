import React from 'react';
import Clock from '../../components/Clock';
import Weather from '../../components/Weather';
import OctoPrint from '../../components/OctoPrint';
import Alarm from '../../components/Alarm';
import Mail from '../../components/Mail';
import OneWheel from '../../components/OneWheel';
import Blackout from '../../components/Blackout';

const SmartScreen = () => (
    <>
        <div className="smart-screen container-fluid h-100 d-flex flex-column pb-2">
            <div className="row">
                <div className="col">
                    <Clock />
                    <Alarm />
                </div>
            </div>
            <div className="row mt-auto justify-content-between">
                <div className="col-auto">
                    <Mail title="Gmail" unreadItem='GmailIMAP_InboxUnread' totalItem='GmailIMAP_InboxTotal' />
                    <Mail title="JPL Email" unreadItem='JPLIMAP_InboxUnread' totalItem='JPLIMAP_InboxTotal' />
                </div>
                <div className="col-auto mr-auto">
                    <OneWheel />
                </div>
                <div className="col-auto">
                    <Weather />
                </div>
            </div>
        </div>
        <div className="position-absolute p-0 m-0" style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
            <div className="row d-flex align-items-center justify-content-center h-100 w-100">
                <div className="col-auto">
                    <OctoPrint />
                </div>
            </div>
        </div>
        <Blackout />
    </>
);

export default SmartScreen;