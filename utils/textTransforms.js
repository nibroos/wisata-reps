const rating = (value, rated) => {
  if (!rated) {
    return 'Not Rated'
  }

  if (value > 0 && value <= 1) {
    return 'Very Poor'
  } else if (value > 1 && value <= 2) {
    return 'Poor'
  } else if (value > 2 && value <= 3) {
    return 'Average'
  } else if (value > 3 && value <= 4) {
    return 'Good'
  } else if (value > 4 && value <= 5) {
    return 'Excellent'
  } else {
    return 'N/A'
  }
}

export { rating }
