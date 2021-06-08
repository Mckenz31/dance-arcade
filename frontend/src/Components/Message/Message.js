import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToast } from '../../actions/actions';
import { message } from 'antd';

const Message = () => {
  const dispatch = useDispatch();
  const afterClose = useCallback(() => {
    dispatch(setToast('', false));
  }, [dispatch]);
  const showMessage = useSelector((state) => state.user.toast);
  const warning = useCallback(
    (mess) => {
      message.warning(mess, 3).then(afterClose);
    },
    [afterClose]
  );

  useEffect(() => {
    if (showMessage.isShowToast) {
      warning(showMessage.message);
    }
  }, [showMessage, warning]);
  return '';
};

export default Message;
