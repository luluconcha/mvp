import React from 'react'
import {useState, useEffect} from 'react'

export default function TotalMsgs() {
    const [totalMsgs, setTotalMsgs] = useState(0)

    ////// this breaks, I don't know why! so they're updating in the database but not the total on the page
    // useEffect(() => {
    //     getTotal();
    //   }, []);
    
    async function getTotal() {
        try {
          const res = await fetch("/api/politicians/total_msgs");
          if (!res.ok) throw new Error(`Oops! ${res.status} ${res.statusText}`);
          const total = await res.json();
          setTotalMsgs(total);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
    }

    return (
    <div> we've sent {totalMsgs} messages total!</div>
  )
}
