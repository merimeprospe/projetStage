import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { NavLink } from 'react-router-dom';
import { setProduct } from '../store/DataSlice';

const SearchList = () => {
  const data = useSelector((state) => state.data);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      
    </>
  );
};

export default SearchList;
