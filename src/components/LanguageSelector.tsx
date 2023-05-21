import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { SectionType, type FromLanguage, type Language } from '../types.d'

type Props =
  | { type: SectionType.From, value: FromLanguage, OnChange: (value: FromLanguage) => void }
  | { type: SectionType.To, value: Language, OnChange: (value: Language) => void }

export const LanguageSelector = (
  { OnChange, type, value }: Props
) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    OnChange(event.target.value as Language)
  }

  return (
    <Form.Select aria-label="Wähle die Sprache aus" onChange={handleChange} value={value} >
        {type === SectionType.From && <option value={ AUTO_LANGUAGE }>Automatische Spracherkennung</option>}
    {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
      <option key={key} value={key}>
        {literal}
      </option>
    ))}
    </Form.Select>
  )
}