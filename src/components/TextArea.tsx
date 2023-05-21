import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const commonStyles = { height: '250px', border: '0', width: '300px' }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traducción'
}

export const TextArea = ({ type, loading, value, onChange }: Props) => {
  const styles = type === SectionType.To ? { ...commonStyles, backgroundColor: 'lightgrey' } : commonStyles

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
    disabled={type === SectionType.To}
    value={value}
    style={styles}
    autoFocus={type === SectionType.From}
    as='textarea'
    placeholder={getPlaceholder({ type, loading })}
    onChange={handleChange}
    />
  )
}