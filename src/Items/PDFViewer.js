import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function PDFViewer() {
  const [viewPdf, setViewPdf] = useState('');
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  // const [showAllPages, setShowAllPages] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [successMessage, setSuccessMessage] = useState('');
  const params = useParams();
  
  const navigation = useNavigate();

  // Define baseUrl
  const baseUrl = 'http://localhost:8081'; // Replace with your actual API base URL

// Assuming you have a state variable to store the authentication token
const Token = Cookies.get('Token'); 
useEffect(() => {
  axios
    .get(`${baseUrl}/pdf-file/${params.id}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
    .then((res) => {
      const responseData = res.data;
      console.log(responseData);
      console.log('API Response:', responseData.path);
       const pdfUrl = `${baseUrl}/${responseData.path}`;
       console.log(pdfUrl);
      
      setViewPdf(pdfUrl)
        setShowPdfViewer(true);
      
    })
    .catch(function (error) {
      console.error('Error fetching PDF data:', error);
    });
}, [params.id, baseUrl]);
  // function handle ()
  // {

  // }


  const pageNavigationPluginInstance = pageNavigationPlugin();
  const layoutPlugin = defaultLayoutPlugin({
    pageNavigation: {
      pageIndex: pageNavigationPluginInstance.pageIndex,
      pages: pageNavigationPluginInstance.pages,
      totalPages: pageNavigationPluginInstance.totalPages,
    },
  });

  // const url = `${baseUrl}/create_payment_url/${params.id}`;

  // const toggleShowAllPages = async () => {
  //   const Token = Cookies.get('Token');  // Retrieve the token from cookies

  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${Token}`,
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //     withCredentials: true, // Add this line
  //   };
  //   try {
  //     const res = await axios.post(url, {}, config);
  //     console.log(res.data);
  //     window.location.href = res.data.vnpUrl;

  //     setTimeout(() => {
  //       console.log('Payment process completed');
  //       setIsLoading(false);
  //       setSuccessMessage('');

  //       console.log('Navigating back to PDF viewer page');
  //       navigation(`/pdf/${params.id}`);
  //       setShowAllPages(true);
  //     }, 2000);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className='container'>
      <Link
              to={`/detective`}
              
              style={{ color: 'white' }} className='btn btn-primary'
            >
              Back
            </Link>

      {showPdfViewer && (
        <div className='pdf-container'>
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <Viewer
              fileUrl={viewPdf}
              plugins={[layoutPlugin, pageNavigationPluginInstance]}
              defaultScale={1}
            />
          </Worker>
          {/* <div className='button-container'>
            <button style={{ color: 'green' }} className='btn btn-default' onClick={toggleShowAllPages}>
              {showAllPages ? 'Show First 5 Pages' : 'Show All Pages'}
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default PDFViewer;
