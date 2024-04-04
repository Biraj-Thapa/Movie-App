import React from 'react';
import Header from './Movies/Header.jsx';
import MoviesContainerPage from './Movies/MoviesContainerPage.jsx';
const Home = () => {
  return (<>
  <Header/>
  <section className="mt-[10rem]">
    <MoviesContainerPage/>
  </section>
  </>)
}

export default Home