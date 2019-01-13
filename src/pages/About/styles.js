import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modal: {
    paddingTop: 50
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 10
  },
  left: {
    alignItems: 'flex-start',
    flex: 1
  },
  right: {
    alignItems: 'flex-end',
    flex: 1
  },
  title: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: '500',
    fontSize: 18
  },
  content: {
    alignSelf: 'center',
    alignItems: 'stretch',
    width: '100%',
    padding: 20
  },
  paragraph: {
    textAlign: 'left',
    fontSize: 15,
    paddingBottom: 10,
  },
  hyperlink: {
    color: '#2668D1',
    textDecorationLine: 'underline'
  }
});
