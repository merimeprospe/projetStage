import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { NavLink } from 'react-router-dom';
import { addProductcart, addtotalcart, setquantutycart, setquantutycart1 } from '../store/DataSlice';

const Produit = (id) => {
    const data = useSelector((state)=>state.data);
    const dispatch = useDispatch();
    const [k, setK] = useState(1)
    function Image (id){
        var ProductImg = document.getElementById("image_produit");
        var  SmallImg = document.getElementById(id);
        ProductImg.src = SmallImg.src;
   }
    setTimeout(function(){
      //  alert(data.product.description)
      let desc = document.getElementById('desc')
      if(data.product.description === null)
      {
        desc.innerHTML = 'pas de description'
      }else{
        desc.innerHTML = data.product.description
      }
 }, 2000);
 function panier(pr){
    let n = 0
    if(data.cart.products.total === 0){
        let p = {}
        p.name = pr.name
        p.quantity = k
        p.id = pr.id
        p.price = pr.price
        p.image = pr.medias
        p.variante = [{
            taille: null,
            couleur: null,
        }] 
        dispatch(addProductcart(p))
        dispatch(addtotalcart())
    }else{
        for(let i=0; i<data.cart.products.total; i++){
            if(data.cart.products.product[i].id === pr.id){
                n=1
                let p = {
                    pro: pr,
                    k: k
                }
                console.log(p)
                dispatch(setquantutycart1(p))
            }
        }
        if(n===0){
            let p = {}
            p.name = pr.name
            p.quantity = k
            p.id = pr.id
            p.price = pr.price
            p.image = pr.medias
            p.variante = {
                taille: null,
                couleur: null,
            } 
            dispatch(addProductcart(p))
            dispatch(addtotalcart())
        }
    }
    setK(1)
}
   //data.product.medias[0].link console.log('data.product', data.product.medias[0].link)    
    return (
        <div>
            <section className="section1 container-fluid">
                <div className="row">
                    <div>
                    <p className="h2 tetle1"><b style={{color: 'white', marginTop: '50px'}}> {data.product.name} </b> </p>
                    </div>
                </div>
            </section>
            <section className="section2 container-fluid">
                
            </section>
            <section className="border" style={{height: '50%'}}>
                <div className="container p-1">
                    <span className="ron nav-link">
                        <NavLink  to='/' className="ron3">
                            <span>Accueil / </span>
                        </NavLink>
                        <span className="ron3" style={{color: 'orange'}}><b>{data.product.name}</b></span>
                    </span>    
                </div>  
            </section>
            <main>
                <div className="main">
                    <div className="titre_p d1 overflows" style={{}} >
                        {data.product.medias.map(image => (
                            <div className="d2 flot">
                                <div style={{height: '5px'}}>
                                </div>
                                <img src={image.link} alt="" className="imge1" id={image.link} onClick={(e) => Image(e.target.id)}/>
                            </div>
                        ))} 
                    </div>
                    <div className="bloc1" style={{width: '70%'}}>
                        {data.product.medias.slice(0, 1).map(image => (
                            <div className='imge2'>
                                <img src={image.thumb} className="d-block w-100 imge2" alt="..." id="image_produit" />
                            </div>
                        ))} 
                        
                        {/* <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                            <div className="carousel-inner imge2">
                                <div className="carousel-item active">
                                    
                                </div>
                                <div className="carousel-item">
                                    <img src="images/R.jpg" className="d-block w-100 imge2" alt="..." id="image_produit" />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div> */}
                    </div>
                    <div className="bloc3 font" style={{height: '420px', marginBottom: '0px'}}>
                        <div style={{margin: '20px'}}>
                            <h2 className="product-name1">{data.product.name}</h2>
                            <div>
                                <p className="" style={{margin: '0px', marginLeft: '20px'}}> </p>
                            </div>
                            <div className="d">
                                <p className="product-price1" style={{textAlign: 'left'}}>{data.product.price} {data.company.currency.symbol}</p>
                                <span style={{marginLeft: '30px' }}>Stock:a {data.product.stocks}</span>
                            </div>
                            <div className='overflows' style={{height: '200px', marginBottom: '20px'}}>
                                <p style={{ textAlign: 'justify', color: 'white' }}  id='desc'>	
                                    {/* <p>pas de description</p> */}
                                </p>
                            </div>
                            <div className="add-to-cart" style={{    textAlign: 'center'}}>
                               <div className="d dp" style={{marginTop: '20px', margin: 'auto'}}>
                                     <div className="qty-label d" style={{margin: 'auto'}}>
                                        Quantité
                                        <div style={{marginLeft: '4px' }}>
                                            <input type="number" value={k} onChange={(e) => setK(e.target.value)} style={{width: '100%'}}/>
                                        </div>
                                    </div>
                                    {/* <select className="form-select" aria-label="Default select example">
                                        <option selected>couleur</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    <select className="form-select" aria-label="Default select example" style={{marginLeft: '20px'}}>
                                        <option selected>taille</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select> */}
                                    <button type="button" className="productb btn btn-warning b" onClick={() => panier(data.product)}><span style={{color: 'white', fontSize: '100%'}}> ajouter au panier </span></button>
                                </div> 
                                
                                </div>                            
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Produit;