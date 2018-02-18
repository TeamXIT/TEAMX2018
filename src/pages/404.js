import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import Helmet from 'react-helmet'
import LazyLoad from 'react-lazyload'
import styled from "styled-components";

//components
import Header from '../components/Header'
import Footer from '../components/Footer'
import TitleBox from '../components/TitleBox'

import bg from '../images/404.jpg'

class Index extends React.Component {
    
    render() {
        
        const { data } = this.props
        const Cover = styled.div`
                background-image: url(${bg});
        `;
        return (
            <div>
            <div className="content">
            <Header
            language="العربية"
            />
            <Helmet>
                <meta charSet="utf-8" />
                <title>{data.site.siteMetadata.title}</title>
            </Helmet>
            <div className="container-fluid">
            <TitleBox
            pageTitle="404"
            pageSubtitle="We are Sorry, this page seems doesn't exist or still under construction"
            pageDescription=""
             />
            </div>
            <Footer />
            </div>
            <Cover id="bg"></Cover>
            </div>
        )
    }
}

export default Index

export const pageQuery = graphql`
    query nQuery {
        site{
            siteMetadata{
            title
            }
        }
    }
`