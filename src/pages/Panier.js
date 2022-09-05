import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { NavLink } from 'react-router-dom';
import Auth from '../contexts/Auth';
import { deletproductcart, setquantutycart, setRemovquantutycart } from '../store/DataSlice';

const Panier = () => {
    const data = useSelector((state)=>state);
    const dispatch = useDispatch();
    let prix = 0
    const {isAuthenticated, setIsAuthenticated} = useContext(Auth); 
    return (
        <div>
            <section class="section1 container-fluid">
                <div class="row">
                    <div>
                        <p class="h2 tetle1"><b ><NavLink to="/" style={{color: 'white', textDecoration: 'none'}}> ACCUEIL / </NavLink><span style={{color: 'orange'}}>PANIER</span></b> </p>
                    </div>
                </div>
            </section>
            <section class="section2 container-fluid">
            </section>
            <section className="border" style={{ height: '50px' }}>
                <div className="container p-1">
                </div>
            </section >
            <section class="h-100 gradient-custom ">
            <div class="container py-5">
                <div class="row d-flex justify-content-center my-4">
                    <div class="col-md-8">
                        <div class="card mb-4">
                            <div class="card-header py-3">
                                <h5 class="mb-0">Panier - {data.cart.products.total} articles</h5>
                            </div>
                            <div class="card-body overflows" style={{height: '420px'}}>
                                {data.cart.products.product.length === 0 &&(
                                    <p className='panier'>PANIER VIDE</p>
                                )}
                                {data.cart.products.product.map( (product , index) => (
                                     prix = prix + product.price*product.quantity,
                                     console.log('product',product),
                                     <>
                                     <div class="row">
                                     <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                         {/* <!-- Image --> */}
                                         <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                            {product.image.length === 0 &&(
                                                <img  class="w-100" alt="Blue Jeans Jacket" style={{height: '150px'}} src='images\productDefaut.png' />
                                            )||(
                                                <img class="w-100" alt="Blue Jeans Jacket" style={{height: '150px'}} src={product.image[0].link} />
                                            )}
                                            {/* {product.image.slice(0, 1).map(image => (
                                                <img src={image.link}class="w-100" alt="Blue Jeans Jacket" style={{height: '150px'}} />
                                            ))}  */}
                                            <a href="#!">
                                                <div class="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.2)'}}></div>
                                            </a>
                                         </div>
                                         {/* <!-- Image --> */}
                                     </div>
                                     <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                         {/* <!-- Data --> */}
                                         <p><strong>{product.name}</strong></p>
                                         <p>prix: {product.price} {data.company.currency.symbol}</p>
                                         {product.stocks>0 &&(<p>en Stock</p>)||(<p>en rupture de Stock</p>)}
                                         
                                         <button type="button" class="btn btn-danger btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                                         title="Remove item" onClick={() => dispatch(deletproductcart(index))}>
                                         <i class="fas fa-trash" ></i>
                                         </button>
                                         {/* <!-- Data --> */}
                                     </div>
                                     <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                         {/* <!-- Quantity --> */}
                                         <div class="d-flex mb-4" style={{maxWidth: '300px'}}>
                                         <button class="btn btn-dark px-3 me-2"
                                             onClick={() => dispatch(setRemovquantutycart(product))}>
                                             <i class="fas fa-minus "></i>
                                         </button>
 
                                         <div class="form-outline">
                                             <input id="form1" min="0" name="quantity" value={product.quantity} type="number" class="form-control" />
                                             <label class="form-label" for="form1">Quantity</label>
                                         </div>
 
                                         <button class="btn btn-primary px-3 ms-2 btn-dark"
                                              onClick={() => dispatch(setquantutycart(product))}>
                                             <i class="fas fa-plus"></i>
                                         </button>
                                         </div>
                                         {/* <!-- Quantity --> */}
 
                                         {/* <!-- Price --> */}
                                         <p class="text-start text-md-center">
                                         <strong>{product.price*product.quantity} {data.company.currency.symbol}</strong>
                                         </p>
                                         {/* <!-- Price --> */}
                                     </div>
                                 </div>
                                <hr class="my-4" />
                                </>
                                ))}
                                {/* <!-- Single item --> */}
                                
                                {/* <!-- Single item --> */}

                               
                            </div>
                        </div>
                        {/*<div class="card mb-4">
                        <div class="card-body">
                            <p><strong>Expected shipping delivery</strong></p>
                            <p class="mb-0">12.10.2020 - 14.10.2020</p>
                        </div>
                        </div>
                        <div class="card mb-4 mb-lg-0">
                        <div class="card-body">
                            <p><strong>We accept</strong></p>
                            <img class="me-2" width="45px"
                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                            alt="Visa" />
                            <img class="me-2" width="45px"
                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                            alt="American Express" />
                            <img class="me-2" width="45px"
                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                            alt="Mastercard" />
                            <img class="me-2" width="45px"
                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp"
                            alt="PayPal acceptance mark" />
                        </div> 
                        </div>*/}
                       
                    </div>
                    <div class="col-md-4">
                        <div class="card mb-4">
                        <div class="card-header py-3">
                            <h5 class="mb-0">Aperçu</h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                            <li
                                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                Produits
                                <span>{prix} {data.company.currency.symbol}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                Livraison
                                <span>{data.company.shipping_fee} {data.company.currency.symbol}</span>
                            </li>
                            <li
                                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                <div>
                                <strong>Montant total</strong>
                                <strong>
                                    <p class="mb-0">(TVA incluse)</p>
                                </strong>
                                </div>
                                <span><strong>{prix + data.company.shipping_fee} {data.company.currency.symbol}</strong></span>
                            </li>
                            </ul>
                            {(!isAuthenticated && (
                            <NavLink to='/commande'>
                                <button type="button" class="btn btn-warning btn-lg btn-block" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{color: 'white'}}>
                                     commander
                                </button>
                            </NavLink>
                            )) || (
                                <NavLink to='/commande'>
                                    <button type="button" class="btn btn-warning btn-lg btn-block" style={{color: 'white'}}>
                                     commander
                                    </button>
                                </NavLink>
                            )}
                           
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>

        </div>
    );
};

export default Panier;