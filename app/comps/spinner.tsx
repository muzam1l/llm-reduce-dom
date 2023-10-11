export const Spinner = () => {
  return (
    <>
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style>{`
        .spinner {
          position: relative;
          width: 22px;
          height: 22px;
        }
        .spinner div {
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid #fcf;
          border-radius: 50%;
          animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          border-color: #fcf transparent transparent transparent;
        }
        .spinner div:nth-child(1) {
          animation-delay: -0.45s;
        }
        .spinner div:nth-child(2) {
          animation-delay: -0.3s;
        }
        .spinner div:nth-child(3) {
          animation-delay: -0.15s;
        }
        @keyframes spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};
