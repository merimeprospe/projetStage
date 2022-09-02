import { useSelector } from 'react-redux/es/exports';
import { NavLink } from 'react-router-dom'

const Footer = () => {
    const data = useSelector((state)=>state);
    
    return (
        <div>
            <footer className="text-center text-lg-start navb1">
                {/* <!-- Grid container --> */}
                <div className="container p-5" >
                    {/* <!--Grid row--> */}
                    <div className="row">
                        {/* <!--Grid column--> */}
                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                            <h5 className="text-uppercase" style={{ color: 'orange', margin: '0px,35px,' }}>ABOUT</h5>
                            <div className="row" >
                                <div className="col-lg-3 col-md-6 mb-4 mb-md-0 foot1 div" style={{ width: '230px', textAlign: 'justify' }}>
                                    <ul className="list-unstyled mb-0" >
                                        <li>
                                            <p className="text-dark" style={{ margin: '0px' }}><span style={{ color: 'white' }}>{data.company.name}</span></p>
                                        </li>
                                        <li>
                                            <p className="text-dark" style={{ margin: '0px' }}><span style={{ color: 'white' }}>website: {data.company.website}</span></p>
                                        </li>
                                        <li>
                                            <p className="text-dark" style={{ margin: '0px' }}><span style={{ color: 'white' }}>email : {data.company.email}</span></p>
                                        </li>
                                    </ul>
                                </div>
                                <div className=" col-md-6 mb-4 mb-md-0 div foot" style={{ textAlign: 'justify' }}>
                                    <ul className="list-unstyled mb-0" style={{ marginTop: '0px' }}>
                                        <li>
                                            <p style={{ color: 'white' }}>slogan: {data.company.slogan}</p>
                                        </li>
                                        <li>
                                            <p className="text-dark" ><span style={{ color: 'white' }}>description: {data.company.description}</span></p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <!--Grid column--> */}

                        {/* <!--Grid column--> */}
                        <div className="col-lg-5 col-md-12 mb-4 mb-md-0 border font_m border-bottom-0 border-top-0 border-end-0 border-warning" >
                            <ul className="list-unstyled mb-0 font_t" >
                                <li>
                                    <NavLink to="/"><img src={data.company.logo} alt="" className="imge_logo1" /></NavLink>
                                </li>
                            </ul>
                        </div>
                        {/* <!--Grid column--> */}
                    </div>
                    {/* <!--Grid row--> */}
                </div>
                {/* <!-- Grid container --> */}
                <section style={{ backgroundColor: 'white', height: '5px' }}>
                </section>
                <div className=" p-3 text-center text-white " style={{ backgroundColor: '#1D2022', height: '75px' }}>
                    {/* <!-- Section: Social media --> */}
                    <div class="text-center p-3">
                        © 2022 Copyright:
                        <a style={{color: 'orange', textDecoration: 'none'}} href="https://mdbootstrap.com/"> {data.company.name}.com</a>
                    </div>
                    {/* <!-- Section: Social media --> */}
                </div>
                
            </footer>
        </div>
    );
};

export default Footer;