//import { wait } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import React, { useContext, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import Auth from '../contexts/Auth';
import '../../src/style/perso.css';
import { Login, logout, Register } from '../services/AuthAPI';
import { setProduct, setProductsearch } from '../store/DataSlice';
import HandleMessages from './HandleMessages';
import { setUserC } from '../store/DataSlice';
//import SearchList from './SearchList';

const Navigation = () => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth);
  const [itemSearch, setItemSearch] = useState(''); //new Boolean(1).valueOf()
  const [showSearchList, setShowSearchList] = useState(false);
  const [loader, setLoader] = useState(false);
  const [conten, setConten] = useState(false);
  const [loader1, setLoader1] = useState(true);
  const [MessageComponent, setMessageComponent] = useState(null);
  const [isOkModal, setIsOkModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState({
    company_id: data.company.id,
    fromApi: true,
  });
  window.document.addEventListener('click', (event) => {
    setShowSearchList(false);
    event.stopPropagation();
  });
  // window.document.addEventListener('keypress', (event) => {
  //   if (event.keyCode === 13) {
  //     event.stopPropagation();
  //     recherche();
  //     setShowSearchList(true);
  //   }
  // });

  const [useRegistre, setUseRegistre] = useState({
    company_id: data.company.id,
    fromApi: true,
  });
  const deconnexion = () => {
    logout();
    setIsAuthenticated(false);
    setMessageComponent(
      <HandleMessages
        message={'Deconnection éffectué avec succes'}
        error={false}
        setCompMess={setMessageComponent}
      />
    );
  };
  const infoConnextion = ({ currentTarget }) => {
    const { name, value } = currentTarget;

    setUseRegistre({ ...useRegistre, [name]: value });
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (event) => {
    setLoader(true);
    event.preventDefault();
    try {
      const response = await Login(user);
      setIsAuthenticated(response);
      axios
        .post(data.api + 'clients/login', user)
        .then((res) => (dispatch(setUserC(res.data)), setLoader(false)));
      setMessageComponent(
        <HandleMessages
          message={'la connection a ete éffectué avec succes'}
          error={false}
          setCompMess={setMessageComponent}
        />
      );
    } catch (error) {
      console.log('error', error);
      setMessageComponent(
        <HandleMessages
          message={error.message}
          error={true}
          setCompMess={setMessageComponent}
        />
      );
      setLoader(false);
      console.log('FFFFFFFFFFFF', error);
    }
  };
  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      if (useRegistre.confirmpasseword != useRegistre.password) {
        setIsError(true);
        throw new Error('les mot de passe ne correspondent pas');
      }
      axios
        .post(data.api + 'clients/register', useRegistre)
        .then((res) => (dispatch(setUserC(res.data)), setLoader(false)));
      const response = await Register(useRegistre);
      setIsAuthenticated(response);
      setMessageComponent(
        <HandleMessages
          message={'votre compte a été crée avec succes'}
          error={false}
          setCompMess={setMessageComponent}
        />
      );
    } catch (error) {
      console.log(error);
      //setLoader(false);
      setMessageComponent(
        <HandleMessages
          message={error.message}
          error={true}
          setCompMess={setMessageComponent}
        />
      );
      setLoader(false);
    }
  };
  function recherche() {
    if (itemSearch !== '') {
      dispatch(setProductsearch([]));
      setConten(true);
      setLoader1(false);
      try {
        axios
          .post(
            data.api +
              'companies/' +
              data.company.id +
              '/products/search?q=' +
              itemSearch
          )
          .then(
            (res) => (
              dispatch(setProductsearch(res.data)),
              setLoader1(true),
              console.log('res.data', res.data.length)
            )
          )
          .catch((err) => {
            setMessageComponent(
              <HandleMessages
                message={err.message}
                error={true}
                setCompMess={setMessageComponent}
              />
            );
            setLoader1(true);
            setConten(false);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setConten(false);
      dispatch(setProductsearch([]));
    }
  }

  return (
    <>
      <div className="navb">
        <nav className="navbar navbar-expand-lg navbar-light ">
          {MessageComponent}
          <div className="container-fluid">
            <NavLink className="navbar-brand couleur_b" to="/">
              <b style={{ color: 'white' }}>
                <img src={data.company.logo} alt="" className="imge_logo" />
              </b>
            </NavLink>
            <button
              className="navbar-toggler bg-light couleur_b"
              style={{ color: 'white' }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon bg-light"></span>
            </button>
            <div
              className="collapse navbar-collapse dn"
              id="navbarSupportedContent"
            >
              <div className="me-auto  mb-lg-0 ">
                <div
                  style={{ display: 'flex', marginTop: '10px' }}
                  className=""
                >
                  <div style={{ position: 'relative' }} class="autocomplete">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      name="Recher"
                      aria-label="Search"
                      value={itemSearch}
                      onChange={(e) => setItemSearch(e.target.value)}
                      onClick={(e) =>
                        e.stopPropagation()
                        // setShowSearchList(false),
                        // setConten(false)
                      }
                    />
                    {showSearchList && (
                      <div className="style-search overflows">
                        <div
                          className="modal-header"
                          style={{
                            padding: '0.5rem 1rem',
                            position: 'fixed',
                            width: '250px',
                          }}
                        >
                          <button
                            style={{ right: '10px' }}
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        {(!loader1 && <div className="chargement1"></div>) ||
                          (!conten && (
                            <div
                              className="info-search"
                              style={{ marginTop: '20px' }}
                            >
                              <img
                                src="/images/loupe.jpg"
                                alt=""
                                style={{
                                  width: '100%',
                                  height: '270px',
                                  opacity: '20%',
                                }}
                                data-bs-toggle="collapse"
                              />
                            </div>
                          )) ||
                          (data.productsearch.length > 0 && (
                            <ul
                              style={{ padding: '5px 10px', marginTop: '30px' }}
                            >
                              {data.productsearch.map((produit) => (
                                <Link
                                  to={'/produit/' + produit.id}
                                  onClick={() => {
                                    dispatch(setProduct(produit));
                                    setShowSearchList(false);
                                  }}
                                >
                                  <li className="liSearch">{produit.name}</li>
                                </Link>
                              ))}
                            </ul>
                          )) || (
                            <div
                              className="info-search"
                              style={{ marginTop: '20px' }}
                            >
                              <img
                                src="/images/loupe_nul.jpg"
                                alt=""
                                style={{
                                  width: '100%',
                                  height: '270px',
                                  opacity: '50%',
                                }}
                                data-bs-toggle="collapse"
                              />
                            </div>
                          )}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      recherche();
                      setShowSearchList(true);
                    }}
                    className="btn btn-secondary navb3"
                  >
                    <span>
                      <i
                        className="fa-solid fa-magnifying-glass "
                        style={{ color: 'orange' }}
                      ></i>
                    </span>
                  </button>
                </div>
              </div>
              <ul className="navbar-nav  d-flex">
                <li className="nav-item nav_1">
                  <div className="nav-link" href="#">
                    <NavLink to="/panier">
                      <i
                        className="fa-solid fa-cart-shopping "
                        style={{ color: 'white' }}
                      ></i>
                      <div className=" align-text-bottom btn btn-secondary rounded-circle taille">
                        {data.cart.products.total}
                      </div>
                    </NavLink>
                    {(!isAuthenticated &&
                      ((loader && (
                        <button className="nav_ron2">
                          <div className="chargement"></div>
                        </button>
                      )) || (
                        <span className="border border-warning border-bottom-0 border-top-0 pagnier">
                          <button
                            className="ron2 flot"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          >
                            Login
                          </button>{' '}
                          or{' '}
                          <button
                            className="nav_ron2 flot"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop1"
                          >
                            Register
                          </button>
                        </span>
                      ))) || (
                      <span className="border border-warning border-bottom-0 border-top-0 pagnier">
                        <button className="nav_ron2 flot" onClick={deconnexion}>
                          Deconexion
                        </button>
                      </span>
                    )}
                    {/* <!-- Modal_login --> */}
                    <div
                      className="modal fade"
                      id="staticBackdrop"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabindex="-1"
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="modal-titre">Connexion</h4>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i
                                  className="fas fa-envelope fa-lg me-3 fa-fw"
                                  style={{ color: 'orange' }}
                                ></i>
                                <div className="form-outline flex-fill mb-0">
                                  <label
                                    className="form-label"
                                    for="form3Example3c"
                                  >
                                    Your Email
                                  </label>
                                  <input
                                    type="email"
                                    id="form3Example3c"
                                    className="form-control"
                                    name="email"
                                    onChange={infoConnextion}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="d-flex flex-row align-items-center mb-4">
                                <i
                                  className="fas fa-lock fa-lg me-3 fa-fw"
                                  style={{ color: 'orange' }}
                                ></i>
                                <div className="form-outline flex-fill mb-0">
                                  <label
                                    className="form-label"
                                    for="form3Example4c"
                                  >
                                    Password
                                  </label>
                                  <input
                                    type="password"
                                    name="password"
                                    id="form3Example4c"
                                    className="form-control"
                                    onChange={infoConnextion}
                                    required
                                  />
                                </div>
                              </div>

                              {/* <!-- 2 column grid layout for inline styling --> */}
                              <div className="row mb-4">
                                <div className="col d-flex justify-content-center">
                                  {/* <!-- Checkbox --> */}
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id="form2Example31"
                                      checked
                                    />
                                    <label
                                      className="form-check-label"
                                      for="form2Example31"
                                    >
                                      {' '}
                                      Remember me{' '}
                                    </label>
                                  </div>
                                </div>

                                <div className="col">
                                  {/* <!-- Simple link --> */}
                                  <a href="#!" className="ron">
                                    Forgot password?
                                  </a>
                                </div>
                              </div>

                              {/* <!-- Submit button --> */}
                              <button
                                type="submit"
                                className="btn btn-warning btn-block mb-4 right "
                                // data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                <span style={{ color: 'white' }}>
                                  Connexion
                                </span>
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Modal_registre --> */}
                    <div
                      className="modal fade"
                      id="staticBackdrop1"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabindex="-1"
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-titre"
                              id="staticBackdropLabel"
                            >
                              Creer un compte
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={handleSubmitRegister}>
                              <div className="d">
                                <div className="d-flex flex-row align-items-center mb-4">
                                  <i
                                    className="fas fa-user fa-lg me-3 fa-fw"
                                    style={{ color: 'orange' }}
                                  ></i>
                                  <div className="form-outline flex-fill mb-0">
                                    <label
                                      className="form-label"
                                      for="form3Example1c"
                                    >
                                      First Name
                                    </label>
                                    <input
                                      type="text"
                                      id="form3Example1c"
                                      className="form-control"
                                      name="first_name"
                                      onChange={infoConnextion}
                                      required
                                    />
                                  </div>
                                </div>
                                <div
                                  className="d-flex flex-row align-items-center mb-4"
                                  style={{ marginLeft: '3px' }}
                                >
                                  <i
                                    className="fas fa-user fa-lg me-3 fa-fw"
                                    style={{ color: 'orange' }}
                                  ></i>
                                  <div className="form-outline flex-fill mb-0">
                                    <label
                                      className="form-label"
                                      for="form3Example1c"
                                    >
                                      Last Name
                                    </label>
                                    <input
                                      type="text"
                                      id="form3Example1c"
                                      className="form-control"
                                      name="last_name"
                                      onChange={infoConnextion}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="d">
                                <div className="d-flex flex-row align-items-center mb-4">
                                  <i
                                    className="fas fa-envelope fa-lg me-3 fa-fw"
                                    style={{ color: 'orange' }}
                                  ></i>
                                  <div className="form-outline flex-fill mb-0">
                                    <label
                                      className="form-label"
                                      for="form3Example3c"
                                    >
                                      Your Email
                                    </label>
                                    <input
                                      type="email"
                                      id="form3Example3c"
                                      name="email"
                                      className="form-control"
                                      onChange={infoConnextion}
                                      required
                                    />
                                  </div>
                                  `
                                </div>
                                <div className="d-flex flex-row align-items-center mb-4">
                                  <i
                                    class="fa-solid fa-phone-flip fa-lg me-3 fa-fw"
                                    style={{ color: 'orange' }}
                                  ></i>
                                  <div className="form-outline flex-fill mb-0">
                                    <label
                                      className="form-label"
                                      for="form3Example3c"
                                    >
                                      Tel
                                    </label>
                                    <input
                                      type="numba"
                                      id="form3Example3c"
                                      name="tel"
                                      className="form-control"
                                      onChange={infoConnextion}
                                      required
                                    />
                                  </div>
                                  `
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i
                                  className="fas fa-lock fa-lg me-3 fa-fw"
                                  style={{ color: 'orange' }}
                                ></i>
                                <div className="form-outline flex-fill mb-0">
                                  <label
                                    className="form-label"
                                    for="form3Example4c"
                                  >
                                    Password
                                  </label>
                                  <input
                                    type="password"
                                    id="form3Example4c"
                                    name="password"
                                    className="form-control"
                                    onChange={infoConnextion}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="d-flex flex-row align-items-center mb-4">
                                <i
                                  className="fas fa-key fa-lg me-3 fa-fw"
                                  style={{ color: 'orange' }}
                                ></i>
                                <div className="form-outline flex-fill mb-0">
                                  <label
                                    className="form-label"
                                    for="form3Example4cd"
                                  >
                                    Repeat your password
                                  </label>
                                  <input
                                    type="password"
                                    id="form3Example4cd"
                                    name="confirmpasseword"
                                    className="form-control"
                                    onChange={infoConnextion}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="form-check d-flex justify-content-center mb-4">
                                <input
                                  className="form-check-input me-2"
                                  type="checkbox"
                                  value=""
                                  id="form2Example3c"
                                />
                                <label
                                  className="form-check-label"
                                  for="form2Example3"
                                >
                                  J'accepte les déclarations dans les{' '}
                                  <a
                                    href="#!"
                                    style={{ textDecoration: 'nones' }}
                                  >
                                    conditions d'utilisation
                                  </a>
                                </label>
                              </div>

                              {/* <!-- Submit button --> */}
                              <button
                                type="submit"
                                className="btn btn-warning btn-block mb-4 right"
                                //data-bs-dismiss={ isError  && "modal"}
                              >
                                <span style={{ color: 'white' }}>
                                  S'inscrire
                                </span>
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
