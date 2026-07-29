import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiCheckCircle, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Seo } from "@/components/layout/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { api } from "@/lib/axios";
import { siteConfig } from "@/data/siteConfig";

const infoCards = [
  { icon: FiMail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: FiPhone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
  { icon: FaWhatsapp, label: "WhatsApp", value: siteConfig.whatsapp, href: `https://wa.me/${siteConfig.whatsapp.replace(/[^\d]/g, "")}` },
  { icon: FiMapPin, label: "Location", value: siteConfig.location, href: null },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      await api.post("/contact", {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });
      setSent(true);
      reset();
      toast.success("Message sent — I'll reply within 24 hours.");
    } catch {
      toast.error("Couldn't send your message — please try again.");
    }
  }

  return (
    <>
      <Seo path="/contact" title="Contact" description="Get in touch with Michael Awuah Sarpong to discuss your next project." />
      <PageHeader eyebrow="Contact" title="Let's talk about your project" description="Fill out the form or reach out directly — I reply within 24 hours." />

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            {infoCards.map(({ icon: Icon, label, value, href }) => (
              <Reveal key={label}>
                <Card hover={Boolean(href)} className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">{label}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary">
                        {value}
                      </a>
                    ) : (
                      <p className="font-medium">{value}</p>
                    )}
                  </div>
                </Card>
              </Reveal>
            ))}

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-[var(--border)]">
                <div className="flex h-48 items-center justify-center bg-[var(--bg-subtle)] text-sm text-[var(--text-muted)]">
                  <FiMapPin className="mr-2" /> Map — {siteConfig.location}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left">
            <Card>
              {sent ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <FiCheckCircle className="text-primary" size={40} />
                  <h3 className="mt-4 font-display text-xl font-bold">Message sent</h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">Thanks for reaching out — I'll get back to you within 24 hours.</p>
                  <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input label="Full Name" placeholder="Jane Doe" error={errors.name && "Name is required"} {...register("name", { required: true })} />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="jane@company.com"
                      error={errors.email && "A valid email is required"}
                      {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                    />
                  </div>
                  <Select label="Subject" defaultValue="" error={errors.subject && "Please select a subject"} {...register("subject", { required: true })}>
                    <option value="" disabled>
                      Select a subject
                    </option>
                    <option value="project">New Project</option>
                    <option value="product">Product Inquiry</option>
                    <option value="consultation">Consultation</option>
                    <option value="support">Support</option>
                    <option value="other">Other</option>
                  </Select>
                  <Textarea
                    label="Message"
                    placeholder="Tell me about your project..."
                    error={errors.message && "Please write a message"}
                    {...register("message", { required: true })}
                  />
                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting} iconRight={<FiSend size={14} />}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </Card>
          </Reveal>
        </div>
      </section>
    </>
  );
}
