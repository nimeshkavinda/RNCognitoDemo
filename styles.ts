import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  headingWrapper: {
    justifyContent: 'flex-start',
    marginTop: 10,
    padding: 20,
  },
  formWrapper: {padding: 20},
  buttonWrapper: {
    padding: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: '700',
    lineHeight: 42,
    marginBottom: 8,
  },
  userData: {
    fontSize: 18,
    fontWeight: '500',
  },
  socialLoginWrapper: {
    padding: 20,
  },
  socialLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5EBFF',
    height: 60,
    padding: 12,
    borderRadius: 12,
  },
  socialLoginLabel: {
    fontSize: 18,
    color: '#015EFF',
    marginLeft: 10,
  },
  divider: {
    borderTopColor: '#d3d3d3',
    borderTopWidth: 1,
    marginVertical: 0,
    marginBottom: 40,
  },
  dividerText: {
    color: '#9F9EA4',
    textAlign: 'center',
    position: 'absolute',
    top: 11,
    left: '44%',
    backgroundColor: '#fff',
    width: 80,
    height: 20,
  },
  input: {
    height: 60,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f4f4f6',
    fontSize: 18,
    marginVertical: 8,
  },
});

export default styles;
