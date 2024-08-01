import React, { useEffect } from 'react';

interface Props {
    authRequiredModalOpen: boolean;
    setAuthRequiredModalOpen: (open: boolean) => void;
    triggerLogin: () => void;
}

const AuthRequiredModal: React.FC<Props> = ({ authRequiredModalOpen, setAuthRequiredModalOpen, triggerLogin }) => {
    // const closeModal = () => {
    //     setAuthRequiredModalOpen(false);
    // };

    // const confirmModal = () => {
    //     setAuthRequiredModalOpen(false);
    //     triggerLogin();
    // };

    // useEffect(() => {
    //     if (authRequiredModalOpen) {
    //         triggerLogin();
    //     }

    // }, [authRequiredModalOpen]);


    return (
        <div>
            <h2>Authentication Required</h2>
            <p>You need to be authenticated to access this page.</p>
            <button onClick={triggerLogin}>Login</button>
            <button onClick={() => setAuthRequiredModalOpen(false)}>Close</button>
        </div>
    );
};

export default AuthRequiredModal;
