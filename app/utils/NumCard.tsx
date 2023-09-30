import React, { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

interface cardProp{
    number: number;
    suffix: string;
    desc: string;
  }

export default function NumCard(props : cardProp) {
  const [counterOn, setCounterOn] = useState(false);
  return (
    <div className="numbers-card">
      <div className="num-card-title">
        <ScrollTrigger
          onEnter={() => setCounterOn(true)}
          onExit={() => setCounterOn(false)}
        >
        {counterOn ? <CountUp start={0} end={props.number} suffix={props.suffix} duration={1} delay={0}/> : 0}
        </ScrollTrigger>
      </div>
      <div className="num-card-desc">{props.desc}</div>
    </div>
  );
}
