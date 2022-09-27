import { useRef, useEffect } from "react";

const Panel = ({ info }) => {
  const spanEle = useRef(null);

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [info]);

  return (
    <code>
      <h2>Become a 👑King of Fools</h2>
      <hr></hr>
      <ul className="data-container">
        <li className="data-item">
          <strong>Current King 👑:</strong>
          <br />
          <span className="secondary-color" ref={spanEle}>
            <strong>{info.currentKing}</strong>
          </span>
        </li>
        <li className="data-item">
          <strong>Current Deposit 💰:</strong>
          <br />
          <span className="secondary-color" ref={spanEle}>
            <strong>{info.currentDeposit} ETH</strong>
          </span>
        </li>
        <li className="data-item">
          <strong>Required Deposit 💰:</strong>
          <br />
          <span className="secondary-color" ref={spanEle}>
            <strong>{info.requiredDeposit} ETH</strong>
          </span>
        </li>
        <li className="data-item">
          <strong>Your Balance 💰:</strong>
          <br />
          <span className="secondary-color" ref={spanEle}>
            <strong>{info.accountBalance} ETH</strong>
          </span>
        </li>
      </ul>
    </code>
  );
};

export default Panel;
