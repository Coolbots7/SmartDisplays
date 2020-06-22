import React from 'react';

function formatSeconds(duration) {
    var seconds = duration % 60;

    var minutes = (duration / 60) % 60;

    var hours = duration / (3600);

    return <>
        {hours > 1 &&
            <span className="pr-2">
                <span>{Math.floor(hours)}</span><small>H</small>
            </span>
        }

        <span className="pr-2">
            <span>{Math.floor(minutes)}</span><small>M</small>
        </span>

        <span className="pr-2">
            <span>{seconds.toFixed(0)}</span><small>S</small>
        </span >
    </>;
}

export { formatSeconds };