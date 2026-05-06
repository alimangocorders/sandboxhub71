import React from 'react'
import Hero from './components/Hero';
import Nav from './components/Nav';
import ImpactReport from './components/ImpactReport';
import ProgressSection from './components/ProgressSection';
import Sectors from './components/Sectors';
import Programs from './components/programs';

const App = () => {
  return (
    <>
    <Nav/>
    <Hero />
    <ImpactReport />
    <ProgressSection />
    <Sectors />
    <Programs />
    </>

  )
}

export default App