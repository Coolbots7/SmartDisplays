import React from 'react';
import Clock from '../../components/Clock';
import OctoPrint from '../../components/OctoPrint';
import Alarm from '../../components/Alarm';
import Mail from '../../components/Mail';
import OneWheel from '../../components/OneWheel';
import Blackout from '../../components/Blackout';
import DoNotDisturbCard from '../../components/DoNotDisturb/DoNotDisturbCard';
import Phone from '../../components/Phone';
import NestHub from '../../components/NestHub';
import Temperature from '../../components/Temperature';
import { CurrentWeather, DailyForecast, WeatherCard } from '../../components/Weather';

const SmartScreen = () => (
    <>
        <div className="smart-screen container-fluid h-100 d-flex flex-column pb-2">
            <div className="row">
                <div className="col">
                    <Clock />
                    <Alarm />
                </div>
            </div>
            <div className="row mt-auto mb-2 justify-content-between">
                <div className="col-3 d-flex flex-column align-self-end">
                    <div>
                        <Mail title="Gmail" unreadItem='GmailIMAP_InboxUnread' />
                    </div>
                    <div className="mt-3">
                        <Mail title="JPL Email" unreadItem='JPLIMAP_InboxUnread' />
                    </div>
                    <div className="mt-3">
                        <OneWheel
                            connectedItemName="OneWheel_Connected"
                            chargingItemName="OneWheel_Charging"
                            batteryRemainingItemName="OneWheel_Battery_Remaining"
                            lifetimeOdometerItemName="OneWheel_Lifetime_Odometer" />
                    </div>
                </div>
                <div className="col-4 ml-auto d-flex flex-column align-self-end w-100">
                    <div>
                        <DoNotDisturbCard hideWhenOff={true} />
                    </div>
                    <div className="mt-3">
                        <Phone
                            phoneName="HAL Mobile"
                            batteryItemName="HAL_MOBILEBatteryLevel"
                            chargingItemName="HAL_MOBILEChargingState" />
                    </div>
                    <div className="mt-3">
                        <Phone
                            phoneName="S7"
                            batteryItemName="S7_BatteryLevel"
                            chargingItemName="S7_ChargingState" />
                    </div>
                    <div className="mt-3">
                        <WeatherCard lat="34.1443" lon="-118.0019" units="imperial">
                            <CurrentWeather />
                            <DailyForecast days={5} includeToday={false} />
                        </WeatherCard>
                    </div>
                </div>
            </div>
        </div>
        <div className="position-absolute p-0 m-0" style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
            <div className="d-flex flex-column align-items-center justify-content-center h-100 w-100">
                <div className="col-6 d-flex flex-column">
                    <div>
                        <OctoPrint />
                    </div>
                    <div className="mt-3">
                        <NestHub 
                            appItemName="BedroomGoogleHub_App"
                            mediaTypeItemName="BedroomGoogleHub_MediaType"
                            currentTimeItemName="BedroomGoogleHub_CurrentTime"
                            durationItemName="BedroomGoogleHub_Duration"
                            albumNameItemName="BedroomGoogleHub_AlbumName"
                            mediaArtistItemName="BedroomGoogleHub_MediaArtist"
                            imageURLItemName="BedroomGoogleHub_ImageURL"
                            mediaTitleItemName="BedroomGoogleHub_MediaTitle"
                            subtitleItemName="BedroomGoogleHub_Subtitle" />
                    </div>
                </div>
            </div>
        </div>
        <Blackout />
    </>
);

export default SmartScreen;