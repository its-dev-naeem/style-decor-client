import React from 'react';
import TopServices from '../../components/Home/TopServices';
import TopDecorators from '../../components/Home/TopDecorators';
import SimpleHomeHero from '../../components/Home/HomeHero';

const Home = () => {
    return (
        <div>
            <TopServices></TopServices>
            <TopDecorators></TopDecorators>
            <SimpleHomeHero></SimpleHomeHero>
        </div>
    );
};

export default Home;