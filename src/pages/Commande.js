import React, { useContext, useEffect, useState } from 'react';
import Auth from '../contexts/Auth';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { NavLink } from 'react-router-dom';
import Panier from './Panier';
import { setCart, setCommande, setPrixTotal } from '../store/DataSlice';
import axios from 'axios';
import HandleMessages from '../components/HandleMessages';

const Commande = ({ history }) => {
  const { isAuthenticated } = useContext(Auth);
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [mode, setMode] = useState('Cash');
  const [adresse, setAdresse] = useState();
  const [service, setService] = useState();
  const [phone, setPhone] = useState();
  const [MessageComponent, setMessageComponent] = useState(null);
  let prix = 0;
  const [mail, setEmail] = useState(data.user.user.email);
  for (let i = 0; i < data.cart.products.product.length; i++) {
    prix =
      prix +
      data.cart.products.product[i].price *
        data.cart.products.product[i].quantity;
  }
  dispatch(setPrixTotal(prix));
  const [headers] = useState({
    Authorization: "Bearer " + data.user.access_token,
    Accept: "application/json",
    ContentType: "application/json"
  });
  useEffect(() => {
    if (!isAuthenticated) {
      //history.replace('/')
    }
  }, [history, isAuthenticated]);
  function commander(){
    setLoader(true);
    let commande={
      client_email: mail,
      restaurant_id: data.company.id,
      total: prix + data.company.shipping_fee,
      subtotal: prix,
      livraison: data.company.shipping_fee,
      shipping: {
        state: 0,
        date:  Date.now(),
        human_date:  Date.now(),
        address_type: 1,
        address: adresse,
        mode: 'home delivery',
      },
      payment: { mode: mode, state: 0 },
      note: '',
      source: '',
      produits: data.cart.products.product.map((product, index) => {
          return {
              id: product.id,
              quantity: product.quantity,
              price: (product.price * product.quantity),
              add_to_cart_date:  Date.now(),
              properties: {complement: '', note: ''}
            };
          }),
    }
    try {
      console.log('commande = ', commande)
      axios
      .post(
        data.api + 'commands',
        commande,
        headers
      )
      .then((res) => {
       //alert(res.status)
        dispatch(setCommande(res))
        payement(res.data)
      }).catch((err) => {
        console.log('errorccc',err)
        setMessageComponent(
          <HandleMessages
            message={err.message}
            error={true}
            setCompMess={setMessageComponent}
          />
        );
        setLoader(false)
      })
      
    } catch (error) {
      
    }
  };
  function payement(data1){
    if(mode ==='mobilemoney'){
      let body={
        phoneService: service,
        amount: data1.total,
        phone: phone,
        command_id: data1.id,
        fees: true
      }
      try {
        axios
          .post(
            'https://api.genuka.com/2021-10/payments/mobilemoney/charge',body,headers
          ).then((res) => {
            setMessageComponent(
              <HandleMessages
                message={'votre commande a été éffectué avec succes'}
                error={false}
                setCompMess={setMessageComponent}
              />
            )
            dispatch(setCart())
            setLoader(false)
          }).catch((err) =>{
            if(err.message==='Request failed with status code 500'){
              setMessageComponent(
                <HandleMessages
                  message={'votre solde est insuffisant'}
                  error={true}
                  setCompMess={setMessageComponent}
                />
              );
            }else{
              setMessageComponent(
                <HandleMessages
                  message={err.message}
                  error={true}
                  setCompMess={setMessageComponent}
                />
              );
            }
            setLoader(false)
          })
      }catch (error) {
    
      }
    }
    if(mode ==='card'){
      setMessageComponent(
        <HandleMessages
          message={'votre commande a été éffectué avec succes'}
          error={false}
          setCompMess={setMessageComponent}
        />
      )
      setLoader(false)
      dispatch(setCart())
      //window.open('https://dashboard.genuka.com/payment/checkout/?currency='+ data.company.currency.code + '&email=' + data.user.user.email + '&amount=' + data1.total + '&fees=1&command_id=' + data1.id + '&comments=Paiement de votre commande La Mater Market', '_blank');
      window.location.href = 'https://dashboard.genuka.com/payment/checkout/?currency='+ data.company.currency.code + '&email=' + data.user.user.email + '&amount=' + data1.total + '&fees=1&command_id=' + data1.id + '&comments=Paiement de votre commande La Mater Market'
    }
    if(mode ==='Cash'){
      setMessageComponent(
        <HandleMessages
          message={'votre commande a été éffectué avec succes'}
          error={false}
          setCompMess={setMessageComponent}
        />
      )
      setLoader(false)
      dispatch(setCart())
    }
  } 
  //console.log('data.company',data.company.currency.code)
  //console.log('jjjjjjjjjjjjjjjjjjjjjjj',data.commande)
  if (localStorage.miniblogToken) {
    
    return (
      
      <div>
        {MessageComponent}
        <section class="section1 container-fluid">
          <div class="row">
            <div>
              <p class="h2 tetle1">
                <b>
                  <NavLink
                    to="/"
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    {' '}
                    ACCUEIL /{' '}
                  </NavLink>
                  <span style={{ color: 'orange' }}>COMMANDER</span>
                </b>{' '}
              </p>
            </div>
          </div>
        </section>
        <section class="section2 container-fluid"></section>
        <section className="border" style={{ height: '50px' }}>
          <div className="container p-1"></div>
        </section>
        <main>
          <>
            <div class="main_c container-fluid">
              <div class=" form_com1">
                <h4 class="titre_com">
                  <b>ADRESSE DE FACTURATION</b>
                </h4>
                {/* <input
                  type="text"
                  value={data.user.last_name}
                  class="form-control form_inp"
                  placeholder="nom"
                /> */}
                <input
                  type="text"
                  value={mail}
                  class="form-control form_inp"
                  placeholder="email"
                  name="client_email"
                  onChange={(e) => {
                    e.target.innerText += e.target.value
                    //e.target.removeAttribute('value')
                    //e.target.setAttribute('value',e.target.value)
                    setEmail(e.target.value)
                  }}
                />
                {/* <input
                  type="text"
                  class="form-control form_inp"
                  placeholder="Adresse"
                  
                />
                <input
                  type="text"
                  class="form-control form_inp"
                  placeholder="Ville"
                />
                <input
                  type="text"
                  class="form-control form_inp"
                  placeholder="Pays"
                />
                <input
                  type="text"
                  class="form-control form_inp"
                  placeholder="Code postal"
                />
                <input
                  type="text"
                  value={data.user.user.phone}
                  class="form-control form_inp"
                  placeholder="Telephone"
                />*/}
                <input
                  type="text"
                  class="form-control form_inp"
                  placeholder={'payement pas ' + mode}
                  disabled="disabled"
                />
                <br /> 
                <h4 class="titre_com" style={{ marginBottom: '0px' }}>
                  <b>ADRESSE DE LIVRAISON</b>
                </h4>
                <div>
                  <textarea
                    id=""
                    class="form_txt"
                    placeholder="Order Notes"
                    onChange={(e) => setAdresse(e.target.value)}
                    cols="10"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div class=" form_com">
                <h4 class="titre_com" style={{ textAlign: 'center' }}>
                  <b>VOTRE COMMANDE</b>
                </h4>
                <table class="table_p">
                  <tr>
                    <th class="left_t">produit</th>
                    <th class="right_t">total</th>
                  </tr>
                  {data.cart.products.product.map((product, index) => (
                    <tr>
                      <td class="left_t">{product.name}</td>
                      <td class="right_t">
                        {product.price * product.quantity} {data.company.currency.symbol}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td class="left_t">Expédition</td>
                    <td class="right_t">
                      <b>{data.company.shipping_fee} {data.company.currency.symbol}</b>
                    </td>
                  </tr>
                  <tr>
                    <td class="left_t">
                      <b>TOTAL</b>
                    </td>
                    <td class="right_t product-price1">
                      <b>{prix + data.company.shipping_fee} {data.company.currency.symbol}</b>
                    </td>
                  </tr>
                </table>
                <div>
                  <div class="d">
                    {data.company.payment_modes.cash && (
                      <div class="table_p" onClick={() => setMode('Cash')}>
                        <img
                          src="images/cash.png"
                          alt=""
                          style={{ width: '25%' }}
                        />
                      </div>
                    )}
                    {/* {data.company.payment_modes.paypal && (
                      <div
                        class="table_p"
                        onClick={() => setMode('Paypal')}
                      >
                        <img
                          src="images/visa (1).png"
                          alt=""
                          style={{ width: '35%' }}
                          data-bs-toggle="collapse"
                        />
                      </div>
                    )} */}
                    {data.company.payment_modes.mobilemoney && (
                      <>
                        <div
                          class="table_p"
                          onClick={() => {
                            setMode('mobilemoney')
                            setService('orange')
                          }}
                        >
                          <img
                            src="images/orange (1).png"
                            alt=""
                            style={{ width: '23%' }}
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent2"
                            aria-controls="navbarSupportedContent2"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                          />
                        </div>
                        <div
                          class="table_p"
                          onClick={() => {
                            setMode('mobilemoney')
                          setService('MTN')
                          }}
                        >
                          <img
                            src="images/mtn.jpg"
                            alt=""
                            style={{ width: '25%' }}
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent2"
                            aria-controls="navbarSupportedContent2"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                          />
                        </div>
                      </>
                    )}
                    {data.company.payment_modes.card && (
                      <div
                        class="table_p"
                        onClick={() => setMode('card')}
                      >
                        <img
                          src="images/banque .jpg"
                          alt=""
                          style={{ width: '28%' }}
                          data-bs-toggle="collapse"
                        />
                      </div>
                    )}
                  </div>
                  <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent2"
                  >
                    <input
                      type="text"
                      class="form-control form_inp1"
                      placeholder="numero"
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ marginBottom: '0px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '20px', marginTop: '30px' }}>
                    {(loader && (
                      <div className="chargement" style={{margin: 'auto'}}></div>
                    )) || (
                      <button class="productb btn btn-warning bt1" onClick={commander}>
                        <span class="bt"> commander </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        </main>
      </div>
    );
  } else {
    return (
      <div>
        <Panier />
      </div>
    );
  }
};

export default Commande;
