
function LoadingInit() {
    return (
      <div >
        
        <div class="d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
          <div class="spinner-grow text-warning m-7" style={{width: '15rem', height: '15rem', padding: 'auto'}} role="status">
            {/* <span class="visually-hidden">Loading...</span> */}
          </div>
        </div>
      </div>
    );
  }
  
  export default LoadingInit;
  