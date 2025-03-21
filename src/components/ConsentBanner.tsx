import { Button } from './ui/button'

interface ConsentBannerProps {
  onAccept: () => void
  onDecline: () => void
}

const ConsentBanner: React.FC<ConsentBannerProps> = ({
  onAccept,
  onDecline,
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 z-50">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Sua privacidade</h3>
            <p className="text-sm">
              Utilizamos cookies para melhorar sua experiência de navegação,
              personalizar conteúdo e analisar nosso tráfego. De acordo com a
              LGPD (Lei Geral de Proteção de Dados), solicitamos sua autorização
              para coletar e processar seus dados.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={onDecline}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-sm"
            >
              Recusar
            </Button>
            <Button
              onClick={onAccept}
              className="px-4 py-2 bg-purple-800 hover:bg-purple-700 rounded text-sm cursor-pointer"
            >
              Aceitar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsentBanner
