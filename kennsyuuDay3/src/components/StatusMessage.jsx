function StatusMessage({ variant = 'info', children }) {
  const classes = ['status']
  if (variant === 'error') {
    classes.push('error')
  }

  return <p className={classes.join(' ')}>{children}</p>
}

export default StatusMessage
