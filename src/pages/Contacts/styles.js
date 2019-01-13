import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modal: {
    paddingTop: 50
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  left: {
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
    display: 'flex',
    flex: 3
  },
  cancel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
});
