import React from 'react';

const StatusWrapper = ({status, children}) => {
    if (status === 'loading') return <h4>Loading...</h4>
    if (status === 'error') return <h5>Ooops! We have a problem, please, reload the page</h5>;
    if (status === 'empty') return <h5>Data is empty :'-(</h5>;
    if (status === 'success') {
        return (
            <>
                {children}
            </>
        );
    }

};

export default StatusWrapper;
