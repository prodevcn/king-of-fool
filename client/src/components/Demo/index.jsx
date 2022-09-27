import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Panel from "./Panel";
import Control from "./Control";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function BecomeKingOfFull() {
  const { state } = useEth();
  const initialInfo = {
    currentKing: "Ox00",
    currentDeposit: 0,
    requiredDeposit: 0,
    accountBalance: 0,
  };
  const [info, setInfo] = useState(initialInfo);

  return (
    <div className="demo">
      {!state.artifact ? (
        <NoticeNoArtifact />
      ) : !state.contract ? (
        <NoticeWrongNetwork />
      ) : (
        <div className="contract-container">
          <Panel info={info} />
          <Control setInfo={setInfo} />
        </div>
      )}
    </div>
  );
}

export default BecomeKingOfFull;
