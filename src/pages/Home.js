import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { NavLink } from "react-router-dom"
import LoadingInit1 from '../components/Loading/LoadingInit1';

import { addProductcart, addtotalcart, setCollections, setCurent, setProduct, setProducts, setquantutycart } from '../store/DataSlice';


const Home = () => {
    const data1 = useSelector((state)=>state.data);
    const dispatch = useDispatch();
    let collections = data1.collections
    const data = data1.company
    let total_collection = []
    //const [collection, setCollection] = useState([]);
    //const [produits, setProduit] = useState([]);
    const [produits1, setProduit1] = useState([]);
    const [rech_c, setRech_c] = useState("");
    let produits
    //useEffect
    //setCollection(data1.collections)
    if(data1.collections === null) {
        GetCollections()
    }
    if(collections !== null){
        produits = data1.products
        // if (produits.links.next == null) {
        //     document.getElementById("next")?.classList.add("disabled");
        //     document.getElementById("disabled")?.classList.add("active");
        // }
        // if (produits.links.next != null) {
        //     document.getElementById("next")?.classList.remove("disabled");
        //     document.getElementById("disabled")?.classList.remove("active");
        // }
        // if (produits.links.prev != null) {
        //     document.getElementById("disabled")?.classList.remove("disabled");
        // }
        // if (produits.links.prev == null) {
        //     document.getElementById("disabled")?.classList.add("disabled");
        // }
        //document.getElementById('cat-' + data1.curent)?.classList.add("active");
        //console.log('fffffffffffffffffffff')
    }
    async function GetCollections() {
        total_collection = [];

        axios
            .get(data1.api + "companies/" + data.id + "/collections")
            .then((res) => {
                
                for (let j = 0; j < res.data.data.length; j++) {
                    total_collection.push(res.data.data[j]);
                }
                //setCollection(total_collection)
                if(res.data.meta.last_page===1)
                {
                    dispatch(setCollections(total_collection))
                }
                dispatch(setCurent(total_collection[0].id))
                //console.log("change 1"+data1.curent)
                ProduitCollections(total_collection[0].id)
                let total = total_collection;
                for (let index = 2; index < res.data.meta.last_page+1; index++) {
                    //console.log("total in:" + total.length)

                    axios
                    .get("https://dashboard.genuka.com/api/2021-10/companies/" + data.id + "/collections?page=" + index)
                    .then((res1) => {
                        for (let j = 0; j < res1.data.data.length; j++) {
                            total.push(res1.data.data[j])
                            //setCollection(total)
                        // console.log("total out:" + total.length)
                        }
                        console.log('rrrrrrrrrrrrrrrrrrrrr',total)
                        dispatch(setCollections(total))
                    });

                }
                

                //allCollection(total_collection)

            })


    };
    function ProduitCollections(id) {

        axios
            .get(data1.api + "companies/" + data.id + "/collections/" + id)
            .then((res) => {
                //setProduit(res.data.products.data)
                console.log()
                dispatch(setProducts(res.data.products))
                document.getElementById('cat-' + data1.curent)?.classList.remove("active");
               dispatch(setCurent(id))
                //console.log("change 2"+data1.curent)
                document.getElementById('cat-' + id)?.classList.add("active");
                
                
            });

        axios
            .get(data1.api + "companies/" + data.id + "/collections/" + id)
            .then((res) => {
                setProduit1(res.data.products.links)
                if (res.data.products.links.next == null) {
                    document.getElementById("next")?.classList.add("disabled");
                    document.getElementById("disabled")?.classList.add("active");
                }
                if (res.data.products.links.next != null) {
                    document.getElementById("next")?.classList.remove("disabled");
                    document.getElementById("disabled")?.classList.remove("active");
                }
                if (res.data.products.links.prev != null) {
                    document.getElementById("disabled")?.classList.remove("disabled");
                }
                if (res.data.products.links.prev == null) {
                    document.getElementById("disabled")?.classList.add("disabled");
                }
            });
    }
    function Productpagination(url) {
        axios
            .get(url)
            .then((res) => dispatch(setProducts(res.data.products))
            );
        axios
            .get(url)
            .then((res) => {
                setProduit1(res.data.products.links)
                if (res.data.products.links.next == null) {
                    document.getElementById("next")?.classList.add("disabled");
                    document.getElementById("disabled")?.classList.add("active");
                }
                if (res.data.products.links.next != null) {
                    document.getElementById("next")?.classList.remove("disabled");
                    document.getElementById("disabled")?.classList.remove("active");
                }
                if (res.data.products.links.prev != null) {
                    document.getElementById("disabled")?.classList.remove("disabled");
                }
                if (res.data.products.links.prev == null) {
                    document.getElementById("disabled")?.classList.add("disabled");
                }
            });

    }
    function panier(pr){
        let n = 0
        if(data1.cart.products.total === 0){
            let p = {}
            p.name = pr.name
            p.quantity = 1
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
            for(let i=0; i<data1.cart.products.total; i++){
                if(data1.cart.products.product[i].id === pr.id){
                    n=1
                    dispatch(setquantutycart(pr))
                }
            }
            if(n===0){
                let p = {}
                p.name = pr.name
                p.quantity = 1
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
        
    }
    setTimeout(function(){
        //  alert(data.product.description)
        if(!document.querySelectorAll('active')[0])
        {document.getElementById('cat-' + data1.curent)?.classList.add("active");}
        //console.log("change 4"+data1.curent)
      
   }, 2000);
   console.log('data.id',data1.collections)
  // console.log(data1.cart.products.product)
    return data1.collections === null? <LoadingInit1/> : data1.products === null? <LoadingInit1/> :(
        <div>
            <section className="section container-fluid">
                <div className="row">
                    <div>
                        <p className="h1 tetle"><b style={{ color: 'white' }}> BIENVENUE CHEZ <br /> <span style={{ color: 'orange' }} className="pol">{data.name}</span></b> </p>
                    </div>
                </div>
            </section>
            <section className="section2 container-fluid">
            </section>
            <section className="border" style={{ height: '50px' }}>
                <div className="container p-1">

                </div>
            </section >
            <main>
                <div className="bloc2">
                    <div className="titre_1">
                        <div className="me-auto  mb-lg-0" style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setRech_c(e.target.value)} />
                                <button type="button" className="btn btn-secondary" style={{ backgroundColor: 'black' }}> <span><i className="fa-solid fa-magnifying-glass " style={{ color: 'orange' }}></i></span></button>
                            </div>
                        </div>
                        <div style={{ height: '40px' }}>
                        </div>
                        <span className="border ron titre" style={{ marginTop: '100px' }}>Colections</span>
                        <div style={{ height: '20px' }}>
                        </div>
                        <ul className='overflows' style={{paddingLeft: '0px'}}>
                            <div style={{height: '400px'}}>    
                                {collections
                                    .filter((collection) => collection.name.includes(rech_c))
                                    .map(collection => (
                                        <li className="list"><button className="btn but_coll" id={'cat-' + collection.id} key={collection.id} onClick={(e) =>{ 
                                            
                                            dispatch(setCurent(null))
                                            //console.log("change 3"+data1.curent)
                                            document.getElementById('cat-' + data1.curent)?.classList.remove("active");
                                            document.querySelectorAll('active')[0]?.classList.remove("active");
                                            dispatch(setCurent(null))
                                            ProduitCollections(collection.id)}}><NavLink to="/" className="ron3">{collection.name}</NavLink></button></li>
                                    ))}

                            </div>
                        </ul>
                        
                    </div>
                    <div className="bloc row g-0" >
                        {/* <!-- product --> */}
                        {produits.data.map(produit => (
                            <div className="border produit">
                                <div>
                                    <NavLink to={'/produit/'+produit.id} onClick={() => dispatch(setProduct(produit))}>
                                        <div style={{ height: '220px' }}>
                                            <div style={{ position: 'relative' }}>
                                                <div style={{ position: 'absolute', top: 0 }} className="product-preview position-absolute">
                                                    {produit.medias.slice(0, 1).map(image => (
                                                        <img src={image.link} alt="" className="imge" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <h3 className="product-name"><NavLink to='/Produit' onClick={() => dispatch(setProduct(produit))} className="ron3">{produit.name}</NavLink></h3>
                                    <h4 className="product-price">{produit.price} {data1.company.currency.symbol}</h4>
                                    <div>
                                        <NavLink to={'/produit/'+produit.id} onClick={() => dispatch(setProduct(produit))}>
                                            <button className="btn btn-success button">voire</button>
                                        </NavLink>
                                        <button className="productb btn btn-warning" onClick={() => panier(produit)}><i className="fa fa-shopping-cart"></i>panier</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled" id="disabled" onClick={() => Productpagination(produits1.prev)}>
                            <button className="page-link"  tabindex="-1" aria-disabled="true">Previous</button>
                        </li>
                        {/* <li className="page-item active" onClick={() => Productpagination(produits1.last)}><a className="page-link">1</a></li>
                           <li className="page-item" onClick={() => Productpagination(produits1.next)}><a className="page-link" >2</a></li>
                        */}
                        <li className="page-item active" onClick={() => Productpagination(produits.links.next)} id="next">
                            <button className="page-link" href='#'>Next</button>
                        </li>
                    </ul>
                </nav>
            </main>
            
        </div >
    );
};

export default Home;
/*
    

*/