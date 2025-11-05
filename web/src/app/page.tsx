"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PromptCoach from "@/components/PromptCoach";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"inicio" | "boas-praticas" | "exemplos" | "faq">("inicio");

  const tabs = [
    { id: "inicio", label: "In?cio" },
    { id: "boas-praticas", label: "Boas pr?ticas" },
    { id: "exemplos", label: "Exemplos" },
    { id: "faq", label: "FAQ" },
  ] as const;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold">Guia de IA</div>
          <nav className="flex gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  activeTab === t.id ? "bg-black text-white" : "hover:bg-zinc-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Como usar as novas IAs</h1>
        <p className="mb-8 max-w-3xl text-zinc-600">
          Um guia direto ao ponto para come?ar com IA generativa (texto, c?digo, imagem e ?udio),
          com dicas pr?ticas, exemplos prontos e um gerador de prompts.
        </p>

        {activeTab === "inicio" && <Inicio />}
        {activeTab === "boas-praticas" && <BoasPraticas />}
        {activeTab === "exemplos" && <Exemplos />}
        {activeTab === "faq" && <FAQ />}

        <section className="mt-12">
          <h2 className="mb-3 text-2xl font-semibold">Coach de Prompt</h2>
          <p className="mb-4 text-zinc-600">
            Preencha os campos e gere um prompt bem estruturado para qualquer modelo.
          </p>
          <PromptCoach />
        </section>

        <footer className="mt-16 border-t pt-6 text-sm text-zinc-500">
          <p>
            Feito com Next.js. Veja tamb?m {" "}
            <Link className="underline" href="https://platform.openai.com/docs/guides/prompt-engineering" target="_blank">
              t?cnicas de prompt engineering
            </Link>
            .
          </p>
        </footer>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 rounded-lg border bg-white p-5">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <div className="prose max-w-none text-zinc-700 prose-p:my-2 prose-ul:my-2">
        {children}
      </div>
    </section>
  );
}

function Inicio() {
  return (
    <div>
      <Section title="O que ? IA generativa?">
        <p>
          IA generativa cria conte?do novo (texto, c?digo, imagens, ?udio) a partir de instru??es
          que voc? escreve (prompts). Pense nela como um colaborador vers?til: escreve, revisa,
          resume, compara, cria ideias e sugere melhorias.
        </p>
      </Section>
      <Section title="Tipos e usos r?pidos">
        <ul className="list-disc pl-5">
          <li><b>Texto/Chat</b>: responder d?vidas, redigir e resumir.</li>
          <li><b>C?digo</b>: explicar erros, gerar trechos, refatorar.</li>
          <li><b>Imagem</b>: criar mockups, ?cones, thumbnails.</li>
          <li><b>?udio</b>: transcrever reuni?es e dublar v?deos.</li>
        </ul>
      </Section>
      <Section title="Ferramentas populares">
        <ul className="list-disc pl-5">
          <li>Assistentes de chat (ChatGPT, Claude, Gemini)</li>
          <li>Copilots de c?digo (GitHub Copilot, Cursor, Codeium)</li>
          <li>Imagem/v?deo (DALL?E, Midjourney, Stable Diffusion)</li>
        </ul>
      </Section>
    </div>
  );
}

function BoasPraticas() {
  return (
    <div>
      <Section title="Estruture seu prompt (CORES)">
        <ul className="list-disc pl-5">
          <li><b>Contexto</b>: onde/por que? P?blico-alvo?</li>
          <li><b>Objetivo</b>: o que voc? quer exatamente?</li>
          <li><b>Restri??es</b>: limites, tamanho, prazo, tom.</li>
          <li><b>Estilo</b>: formato de sa?da, persona, exemplos.</li>
          <li><b>Sinais</b>: dados, links, trechos relevantes.</li>
        </ul>
      </Section>
      <Section title="Dicas pr?ticas">
        <ul className="list-disc pl-5">
          <li>Pe?a passo a passo e defina crit?rios de qualidade.</li>
          <li>D? exemplos do que ? bom vs. ruim.</li>
          <li>Itere: refine com feedback espec?fico.</li>
          <li>Para c?digo: forne?a stack, vers?o e erro completo.</li>
        </ul>
      </Section>
      <Section title="Privacidade e limites">
        <ul className="list-disc pl-5">
          <li>Evite dados sens?veis (senhas, PII) em prompts.</li>
          <li>Verifique licen?as e uso comercial de imagens.</li>
          <li>Revise fatos importantes (alucina??es acontecem).</li>
        </ul>
      </Section>
    </div>
  );
}

function Exemplos() {
  const exemplos = [
    {
      titulo: "Explicar um conceito",
      prompt:
        "Explique {conceito} para {publico} em 5 t?picos, com analogias pr?ticas e exemplos.",
    },
    {
      titulo: "Corrigir um erro de c?digo",
      prompt:
        "Analise este erro {stacktrace}. Proponha 3 hip?teses, passos de diagn?stico e corre??o.",
    },
    {
      titulo: "Escrever um e-mail",
      prompt:
        "Redija um e-mail formal para {destinatario} solicitando {objetivo}, em at? 120 palavras.",
    },
    {
      titulo: "Gerar ideias",
      prompt:
        "Liste 10 ideias para {tema}, classifique por impacto vs. esfor?o e sugira pr?ximos passos.",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {exemplos.map((ex) => (
        <div key={ex.titulo} className="rounded-lg border bg-white p-4">
          <div className="mb-2 text-sm font-medium text-zinc-500">Modelo</div>
          <div className="mb-1 text-lg font-semibold">{ex.titulo}</div>
          <code className="block select-all rounded bg-zinc-100 p-3 text-sm text-zinc-800">
            {ex.prompt}
          </code>
        </div>
      ))}
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState<string | null>(null);
  const faqs = [
    {
      q: "Preciso pagar?",
      a: "H? vers?es gratuitas com limites. Planos pagos liberam modelos mais potentes e maior uso.",
    },
    {
      q: "Posso confiar 100% nas respostas?",
      a: "N?o. Use como apoio. Valide informa??es cr?ticas e testes de c?digo.",
    },
    {
      q: "Como come?o?",
      a: "Escolha uma ferramenta de chat, traga um problema real e use o Coach de Prompt.",
    },
  ];

  return (
    <div className="divide-y rounded-lg border bg-white">
      {faqs.map((f) => {
        const isOpen = open === f.q;
        return (
          <button
            key={f.q}
            onClick={() => setOpen(isOpen ? null : f.q)}
            className="w-full px-4 py-3 text-left hover:bg-zinc-50"
          >
            <div className="flex items-center justify-between">
              <div className="font-medium">{f.q}</div>
              <div className="text-zinc-500">{isOpen ? "?" : "+"}</div>
            </div>
            {isOpen && <p className="mt-2 text-zinc-600">{f.a}</p>}
          </button>
        );
      })}
    </div>
  );
}
