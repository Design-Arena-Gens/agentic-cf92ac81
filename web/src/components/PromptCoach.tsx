"use client";

import { useMemo, useState } from "react";

type FormatOption = "lista" | "passo-a-passo" | "tabela" | "texto";

type PromptInputs = {
  objetivo: string;
  contexto: string;
  publico: string;
  estilo: string;
  tom: string;
  formato: FormatOption;
  idioma: string;
  limites: string;
};

const defaultInputs: PromptInputs = {
  objetivo: "explicar IA generativa para iniciantes",
  contexto: "palestra de 10 minutos para equipe de produto",
  publico: "pessoas n?o t?cnicas",
  estilo: "claro e direto, com exemplos pr?ticos",
  tom: "amig?vel e encorajador",
  formato: "lista",
  idioma: "pt-BR",
  limites: "at? 300 palavras, evitar jarg?es",
};

export default function PromptCoach() {
  const [inputs, setInputs] = useState<PromptInputs>(defaultInputs);
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => buildPrompt(inputs), [inputs]);

  function onChange<K extends keyof PromptInputs>(key: K, value: PromptInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  async function copy() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <Input
          label="Objetivo"
          value={inputs.objetivo}
          onChange={(v) => onChange("objetivo", v)}
          placeholder="ex.: criar um resumo de reuni?o"
        />
        <Textarea
          label="Contexto"
          value={inputs.contexto}
          onChange={(v) => onChange("contexto", v)}
          placeholder="ex.: participantes, dura??o, principais t?picos"
        />
        <Input
          label="P?blico"
          value={inputs.publico}
          onChange={(v) => onChange("publico", v)}
          placeholder="ex.: executivos, pessoas n?o t?cnicas, turma do 3? ano"
        />
        <Input
          label="Estilo"
          value={inputs.estilo}
          onChange={(v) => onChange("estilo", v)}
          placeholder="ex.: objetivo, estruturado, com refer?ncias"
        />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Tom" value={inputs.tom} onChange={(v) => onChange("tom", v)} placeholder="ex.: profissional" />
          <SelectFormat value={inputs.formato} onChange={(v) => onChange("formato", v)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Idioma" value={inputs.idioma} onChange={(v) => onChange("idioma", v)} placeholder="ex.: pt-BR" />
          <Input label="Limites" value={inputs.limites} onChange={(v) => onChange("limites", v)} placeholder="ex.: 200 palavras" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-zinc-500">Prompt gerado</div>
          <button
            onClick={copy}
            className={`rounded-full border px-3 py-1 text-sm ${copied ? "bg-green-600 text-white" : "hover:bg-zinc-50"}`}
          >
            {copied ? "Copiado" : "Copiar"}
          </button>
        </div>
        <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-md border bg-zinc-50 p-4 text-sm leading-6 text-zinc-900">
{prompt}
        </pre>
        <Tips formato={inputs.formato} />
      </div>
    </div>
  );
}

function buildPrompt(i: PromptInputs) {
  return (
    `Atue como um especialista no assunto. ` +
    `Objetivo: ${i.objetivo}. ` +
    `Contexto: ${i.contexto}. ` +
    `P?blico-alvo: ${i.publico}. ` +
    `Estilo desejado: ${i.estilo}. Tom: ${i.tom}. ` +
    `Formato de sa?da: ${i.formato}. Idioma: ${i.idioma}. ` +
    `Respeite estes limites: ${i.limites}. ` +
    `Explique o racioc?nio passo a passo apenas se for ?til e mantenha a resposta precisa.`
  );
}

function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <div className="mb-1 text-sm font-medium text-zinc-700">{label}</div>
      <input
        className="w-full rounded-md border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-black"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function Textarea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <div className="mb-1 text-sm font-medium text-zinc-700">{label}</div>
      <textarea
        className="min-h-[96px] w-full rounded-md border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-black"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function SelectFormat({ value, onChange }: { value: FormatOption; onChange: (v: FormatOption) => void }) {
  return (
    <label className="block">
      <div className="mb-1 text-sm font-medium text-zinc-700">Formato</div>
      <select
        className="w-full rounded-md border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-black"
        value={value}
        onChange={(e) => onChange(e.target.value as FormatOption)}
      >
        <option value="lista">Lista</option>
        <option value="passo-a-passo">Passo a passo</option>
        <option value="tabela">Tabela (se fizer sentido)</option>
        <option value="texto">Texto corrido</option>
      </select>
    </label>
  );
}

function Tips({ formato }: { formato: FormatOption }) {
  const tips = {
    "lista": [
      "Pe?a n?mero de itens e ordem l?gica.",
      "Inclua crit?rios de avalia??o se estiver comparando op??es.",
    ],
    "passo-a-passo": [
      "Exija passos numerados e pr?-condi??es.",
      "Pe?a valida??o do resultado de cada passo.",
    ],
    "tabela": [
      "Defina colunas e linhas esperadas.",
      "Pe?a CSV/Markdown para f?cil c?pia.",
    ],
    "texto": [
      "Defina o tamanho e o p?blico-alvo.",
      "Solicite resumo final com bullets.",
    ],
  } as const;

  return (
    <div className="rounded-md border bg-white p-3 text-sm text-zinc-700">
      <div className="mb-1 font-medium text-zinc-600">Dicas para este formato</div>
      <ul className="list-disc pl-5">
        {tips[formato].map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
