import { useState, useEffect, useCallback } from "react";
import useEth from "../../contexts/EthContext/useEth";

const Control = ({ setInfo }) => {
  const { state } = useEth();
  const [amount, setAmount] = useState(0);

  const handleInputChange = (e) => {
    const format = /^[0-9]+\.?[0-9]*$/;
    if (format.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  const becomeKing = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (amount === "") {
      alert("Please enter a value to write.");
      return;
    }

    const wei = state.web3.utils.toWei(String(amount), "ether");
    await state.contract.methods
      .becomeKing()
      .send({ from: state.accounts[0], value: wei });
    getInfo();
  };

  const getInfo = useCallback(async () => {
    const currentKing = await state.contract.methods.getKing().call();
    let currentDeposit = await state.contract.methods.getDepositOfKing().call();
    currentDeposit = state.web3.utils.fromWei(String(currentDeposit), "ether");
    let requiredDeposit = await state.contract.methods
      .getRequiredDeposit()
      .call();
    requiredDeposit = state.web3.utils.fromWei(
      String(requiredDeposit),
      "ether"
    );
    const wei = await state.web3.eth.getBalance(state.accounts[0]);
    const accountBalance = state.web3.utils.fromWei(String(wei), "ether");

    setInfo({
      currentKing,
      currentDeposit,
      requiredDeposit,
      accountBalance,
    });
    setInfo((prevInfo) => {
      return { ...prevInfo, currentKing, accountBalance };
    });
  }, [
    setInfo,
    state.accounts,
    state.contract.methods,
    state.web3.eth,
    state.web3.utils,
  ]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  return (
    <div className="btns">
      <button onClick={getInfo} className="input-btn">
        ↻ Refresh
      </button>
      <input
        type="text"
        className="input-field"
        placeholder="uint"
        value={amount}
        onChange={handleInputChange}
      />

      <button onClick={becomeKing} className="input-btn">
        Become 👑
      </button>
    </div>
  );
};

export default Control;
