import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataProvider from "../../context/auth";

const layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <DataProvider>
      <Header />
      <ToastContainer />
      <main>{children}</main>
      <Footer />
      </DataProvider>
    </div>
  );
};

layout.defaultProps = {
  title: "Ecommerce App - Short Now",
  description: "Mern Stack Project",
  keywords: "React , Node , Express ,Mongodb",
  author: "Ajay Gurjar",
};

export default layout;
