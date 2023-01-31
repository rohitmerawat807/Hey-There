import {Platform, ToastAndroid} from 'react-native';
import {RNToasty} from 'react-native-toasty';

const ToastDuration = 3000;

function show(message = '') {
  if (message?.length === 0) return;
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastDuration);
  } else {
    RNToasty.Normal({
      title: message,
    });
  }
}

export default {
  show,
};
