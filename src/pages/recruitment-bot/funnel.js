import React from 'react';
import Funnel from '../../components/recruitment_bot/funnel/funnel';
import Layout from '../../components/recruitment_bot/layout'
export default ({ children, location }) => (
    <Layout>
        <Funnel location={location}/>
    </Layout>
)