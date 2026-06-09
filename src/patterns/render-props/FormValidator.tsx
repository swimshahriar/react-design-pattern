import { useState, type ReactNode } from 'react'

type FormApi<T> = {
  values: T
  errors: Partial<Record<keyof T, string>>
  isValid: boolean
  setField: <K extends keyof T>(key: K, value: T[K]) => void
  submit: () => void
}

type FormValidatorProps<T extends Record<string, unknown>> = {
  initialValues: T
  validate: (values: T) => Partial<Record<keyof T, string>>
  onSubmit: (values: T) => void
  children: (api: FormApi<T>) => ReactNode
}

export function FormValidator<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
  children,
}: FormValidatorProps<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const errors = validate(values)
  const isValid = Object.keys(errors).length === 0

  const setField = <K extends keyof T>(key: K, value: T[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }))

  const submit = () => {
    if (isValid) onSubmit(values)
  }

  return <>{children({ values, errors, isValid, setField, submit })}</>
}