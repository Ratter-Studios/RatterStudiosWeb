import { useRef, useState, type DragEvent, type FormEvent } from "react";
import { FileText, Send, Upload, X } from "lucide-react";
import { pillClasses } from "@/components/cta-link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// Sends the email; see workers/feedback. VITE_FEEDBACK_WORKER points it at `wrangler dev` locally.
const FEEDBACK_WORKER =
  import.meta.env.VITE_FEEDBACK_WORKER ??
  "https://stockholm1646-feedback.ratterstudios.workers.dev";

// Same limits as workers/feedback.
const MAX_FILES = 15;
const MAX_TOTAL_BYTES = 25 * 1024 ** 2;
const EXTENSIONS = ["txt", "log", "png", "jpg", "jpeg", "webp", "gif"];

const extension = (name: string) => /\.([^.]+)$/.exec(name)?.[1].toLowerCase() ?? "";

const formatSize = (bytes: number) =>
  bytes >= 1024 ** 2
    ? `${(bytes / 1024 ** 2).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

type Status = "editing" | "sending" | "sent";

/** Popup where playtesters drop the game's feedback files and screenshots, sent to us by email. */
export function FeedbackDialog({ build, onClose }: { build: string; onClose: () => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("editing");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const trap = useRef<HTMLInputElement>(null);

  const total = files.reduce((sum, file) => sum + file.size, 0);

  /** Adds the files that fit, and says why the others didn't. */
  function addFiles(added: File[]) {
    const next = [...files];
    const problems: string[] = [];
    for (const file of added) {
      if (next.some((f) => f.name === file.name && f.size === file.size)) continue;
      if (!EXTENSIONS.includes(extension(file.name))) {
        problems.push(`${file.name} isn't a text file or image.`);
      } else if (next.length >= MAX_FILES) {
        problems.push(`You can attach up to ${MAX_FILES} files.`);
      } else if (next.reduce((sum, f) => sum + f.size, file.size) > MAX_TOTAL_BYTES) {
        problems.push(`${file.name} doesn't fit, the files can be 25 MB together.`);
      } else {
        next.push(file);
      }
    }
    setFiles(next);
    setError([...new Set(problems)].join(" "));
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();
    setDragging(false);
    addFiles([...event.dataTransfer.files]);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (files.length === 0 && !message.trim()) {
      setError("Please attach a file or write a message.");
      return;
    }

    const form = new FormData();
    form.append("email", email);
    form.append("message", message);
    form.append("build", build);
    form.append("website", trap.current?.value ?? "");
    for (const file of files) form.append("files", file);

    setStatus("sending");
    setError("");
    try {
      const res = await fetch(FEEDBACK_WORKER, { method: "POST", body: form });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      const body = (await res.json().catch(() => undefined)) as { message?: string } | undefined;
      setError(body?.message ?? `Sending failed (${res.status}), please try again.`);
    } catch {
      setError("Couldn't reach our server, please check your connection and try again.");
    }
    setStatus("editing");
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-xl overflow-y-auto rounded-2xl border-border/50 bg-card p-6 shadow-xl shadow-black/40 md:p-8">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-medium text-primary/90">
            Playtest feedback
          </DialogTitle>
          <DialogDescription className="leading-relaxed text-foreground/60">
            Stockholm1646 <span className="text-primary/90">{build}</span>
          </DialogDescription>
        </DialogHeader>

        {status === "sent" ? (
          <div className="space-y-6 py-4">
            <p className="leading-relaxed text-foreground/80">
              Thank you! Your feedback is on its way to the team. We read every one of them.
            </p>
            <button type="button" onClick={onClose} className={pillClasses}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            <p className="text-sm leading-relaxed text-foreground/70">
              Drag the two files the game saved for you here,{" "}
              <span className="text-foreground/90">Stockholm1646_Feedback_Form.txt</span> and the{" "}
              <span className="text-foreground/90">Dialogue</span> file. You can add screenshots
              too.
            </p>

            {/* Drop zone, also a button that opens the file picker */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => input.current?.click()}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  input.current?.click();
                }
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-10 text-center transition-colors",
                dragging
                  ? "border-primary bg-primary/10"
                  : "border-primary/35 hover:border-primary/70",
              )}
            >
              <Upload aria-hidden className="h-6 w-6 text-primary/80" strokeWidth={1.5} />
              <p className="text-sm text-foreground/80">
                Drop files here or <span className="text-primary underline">browse</span>
              </p>
              <p className="text-xs text-foreground/45">
                Text files and images, up to {MAX_FILES} files and 25 MB together
              </p>
              <input
                ref={input}
                type="file"
                multiple
                accept={EXTENSIONS.map((ext) => `.${ext}`).join(",")}
                className="hidden"
                onChange={(event) => {
                  addFiles([...(event.target.files ?? [])]);
                  event.target.value = "";
                }}
              />
            </div>

            {files.length > 0 && (
              <div>
                <ul className="space-y-2">
                  {files.map((file) => (
                    <li
                      key={`${file.name}/${file.size}`}
                      className="flex items-center gap-3 rounded-lg border border-border/50 px-3 py-2 text-sm"
                    >
                      <FileText aria-hidden className="h-4 w-4 shrink-0 text-primary/70" />
                      <span className="min-w-0 flex-1 truncate text-foreground/85">
                        {file.name}
                      </span>
                      <span className="shrink-0 text-xs tabular-nums text-foreground/45">
                        {formatSize(file.size)}
                      </span>
                      <button
                        type="button"
                        onClick={() => setFiles(files.filter((f) => f !== file))}
                        className="shrink-0 rounded-sm text-foreground/45 transition-colors hover:text-primary"
                      >
                        <X aria-hidden className="h-4 w-4" />
                        <span className="sr-only">Remove {file.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs tabular-nums text-foreground/45">
                  {files.length} of {MAX_FILES} files, {formatSize(total)} of 25 MB
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="feedback-email" className="text-foreground/80">
                Your email
              </Label>
              <Input
                id="feedback-email"
                type="email"
                required
                autoComplete="email"
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback-message" className="text-foreground/80">
                Anything else? <span className="text-foreground/45">(optional)</span>
              </Label>
              <Textarea
                id="feedback-message"
                rows={4}
                maxLength={10_000}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>

            {/* Bot trap: hidden from people, bots fill it in */}
            <input
              ref={trap}
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute -left-[10000px] h-px w-px opacity-0"
            />

            {error && (
              <p role="alert" className="text-sm leading-relaxed text-destructive">
                {error}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className={cn(pillClasses, "gap-2 disabled:opacity-50")}
              >
                <Send aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
                {status === "sending" ? "Sending…" : "Send"}
              </button>
              <p className="text-xs leading-relaxed text-foreground/45">
                Only our team sees this. See our{" "}
                <a
                  href={`${import.meta.env.BASE_URL}privacy`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-primary"
                >
                  privacy policy
                </a>
                .
              </p>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
