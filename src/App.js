import './App.module.css';
import Form from './Form';
import Session from './Session';
import { OpenVidu } from 'openvidu-browser';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [session, setSession] = useState(undefined);
  const [sessionId, setSessionId] = useState('SessionA');
  const [subscriber, setSubscriber] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [OV, setOV] = useState(undefined);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);
  }, []);

  const sessionIdChangeHandler = (event) => {
    setSessionId(event.target.value);
  };

  const joinSession = () => {
    // Το update του state δεν γινεται αμεσα. Αρα θα πρεπει να
    // γραψω κωδικα μεσα σε callback. Για τον σκοπο αυτο θα
    // πρεπει να χρησιμοποιησω το useEffect hook.
    let OV = new OpenVidu();
    setOV(OV);
    setSession(OV.initSession());
  };

  useEffect(() => {
    // Καλειται ομως και στο πρωτο render. Αρα θα πρεπει να κανω
    // ελεγχο πριν εκτελεσω τις καταλληλες συναρτησεις.
    if (session === undefined)
      return;

    // On every new Stream received...
    session.on('streamCreated', (event) => {
      let subscriber = session.subscribe(event.stream, undefined);
      // Update the state with the new subscriber
      setSubscriber(subscriber);
    });

    getToken(sessionId).then(token => {

      session.connect(token)
      .then(() => {
        let publisher = OV.initPublisher(undefined);
        setPublisher(publisher);
        session.publish(publisher);
      })
      .catch(error => {
        console.log("There was an error connecting to the session:", error.code, error.message);
      });
    });

  }, [session, OV, sessionId]);

  const leaveSession = () => {
    if (session)
        session.disconnect();

    setOV(undefined);
    setSession(undefined);
    setSessionId('SessionA');
    setSubscriber(undefined);
    setPublisher(undefined);
  };

  return (
    <React.Fragment>
      {!session && <Form joinSession={joinSession} sessionId={sessionId}
      sessionIdChangeHandler={sessionIdChangeHandler}/>}
      {session && <Session sessionId={sessionId} leaveSession={leaveSession}/>}
    </React.Fragment>

  );
}

/**
 * --------------------------
 * SERVER-SIDE RESPONSIBILITY
 * --------------------------
 * These methods retrieve the mandatory user token from OpenVidu Server.
 * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
 * the API REST, openvidu-java-client or openvidu-node-client):
 *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
 *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
 *   3) The Connection.token must be consumed in Session.connect() method
 */

 const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
 const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

const getToken = sessionId => {
	return createSession(sessionId).then(sessionId => createToken(sessionId));
};

const createSession = sessionId => {
  return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
          .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
              headers: {
                  Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                  'Content-Type': 'application/json',
              },
          })
          .then((response) => {
              console.log('CREATE SESION', response);
              resolve(response.data.id);
          })
          .catch((response) => {
              var error = Object.assign({}, response);
              if (error?.response?.status === 409) {
                  resolve(sessionId);
              } else {
                  console.log(error);
                  console.warn(
                      'No connection to OpenVidu Server. This may be a certificate error at ' +
                      OPENVIDU_SERVER_URL,
                  );
                  if (
                      window.confirm(
                          'No connection to OpenVidu Server. This may be a certificate error at "' +
                          OPENVIDU_SERVER_URL +
                          '"\n\nClick OK to navigate and accept it. ' +
                          'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                          OPENVIDU_SERVER_URL +
                          '"',
                      )
                  ) {
                      window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                  }
              }
          });
  });
};

const createToken = sessionId => {
  return new Promise((resolve, reject) => {
      var data = {};
      axios
          .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
              headers: {
                  Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                  'Content-Type': 'application/json',
              },
          })
          .then((response) => {
              console.log('TOKEN', response);
              resolve(response.data.token);
          })
          .catch((error) => reject(error));
  });
};

export default App;
