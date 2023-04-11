import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
const Apex=React.lazy(()=>import('./App'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Suspense fallback={<div style={{display:'flex',
  justifyContent:'center',
  alignItems:'center',marginBlockStart:'15rem'}}>
    <div style={{fontFamily:'helvetica',color:'steelblue',fontSize:'1.5rem'}}>Loading...</div>
  </div>}>
    <Apex/>
  </React.Suspense>
);


