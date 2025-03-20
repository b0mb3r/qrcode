'use client'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { ColorPicker } from '@/components/ui/color-picker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { Download } from 'lucide-react'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { useRef, useState } from 'react'

type ContentType = 'url' | 'vcard' | 'text' | 'email' | 'sms' | 'wifi'

export default function Home() {
  const [contentType, setContentType] = useState<ContentType>('url')
  const [qrSize, setQrSize] = useState(256)
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [fgColor, setFgColor] = useState('#000000')
  const [isGenerated, setIsGenerated] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  // URL
  const [url, setUrl] = useState('')

  // Texto simples
  const [text, setText] = useState('')

  // VCard
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [organization, setOrganization] = useState('')
  const [title, setTitle] = useState('')
  const [website, setWebsite] = useState('')
  const [address, setAddress] = useState('')

  // Email
  const [emailAddress, setEmailAddress] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')

  // SMS
  const [phoneNumber, setPhoneNumber] = useState('')
  const [smsMessage, setSmsMessage] = useState('')

  // WiFi
  const [wifiSsid, setWifiSsid] = useState('')
  const [wifiPassword, setWifiPassword] = useState('')
  const [wifiEncryption, setWifiEncryption] = useState('WPA')

  const handleContentTypeChange = (type: ContentType) => {
    setContentType(type)
    setIsGenerated(false)
  }

  const generateQRCodeValue = (): string => {
    switch (contentType) {
      case 'url':
        return url
      case 'text':
        return text
      case 'vcard':
        return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName}
FN:${firstName} ${lastName}
ORG:${organization}
TITLE:${title}
TEL;TYPE=CELL:${phone}
EMAIL:${email}
URL:${website}
ADR:;;${address};;;
END:VCARD`
      case 'email':
        return `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
      case 'sms':
        return `sms:${phoneNumber}?body=${encodeURIComponent(smsMessage)}`
      case 'wifi':
        return `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};;`
      default:
        return ''
    }
  }

  const handleGenerateQR = (e: React.FormEvent) => {
    e.preventDefault()
    const value = generateQRCodeValue()
    if (value) {
      setIsGenerated(true)
    }
  }

  const downloadQRCode = (format: 'png' | 'svg') => {
    if (!qrRef.current) return

    if (format === 'png') {
      // Para PNG, precisamos criar um canvas temporário
      const canvas = document.createElement('canvas')
      const svgElement = qrRef.current.querySelector('svg')
      if (!svgElement) return

      const svgData = new XMLSerializer().serializeToString(svgElement)
      const img = new Image()
      const svgBlob = new Blob([svgData], {
        type: 'image/svg+xml;charset=utf-8',
      })
      const url = URL.createObjectURL(svgBlob)

      img.onload = () => {
        canvas.width = qrSize
        canvas.height = qrSize
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = bgColor
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, qrSize, qrSize)

          const pngUrl = canvas.toDataURL('image/png')
          const link = document.createElement('a')
          link.download = `qrcode-${contentType}-${new Date().getTime()}.png`
          link.href = pngUrl
          link.click()
        }
        URL.revokeObjectURL(url)
      }

      img.src = url
    } else if (format === 'svg') {
      const svg = qrRef.current.querySelector('svg')
      if (!svg) return

      const svgData = new XMLSerializer().serializeToString(svg)
      const svgBlob = new Blob([svgData], {
        type: 'image/svg+xml;charset=utf-8',
      })
      const svgUrl = URL.createObjectURL(svgBlob)
      const link = document.createElement('a')
      link.download = `qrcode-${contentType}-${new Date().getTime()}.svg`
      link.href = svgUrl
      link.click()
      URL.revokeObjectURL(svgUrl)
    }
  }

  const renderContentForm = () => {
    switch (contentType) {
      case 'url':
        return (
          <div className="mb-4">
            <Label
              htmlFor="url"
              className="block text-gray-700 font-medium mb-2"
            >
              URL
            </Label>
            <Input
              type="url"
              id="url"
              placeholder="https://exemplo.com.br"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )
      case 'text':
        return (
          <div className="mb-4">
            <Label
              htmlFor="text"
              className="block text-gray-700 font-medium mb-2"
            >
              Texto
            </Label>
            <Textarea
              id="text"
              placeholder="Digite seu texto aqui"
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              required
            />
          </div>
        )
      case 'vcard':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label
                  htmlFor="firstName"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Nome
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="lastName"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Sobrenome
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Telefone
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label
                  htmlFor="organization"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Empresa
                </Label>
                <Input
                  type="text"
                  id="organization"
                  value={organization}
                  onChange={e => setOrganization(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label
                  htmlFor="title"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Cargo
                </Label>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <Label
                htmlFor="website"
                className="block text-gray-700 font-medium mb-2"
              >
                Website
              </Label>
              <Input
                type="url"
                id="website"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="address"
                className="block text-gray-700 font-medium mb-2"
              >
                Endereço
              </Label>
              <Textarea
                id="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )
      case 'email':
        return (
          <>
            <div className="mb-4">
              <Label
                htmlFor="emailAddress"
                className="block text-gray-700 font-medium mb-2"
              >
                Endereço de Email
              </Label>
              <Input
                type="email"
                id="emailAddress"
                placeholder="exemplo@email.com"
                value={emailAddress}
                onChange={e => setEmailAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="emailSubject"
                className="block text-gray-700 font-medium mb-2"
              >
                Assunto
              </Label>
              <Input
                type="text"
                id="emailSubject"
                value={emailSubject}
                onChange={e => setEmailSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="emailBody"
                className="block text-gray-700 font-medium mb-2"
              >
                Corpo do Email
              </Label>
              <Textarea
                id="emailBody"
                value={emailBody}
                onChange={e => setEmailBody(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              />
            </div>
          </>
        )
      case 'sms':
        return (
          <>
            <div className="mb-4">
              <Label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-medium mb-2"
              >
                Número de Telefone
              </Label>
              <Input
                type="tel"
                id="phoneNumber"
                placeholder="+55 31 98821-4369"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="smsMessage"
                className="block text-gray-700 font-medium mb-2"
              >
                Mensagem
              </Label>
              <Textarea
                id="smsMessage"
                value={smsMessage}
                onChange={e => setSmsMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              />
            </div>
          </>
        )
      case 'wifi':
        return (
          <>
            <div className="mb-4">
              <Label
                htmlFor="wifiSsid"
                className="block text-gray-700 font-medium mb-2"
              >
                Nome da Rede (SSID)
              </Label>
              <Input
                type="text"
                id="wifiSsid"
                value={wifiSsid}
                onChange={e => setWifiSsid(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="wifiPassword"
                className="block text-gray-700 font-medium mb-2"
              >
                Senha
              </Label>
              <Input
                type="text"
                id="wifiPassword"
                value={wifiPassword}
                onChange={e => setWifiPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="wifiEncryption"
                className="block text-gray-700 font-medium mb-2"
              >
                Tipo de Segurança
              </Label>
              <select
                id="wifiEncryption"
                value={wifiEncryption}
                onChange={e => setWifiEncryption(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">Sem Senha</option>
              </select>
            </div>
          </>
        )
      default:
        return null
    }
  }

  // Função para renderizar os ícones dos botões de tipo de conteúdo
  const renderContentTypeIcon = (type: ContentType) => {
    switch (type) {
      case 'url':
        return <Icons.url />
      case 'text':
        return <Icons.text />
      case 'vcard':
        return <Icons.vcard />
      case 'email':
        return <Icons.email />
      case 'sms':
        return <Icons.sms />
      case 'wifi':
        return <Icons.wifi />
      default:
        return null
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center p-8 bg-gray-950 z-10">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="w-full max-w-2xl">
        <h1 className="text-6xl font-bold mb-2 text-center text-zinc-200">
          Gerador de QR Code
        </h1>
        <p className="text-center text-zinc-100 mb-8">
          Sem truques, sem período de teste, sem necessidade de login. Apenas um
          gerador de QR Code livre para você usar quando quiser!
        </p>

        <form
          onSubmit={handleGenerateQR}
          className="bg-white/90 backdrop-blur-xl p-6 rounded-lg shadow-md mb-8"
        >
          <div className="mb-6">
            <Label
              htmlFor="contentType"
              className="block text-gray-700 font-medium mb-2"
            >
              Tipo de Conteúdo
            </Label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {(
                [
                  'url',
                  'text',
                  'vcard',
                  'email',
                  'sms',
                  'wifi',
                ] as ContentType[]
              ).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleContentTypeChange(type)}
                  className={`p-3 rounded-lg flex flex-col items-center justify-center transition-colors cursor-pointer ${
                    contentType === type
                      ? 'bg-purple-800 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {renderContentTypeIcon(type)}
                  <span className="text-xs font-medium">
                    {type === 'url' && 'URL'}
                    {type === 'text' && 'Texto'}
                    {type === 'vcard' && 'Contato'}
                    {type === 'email' && 'Email'}
                    {type === 'sms' && 'SMS'}
                    {type === 'wifi' && 'WiFi'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {renderContentForm()}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label
                htmlFor="size"
                className="block text-gray-700 font-medium mb-2"
              >
                Tamanho
              </Label>
              <Slider
                min={128}
                max={512}
                step={32}
                defaultValue={[qrSize]}
                onValueChange={value => setQrSize(value[0])}
                className="w-full"
              />
              <div className="text-center text-sm">{qrSize}px</div>
            </div>

            <div>
              <Label
                htmlFor="bgcolor"
                className="block text-gray-700 font-medium mb-2"
              >
                Cor de Fundo
              </Label>
              <ColorPicker
                value={bgColor}
                onChange={value => setBgColor(value)}
                className="size-10 cursor-pointer"
              />
            </div>

            <div>
              <Label
                htmlFor="fgcolor"
                className="block text-gray-700 font-medium mb-2"
              >
                Cor do QR Code
              </Label>
              <ColorPicker
                value={fgColor}
                onChange={value => setFgColor(value)}
                className="size-10 cursor-pointer"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors cursor-pointer"
          >
            Gerar QR Code
          </Button>
        </form>

        {isGenerated && (
          <div className="bg-white/90 backdrop-blur-xl p-6 rounded-lg shadow-md text-center">
            <div ref={qrRef} className="flex justify-center mb-6">
              <QRCodeSVG
                value={generateQRCodeValue()}
                size={qrSize}
                bgColor={bgColor}
                fgColor={fgColor}
                level="H"
                includeMargin={true}
                className="border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                type="button"
                onClick={() => downloadQRCode('png')}
                className="flex gap-1.5 cursor-pointer bg-purple-950 text-white py-2 px-4 rounded-md hover:bg-purple-900 transition-colors"
              >
                <Download className="size-5" />
                PNG
              </Button>
              <Button
                type="button"
                onClick={() => downloadQRCode('svg')}
                className="flex gap-1.5 cursor-pointer bg-purple-950 text-white py-2 px-4 rounded-md hover:bg-purple-900 transition-colors"
              >
                <Download className="size-5" />
                SVG
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="text-zinc-200 text-sm text-center mt-8">
        Desenvolvido por Thiago Silva
        <br />
        <Link href="https://www.thiagoweb.com" target="_blank">
          www.thiagoweb.com
        </Link>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </main>
  )
}
