export const ROUTES = {
  DASHBOARD: 0,
  OVERLAY: 1
};

export default route => {
  let clientId;
  switch (route) {
    case ROUTES.DASHBOARD:
      if (__DEV__) {
        clientId = '22wbe38tmqmd276z7qmqjzgl6vufh2';
      } else {
        clientId = '22wbe38tmqmd276z7qmqjzgl6vufh2';
      }
      break;
    default:
    case ROUTES.OVERLAY:
      if (__DEV__) {
        clientId = 'kric4td921grvys4c247y7ovexz910';
      } else {
        clientId = 'kric4td921grvys4c247y7ovexz910';
      }
  }
  return clientId;
};
