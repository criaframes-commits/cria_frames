"use client";

import { useRef, useState, type FormEvent } from "react";
import { ChevronDown, Send } from "lucide-react";

type FieldName =
  | "name"
  | "email"
  | "company"
  | "projectType"
  | "budget"
  | "message";

type FormErrors = Partial<Record<FieldName, string>>;

const PROJECT_TYPES = [
  "Filme de marca ou campanha",
  "Conteúdo para redes sociais",
  "Motion design",
  "Projeto audiovisual com IA",
  "Consultoria criativa",
  "Outro formato",
] as const;

const BUDGET_RANGES = [
  "Até R$ 10 mil",
  "De R$ 10 mil a R$ 25 mil",
  "De R$ 25 mil a R$ 50 mil",
  "De R$ 50 mil a R$ 100 mil",
  "Acima de R$ 100 mil",
  "Ainda não definido",
] as const;

function getValue(formData: FormData, name: FieldName) {
  return String(formData.get(name) ?? "").trim();
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState("");

  const clearError = (field: FieldName) => {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = {
      name: getValue(formData, "name"),
      email: getValue(formData, "email"),
      company: getValue(formData, "company"),
      projectType: getValue(formData, "projectType"),
      budget: getValue(formData, "budget"),
      message: getValue(formData, "message"),
    };

    const nextErrors: FormErrors = {};
    if (!values.name) nextErrors.name = "Informe seu nome.";
    if (!values.email) {
      nextErrors.email = "Informe seu e-mail.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = "Digite um e-mail válido.";
    }
    if (!values.projectType) {
      nextErrors.projectType = "Escolha o tipo de projeto.";
    }
    if (!values.budget) {
      nextErrors.budget = "Escolha uma faixa de investimento.";
    }
    if (!values.message) {
      nextErrors.message = "Conte brevemente o que você precisa produzir.";
    } else if (values.message.length < 20) {
      nextErrors.message = "Inclua um pouco mais de contexto (mínimo de 20 caracteres).";
    }

    setErrors(nextErrors);
    setStatusMessage("");

    const firstError = Object.keys(nextErrors)[0] as FieldName | undefined;
    if (firstError) {
      const field = formRef.current?.elements.namedItem(firstError);
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    const subject = `Pedido de orçamento — ${values.name}${
      values.company ? ` / ${values.company}` : ""
    }`;
    const body = [
      `Nome: ${values.name}`,
      `E-mail: ${values.email}`,
      `Empresa: ${values.company || "Não informada"}`,
      `Tipo de projeto: ${values.projectType}`,
      `Faixa de investimento: ${values.budget}`,
      "",
      "Sobre o projeto:",
      values.message,
    ].join("\n");

    setStatusMessage(
      "Briefing preparado. Seu aplicativo de e-mail será aberto para concluir o envio."
    );
    window.location.href = `mailto:cria@criaframes.com.br?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const fieldClass =
    "min-h-12 w-full rounded-md border border-border bg-background px-4 text-sm text-foreground outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/70 hover:border-primary/45 focus:border-primary focus:ring-3 focus:ring-primary/15 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/10";
  const labelClass =
    "mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-foreground";
  const errorClass = "mt-2 text-xs leading-relaxed text-destructive";

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Nome <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            onChange={() => clearError("name")}
            className={fieldClass}
          />
          {errors.name && (
            <p id="contact-name-error" className={errorClass}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            E-mail <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            onChange={() => clearError("email")}
            className={fieldClass}
          />
          {errors.email && (
            <p id="contact-email-error" className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-company" className={labelClass}>
          Empresa <span className="normal-case tracking-normal text-muted-foreground">(opcional)</span>
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          onChange={() => clearError("company")}
          className={fieldClass}
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-project-type" className={labelClass}>
            Tipo de projeto <span aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select
              id="contact-project-type"
              name="projectType"
              required
              defaultValue=""
              aria-invalid={Boolean(errors.projectType)}
              aria-describedby={
                errors.projectType ? "contact-project-type-error" : undefined
              }
              onChange={() => clearError("projectType")}
              className={`${fieldClass} appearance-none pr-11`}
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
              {PROJECT_TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
          {errors.projectType && (
            <p id="contact-project-type-error" className={errorClass}>
              {errors.projectType}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-budget" className={labelClass}>
            Investimento estimado <span aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select
              id="contact-budget"
              name="budget"
              required
              defaultValue=""
              aria-invalid={Boolean(errors.budget)}
              aria-describedby={errors.budget ? "contact-budget-error" : undefined}
              onChange={() => clearError("budget")}
              className={`${fieldClass} appearance-none pr-11`}
            >
              <option value="" disabled>
                Selecione uma faixa
              </option>
              {BUDGET_RANGES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
          {errors.budget && (
            <p id="contact-budget-error" className={errorClass}>
              {errors.budget}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className={labelClass}>
          Conte sobre o projeto <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          placeholder="O que precisa ser produzido, objetivo, prazo e referências que já existem."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"}
          onChange={() => clearError("message")}
          className={`${fieldClass} min-h-36 resize-y py-3 leading-relaxed`}
        />
        {errors.message ? (
          <p id="contact-message-error" className={errorClass}>
            {errors.message}
          </p>
        ) : (
          <p id="contact-message-hint" className="mt-2 text-xs text-muted-foreground">
            Não precisa chegar com tudo definido. O essencial já inicia a conversa.
          </p>
        )}
      </div>

      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-pill bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-[0_16px_36px_rgba(0,68,189,0.2)] transition-[transform,background,box-shadow] duration-300 ease-premium hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-[0_20px_42px_rgba(0,68,189,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Solicitar orçamento
          <Send
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </button>
        <p className="max-w-[35ch] text-xs leading-relaxed text-muted-foreground">
          Ao continuar, seu aplicativo de e-mail abrirá com o briefing preenchido.
        </p>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </p>
    </form>
  );
}
