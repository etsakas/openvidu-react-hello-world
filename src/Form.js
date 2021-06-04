import React, { useState } from 'react';

const Form = (props) => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.joinSession();
    };

    return(
    <React.Fragment>
        <h1>Join a video session</h1>
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>Session:</label>
                <input type="text" value={props.sessionId}
                onChange={props.sessionIdChangeHandler} minLength="8" maxLength="20" required />
            </p>
            <p>
                <input type="submit" value="JOIN"/>
            </p>
        </form>
    </React.Fragment>
    );
};

export default Form;
