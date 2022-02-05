const defaultTheme = {
  backgroundColor: 'white',
  border: '1px solid #dfe1e5',
  borderRadius: '24px',
  boxShadow: 'rgba(32, 33, 36, 0.28) 0px 1px 6px 0px',
  clearIconMargin: '3px 14px 0 0',
  color: '#212121',
  fontFamily: 'Arial',
  fontSize: '16px',
  height: '100%',
  hoverBackgroundColor: '#eee',
  iconColor: 'grey',
  lineColor: 'rgb(232, 234, 237)',
  placeholderColor: 'grey',
  searchIconMargin: '0 0 0 16px',
  width: '100%',
  zIndex: 1000,
}

const defaultFuseOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['name']
}

export { defaultTheme, defaultFuseOptions }
