import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined } from "@ant-design/icons";

import { Address, Balance, Events } from "../components";

export default function Vault({
  depositAmount,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
  balanceWZY,
}) {
  const [newDeposit, depositWZYToken] = useState("loading...");
  const [newWithdraw,withdrawToken] = useState("loading...");


  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 800, margin: "auto", marginTop: 64 }}>
        <h2>存取WZY币</h2>
        <h4>已存WZY币: {depositAmount}</h4>
        <h4>拥有WZY币: {balanceWZY}</h4>
        <Divider />
        <div style={{ margin: 18 }}>
          <Input
            onChange={e => {
              depositWZYToken(e.target.value);
            }}
          />
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              /* look how you call setPurpose on your contract: */
              /* notice how you pass a call back for tx updates too */
              const result = tx(writeContracts.Vault.deposit(newDeposit), update => {
                console.log("📡 Transaction Update:", update);
                if (update && (update.status === "confirmed" || update.status === 1)) {
                  console.log(" 🍾 Transaction " + update.hash + " finished!");
                  console.log(
                    " ⛽️ " +
                      update.gasUsed +
                      "/" +
                      (update.gasLimit || update.gas) +
                      " @ " +
                      parseFloat(update.gasPrice) / 1000000000 +
                      " gwei",
                  );
                }
              });
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
            }}
          >
            Deposit!
          </Button>
        </div>
        <Divider />
        <div style={{ margin: 18 }}>
          <Input
            onChange={e => {
              withdrawToken(e.target.value);
            }}
          />
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              /* look how you call setPurpose on your contract: */
              /* notice how you pass a call back for tx updates too */
              const result = tx(writeContracts.Vault.withdraw(newWithdraw), update => {
                if (update && (update.status === "confirmed" || update.status === 1)) {
                  console.log(" 🍾 Transaction " + update.hash + " finished!");
                }else{
                  console.log("出错误了");
                }
              });
            }}
          >
            Withdraw!
          </Button>
        </div>
      
      </div>
    </div>
  );
}
