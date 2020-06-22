import React from 'react';
import Clock from '../../components/Clock';
import DoNotDisturb from '../../components/DoNotDisturb';

const TinyScreen = () => (
    <>
        <div className="tiny-screen container-fluid h-100 d-flex flex-column pb-2">
            <div className="row">
                <div className="col">
                    <Clock />
                </div>
            </div>
        </div>
        <div className="position-absolute p-0 m-0" style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
            <div className="row d-flex align-items-center justify-content-center h-100 w-100">
                <div className="col-auto mt-auto mb-5">
                    <DoNotDisturb />
                </div>
            </div>
        </div>
    </>
);

export default TinyScreen;