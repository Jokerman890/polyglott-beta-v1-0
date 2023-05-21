import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { translate } from './services/translate'
import { useEffect } from 'react'
import { useDebounce } from './hooks/useDebounce'

function App () {
  const { fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, settoLanguage, fromText, result, setFromText, setResult, loading } = useStore()

  const debouncedText = useDebounce(fromText, 350)

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => { })
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }
  useEffect(() => {
    if (debouncedText === '') return;
    console.log('Translating:', debouncedText); // Add this line
    translate({ fromLanguage, toLanguage, text: debouncedText })
      .then((result) => {
        if (result == null) return;
        console.log('Translation result:', result); // Add this line
        setResult(result);
      })
      .catch((error) => {
        console.error('Translation error:', error);
        setResult('error');
      });
  }, [debouncedText, fromLanguage, toLanguage]);
  
  () => {
    if (debouncedText === '') return
    translate({ fromLanguage, toLanguage, text: debouncedText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('error') })
  }
  return (
    <Container className='contenedorPADRE' fluid>
      <div className='contenedorApp'>
      <h3>Polyglott</h3>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              OnChange={setFromLanguage} />
            <TextArea loading={loading} onChange={setFromText} value={fromText} type={SectionType.From} />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              OnChange={settoLanguage} />
            <div style={{ position: 'relative' }}>
              <TextArea loading={loading} onChange={setResult} value={result} type={SectionType.To} />
              <Button
                variant='link'
                onClick={handleClipboard}>
                <ClipboardIcon />
              </Button>
              <Button
              variant='link'
              onClick={handleSpeak}>
                <SpeakerIcon />
            </Button>
            </div>
          </Stack>
        </Col>
      </Row>
      </div>
    </Container >
  )
}

export default App
