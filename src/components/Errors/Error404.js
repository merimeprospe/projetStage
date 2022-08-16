
function Error404() {
    return (
      <div >
        <div class="error-wrapper">
            <div class="error-container error-500">
                <div class="error">
                    <div class="error-title">
                        Server Error
                    </div>
                    <div class="error-number">
                        404
                    </div>
                    <div class="error-description">
                        Ooops!! Something went wrong!
                    </div>
                    <div class="error-or">
                        <div class="or-line"></div>
                        <div class="or">Search</div>
                    </div>
                    <div class="error-textbox">
                        <a href="/" class="form-control" autofocus="" style={{color: '#ffc107'}}><b> Essayez </b></a>
                    </div>
                    <div class="error-or">
                        <div class="or-line"></div>
                        <div class="or">Or</div>
                    </div>
                    <ul class="error-actions">
                        <li>
                            <a href="">
                                <i class="pe-7s-left-arrow" data-toggle="tooltip" title="" data-original-title="BACK"></i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i class="pe-7s-home" data-toggle="tooltip" title="" data-original-title="HOME"></i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i class="pe-7s-mail" data-toggle="tooltip" title="" data-original-title="CONTACT US"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default Error404;
  