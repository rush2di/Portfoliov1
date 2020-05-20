import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { useLanguages, languageFilter, useThemes } from "../utils/utils"

const HomePage = ({data}) => {
	const { lang } = useLanguages()
	const { frontmatter } = data.edges[0].node
	const content = languageFilter(frontmatter, lang)
	const { title, introduction, paragraph, speciality, tsheading, tsparagraph, psheading } = content	
  const { textStyle } = useThemes()

	const titleFixer = () => (
		<React.Fragment>
			<span>{title.substring(0, title.search("Ro"))}</span>
			<br/>
			<span>{title.substring(title.search("Ro"))}</span>
		</React.Fragment>
	)

	return (
	  <div className="container">
	  	<div className="section-hero-wrapper">
			  <div className="section-hero">
			    <h1 className="heading heading-xl">{titleFixer()}</h1>
			  </div>
			  <div className="section-hero-grid">
					<span className={textStyle}>{speciality}</span>
			    <p><span className={textStyle}>{introduction} </span>{paragraph}</p>
		    </div>
	    </div>
	    <div className="section-skills-wrapper">
		    <div className="section-skills-grid">
			    <div className="section-skills-box">
			    	<h3 className="heading heading-sm">{tsheading}</h3>
			    	<p>{tsparagraph}</p>	    	
			    </div>
			    <div className="section-skills-box">
			    	<div className="box box-pf" />
			    	<div className="box box-pf" />
			    	<div className="box box-pf last" />
			    	<div className="box box-pm" />
			    	<div className="box box-pm last" />
			    	<div className="box box-pl first" />
			    	<div className="box box-pl" />
			    	<div className="box box-pl last" />
			    </div>
		    </div>
	    </div>	    
	    <div className="section-projects-wrapper">
	    	<h3 className="heading">{psheading}</h3>
	    	<ProjectsSection lang={lang}/>
	    </div>
	  </div>
	)
}

const ProjectsSection = ({lang}) => {
	const { allMarkdownRemark } = useStaticQuery(graphql`
{
  allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "projects-template"}}}, sort: {fields: [frontmatter___date], order: DESC}) {
    edges {
      node {
      	fields {
      		slug
      	}
        frontmatter {
          title
          date
          english {
            intro
            type
          }
          french {
            intro
            type
          }
        }
      }
    }
  }
}	
`)
	console.log(allMarkdownRemark)
	return (
		<div className="section-projects-grid">
			<div className="section-projects-box">
				<div className="list-wrapper">
					<ul>
						<UImapper data={allMarkdownRemark} lang={lang} />
					</ul>
				</div>
			</div>
			<div className="section-projects-box">
				<div className="project-card"/>
				<div className="project-card-wrapper">
					<div className="project-card-image"></div>
				</div>
			</div>
		</div>
		)
}

const UImapper = ({data, lang}) => (
	data.edges.map((items,i) => {
		const { slug } = items.node.fields
		const { frontmatter } = items.node

		const content = languageFilter(frontmatter, lang)
		const index = ""+i+1

		const { type } = content
		const { title } = frontmatter

		return (
			<li key={title+index}>
				<Link to={`projects/${slug}`}>
					<div>
						<span>{index}</span>
						<h3>{title}</h3>
						<span>{type}</span>
					</div>
				</Link>
			</li>
			)
	})
)

export default HomePage