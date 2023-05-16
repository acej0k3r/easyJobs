import React, { usestate, useEffect } from "react";



let startTime;
let endTime;
let diff;



export function startClock() {
   startTime = new Date().getTime();
   console.log('the start time is : ', startTime);

}

export function endClock() {

   if (startTime) {
      endTime = new Date().getTime();

      diff = endTime - startTime;

      console.log('Time End: ', endTime);

      console.log('Total Time: ', diff);
   } else {


      console.log('start time not defined');
      diff = 0;
   }




   return diff;



}













