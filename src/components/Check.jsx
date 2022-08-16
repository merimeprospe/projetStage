import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from "./Footer";
import { useDispatch, useSelector } from 'react-redux/es/exports';
import LoadingInit from './Loading/LoadingInit'
import Error404 from "./Errors/Error404";
import { setCollections, setCompany, setLogin } from "../store/DataSlice";
import axios from "axios";
import Home from '../pages/Home';
import Navigation from './Navigation';
import Produit from '../pages/Produit';
import Commande from '../pages/Commande';
import Panier from '../pages/Panier';

export default function Check(){
  const data = useSelector((state)=>state.data);
  const dispatch = useDispatch();
  let total_collection = []
/*getter*/
//.get(data.api + "companies/byurl?url=" + data.url)// /byurl?url=" + domaine )
async function getCompany() {
 // console.log( "company" + data.company)
    if (data.company === null ) {
      try {
        //dispatch(setLogin("company"));  
        axios
          .get(data.api + "companies/details/2")// /byurl?url=" + domaine )
          .then((response) => {
            console.log( "company" + data.company)
              if (response.status === 200) {
                  dispatch(setCompany(response.data))
              }
              else {
                
                
                data.company.id = -404
              }
        
        }).catch((err) => {
          dispatch(setCompany(404))
          console.log('error',data.company)
      });
      } catch (error) {
        //console.log('error',error)
      }
  } 
}
//  async function GetCollections() {
//   let total_collection = []

//   axios
//       .get("https://api.genuka.com/2021-10/companies/2/collections")
//       .then((res) => {
//           for (let j = 0; j < res.data.data.length; j++) {

              
//               total_collection.push(res.data.data[j]);

//           }
//           dispatch(setCollections(total_collection))
//           //setCurent(total_collection[0].id)
//           //ProduitCollections(total_collection[0].id)
//           let total = total_collection;
//           for (let index = 2; index < res.data.meta.last_page+1; index++) {
//              // console.log("total leng:" + total.length)

//               axios
//               .get("https://dashboard.genuka.com/api/2021-10/companies/2/collections?page=" + index)
//               .then((res1) => {
//                   for (let j = 0; j < res1.data.data.length; j++) {
//                       total.push(res1.data.data[j])
//                       dispatch(setCollections(total))
                      

//                   }
//                   console.log("total  i  " + total.length)
//               });
//           }
//       })
// };
// GetCollections()
getCompany()

return data.company === null? <LoadingInit/> : data.company === 404 ? <Error404/>  :
 ( <BrowserRouter>
  <Navigation />
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/produit/:id' element={<Produit />} />
    <Route path='/commande' element={<Commande />} />
    <Route path='/panier' element={<Panier />} />
    <Route path='*' element={<Home />} />
    </Routes>
  <Footer/>
  </BrowserRouter>)
}
/**
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>} />
    </Routes>
  <Footer/>
  </BrowserRouter> */
