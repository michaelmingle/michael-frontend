import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiCalendar, FiCheckCircle, FiClock, FiMail, FiMessageCircle, FiVideo } from "react-icons/fi";
import { SiGooglemeet, SiZoom } from "react-icons/si";
import { Seo } from "@/components/layout/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/cn";
import { api } from "@/lib/axios";
import { consultationPricing } from "@/data/pricing";

const meetingTypes = [
  { key: "zoom", label: "Zoom Call", icon: SiZoom },
  { key: "meet", label: "Google Meet", icon: SiGooglemeet },
  { key: "whatsapp", label: "WhatsApp Call", icon: FiMessageCircle },
  { key: "email", label: "Async / Email", icon: FiMail },
];

const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

function getNextDays(count) {
  const days = [];
  const cursor = new Date();
  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      days.push(new Date(cursor));
    }
  }
  return days;
}

export default function BookMe() {
  const days = useMemo(() => getNextDays(8), []);
  const [meetingType, setMeetingType] = useState("zoom");
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    if (!selectedTime) return;
    try {
      await api.post("/bookings", {
        name: data.name,
        email: data.email,
        meetingType,
        scheduledDate: selectedDay.toISOString().slice(0, 10),
        scheduledTime: selectedTime,
        notes: data.notes || null,
      });
      setSubmitted(true);
    } catch {
      toast.error("Couldn't submit your booking — please try again.");
    }
  }

  if (submitted) {
    return (
      <section className="flex min-h-screen items-center justify-center px-6 py-32">
        <Reveal>
          <Card className="max-w-md text-center">
            <FiCheckCircle className="mx-auto text-primary" size={40} />
            <h1 className="mt-4 font-display text-2xl font-bold">Booking Requested</h1>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              Your consultation request for{" "}
              <strong className="text-[var(--text)]">
                {selectedDay.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime}
              </strong>{" "}
              is pending confirmation. You'll get an email once it's approved — reschedule or cancel anytime from that link.
            </p>
            <Button to="/" className="mt-6">
              Back to Home
            </Button>
          </Card>
        </Reveal>
      </section>
    );
  }

  return (
    <>
      <Seo path="/book-me" title="Book a Consultation" description="Book a paid 1-on-1 technical consultation with Michael Awuah Sarpong." />
      <PageHeader
        eyebrow="Book Me"
        title="Book a consultation"
        description={`${consultationPricing.duration} session · $${consultationPricing.price} · payment confirmed after admin approval`}
      />

      <section className="px-6 pb-24">
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-3xl space-y-8">
          <Reveal>
            <Card>
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <FiVideo /> Meeting Type
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {meetingTypes.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setMeetingType(key)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-xs font-medium transition-colors",
                      meetingType === key
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-[var(--border)] text-[var(--text-muted)] hover:border-primary/40"
                    )}
                  >
                    <Icon size={20} />
                    {label}
                  </button>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.05}>
            <Card>
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <FiCalendar /> Select a Date
              </h2>
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {days.map((day) => {
                  const active = day.toDateString() === selectedDay.toDateString();
                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={cn(
                        "flex shrink-0 flex-col items-center rounded-2xl border px-4 py-3 transition-colors",
                        active ? "border-primary bg-primary/10 text-primary" : "border-[var(--border)] text-[var(--text-muted)] hover:border-primary/40"
                      )}
                    >
                      <span className="text-xs">{day.toLocaleDateString("en-US", { weekday: "short" })}</span>
                      <span className="font-display text-lg font-bold">{day.getDate()}</span>
                    </button>
                  );
                })}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card>
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <FiClock /> Available Times ({consultationPricing.duration})
              </h2>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                      selectedTime === time ? "border-primary bg-primary/10 text-primary" : "border-[var(--border)] text-[var(--text-muted)] hover:border-primary/40"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.15}>
            <Card>
              <h2 className="font-display text-lg font-bold">Your Details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Input label="Full Name" placeholder="Jane Doe" error={errors.name && "Required"} {...register("name", { required: true })} />
                <Input label="Email" type="email" placeholder="jane@company.com" error={errors.email && "Required"} {...register("email", { required: true })} />
              </div>
              <div className="mt-4">
                <Textarea label="What would you like to discuss?" placeholder="Briefly describe your project or question..." {...register("notes")} />
              </div>
            </Card>
          </Reveal>

          <Button type="submit" size="lg" className="w-full" disabled={!selectedTime || isSubmitting}>
            {isSubmitting ? "Submitting..." : selectedTime ? `Confirm ${selectedTime} Booking` : "Select a time slot"}
          </Button>
        </form>
      </section>
    </>
  );
}
