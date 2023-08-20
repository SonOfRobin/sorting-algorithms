const barClassSwapper = ({className}: HTMLDivElement) => {

  let newClassName = className;
  if (newClassName.includes("inactive"))
  newClassName = newClassName.replace("inactive", "active")
  else newClassName = newClassName.replace("active", "inactive")

  return newClassName
}

export default barClassSwapper;