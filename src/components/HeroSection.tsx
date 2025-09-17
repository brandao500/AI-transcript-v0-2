import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Brain, Zap, Globe, ArrowRight, CheckCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-youtube-glow opacity-10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-youtube-glow opacity-10 rounded-full blur-3xl" />
      
      <div className="container relative">
        <div className="flex flex-col items-center text-center space-y-8 lg:space-y-12">
          {/* Main Headline */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-youtube bg-clip-text text-transparent">
                AI-POWERED
              </span>
              <br />
              <span className="text-foreground">
                YOUTUBE CONTENT
              </span>
              <br />
              <span className="text-foreground">
                ANALYZER
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transforme qualquer vídeo do YouTube em conhecimento estruturado com IA avançada. 
              Extraia insights, gere resumos e descubra informações-chave de conteúdo educacional em segundos.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Compatível YouTube</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Processamento IA</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-youtube bg-clip-text text-transparent">GPT</div>
              <div className="text-sm text-muted-foreground">Powered by OpenAI</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a href="/transcricaoAnalise">
             <Button variant="hero" size="xl" className="group">
               Começar Agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            </a>
            <Button variant="youtube-outline" size="xl" className="group">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Ver Demonstração
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mt-16">
            <Card className="border-0 bg-background/50 backdrop-blur hover:shadow-lg transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-youtube rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">IA Avançada</h3>
                <p className="text-sm text-muted-foreground">Processamento inteligente com GPT para análises precisas</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-background/50 backdrop-blur hover:shadow-lg transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-youtube rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Instantâneo</h3>
                <p className="text-sm text-muted-foreground">Resultados em segundos, não em minutos</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-background/50 backdrop-blur hover:shadow-lg transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-youtube rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Multi-idioma</h3>
                <p className="text-sm text-muted-foreground">Suporte completo para traduções e análises</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;