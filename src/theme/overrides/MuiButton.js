export default {
  root: {
    borderRadius: 20,
  },
  outlinedPrimary: {
    color: '#251c16',
    border: '1px solid #d9dadb',
    '&:hover': {
      border: '1px solid #b34e40',
      backgroundColor: '#ffffff',
    },
  },
  containedPrimary: {
    backgroundColor: '#b34e40',
    color: '#ffffff',
    '&:hover': {
      color: '#251c16',
      backgroundColor: '#ead4c9',
    },
  },
  containedSecondary: {
    backgroundColor: '#ead4c9',
    color: '#251c16',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#b34e40',
    },
  },
}
