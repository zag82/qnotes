import React, { useState, createContext } from 'react';
import $ from 'jquery';

// init and state
interface DialogYesNoState {
  msg: string;
  callback: CallableFunction;
}
interface DialogYesNoContextProvider {
  confirmDialog: Function;
}
const defaultContext: DialogYesNoContextProvider = {
  confirmDialog: (msg: string, callback: CallableFunction) => {},
};

// context
const DialogYesNoContext = createContext<DialogYesNoContextProvider>(
  defaultContext
);
export default DialogYesNoContext;

// context provider
interface Props {
  children: React.ReactNode;
}
const DialogYesNoProvider = (props: Props) => {
  // state
  const initialState: DialogYesNoState = { msg: '', callback: () => {} };
  const [dialog, setDialog] = useState<DialogYesNoState>(initialState);

  // Show dialog
  const confirmDialog = (msg: string, callback: CallableFunction) => {
    $('#dlgYesNoModal').modal('show');
    setDialog({ msg, callback });
  };

  // Submit dialog
  const onSubmit = () => {
    $('#dlgYesNoModal').modal('hide');
    dialog.callback();
    setDialog(initialState);
  };

  return (
    <DialogYesNoContext.Provider
      value={{
        confirmDialog,
      }}
    >
      <div
        className='modal fade'
        id='dlgYesNoModal'
        tabIndex={-1}
        role='dialog'
        aria-labelledby='dlgYesNoTitle'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='dlgYesNoTitle'>
                Confirmation
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>{dialog.msg}</div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
              >
                No
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={onSubmit}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      {props.children}
    </DialogYesNoContext.Provider>
  );
};
export { DialogYesNoProvider };
