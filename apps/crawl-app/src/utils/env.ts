
class EnvError extends Error {
  constructor(name: string, values?: string[]) {
    const message = values 
      ? `the environment variable ${name} can only be set to ${values.join(' or ')}.` 
      : `the environment variable ${name} is required.`
    super(message)
  }
}

export const $Envs = (...names: string[]) => {
  return names.map(name => $Env(name))
}

export const $Env = (name: string, values?: string[]) => {
  const envValue = process.env[name]
  console.log(`$${name}: ${envValue}`)
  if (!envValue) {
    throw new EnvError(name)
  } else if (values && !values.includes(envValue)) {
    throw new EnvError(name, values)
  }
  return envValue
}