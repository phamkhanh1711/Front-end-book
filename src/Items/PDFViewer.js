import React, { useState, useEffect } from "react";
import axios from "axios";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

function PDFViewer() {
  const [viewPdf, setViewPdf] = useState("");
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  const params = useParams();
  console.log(params);

  // Define baseUrl
  const baseUrl = "http://localhost:8081"; // Replace with your actual API base URL

  // Assuming you have a state variable to store the authentication token
  const Token = Cookies.get("Token");
  console.log(Token);
  useEffect(() => {
    axios
      .get(`${baseUrl}/pdf-file/${params.id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        console.log(res);
        const responseData = res.data;
        console.log(responseData);
        // console.log('API Response:', responseData.path);
        //  const pdfUrl = `${baseUrl}/${responseData.path}`;
        //  console.log(pdfUrl);

        const pdfUrl = `${baseUrl}/${responseData.path}`;
        Swal.fire(responseData.message);

        setViewPdf(pdfUrl);
        setShowPdfViewer(true);
      })
      .catch(function (error) {
        console.error("Error fetching PDF data:", error);
      });
  }, [params.id, baseUrl]);

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const layoutPlugin = defaultLayoutPlugin({
    pageNavigation: {
      pageIndex: pageNavigationPluginInstance.pageIndex,
      pages: pageNavigationPluginInstance.pages,
      totalPages: pageNavigationPluginInstance.totalPages,
    },
  });

  return (
    <div className="container">
      {/* {<Link
              to={`/detective/detail/${viewPdf.}`}
                
              style={{ color: 'white' }} className='btn btn-primary'
            >
              Back
             </Link> } */}

      {showPdfViewer && (
        <div className="pdf-container">
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
          >
            <Viewer
              fileUrl={viewPdf}
              plugins={[layoutPlugin, pageNavigationPluginInstance]}
              defaultScale={1}
            />
          </Worker>
        </div>
      )}
    </div>
  );
}

export default PDFViewer;
