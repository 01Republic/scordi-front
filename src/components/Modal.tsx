export type ModalProps = {
  type: 'error' | 'success' | 'warning' | 'info';
  isOpen: boolean;
  title: string;
  description: string;
  button1: {
    text: string;
    onClick: () => void;
  };
  button2?: {
    text: string;
    onClick: () => void;
  };
  children?: any;
};

export const Modal = (props: ModalProps) => {
  return (
    <>
      <div
        className={`modal modal-bottom sm:modal-middle ${
          props.isOpen && 'modal-open'
        }`}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">{props.title}</h3>
          <p className="py-4">{props.description}</p>
          {props.children}
          <div className="modal-action">
            {/*{props.type === 'info' && (*/}
            {/*    <button className="btn" onClick={props.button1.onClick}>{props.button1.text}</button>*/}
            {/*)}*/}
            <button className="btn" onClick={props.button1.onClick}>
              {props.button1.text}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
