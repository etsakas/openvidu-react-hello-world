import React from 'react';

const Session = (props) => {

    return(
    <React.Fragment>
        <h1>{props.sessionId}</h1>
        <input type="button" onClick={props.leaveSession} value="LEAVE"/>
        <div>
            <div id="publisher">
                <h3>YOU</h3>
                <video autoPlay={true}/>
            </div>
            <div id="subscriber">
                <h3>OTHERS</h3>
                <video autoPlay={true} />
            </div>
        </div>
    </React.Fragment>
    );
};

export default Session;
