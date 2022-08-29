import React from 'react';
import { useSelector } from 'react-redux/es/exports';

const LoadingInit1 = () => {
    const data1 = useSelector((state)=>state.data);
    const data = data1.company
    return (
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
            <div class="d-flex justify-content-center" style={{marginTop: '50px'}}>
                <div class="spinner-border text-warning" role="status" style={{width: '6rem', height: '6rem'}}>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingInit1;