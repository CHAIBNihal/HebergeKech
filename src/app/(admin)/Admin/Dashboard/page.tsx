import React from "react";
import Cards from "@/app/Components/admin/cards/Cards";
import UserCards from "@/app/Components/admin/cards/userCards";
import style from "../../../Components/admin/dash.module.css";
import RightSide from "../../../Components/admin/RightSide/RightSide"
import Transaction from "../../../Components/admin/transaction/Transaction"

const Home = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.main}>
        <div className={style.cards}>
          <Cards />
          <UserCards />
        </div>
        <div>
          <Transaction />
        </div>

        
      </div>
      <div className={style.side}>
        <RightSide />
      </div>
    </div>
  );
};

export default Home;
