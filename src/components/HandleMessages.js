import React from 'react';

const HandleMessages = (props) => {
  const { message, error, setCompMess } = props;
  setTimeout(() => {
    setCompMess(null);
  }, 6000);

  return (
    <div className={error ? 'infoMessage-error' : 'infoMessage-success'}>
      <p>{message}</p>
    </div>
  );
};

export default HandleMessages;
