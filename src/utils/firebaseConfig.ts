const prodConfig = {
  apiKey: 'AIzaSyDsp_SOGMcVsp3Gk93WhLVE7OZsP8sjoSU',
  authDomain: 'zag82-web.firebaseapp.com',
  databaseURL: 'https://zag82-web.firebaseio.com',
  projectId: 'zag82-web',
  storageBucket: 'zag82-web.appspot.com',
  messagingSenderId: '700308694784',
  appId: '1:700308694784:web:ef3469487b4e2b61a7f5e5'
};

const devConfig = {
  apiKey: 'AIzaSyAgKCh74ShYV5IOmW_35kF2d0namux1zmQ',
  authDomain: 'zag82-dev.firebaseapp.com',
  databaseURL: 'https://zag82-dev.firebaseio.com',
  projectId: 'zag82-dev',
  storageBucket: 'zag82-dev.appspot.com',
  messagingSenderId: '486871603646',
  appId: '1:486871603646:web:2acd7eb5f7c1fe660e01ef'
};

const isProd = process.env.NODE_ENV === 'production';
const config = isProd ? prodConfig : devConfig;
const appName = isProd ? 'QNotes' : 'QNotes-dev';

export default config;
export { appName };
