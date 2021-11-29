/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Page, Swiper, SwiperSlide, Block, Sheet, PageContent } from 'framework7-react';
import { useState, useEffect } from "react";
import Tab from "./Tab";
import Home from "./home";
import Product from "./product";
import Profile from "./profile";
import Login from "./login";
// import { motion } from "framer-motion";
import { eventBus } from "../global"
import Notif from "./notif";
import Loding from "./loding";



const Nav = (props) => {

  return (<div
    className="items-center bg-white shadow flex "
    style={{ boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.15)', zIndex: 10, paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '1rem', paddingBottom: '1.5rem' }}
  >
    <button onClick={() => { props.setState(0) }} className=" flex flex-col items-center justify-between space-y-2">
      <svg
        style={{ width: '1.5rem' }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill={props.state == 0 ? "#1d4ed8" : "#6B7280"}
          d="M20,8h0L14,2.74a3,3,0,0,0-4,0L4,8a3,3,0,0,0-1,2.26V19a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V10.25A3,3,0,0,0,20,8ZM14,20H10V15a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Zm5-1a1,1,0,0,1-1,1H16V15a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v5H6a1,1,0,0,1-1-1V10.25a1,1,0,0,1,.34-.75l6-5.25a1,1,0,0,1,1.32,0l6,5.25a1,1,0,0,1,.34.75Z"
        />
      </svg>
      <div
        className={"text-sm " + (props.state == 0 ? "text-blue-700" : "text-coolGray-500")}
      >
        Home
      </div>
    </button>
    <button onClick={() => { props.setState(1) }} className=" flex flex-col items-center justify-between space-y-2">
      <svg
        style={{ width: '1.5rem' }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill={props.state == 1 ? "#1d4ed8" : "#6B7280"}
          d="M20.47,7.37s0,0,0-.08l-.06-.15a.71.71,0,0,0-.07-.09.94.94,0,0,0-.09-.12l-.09-.07L20,6.78l-7.5-4.63a1,1,0,0,0-1.06,0L4,6.78l-.09.08-.09.07a.94.94,0,0,0-.09.12.71.71,0,0,0-.07.09l-.06.15s0,0,0,.08a1.15,1.15,0,0,0,0,.26v8.74a1,1,0,0,0,.47.85l7.5,4.63h0a.47.47,0,0,0,.15.06s.05,0,.08,0a.86.86,0,0,0,.52,0s.05,0,.08,0a.47.47,0,0,0,.15-.06h0L20,17.22a1,1,0,0,0,.47-.85V7.63A1.15,1.15,0,0,0,20.47,7.37ZM11,19.21l-5.5-3.4V9.43L11,12.82Zm1-8.12L6.4,7.63,12,4.18l5.6,3.45Zm6.5,4.72L13,19.21V12.82l5.5-3.39Z"
        />
      </svg>
      <div
        className={"text-sm " + (props.state == 1 ? "text-blue-700" : "text-coolGray-500")}
      >
        Product
      </div>
    </button>
    <button onClick={() => { props.setState(2) }} className=" flex flex-col items-center justify-between space-y-2">
      <svg
        style={{ width: '1.5rem' }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill={props.state == 2 ? "#1d4ed8" : "#6B7280"}
          d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"
        />
      </svg>
      <div
        className={"text-sm " + (props.state == 2 ? "text-blue-700" : "text-coolGray-500")}
      >
        Profile
      </div>
    </button>

  </div>)
}

export default ({ children, content }) => {
  //const _component = useComponent("btn","/app/web/src/components/test",{});
  const [state, setState] = useState(0);
  const [swiper, setSwiper] = useState({ slideTo: (e) => { } });
  const [loding, setLoding] = useState(true);

  useEffect(() => {
    setLoding(false);
  }, [])

  useEffect(() => {
    eventBus.on('notLogin', () => {
      setState(2);
      swiper.slideTo(2);
    })
  });
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      eventBus.dispatch('bottom', {});
    }
  }
  const blur = () => {
    if ("activeElement" in document) {

      // document.activeElement!.blur();
      (document.activeElement as HTMLElement).blur();

    }
  }

  return (
    <Page >
      <Notif />
      <Loding state={loding} />
      <div className={"h-screen bg-white flex-col " + (loding ? "hidden" : "flex")}>
        <div className="">
          <Tab mode={1} />
        </div>
        <div className=" flex-grow overflow-y-auto" >

          <Swiper style={{ height: '100%' }} onSwiper={setSwiper} onSlideChange={(e) => { setState(e.activeIndex); blur() }} >
            <SwiperSlide style={{ height: '100%' }}>
              <Home />
            </SwiperSlide>
            <SwiperSlide style={{ height: '100%' }}>
              <Product />
            </SwiperSlide>
            <SwiperSlide style={{ height: '100%' }}>

              {localStorage.getItem('user') ? <Profile /> : <Login />}

            </SwiperSlide>
          </Swiper>
        </div>
        <div >
          <Nav setState={(e) => { setState(e); swiper.slideTo(e) }} state={state} />
        </div>
      </div>

    </Page>
  )
}