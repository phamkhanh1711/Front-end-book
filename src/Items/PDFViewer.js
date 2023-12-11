import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function PDFViewer() {
  const [viewPdf, setViewPDF] = useState(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [showAllPages, setShowAllPages] = useState(false);
  const params = useParams();
  const navigation = useNavigate();
 
  useEffect(() => {
    // Fetch PDF data from the new API endpoint using the book_id parameter
    axios
      .get(`http://localhost:8081/book_5page/${params.id}`)
      .then((res) => {
        console.log('API Response:', res.data);
  
        // Check if the expected property is present in the response
        if (res.data && res.data.bookFilePath_5page && res.data.bookFilePath_5page.length > 0) {
          const pdfUrl = `http://localhost:8081${res.data.bookFilePath_5page[0]}`;
          console.log('PDF URL:', pdfUrl);
  
          // Set the PDF file URL in the state
          setViewPDF(pdfUrl);
          setShowPdfViewer(true);
        } else {
          console.error('No file_path_5page in the API response or it is undefined');
        }
      })
      .catch(function (error) {
        console.error('Error fetching PDF data:', error);
      });
  }, [params.id]);
  
  
  
  
  

  // Create a new plugin instance for page navigation
  const pageNavigationPluginInstance = pageNavigationPlugin();

  // Create a new layout plugin instance
  const layoutPlugin = defaultLayoutPlugin({
    pageNavigation: {
      pageIndex: pageNavigationPluginInstance.pageIndex,
      pages: pageNavigationPluginInstance.pages,
      totalPages: pageNavigationPluginInstance.totalPages,
    },
  });

  // Function to handle the click event to toggle between showing 5 pages and all pages
  const toggleShowAllPages = () => {
    // Show a confirmation dialog
    const userConfirmed = window.confirm('Do you want to make a payment to access all pages?');
    console.log(userConfirmed);

    // If the user clicks "OK" in the confirmation dialog, navigate to the cart
    if (userConfirmed) {
      navigation('/payment');
    }

    // Toggle the showAllPages state
    setShowAllPages(!showAllPages);
  };

  return (
    <div className='container'>
      <h2>View PDF</h2>
      {showPdfViewer && (
        <div className='pdf-container'>
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <Viewer
              fileUrl={viewPdf}
              plugins={[layoutPlugin, pageNavigationPluginInstance]}
              defaultScale={showAllPages ? 1 : 0.5} // Adjust the default scale based on the condition
            />
          </Worker>
          <div className='button-container'>
            <button style={{ color: 'green' }} className='payment-button' onClick={toggleShowAllPages}>
              {showAllPages ? 'Show First 5 Pages' : 'Show All Pages'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PDFViewer;