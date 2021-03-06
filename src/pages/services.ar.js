import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import Helmet from 'react-helmet'
import LazyLoad from 'react-lazyload'
import styled from "styled-components";

//components
import PHeader from '../components/PHeader'
import Footer from '../components/Footer'
import TitleBox from '../components/TitleBox'
import Headline from '../components/Headline'
import Section from '../components/Section'
import Card from '../components/Card'


class About extends React.Component {
    render() {
        const { data } = this.props
        const layout = this.props.layoutData
        const page = data.service
        const bg = page.frontmatter.wallpaper == null ? "" : page.frontmatter.wallpaper.childImageSharp.resize.src
        const Wallpaper = styled.div`
                background-image: url(${bg});
        `;
        const services = data.services.edges
        const serviceslist = [];
        let i = 0;
        services.forEach(service => {
            service = service.node.frontmatter
            const image = service.image.childImageSharp.resize.src
            serviceslist.push(
              <Section
              title={service.title_ar}
              image={image}
              imageTransparent= {service.imageTransparent}
              description={service.summary_ar}
              order= {i++}
              />
            )
          }
        )
        //fetch info
        const featureslist = [];
        page.frontmatter.features.forEach(feature => {
            featureslist.push(
              <Card 
              color= "purple"
              image= {feature.icon}
              image_type= "icon"
              header= {<h4>{feature.title_ar}</h4>}
              />
            )
          }
        )
        return (
            <div>
            <Helmet>
                <title>{layout.title} | {page.frontmatter.title_ar}</title>
            </Helmet>
            <div className="content">
            <PHeader
            language="English"
            logo={layout.logo}
            menu={layout.menu}
            />
            <div className="container-fluid">
            <TitleBox
            pageTitle={page.frontmatter.page_title_ar}
            pageSubtitle={page.frontmatter.subtitle_ar}
            pageDescription={page.frontmatter.description_ar}
             />
            <div className="page">
                <div className="row">
                    <div className="col">
                        <div className="page-content">
                            <Headline title={page.frontmatter.features_title_ar}/>
                            <div className="card-deck">
                                {featureslist}
                            </div>
                        </div>
                    </div>
                </div>
                <br/> 
                <div className="page-content">
                    <Headline title={page.frontmatter.services_title_ar} />
                    {serviceslist}
                </div>
            </div>
          
          
          <Footer 
          text= {layout.footer}
          twt= {layout.socialMedia.twitter}
          fb= {layout.socialMedia.facebook}
          inst= {layout.socialMedia.instagram}
          gp= {layout.socialMedia.google_plus}
          ytb= {layout.socialMedia.youtube}
          />
          </div>
        </div>
        <Wallpaper id="bg"></Wallpaper>
            </div>
        )
    }
}

export default About

export const pageQuery = graphql`
    query ServicesQueryAr {
        service: markdownRemark(frontmatter:{slug: {eq:"services"}}){
            frontmatter {
            title_ar
            page_title_ar
            subtitle_ar
            description_ar
            services_title_ar
            features_title_ar
            features {
                title_ar
                icon
            }
            wallpaper {
                childImageSharp {
                    resize (width: 1920){
                        src
                    }
                }
            }
            }
            html
        }
        services: allMarkdownRemark(sort: {fields: [id], order: DESC}, filter: {frontmatter: {type: {eq: "service"}}}) {
            edges {
            node{
                frontmatter{
                title_ar
                summary_ar
                image {
                    childImageSharp {
                        resize (width: 500){
                            src
                        }
                    }
                }
                imageTransparent
                }
            }
            }
        }
    }
`