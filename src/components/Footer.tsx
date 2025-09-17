import { Play, Mail, MessageCircle, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-youtube rounded-md">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <h3 className="font-bold bg-gradient-youtube bg-clip-text text-transparent">
                AI YouTube Analyzer
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Transforme vídeos do YouTube em conhecimento estruturado com IA avançada.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/transcricaoAnalise" className="text-muted-foreground hover:text-primary transition-smooth">
                  Análise de Transcrição
                </a>
              </li>
              
              <li>
                <a href="/livros" className="text-muted-foreground hover:text-primary transition-smooth">
                  Recomendações
                </a>
              </li>
              <li>
                <a href="/assinatura" className="text-muted-foreground hover:text-primary transition-smooth">
                  Preços
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/help" className="text-muted-foreground hover:text-primary transition-smooth">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="/docs" className="text-muted-foreground hover:text-primary transition-smooth">
                  Documentação
                </a>
              </li>
              <li>
                <a href="/status" className="text-muted-foreground hover:text-primary transition-smooth">
                  Status do Sistema
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-primary transition-smooth">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/terms" className="text-muted-foreground hover:text-primary transition-smooth">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-muted-foreground hover:text-primary transition-smooth">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-muted-foreground hover:text-primary transition-smooth">
                  Política de Cookies
                </a>
              </li>
              <li>
                <a href="/security" className="text-muted-foreground hover:text-primary transition-smooth">
                  Segurança
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 AI YouTube Analyzer. Todos os direitos reservados.
          </p>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="ghost" size="sm">
              <Mail className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <FileText className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;