import React from 'react'
import Layout from '../../components/Layout/Layout'
import AboutBlock from './AboutBlock'
import HeroBanner from './HeroBanner'
import CompanyStatement from './CompanyStatement'
import IngredientInfo from './IngredientInfo'
import OurTradePolicy from './OurTradePolicy'

const About: React.FC = () => {
  return (
    <Layout title="About">
      {/* SECTION: Hero Banner */}
      <HeroBanner />

      {/* SECTION: Company Statement */}
      <AboutBlock container>
        <CompanyStatement />
      </AboutBlock>

      {/* SECTION: Ingredient Information */}
      <AboutBlock isDarkBackground>
        <IngredientInfo />
      </AboutBlock>

      {/* SECTION: Region Map */}
      <AboutBlock container>
        <OurTradePolicy />
      </AboutBlock>
    </Layout>
  )
}

export default About
