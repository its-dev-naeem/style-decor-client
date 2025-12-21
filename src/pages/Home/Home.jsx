import React from 'react';
import TopServices from '../../components/Home/TopServices';
import TopDecorators from '../../components/Home/TopDecorators';
import SimpleHomeHero from '../../components/Home/HomeHero';
import ServiceCoverageMap from '../../components/Home/ServiceCoverageMap';

const Home = () => {
    return (
        <div>
            <SimpleHomeHero></SimpleHomeHero>
            <TopServices></TopServices>
            <TopDecorators></TopDecorators>
            <ServiceCoverageMap></ServiceCoverageMap>
        </div>
    );
};

export default Home;