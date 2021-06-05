import styles from './Session.module.css';
import React from 'react';
import OpenViduVideo from './OpenViduVideo';

const Session = (props) => {

    return(
    <React.Fragment>
        <h1>{props.sessionId}</h1>
        <input type="button" onClick={props.leaveSession} value="LEAVE"/>
        <div>
            <div className={styles.publisher}>
                <h3>YOU</h3>
                <OpenViduVideo streamManager={props.publisher}/>
            </div>
            <div className={styles.subscriber}>
                <h3>OTHERS</h3>
                <OpenViduVideo streamManager={props.subscriber}/>
            </div>
        </div>
    </React.Fragment>
    );
};

export default Session;
