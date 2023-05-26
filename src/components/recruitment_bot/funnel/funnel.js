import React, { Component } from 'react'
import  classes   from './funnel.module.css';

 
import { FunnelChart } from 'react-funnel-pipeline'
import 'react-funnel-pipeline/dist/index.css'


const Funnel = () => {
  
 return <React.Fragment>
   <div className={classes.main_container}>
   <div className={classes.sub_div}>
   <FunnelChart 
        data={[
          { name: 'Awareness', value: 252 },
          { name: 'Interest', value: 105 },
          { name: 'Consideration', value: 84 },
          { name: 'Evaluation', value: 72 },
          { name: 'Commitment', value: 19 },
          { name: 'Sale', value: 10 },
          { name: 'SaleQuality', value: 8 },
        ]}
      />
      </div>
      </div>
</React.Fragment>




}
export default Funnel