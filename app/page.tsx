"use client"
import Main from './components/Main'
import Services from './components/Services'
import Main3 from './components/Main3'
import Numbers from './components/Numbers'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <Main />      
      <Services/>
      <Numbers/>
      <Footer />
    </>
  )
}
